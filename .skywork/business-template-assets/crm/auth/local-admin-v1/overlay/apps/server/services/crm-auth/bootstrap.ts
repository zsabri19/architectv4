import { getAuth } from "../../_core/auth";
import { executeSql } from "../../_core/db";

const CLAIM_TIMEOUT_MS = 5 * 60 * 1000;

type BootstrapState = {
  state: "open" | "claimed" | "complete";
  claimedEmail: string | null;
  claimedAt: string | null;
  adminUserId: string | null;
};

export type BootstrapInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthProxyResult = {
  status: number;
  body: unknown;
  token?: string;
};

function value(row: Record<string, unknown> | undefined, key: string) {
  const candidate = row?.[key];
  return typeof candidate === "string" ? candidate : null;
}

async function readBootstrapState(): Promise<BootstrapState> {
  const result = await executeSql(
    "SELECT state, claimed_email, claimed_at, admin_user_id FROM crm_auth_bootstrap WHERE singleton_key = 1"
  );
  const row = result.rows[0] as Record<string, unknown> | undefined;
  if (!row) throw new Error("CRM auth bootstrap migration has not been applied");
  const state = value(row, "state");
  if (state !== "open" && state !== "claimed" && state !== "complete") {
    throw new Error("CRM auth bootstrap state is invalid");
  }
  return {
    state,
    claimedEmail: value(row, "claimed_email"),
    claimedAt: value(row, "claimed_at"),
    adminUserId: value(row, "admin_user_id")
  };
}

export async function getCrmBootstrapStatus() {
  const state = await readBootstrapState();
  return { registrationOpen: state.state !== "complete", state: state.state };
}

async function callBetterAuth(path: string, body: Record<string, unknown>, headers: Headers) {
  const requestHeaders = new Headers({ "content-type": "application/json" });
  requestHeaders.set("origin", headers.get("origin") ?? "http://localhost");
  const response = await getAuth().handler(
    new Request(`http://localhost/api/auth/${path}`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(body)
    })
  );
  const parsedBody = await response.clone().json().catch(async () => ({ message: await response.text() }));
  return {
    status: response.status,
    body: parsedBody,
    token: response.headers.get("set-auth-token") ?? undefined
  } satisfies AuthProxyResult;
}

async function findClaimedUser(email: string) {
  const result = await executeSql("SELECT id FROM crm_user WHERE lower(email) = ? LIMIT 1", [email]);
  return value(result.rows[0] as Record<string, unknown> | undefined, "id");
}

async function completeBootstrap(userId: string, email: string, claimToken: string) {
  const now = new Date().toISOString();
  await executeSql("UPDATE crm_user SET role = 'admin', status = 'active', updatedAt = ? WHERE id = ?", [Date.now(), userId]);
  const completion = await executeSql(
    "UPDATE crm_auth_bootstrap SET state = 'complete', admin_user_id = ?, completed_at = ? WHERE singleton_key = 1 AND state = 'claimed' AND claim_token = ? AND claimed_email = ?",
    [userId, now, claimToken, email]
  );
  if (completion.rowsAffected !== 1) throw new Error("CRM auth bootstrap claim was lost before completion");
  await executeSql(
    "INSERT INTO crm_audit_log (id, actor_id, entity, record_id, operation, result, metadata, created_at) VALUES (?, ?, 'crm_user', ?, 'bootstrap_admin', 'success', '{}', ?)",
    [crypto.randomUUID(), userId, userId, now]
  );
}

async function releaseStaleClaim(state: BootstrapState) {
  if (!state.claimedAt || !state.claimedEmail) return false;
  const claimedAt = Date.parse(state.claimedAt);
  if (!Number.isFinite(claimedAt) || Date.now() - claimedAt < CLAIM_TIMEOUT_MS) return false;
  if (await findClaimedUser(state.claimedEmail)) return false;
  const released = await executeSql(
    "UPDATE crm_auth_bootstrap SET state = 'open', claim_token = NULL, claimed_email = NULL, claimed_at = NULL WHERE singleton_key = 1 AND state = 'claimed' AND claimed_email = ? AND claimed_at = ?",
    [state.claimedEmail, state.claimedAt]
  );
  return released.rowsAffected === 1;
}

export async function bootstrapCrmAdmin(input: BootstrapInput, headers: Headers): Promise<AuthProxyResult> {
  const email = input.email.trim().toLowerCase();
  let state = await readBootstrapState();
  if (state.state === "complete") {
    return { status: 403, body: { ok: false, error: { code: "REGISTRATION_CLOSED", message: "Registration is closed" } } };
  }

  if (state.state === "claimed" && (await releaseStaleClaim(state))) state = await readBootstrapState();

  if (state.state === "claimed") {
    if (state.claimedEmail !== email) {
      return { status: 409, body: { ok: false, error: { code: "BOOTSTRAP_IN_PROGRESS", message: "Administrator registration is already in progress" } } };
    }
    const existingUserId = await findClaimedUser(email);
    if (!existingUserId) {
      return { status: 409, body: { ok: false, error: { code: "BOOTSTRAP_IN_PROGRESS", message: "Administrator registration is already in progress" } } };
    }
    const claim = await executeSql("SELECT claim_token FROM crm_auth_bootstrap WHERE singleton_key = 1");
    const claimToken = value(claim.rows[0] as Record<string, unknown> | undefined, "claim_token");
    if (!claimToken) throw new Error("CRM auth bootstrap claim token is missing");
    await completeBootstrap(existingUserId, email, claimToken);
    return callBetterAuth("sign-in/email", { email, password: input.password }, headers);
  }

  const claimToken = crypto.randomUUID();
  const claimedAt = new Date().toISOString();
  const claimed = await executeSql(
    "UPDATE crm_auth_bootstrap SET state = 'claimed', claim_token = ?, claimed_email = ?, claimed_at = ? WHERE singleton_key = 1 AND state = 'open'",
    [claimToken, email, claimedAt]
  );
  if (claimed.rowsAffected !== 1) {
    return { status: 409, body: { ok: false, error: { code: "BOOTSTRAP_IN_PROGRESS", message: "Administrator registration is already in progress" } } };
  }

  const signup = await callBetterAuth("sign-up/email", { name: input.name.trim(), email, password: input.password }, headers);
  if (signup.status >= 400) {
    await executeSql(
      "UPDATE crm_auth_bootstrap SET state = 'open', claim_token = NULL, claimed_email = NULL, claimed_at = NULL WHERE singleton_key = 1 AND state = 'claimed' AND claim_token = ?",
      [claimToken]
    );
    return signup;
  }

  const userId = value((signup.body as { user?: Record<string, unknown> } | null)?.user, "id");
  if (!userId) throw new Error("Better Auth signup did not return a user id");
  await completeBootstrap(userId, email, claimToken);
  return signup;
}

import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import app from "../_core/create-app";
import { executeSql } from "../_core/db";
import { applyMigrations } from "../_test/helpers";

beforeAll(async () => { await applyMigrations(); });
beforeEach(async () => {
  await executeSql("UPDATE crm_auth_bootstrap SET state = 'open', claim_token = NULL, claimed_email = NULL, claimed_at = NULL, admin_user_id = NULL, completed_at = NULL WHERE singleton_key = 1");
  await executeSql("DELETE FROM crm_audit_log");
  await executeSql("DELETE FROM crm_session");
  await executeSql("DELETE FROM crm_account");
  await executeSql("DELETE FROM crm_verification");
  await executeSql("DELETE FROM crm_user");
});

function jsonRequest(path: string, body: unknown, token?: string) {
  const headers = new Headers({ "content-type": "application/json", origin: "http://localhost:3000" });
  if (token) headers.set("authorization", `Bearer ${token}`);
  return new Request(`http://localhost${path}`, { method: "POST", headers, body: JSON.stringify(body) });
}

async function bootstrap(email = "owner@example.com") {
  const response = await app.fetch(jsonRequest("/api/crm-auth/bootstrap", { name: "Owner", email, password: "strong-password" }));
  return { response, token: response.headers.get("set-auth-token") };
}

describe("CRM local administrator auth", () => {
  it("allows exactly one concurrent bootstrap administrator", async () => {
    const [first, second] = await Promise.all([bootstrap("first@example.com"), bootstrap("second@example.com")]);
    expect([first.response.status, second.response.status].sort()).toEqual([200, 409]);
    const admins = await executeSql("SELECT id FROM crm_user WHERE role = 'admin' AND status = 'active'");
    expect(admins.rows).toHaveLength(1);
    const state = await executeSql("SELECT state FROM crm_auth_bootstrap WHERE singleton_key = 1");
    expect(state.rows[0]?.state).toBe("complete");
  });

  it("blocks direct Better Auth signup and closes bootstrap after completion", async () => {
    expect((await app.fetch(jsonRequest("/api/auth/sign-up/email", { name: "Bypass", email: "bypass@example.com", password: "strong-password" }))).status).toBe(403);
    expect((await bootstrap()).response.status).toBe(200);
    expect((await bootstrap("later@example.com")).response.status).toBe(403);
  });

  it("lets an admin create users and protects the last active admin", async () => {
    const owner = await bootstrap();
    expect(owner.token).toBeTruthy();
    const create = await app.fetch(jsonRequest("/api/crm-users", { name: "Member", email: "member@example.com", password: "member-password", role: "member" }, owner.token!));
    expect(create.status, await create.clone().text()).toBe(201);
    const created = (await create.json()) as { data: { user: { id: string } } };

    const demoteOwner = await app.fetch(new Request("http://localhost/api/crm-users/" + (await executeSql("SELECT id FROM crm_user WHERE role = 'admin' LIMIT 1")).rows[0]?.id, {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${owner.token}` },
      body: JSON.stringify({ role: "member" })
    }));
    expect(demoteOwner.status).toBe(409);

    const ownerId = String((await executeSql("SELECT id FROM crm_user WHERE role = 'admin' LIMIT 1")).rows[0]?.id);
    const disableOwner = await app.fetch(new Request(`http://localhost/api/crm-users/${ownerId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${owner.token}` },
      body: JSON.stringify({ status: "disabled" })
    }));
    expect(disableOwner.status).toBe(409);

    const signIn = await app.fetch(jsonRequest("/api/auth/sign-in/email", { email: "member@example.com", password: "member-password" }));
    const memberToken = signIn.headers.get("set-auth-token");
    expect(memberToken).toBeTruthy();
    const memberList = await app.fetch(new Request("http://localhost/api/crm-users", { headers: { authorization: `Bearer ${memberToken}` } }));
    expect(memberList.status).toBe(403);
    const disable = await app.fetch(new Request(`http://localhost/api/crm-users/${created.data.user.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json", authorization: `Bearer ${owner.token}` },
      body: JSON.stringify({ status: "disabled" })
    }));
    expect(disable.status).toBe(200);
    const profile = await app.fetch(new Request("http://localhost/api/me/profile", { headers: { authorization: `Bearer ${memberToken}` } }));
    expect(profile.status).toBe(401);
    expect((await executeSql("SELECT id FROM crm_audit_log")).rows.length).toBeGreaterThanOrEqual(3);
  });
});

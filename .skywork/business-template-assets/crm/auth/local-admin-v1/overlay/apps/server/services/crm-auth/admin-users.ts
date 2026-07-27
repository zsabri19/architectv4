import { getAuth } from "../../_core/auth";
import { executeSql } from "../../_core/db";

export class CrmUserAdminError extends Error {
  constructor(readonly code: string, message: string, readonly status: number) {
    super(message);
  }
}

export async function listCrmUsers() {
  const result = await executeSql(
    "SELECT id, name, email, role, status, createdAt, updatedAt FROM crm_user ORDER BY createdAt ASC"
  );
  return result.rows;
}

async function audit(actorId: string, targetId: string, operation: string, metadata: Record<string, unknown> = {}) {
  await executeSql(
    "INSERT INTO crm_audit_log (id, actor_id, entity, record_id, operation, result, metadata, created_at) VALUES (?, ?, 'crm_user', ?, ?, 'success', ?, ?)",
    [crypto.randomUUID(), actorId, targetId, operation, JSON.stringify(metadata), new Date().toISOString()]
  );
}

export async function createCrmUser(
  actorId: string,
  input: { name: string; email: string; password: string; role: "admin" | "member" },
  headers: Headers
) {
  const response = await getAuth().handler(
    new Request("http://localhost/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: headers.get("origin") ?? "http://localhost"
      },
      body: JSON.stringify({ name: input.name.trim(), email: input.email.trim().toLowerCase(), password: input.password })
    })
  );
  const body = (await response.json().catch(() => null)) as { user?: { id?: string }; message?: string } | null;
  if (!response.ok || !body?.user?.id) {
    throw new CrmUserAdminError("USER_CREATE_FAILED", body?.message ?? "Unable to create user", response.status || 400);
  }

  const userId = body.user.id;
  await executeSql("UPDATE crm_user SET role = ?, status = 'active', updatedAt = ? WHERE id = ?", [input.role, Date.now(), userId]);
  await executeSql("DELETE FROM crm_session WHERE userId = ?", [userId]);
  await audit(actorId, userId, "admin_create_user", { role: input.role });
  return (await executeSql("SELECT id, name, email, role, status, createdAt, updatedAt FROM crm_user WHERE id = ?", [userId])).rows[0];
}

async function assertUserExists(userId: string) {
  const row = (await executeSql("SELECT id FROM crm_user WHERE id = ?", [userId])).rows[0];
  if (!row) throw new CrmUserAdminError("USER_NOT_FOUND", "User not found", 404);
}

export async function setCrmUserRole(actorId: string, userId: string, role: "admin" | "member") {
  await assertUserExists(userId);
  const result = await executeSql(
    "UPDATE crm_user SET role = ?, updatedAt = ? WHERE id = ? AND (role <> 'admin' OR ? = 'admin' OR EXISTS (SELECT 1 FROM crm_user AS other WHERE other.id <> ? AND other.role = 'admin' AND other.status = 'active'))",
    [role, Date.now(), userId, role, userId]
  );
  if (result.rowsAffected !== 1) throw new CrmUserAdminError("LAST_ADMIN_REQUIRED", "The last active administrator cannot be demoted", 409);
  await audit(actorId, userId, "set_role", { role });
}

export async function setCrmUserStatus(actorId: string, userId: string, status: "active" | "disabled") {
  await assertUserExists(userId);
  const result = await executeSql(
    "UPDATE crm_user SET status = ?, updatedAt = ? WHERE id = ? AND (? = 'active' OR role <> 'admin' OR EXISTS (SELECT 1 FROM crm_user AS other WHERE other.id <> ? AND other.role = 'admin' AND other.status = 'active'))",
    [status, Date.now(), userId, status, userId]
  );
  if (result.rowsAffected !== 1) throw new CrmUserAdminError("LAST_ADMIN_REQUIRED", "The last active administrator cannot be disabled", 409);
  if (status === "disabled") await executeSql("DELETE FROM crm_session WHERE userId = ?", [userId]);
  await audit(actorId, userId, "set_status", { status });
}

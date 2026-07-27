import type { MiddlewareHandler } from "hono";
import { eq } from "drizzle-orm";
import { apiFailure } from "@repo/shared/http";
import { getAuth, toAuthSession, toAuthUser, type AuthSession, type AuthUser } from "../_core/auth";
import { DatabaseError, getDb } from "../_core/db";
import { publicApiPrefixes } from "../_core/route-registry";
import { user as userTable } from "../db/crm-auth-schema";

declare module "hono" {
  interface ContextVariableMap {
    user: AuthUser | null;
    session: AuthSession | null;
  }
}

export const PUBLIC_API_PREFIXES = publicApiPrefixes;

function isPublicApiPath(pathname: string) {
  return PUBLIC_API_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export const withSession: MiddlewareHandler = async (c, next) => {
  if (isPublicApiPath(new URL(c.req.url).pathname)) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  const authorization = c.req.header("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  try {
    const betterAuthSession = await getAuth().api.getSession({
      headers: new Headers({ Authorization: authorization })
    });
    const authUser = toAuthUser(betterAuthSession);
    const row = authUser
      ? (await getDb()
          .select({
            role: userTable.role,
            status: userTable.status,
            emailVerified: userTable.emailVerified,
            username: userTable.username
          })
          .from(userTable)
          .where(eq(userTable.id, authUser.id))
          .limit(1))[0]
      : null;

    c.set(
      "user",
      !authUser || !row || row.status !== "active"
        ? null
        : {
            ...authUser,
            role: row.role === "admin" ? "admin" : "member",
            emailVerified: Boolean(row.emailVerified),
            username: row.username ?? undefined
          }
    );
    c.set("session", row?.status === "active" ? toAuthSession(betterAuthSession) : null);
  } catch (error) {
    if (error instanceof DatabaseError) {
      return c.json(apiFailure(error.code, error.message), error.status === 503 ? 503 : 502);
    }
    throw error;
  }

  await next();
};

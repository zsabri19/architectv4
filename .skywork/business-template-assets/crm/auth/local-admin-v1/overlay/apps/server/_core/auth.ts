import { betterAuth } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, openAPI, username } from "better-auth/plugins";
import * as schema from "../db/crm-auth-schema";
import { getDb } from "./db";
import { env } from "./env";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  role: "member" | "admin";
  username?: string;
};

export type AuthSession = {
  id: string;
  token: string;
  userId: string;
};

export const enabledSocialProviders: string[] = [];
export const enabledThirdPartySocialProviders: string[] = [];

function trustedOrigins(request?: Request) {
  const callerOrigin = request?.headers.get("origin");
  const ownHost = request?.headers.get("x-forwarded-host") ?? request?.headers.get("host");
  return [
    ...env.ALLOWED_ORIGINS,
    callerOrigin,
    ...(ownHost ? [`https://${ownHost}`, `http://${ownHost}`] : [])
  ];
}

function createAuth() {
  return betterAuth({
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    trustedOrigins,
    database: drizzleAdapter(getDb(), {
      provider: "sqlite",
      schema,
      camelCase: true
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false
    },
    plugins: [username(), bearer(), openAPI()]
  });
}

let authInstance: ReturnType<typeof createAuth> | null = null;

export function getAuth() {
  authInstance ??= createAuth();
  return authInstance;
}

type BetterAuthSession = NonNullable<Awaited<ReturnType<ReturnType<typeof getAuth>["api"]["getSession"]>>>;

export function toAuthUser(session: BetterAuthSession | null): AuthUser | null {
  if (!session?.user) return null;
  const authUser = session.user as BetterAuthSession["user"] & {
    role?: "member" | "admin";
    username?: string;
  };
  return {
    id: authUser.id,
    name: authUser.name,
    email: authUser.email,
    emailVerified: Boolean(authUser.emailVerified),
    role: authUser.role === "admin" ? "admin" : "member",
    username: authUser.username
  };
}

export function toAuthSession(session: BetterAuthSession | null): AuthSession | null {
  if (!session?.session) return null;
  return {
    id: session.session.id,
    token: session.session.token,
    userId: session.session.userId
  };
}

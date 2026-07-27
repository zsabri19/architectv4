import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("crm_user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  role: text("role", { enum: ["admin", "member"] }).notNull().default("member"),
  status: text("status", { enum: ["active", "disabled"] }).notNull().default("active"),
  username: text("username").unique(),
  displayUsername: text("displayUsername")
});

export const session = sqliteTable(
  "crm_session",
  {
    id: text("id").primaryKey(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("idx_crm_session_userId").on(table.userId)]
);

export const account = sqliteTable(
  "crm_account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
    refreshTokenExpiresAt: integer("refreshTokenExpiresAt", { mode: "timestamp" }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull()
  },
  (table) => [index("idx_crm_account_userId").on(table.userId)]
);

export const verification = sqliteTable(
  "crm_verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp" }),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
  },
  (table) => [index("idx_crm_verification_identifier").on(table.identifier)]
);

export const crmAuthBootstrap = sqliteTable("crm_auth_bootstrap", {
  singletonKey: integer("singleton_key").primaryKey(),
  state: text("state", { enum: ["open", "claimed", "complete"] }).notNull().default("open"),
  claimToken: text("claim_token"),
  claimedEmail: text("claimed_email"),
  claimedAt: text("claimed_at"),
  adminUserId: text("admin_user_id").references(() => user.id),
  completedAt: text("completed_at")
});

export const crmAuditLog = sqliteTable(
  "crm_audit_log",
  {
    id: text("id").primaryKey(),
    actorId: text("actor_id"),
    sourceWebsiteId: text("source_website_id"),
    entity: text("entity").notNull(),
    recordId: text("record_id"),
    operation: text("operation").notNull(),
    result: text("result").notNull(),
    metadata: text("metadata").notNull().default("{}"),
    createdAt: text("created_at").notNull()
  },
  (table) => [index("idx_crm_audit_actor_created").on(table.actorId, table.createdAt)]
);

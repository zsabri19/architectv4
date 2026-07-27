import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const read = (path) => readFileSync(resolve(root, path), "utf8");

assert.match(read("AGENTS.md").split("\n", 1)[0], /scaffold-contract: v2/);
const crmContract = read("AGENTS.crm.md");
for (const phrase of [
  "unique `webApps[]` entry whose `type` is `crm`",
  "source-bindings.json",
  "typed adapters",
  "crm_",
  "first successful `/auth` bootstrap registration",
  "`/settings/users` page",
  "AdminGuard",
  "user/permission-management navigation entry",
  "isolated local database",
  "including `/api/crm-auth/bootstrap`, `/api/auth/*`, or `/api/crm-users`",
  "Complete local Workspace impact validation",
  "record its ID in `.skywork/crm/selection.json`",
  "ui-reference/CrmScenarioReference.tsx",
  "At handoff, report the selected scenario"
]) {
  assert.match(crmContract, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
for (const path of [
  "apps/server/db/crm-auth-schema.ts",
  "apps/server/migrations/000_crm_auth.sql",
  "apps/server/migrations/010_crm_support.sql",
  "apps/server/routes/crm-auth.route.ts",
  "apps/server/routes/crm-users.route.ts",
  "apps/client/src/pages/settings/Users.tsx"
]) assert.ok(existsSync(resolve(root, path)), `missing CRM preset file: ${path}`);

console.log("[check-agents-contract] OK - standard Website and CRM contracts are present");

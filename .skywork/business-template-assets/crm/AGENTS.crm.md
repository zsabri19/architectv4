# CRM Website Guide

Read this file after the project root `AGENTS.md`. The root guide remains authoritative for the standard self-host React/Hono Website architecture. This guide overrides it only for CRM identity, shared business data, local administrator authentication, Workspace impact review, and release safety.

## Required Execution Order

Do not start implementation until steps 1 through 4 are complete.

1. Read the Workspace-root `.skywork/web-apps.json` and locate this project as the unique `webApps[]` entry whose `type` is `crm`. Treat missing legacy `type` as `website` and missing `name` as `websiteId`.
2. Read this project's root `AGENTS.md`, `.skywork/website.json`, `.skywork/crm/templates/runtime-contract.json`, and scenario catalog.
3. Inspect every `type=website` project listed in the Workspace registry. For each source, read its root `AGENTS.md`, schema, ordered migrations, services, routes, tests, customer-facing flow, and business invariants.
4. Select the closest catalog scenario, record its ID in `.skywork/crm/selection.json`, then read that scenario's `contract.json`, `ui-reference/fixture.json`, and `ui-reference/CrmScenarioReference.tsx`. Listing a scenario directory or a shared UI-reference path is not a substitute for these reads.
5. Build the server-only source registry and typed adapters, then implement the CRM Website.
6. Complete local Workspace impact validation before any deployment.

Stop and report a blocker when the Workspace has more than one CRM, has no ordinary Website, a registered project path escapes the Workspace, current Website code cannot be read, or Website migrations conflict during local replay.

## Project And Source Identity

- The CRM is a complete Website at `/`; never generate `/__skywork/crm/`, an iframe shell, or a CRM-specific CLI command family.
- `.skywork/web-apps.json` is authoritative for App identity and display names. Never infer CRM or source identity from the current directory name.
- Use registry `websiteId` as the stable source key. Use `name` only as display metadata.
- Write the only machine-readable source inventory at `apps/server/crm/source-registry.json`. Validate it against `.skywork/crm/templates/source-registry.schema.json`; do not create `.skywork/crm/source-bindings.json` or a second source inventory.
- The registry must contain exactly one `supported` or `unsupported` decision for every ordinary Website in `.skywork/web-apps.json`, with matching `websiteId` and `name`. At least one source must be supported.
- Generate one typed adapter at `apps/server/crm/adapters/<websiteId>.ts` for every supported source. CRM server code and the Inspector read the same registry; browser code must never import or serve it.
- Runtime requests never scan sibling source trees. Re-read sibling code only during generation, update, and validation.

## Shared Business Data

- Website projects own products, customers, orders, inventory, reservations, entitlements, deliveries, and all other business facts.
- Reuse Website-owned tables in the Workspace shared database. CRM migrations must not copy, rename, alter, or drop Website-owned tables.
- A typed adapter must preserve its Website's current primary keys, column meanings, money/time rules, archive behavior, authorization, status transitions, and other invariants.
- Aggregate reads may call all supported adapters. Single-Website reads call one adapter.
- Every query result exposes `sourceWebsiteId` and `sourceName`.
- Every mutation targets exactly one supported `sourceWebsiteId`; `source=all` mutations are forbidden.
- The browser may submit a source Website ID, but never a table name, project path, Workspace ID, database namespace, database credential, or SQL.
- UI fixtures are design and test inputs only. Never use them as a runtime repository, production seed, or fallback when database access fails.

## CRM-Owned Data And Authentication

- CRM may own only authentication, authorization, audit, preferences, and saved-view support data. Every CRM-owned table and migration target starts with `crm_`.
- Use the materialized `local-admin-v1` Better Auth preset. Do not replace its auth endpoints, password handling, bearer-session plumbing, or database adapter.
- The first successful `/auth` bootstrap registration atomically becomes administrator through `crm_auth_bootstrap`. Never use `SELECT COUNT(user)` to determine the first administrator.
- Public Better Auth signup is closed outside bootstrap and after bootstrap completes.
- Only an active administrator may create later users. Protect the last active administrator and revoke sessions when a user is disabled.
- Register the local-admin preset's `/settings/users` page in the final CRM client router before the catch-all route. Render `UsersSettingsPage` behind `AdminGuard`.
- Provide a visible user/permission-management navigation entry for active administrators only. Non-admin users must not see the entry, and direct access must render 403.
- Reuse the preset `/api/crm-users` API and user-management page. Do not implement a second account store, password flow, or administration API.
- Protect every CRM business API with `protectedRoute` or `adminRoute` as appropriate.
- Never seed an administrator or create one through a deployed API, online database, migration, deploy hook, or post-publish verification.

## CRM Information Architecture

- The CRM MUST expose visible primary navigation for its business modules.
- The CRM MUST provide an `overview` module and at least one business-resource module.
- Every core resource with an independent list, detail, or mutation workflow MUST have its own primary navigation entry. Closely related entities may share one module, such as orders and order items in an Orders module.
- A source selector is a global data filter. It MUST NOT replace business-module navigation.
- Primary navigation may use tabs, sidebar items, or routes. A single React route is acceptable, but a single scrolling page that mixes all business resources without primary navigation is not.
- Match the selected scenario's visual language, layout density, navigation structure, component patterns, and interaction behavior as closely as practical.
- The selected scenario is not a pixel-perfect reproduction requirement. Adapt modules and content to current source capabilities, and do not generate empty modules for unsupported capabilities.
- When the user provides explicit visual, layout, or interaction requirements, those requirements take precedence over the selected scenario reference.
- User visual preferences and scenario references MUST NOT override authentication, authorization, data ownership, source capabilities, business invariants, or security requirements.
- At handoff, report the selected scenario and the reference patterns adopted for primary navigation, layout/density, component patterns, and operator interactions. Do not claim pixel-perfect reference parity without browser review.

## CRM Functional Requirements

- Overview MUST show useful metrics, operational exceptions, visible source identity, and persisted-data refresh.
- Each business-resource module MUST provide a real record list and, where meaningful, record details, filtering, and empty states.
- Implement the create, edit, archive, cancel, delete, and status-transition operations allowed by the source registry.
- State-changing actions MUST preserve source authorization, valid transitions, inventory or capacity constraints, money and time rules, and archive behavior.
- Mutations MUST use real forms and confirmation UI where appropriate, with pending, error, success, and post-mutation refresh behavior.
- CRM pages and business APIs MUST follow the configured authentication and role requirements.
- Runtime data MUST come from the shared database through the generated source registry and typed adapters. Fixtures and hard-coded results are forbidden.
- Do not expose actions that current source applications cannot actually perform. Concrete API paths, payloads, component boundaries, and normalized CRM view models remain generated-project decisions.

## Change Impact And Local Validation

Re-read every ordinary Website whenever CRM is generated or updated, or whenever a Website schema, migration, service, route, test, or business invariant used by CRM changes. Do not use schema fingerprints or stale hashes.

For every ordinary Website, record exactly one evidence-backed outcome in `.skywork/crm/validation.json`: `unaffected`, `compatible-additive`, `adapter-change`, or `required-breaking`. When an adapter, Website contract, or Website behavior is affected, update that project and validate it locally before deployment.

The validation result must have this shape and must contain real commands and evidence:

```json
{
  "schemaVersion": 1,
  "status": "passed",
  "localOnly": true,
  "validatedAt": "2026-01-01T00:00:00.000Z",
  "checks": [{ "name": "workspace-migration-replay", "command": "...", "evidence": "..." }],
  "impactReview": {
    "websites": [{ "websiteId": "...", "outcome": "unaffected", "evidence": "..." }]
  }
}
```

Required local coverage includes Workspace migration replay, repository persistence, aggregate and single-source reads, unsupported-source behavior, source isolation, single-source mutations, Website invariants, `/auth` bootstrap/sign-in, `/settings/users` routing and admin-only navigation, user-management mutations, auth/RBAC, first-admin concurrency, closed signup, last-admin protection, session revocation, build/lint, browser operation smoke, and the CRM inspector. Run these checks against an isolated local database.

## Release Safety

1. Fix local failures and rerun the affected checks until the inspector reports `ready`.
2. Deploy affected ordinary Websites in dependency order, then deploy the CRM Website.
3. Use deployment control-plane status only to confirm delivery. Never call deployed Website or CRM business APIs, including `/api/crm-auth/bootstrap`, `/api/auth/*`, or `/api/crm-users`, and never query or mutate the production database for verification.
4. Do not make affected Websites public automatically. Report which Apps changed so the user can decide whether to publish them publicly.
5. After CRM deployment, tell the user to visit `/auth`; the first successfully registered account becomes the administrator. That administrator manages later users at `/settings/users`.

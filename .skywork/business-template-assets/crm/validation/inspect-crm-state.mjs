import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const SAFE_SQL_IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const SAFE_SCHEMA_PATH = /^apps\/server\/db\/(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]*$/;
const WEBSITE_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const RUNTIME_CONTRACT_PATH = ".skywork/crm/templates/runtime-contract.json";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function inside(root, candidate) {
  const rel = relative(root, candidate);
  return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
}

function findWorkspaceRoot(start, manifestPath) {
  let cursor = resolve(start);
  while (true) {
    if (existsSync(resolve(cursor, manifestPath))) return cursor;
    const parent = dirname(cursor);
    if (parent === cursor) return null;
    cursor = parent;
  }
}

function isSafeRelativePath(value, placeholder) {
  if (typeof value !== "string" || !value || isAbsolute(value)) return false;
  const normalized = placeholder ? value.replace(placeholder, "safe-id") : value;
  return inside("/contract-root", resolve("/contract-root", normalized));
}

function isPathWithinPrefix(value, prefix) {
  if (!isSafeRelativePath(value)) return false;
  const root = "/contract-root";
  return inside(resolve(root, prefix), resolve(root, value));
}

function hasOnlyKeys(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function isIdentifier(value) {
  return typeof value === "string" && value.length <= 128 && SAFE_SQL_IDENTIFIER.test(value);
}

function loadRuntimeContract(crmRoot) {
  const path = resolve(crmRoot, RUNTIME_CONTRACT_PATH);
  if (!existsSync(path)) throw new Error(`missing ${RUNTIME_CONTRACT_PATH}`);
  const contract = readJson(path);
  const paths = contract.paths ?? {};
  const identity = contract.identity ?? {};
  const ownership = contract.ownership ?? {};
  const validation = contract.validation ?? {};
  if (
    contract.schemaVersion !== 1 ||
    contract.id !== "crm-runtime-contract-v1" ||
    !isSafeRelativePath(paths.workspaceManifest) ||
    !isSafeRelativePath(paths.sourceRegistry) ||
    !isSafeRelativePath(paths.sourceRegistrySchema) ||
    !isSafeRelativePath(paths.adapterPattern, "<websiteId>") ||
    !paths.adapterPattern.includes("<websiteId>") ||
    !isSafeRelativePath(paths.validationResult) ||
    identity.crmAppType !== "crm" ||
    identity.sourceAppType !== "website" ||
    identity.bindingSourceIdField !== "websiteId" ||
    identity.querySourceIdField !== "sourceWebsiteId" ||
    identity.querySourceNameField !== "sourceName" ||
    !Array.isArray(identity.supportStatuses) ||
    identity.supportStatuses.join(",") !== "supported,unsupported" ||
    ownership.sourceEntityOwner !== "website" ||
    ownership.crmTablePrefix !== "crm_" ||
    validation.schemaVersion !== 1 ||
    validation.passedStatus !== "passed" ||
    validation.localOnly !== true ||
    validation.onlineRuntimeVerificationAllowed !== false ||
    !Array.isArray(validation.impactOutcomes) ||
    validation.impactOutcomes.length === 0
  ) {
    throw new Error("invalid CRM runtime contract");
  }
  const registrySchemaPath = resolve(crmRoot, paths.sourceRegistrySchema);
  if (!existsSync(registrySchemaPath)) throw new Error(`missing ${paths.sourceRegistrySchema}`);
  const registrySchema = readJson(registrySchemaPath);
  if (
    registrySchema.$id !== "https://skywork.ai/schemas/crm/source-registry-v1.json" ||
    registrySchema.additionalProperties !== false ||
    !Array.isArray(registrySchema.required) ||
    registrySchema.required.join(",") !== "schemaVersion,sources"
  ) {
    throw new Error("invalid CRM source registry schema");
  }
  return contract;
}

function normalizeEntry(entry) {
  return {
    ...entry,
    type: entry.type || "website",
    name: entry.name || entry.websiteId
  };
}

function safeProjectRoot(workspaceRoot, projectPath) {
  if (typeof projectPath !== "string" || !projectPath || isAbsolute(projectPath)) return null;
  const lexical = resolve(workspaceRoot, projectPath);
  if (!inside(workspaceRoot, lexical) || !existsSync(lexical)) return null;
  if (lstatSync(lexical).isSymbolicLink()) return null;
  const workspaceReal = realpathSync(workspaceRoot);
  const projectReal = realpathSync(lexical);
  return inside(workspaceReal, projectReal) ? projectReal : null;
}

function validateEntity(entity) {
  if (!entity || typeof entity !== "object") return "entity binding must be an object";
  if (!hasOnlyKeys(entity, ["entity", "tableName", "schemaPath", "exportName", "primaryKey", "operations"])) return "entity binding has unsupported or missing fields";
  if (!isIdentifier(entity.entity)) return "entity binding has an invalid entity";
  if (!isIdentifier(entity.tableName)) return `${entity.entity} has an invalid tableName`;
  if (!SAFE_SCHEMA_PATH.test(entity.schemaPath ?? "") || !isPathWithinPrefix(entity.schemaPath, "apps/server/db")) return `${entity.entity} has an invalid schemaPath`;
  if (!isIdentifier(entity.exportName)) return `${entity.entity} has an invalid exportName`;
  if (!isIdentifier(entity.primaryKey)) return `${entity.entity} has an invalid primaryKey`;
  if (!Array.isArray(entity.operations) || entity.operations.length === 0 || entity.operations.some((op) => !isIdentifier(op)) || new Set(entity.operations).size !== entity.operations.length) return `${entity.entity} has invalid operations`;
  return null;
}

function validateAdapters(crmRoot, supportedSources, contract) {
  const reasons = [];
  for (const source of supportedSources) {
    const adapterRelativePath = contract.paths.adapterPattern.replace("<websiteId>", source.websiteId);
    const adapterPath = resolve(crmRoot, adapterRelativePath);
    if (!existsSync(adapterPath)) {
      reasons.push(`missing typed adapter for ${source.websiteId}`);
      continue;
    }
    const adapter = readFileSync(adapterPath, "utf8");
    for (const entity of source.entities) {
      if (!adapter.includes(entity.tableName) || !adapter.includes(entity.exportName)) reasons.push(`adapter ${source.websiteId} does not cover ${entity.entity}`);
      for (const operation of entity.operations) {
        if (!adapter.includes(operation)) reasons.push(`adapter ${source.websiteId} is missing operation ${operation}`);
      }
    }
  }
  return reasons;
}

function validateCrmMigrations(crmRoot, crmTablePrefix) {
  const migrationRoot = resolve(crmRoot, "apps/server/migrations");
  if (!existsSync(migrationRoot)) return ["missing apps/server/migrations"];
  const reasons = [];
  const migrationNames = ["000_crm_auth.sql", "010_crm_support.sql"];
  for (const name of migrationNames) {
    const path = resolve(migrationRoot, name);
    if (!existsSync(path)) {
      reasons.push(`missing ${name}`);
      continue;
    }
    const sql = readFileSync(path, "utf8");
    const targets = [...sql.matchAll(/\b(?:CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?|ALTER\s+TABLE|DROP\s+TABLE(?:\s+IF\s+EXISTS)?)\s+([A-Za-z_][A-Za-z0-9_]*)/gi)].map((match) => match[1]);
    for (const target of targets) if (!target.toLowerCase().startsWith(crmTablePrefix)) reasons.push(`${name} touches non-CRM object ${target}`);
  }
  return reasons;
}

function validateLocalResult(crmRoot, websiteIds, contract) {
  const validationPath = resolve(crmRoot, contract.paths.validationResult);
  if (!existsSync(validationPath)) return { state: "needs_review", reasons: ["missing local CRM validation result"] };
  const validation = readJson(validationPath);
  if (validation.schemaVersion !== contract.validation.schemaVersion || validation.status !== contract.validation.passedStatus || validation.localOnly !== contract.validation.localOnly || typeof validation.validatedAt !== "string" || Number.isNaN(Date.parse(validation.validatedAt))) {
    return { state: "needs_review", reasons: ["local CRM validation has not passed"] };
  }
  if (!Array.isArray(validation.checks) || validation.checks.length === 0 || validation.checks.some((check) => !check || typeof check.name !== "string" || !check.name.trim() || typeof check.command !== "string" || !check.command.trim() || typeof check.evidence !== "string" || !check.evidence.trim())) {
    return { state: "needs_review", reasons: ["local CRM validation checks require command and evidence"] };
  }
  const reviews = validation.impactReview?.websites;
  if (!Array.isArray(reviews)) return { state: "needs_review", reasons: ["missing per-Website impact review"] };
  const validOutcomes = new Set(contract.validation.impactOutcomes);
  const byId = new Map(reviews.map((review) => [review.websiteId, review]));
  const reasons = [];
  if (byId.size !== reviews.length) reasons.push("impact review contains duplicate Website entries");
  if (reviews.length !== websiteIds.length) reasons.push("impact review must cover every ordinary Website exactly once");
  for (const websiteId of websiteIds) {
    const review = byId.get(websiteId);
    if (!review || !validOutcomes.has(review.outcome) || typeof review.evidence !== "string" || !review.evidence.trim()) {
      reasons.push(`incomplete impact review for ${websiteId}`);
    }
  }
  return reasons.length ? { state: "needs_review", reasons } : { state: "ready", reasons: [] };
}

export function inspectCrmState({ cwd = process.cwd() } = {}) {
  try {
    const crmRoot = realpathSync(resolve(cwd));
    const contract = loadRuntimeContract(crmRoot);
    const workspaceRoot = findWorkspaceRoot(crmRoot, contract.paths.workspaceManifest);
    if (!workspaceRoot) return { state: "invalid", contractValid: false, reasons: [`Workspace ${contract.paths.workspaceManifest} was not found`] };

    const manifest = readJson(resolve(workspaceRoot, contract.paths.workspaceManifest));
    if (manifest.schemaVersion !== 2 || manifest.kind !== "businessWebApps" || !Array.isArray(manifest.webApps)) {
      return { state: "invalid", contractValid: false, reasons: ["Workspace web-apps.json must use schemaVersion 2 and kind businessWebApps"] };
    }
    const entries = manifest.webApps.map(normalizeEntry);
    const entryIds = entries.map((entry) => entry.websiteId);
    if (entryIds.some((websiteId) => !WEBSITE_ID.test(websiteId ?? "")) || new Set(entryIds).size !== entryIds.length) {
      return { state: "invalid", contractValid: false, reasons: ["Workspace web-apps.json has invalid or duplicate Website IDs"] };
    }
    const crmEntries = entries.filter((entry) => entry.type === contract.identity.crmAppType);
    if (crmEntries.length !== 1) return { state: "mismatch", contractValid: false, reasons: ["Workspace must contain exactly one type=crm entry"] };
    const crmEntry = crmEntries[0];
    const declaredCrmRoot = safeProjectRoot(workspaceRoot, crmEntry.path);
    if (!declaredCrmRoot || declaredCrmRoot !== crmRoot) {
      return { state: "mismatch", contractValid: false, reasons: ["Current project is not the Workspace CRM entry"] };
    }

    const websiteEntries = entries.filter((entry) => entry.type === contract.identity.sourceAppType);
    if (websiteEntries.length === 0) return { state: "mismatch", contractValid: false, reasons: ["CRM requires at least one type=website source"] };
    for (const entry of websiteEntries) {
      if (!safeProjectRoot(workspaceRoot, entry.path)) return { state: "invalid", contractValid: false, reasons: [`Website project path is invalid: ${entry.websiteId}`] };
    }

    const registryPath = resolve(crmRoot, contract.paths.sourceRegistry);
    if (!existsSync(registryPath)) return { state: "mismatch", contractValid: false, reasons: [`missing ${contract.paths.sourceRegistry}`] };
    const registry = readJson(registryPath);
    if (!hasOnlyKeys(registry, ["schemaVersion", "sources"]) || registry.schemaVersion !== 1 || !Array.isArray(registry.sources)) {
      return { state: "mismatch", contractValid: false, reasons: ["invalid CRM source registry header"] };
    }

    const expectedById = new Map(websiteEntries.map((entry) => [entry.websiteId, entry]));
    const sourceById = new Map(registry.sources.map((source) => [source.websiteId, source]));
    const reasons = [];
    if (sourceById.size !== registry.sources.length) reasons.push("source registry contains duplicate Website entries");
    for (const entry of websiteEntries) {
      const source = sourceById.get(entry.websiteId);
      if (!source) {
        reasons.push(`missing source decision for ${entry.websiteId}`);
        continue;
      }
      if (!hasOnlyKeys(source, ["websiteId", "name", "supportStatus", "entities"])) reasons.push(`source has unsupported or missing fields: ${entry.websiteId}`);
      if (typeof source.name !== "string" || !source.name.trim() || source.name.length > 160 || source.name !== entry.name) reasons.push(`source metadata does not match manifest for ${entry.websiteId}`);
      if (!contract.identity.supportStatuses.includes(source.supportStatus)) reasons.push(`invalid supportStatus for ${entry.websiteId}`);
      if (!Array.isArray(source.entities)) reasons.push(`missing entities for ${entry.websiteId}`);
      else if (source.supportStatus === "unsupported" && source.entities.length !== 0) reasons.push(`unsupported source must not declare entities: ${entry.websiteId}`);
      else if (source.supportStatus === "supported") {
        if (source.entities.length === 0) reasons.push(`supported source has no entities: ${entry.websiteId}`);
        const sourceRoot = safeProjectRoot(workspaceRoot, entry.path);
        const entityNames = new Set();
        for (const entity of source.entities) {
          const entityReason = validateEntity(entity);
          if (entityReason) reasons.push(`${entry.websiteId}: ${entityReason}`);
          if (entityNames.has(entity.entity)) reasons.push(`${entry.websiteId}: duplicate entity ${entity.entity}`);
          entityNames.add(entity.entity);
          if (sourceRoot && isPathWithinPrefix(entity.schemaPath, "apps/server/db") && !existsSync(resolve(sourceRoot, entity.schemaPath))) reasons.push(`${entry.websiteId}: missing schema file ${entity.schemaPath}`);
        }
      }
    }
    for (const source of registry.sources) if (!expectedById.has(source.websiteId)) reasons.push(`registry contains unknown Website ${source.websiteId}`);
    if (reasons.length) return { state: "mismatch", contractValid: false, reasons };

    const supportedSources = registry.sources.filter((source) => source.supportStatus === "supported");
    if (supportedSources.length === 0) return { state: "mismatch", contractValid: false, reasons: ["CRM requires at least one supported Website source"] };
    const deterministicReasons = [
      ...validateAdapters(crmRoot, supportedSources, contract),
      ...validateCrmMigrations(crmRoot, contract.ownership.crmTablePrefix)
    ];
    if (deterministicReasons.length) return { state: "invalid", contractValid: false, reasons: deterministicReasons };

    const localResult = validateLocalResult(crmRoot, websiteEntries.map((entry) => entry.websiteId), contract);
    return {
      state: localResult.state,
      contractValid: localResult.state === "ready",
      workspaceRoot,
      crmWebsiteId: crmEntry.websiteId,
      sourceWebsiteIds: websiteEntries.map((entry) => entry.websiteId),
      supportedSourceWebsiteIds: supportedSources.map((source) => source.websiteId),
      reasons: localResult.reasons
    };
  } catch (error) {
    return { state: "invalid", contractValid: false, reasons: [error instanceof Error ? error.message : "CRM state inspection failed"] };
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = inspectCrmState();
  process.stdout.write(`${JSON.stringify(result)}\n`);
  if (result.state !== "ready") process.exitCode = 1;
}

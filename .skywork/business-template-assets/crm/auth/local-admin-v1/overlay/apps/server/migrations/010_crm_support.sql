CREATE TABLE IF NOT EXISTS crm_auth_bootstrap (
  singleton_key INTEGER PRIMARY KEY CHECK (singleton_key = 1),
  state TEXT NOT NULL DEFAULT 'open' CHECK (state IN ('open', 'claimed', 'complete')),
  claim_token TEXT,
  claimed_email TEXT,
  claimed_at TEXT,
  admin_user_id TEXT REFERENCES crm_user (id),
  completed_at TEXT
);

INSERT OR IGNORE INTO crm_auth_bootstrap (singleton_key, state) VALUES (1, 'open');

CREATE TABLE IF NOT EXISTS crm_audit_log (
  id TEXT PRIMARY KEY,
  actor_id TEXT,
  source_website_id TEXT,
  entity TEXT NOT NULL,
  record_id TEXT,
  operation TEXT NOT NULL,
  result TEXT NOT NULL,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_crm_audit_actor_created ON crm_audit_log (actor_id, created_at);

-- ─── Applications ──────────────────────────────────────────────────────────
-- Backs app/api/applications/route.ts (the "Apply Now" modal). The table
-- turned out to already exist (created outside of a tracked migration), so
-- every column is added defensively with IF NOT EXISTS in case its shape
-- doesn't already match what the API route expects.

CREATE TABLE IF NOT EXISTS applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE applications ADD COLUMN IF NOT EXISTS name       TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS email      TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS phone      TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS level      TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS programme  TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS intake     TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS consent    BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS source     TEXT DEFAULT 'modal-apply';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS status     TEXT NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_email_idx ON applications (email);
CREATE INDEX IF NOT EXISTS applications_status_idx ON applications (status);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to applications" ON applications;
CREATE POLICY "Service role full access to applications"
  ON applications FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Anon can insert applications" ON applications;
CREATE POLICY "Anon can insert applications"
  ON applications FOR INSERT
  WITH CHECK (true);


-- ─── Contact Messages ──────────────────────────────────────────────────────
-- Backs app/api/contact/route.ts. Previously that route only sent email with
-- no database backup, so a failed send meant the message was gone for good.

CREATE TABLE IF NOT EXISTS contact_messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS name       TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS email      TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS phone      TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS subject    TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS message    TEXT;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS ip_address INET;
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS status     TEXT NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON contact_messages (email);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to contact_messages" ON contact_messages;
CREATE POLICY "Service role full access to contact_messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Anon can insert contact_messages" ON contact_messages;
CREATE POLICY "Anon can insert contact_messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

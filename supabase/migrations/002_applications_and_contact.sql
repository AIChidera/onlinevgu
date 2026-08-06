-- ─── Applications ──────────────────────────────────────────────────────────
-- Backs app/api/applications/route.ts (the "Apply Now" modal). Was missing
-- entirely, so every application submission was failing silently.

CREATE TABLE IF NOT EXISTS applications (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  level           TEXT NOT NULL CHECK (level IN ('ug', 'pg')),
  programme       TEXT NOT NULL,
  intake          TEXT NOT NULL,
  consent         BOOLEAN NOT NULL DEFAULT FALSE,
  source          TEXT DEFAULT 'modal-apply',
  ip_address      INET,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'lost'))
);

CREATE INDEX IF NOT EXISTS applications_created_at_idx ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_email_idx ON applications (email);
CREATE INDEX IF NOT EXISTS applications_status_idx ON applications (status);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to applications"
  ON applications FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anon can insert applications"
  ON applications FOR INSERT
  WITH CHECK (true);


-- ─── Contact Messages ──────────────────────────────────────────────────────
-- Backs app/api/contact/route.ts. Previously that route only sent email with
-- no database backup, so a failed send meant the message was gone for good.

CREATE TABLE IF NOT EXISTS contact_messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  subject         TEXT NOT NULL,
  message         TEXT NOT NULL,
  ip_address      INET,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved'))
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_email_idx ON contact_messages (email);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to contact_messages"
  ON contact_messages FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anon can insert contact_messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

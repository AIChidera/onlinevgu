-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Leads ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  program_interest TEXT,
  source          TEXT DEFAULT 'website',
  utm_source      TEXT,
  utm_medium      TEXT,
  utm_campaign    TEXT,
  ip_address      INET,
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'lost'))
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Only service-role (server) can read or write leads
CREATE POLICY "Service role full access to leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Allow anonymous inserts (via API route which validates server-side)
CREATE POLICY "Anon can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);


-- ─── Brochure Requests ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS brochure_requests (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  program_interest TEXT NOT NULL,
  ip_address      INET
);

CREATE INDEX IF NOT EXISTS brochure_requests_created_at_idx ON brochure_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS brochure_requests_email_idx ON brochure_requests (email);

ALTER TABLE brochure_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to brochure_requests"
  ON brochure_requests FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anon can insert brochure_requests"
  ON brochure_requests FOR INSERT
  WITH CHECK (true);

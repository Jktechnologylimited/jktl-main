import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || "";
export const sql = DATABASE_URL ? neon(DATABASE_URL) : null as any;

//  SCHEMA SETUP 
// Run this once to initialise your Neon database.
// Call: GET /api/affiliate/setup (only in dev or once on first deploy)
export const SCHEMA = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS affiliates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name    TEXT NOT NULL,
  last_name     TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  phone         TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  referral_code TEXT UNIQUE NOT NULL,
  tier          TEXT NOT NULL DEFAULT 'standard',
  status        TEXT NOT NULL DEFAULT 'pending',
  how_promote   TEXT,
  business_name TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referral_clicks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  ip_address    TEXT,
  user_agent    TEXT,
  page          TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referral_leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  name          TEXT,
  email         TEXT,
  phone         TEXT,
  service       TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS commissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  lead_id       UUID REFERENCES referral_leads(id),
  service_name  TEXT NOT NULL,
  deal_value    NUMERIC(12,2) NOT NULL,
  rate          NUMERIC(5,2) NOT NULL,
  amount        NUMERIC(12,2) NOT NULL,
  type          TEXT NOT NULL DEFAULT 'one-time',
  status        TEXT NOT NULL DEFAULT 'pending',
  paid_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  subject       TEXT NOT NULL,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'open',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_affiliate   ON referral_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_leads_affiliate    ON referral_leads(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_commissions_aff    ON commissions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_code    ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_email   ON affiliates(email);
`;

//  ONBOARDING SCHEMA 
// Add this to your Neon DB by hitting GET /api/onboarding/setup
export const ONBOARDING_SCHEMA = `
CREATE TABLE IF NOT EXISTS organisations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product          TEXT NOT NULL,
  plan             TEXT NOT NULL,
  setup_fee        NUMERIC(12,2) NOT NULL,
  monthly_fee      NUMERIC(12,2) NOT NULL,
  org_name         TEXT NOT NULL,
  owner_name       TEXT NOT NULL,
  owner_email      TEXT NOT NULL,
  owner_phone      TEXT NOT NULL,
  address          TEXT,
  org_size         TEXT,
  subdomain        TEXT UNIQUE NOT NULL,
  custom_domain    TEXT,
  logo_url         TEXT,
  brand_color      TEXT DEFAULT '#8B5CF6',
  status           TEXT NOT NULL DEFAULT 'pending_payment',
  paystack_ref     TEXT,
  paystack_sub_id  TEXT,
  affiliate_code   TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  activated_at     TIMESTAMPTZ,
  notes            TEXT
);

CREATE TABLE IF NOT EXISTS onboarding_sessions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product          TEXT NOT NULL,
  step             INT NOT NULL DEFAULT 1,
  data             JSONB NOT NULL DEFAULT '{}',
  completed        BOOLEAN DEFAULT FALSE,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orgs_subdomain ON organisations(subdomain);
CREATE INDEX IF NOT EXISTS idx_orgs_email     ON organisations(owner_email);
CREATE INDEX IF NOT EXISTS idx_orgs_product   ON organisations(product);
CREATE INDEX IF NOT EXISTS idx_orgs_status    ON organisations(status);
`;

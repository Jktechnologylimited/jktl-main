import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });
  }

  const sql = neon(process.env.DATABASE_URL);
  const created: string[] = [];
  const errors: string[] = [];

  async function run(name: string, query: string) {
    try {
      await sql.query(query);
      created.push(name);
    } catch (err) {
      errors.push(`${name}: ${String(err)}`);
    }
  }

  await run("affiliates", `
    CREATE TABLE IF NOT EXISTS affiliates (
      id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name         TEXT NOT NULL,
      last_name          TEXT NOT NULL,
      email              TEXT UNIQUE NOT NULL,
      phone              TEXT,
      business_name      TEXT,
      how_promote        TEXT,
      referral_code      TEXT UNIQUE NOT NULL,
      tier               TEXT DEFAULT 'standard',
      status             TEXT DEFAULT 'pending',
      bank_name          TEXT,
      bank_account       TEXT,
      bank_code          TEXT,
      welcome_bonus_paid BOOLEAN DEFAULT FALSE,
      password_hash      TEXT,
      created_at         TIMESTAMPTZ DEFAULT NOW(),
      updated_at         TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  // Migration for existing affiliate tables created before standalone auth
  await run("affiliates.password_hash", `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS password_hash TEXT`);

  await run("referral_clicks", `
    CREATE TABLE IF NOT EXISTS referral_clicks (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      offer_id     TEXT,
      ip_address   TEXT,
      user_agent   TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("referral_leads", `
    CREATE TABLE IF NOT EXISTS referral_leads (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      offer_id     TEXT,
      email        TEXT,
      org_id       UUID,
      status       TEXT DEFAULT 'lead',
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("commissions", `
    CREATE TABLE IF NOT EXISTS commissions (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      org_id       UUID,
      offer_id     TEXT,
      type         TEXT,
      amount       NUMERIC(12,2),
      status       TEXT DEFAULT 'pending',
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("payout_requests", `
    CREATE TABLE IF NOT EXISTS payout_requests (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      amount       NUMERIC(12,2),
      bank_name    TEXT,
      bank_account TEXT,
      status       TEXT DEFAULT 'requested',
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      paid_at      TIMESTAMPTZ
    )
  `);

  await run("support_tickets", `
    CREATE TABLE IF NOT EXISTS support_tickets (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      subject      TEXT,
      message      TEXT,
      status       TEXT DEFAULT 'open',
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("campaign_links", `
    CREATE TABLE IF NOT EXISTS campaign_links (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      affiliate_id UUID REFERENCES affiliates(id) ON DELETE CASCADE,
      offer_id     TEXT,
      custom_slug  TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("password_resets", `
    CREATE TABLE IF NOT EXISTS password_resets (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email      TEXT NOT NULL,
      token      TEXT UNIQUE NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // ---- Schema alignment: ensure every column the app reads exists ----
  // Idempotent. Brings older/divergent tables up to what the current code expects,
  // without dropping data. Safe to run repeatedly.
  const migrations: [string, string][] = [
    // affiliates (bonus + auth + profile)
    ["affiliates.signup_bonus",     `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS signup_bonus NUMERIC(12,2) DEFAULT 20000`],
    ["affiliates.bonus_unlocked",   `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS bonus_unlocked BOOLEAN DEFAULT FALSE`],
    ["affiliates.bonus_expires_at", `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS bonus_expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days'`],
    ["affiliates.last_active_at",   `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMPTZ DEFAULT NOW()`],
    ["affiliates.bank_holder",      `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS bank_holder TEXT`],
    ["affiliates.business_name",    `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS business_name TEXT`],
    ["affiliates.how_promote",      `ALTER TABLE affiliates ADD COLUMN IF NOT EXISTS how_promote TEXT`],
    // referral_clicks
    ["referral_clicks.ip_address",   `ALTER TABLE referral_clicks ADD COLUMN IF NOT EXISTS ip_address TEXT`],
    ["referral_clicks.user_agent",   `ALTER TABLE referral_clicks ADD COLUMN IF NOT EXISTS user_agent TEXT`],
    ["referral_clicks.landing_page", `ALTER TABLE referral_clicks ADD COLUMN IF NOT EXISTS landing_page TEXT`],
    ["referral_clicks.campaign",     `ALTER TABLE referral_clicks ADD COLUMN IF NOT EXISTS campaign TEXT`],
    // referral_leads
    ["referral_leads.ref_name",  `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS ref_name TEXT`],
    ["referral_leads.ref_email", `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS ref_email TEXT`],
    ["referral_leads.ref_phone", `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS ref_phone TEXT`],
    ["referral_leads.service",   `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS service TEXT`],
    ["referral_leads.notes",     `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS notes TEXT`],
    ["referral_leads.status",    `ALTER TABLE referral_leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new'`],
    // commissions
    ["commissions.lead_id",      `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS lead_id UUID`],
    ["commissions.service_name", `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS service_name TEXT`],
    ["commissions.deal_value",   `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS deal_value NUMERIC(12,2) DEFAULT 0`],
    ["commissions.rate",         `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS rate NUMERIC(5,2) DEFAULT 10`],
    ["commissions.amount",       `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS amount NUMERIC(12,2) DEFAULT 0`],
    ["commissions.type",         `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'one-time'`],
    ["commissions.status",       `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending'`],
    ["commissions.paid_at",      `ALTER TABLE commissions ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ`],
    // payout_requests
    ["payout_requests.bank_holder", `ALTER TABLE payout_requests ADD COLUMN IF NOT EXISTS bank_holder TEXT`],
    ["payout_requests.paid_at",     `ALTER TABLE payout_requests ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ`],
    // campaign_links
    ["campaign_links.service_slug", `ALTER TABLE campaign_links ADD COLUMN IF NOT EXISTS service_slug TEXT`],
    ["campaign_links.clicks",       `ALTER TABLE campaign_links ADD COLUMN IF NOT EXISTS clicks INT DEFAULT 0`],
  ];
  for (const [name, q] of migrations) await run(name, q);

  await run("idx_affiliates_email",  `CREATE INDEX IF NOT EXISTS idx_affiliates_email  ON affiliates(email)`);
  await run("idx_affiliates_code",   `CREATE INDEX IF NOT EXISTS idx_affiliates_code   ON affiliates(referral_code)`);
  await run("idx_clicks_affiliate",  `CREATE INDEX IF NOT EXISTS idx_clicks_affiliate  ON referral_clicks(affiliate_id)`);
  await run("idx_leads_affiliate",   `CREATE INDEX IF NOT EXISTS idx_leads_affiliate   ON referral_leads(affiliate_id)`);
  await run("idx_commissions_aff",   `CREATE INDEX IF NOT EXISTS idx_commissions_aff   ON commissions(affiliate_id)`);
  await run("idx_payouts_affiliate", `CREATE INDEX IF NOT EXISTS idx_payouts_affiliate ON payout_requests(affiliate_id)`);

  let existing: string[] = [];
  try {
    const rows = await sql.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('affiliates','referral_clicks','referral_leads','commissions','payout_requests','support_tickets')
      ORDER BY table_name
    `);
    existing = rows.map((r: Record<string, unknown>) => r.table_name as string);
  } catch (err) {
    errors.push(`verification: ${String(err)}`);
  }

  return NextResponse.json({
    ok: errors.length === 0,
    created,
    errors,
    tablesInDb: existing,
  });
}

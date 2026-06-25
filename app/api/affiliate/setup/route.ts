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

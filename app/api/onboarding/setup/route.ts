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

  await run("organisations", `
    CREATE TABLE IF NOT EXISTS organisations (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      product          TEXT NOT NULL,
      plan             TEXT NOT NULL,
      setup_fee        NUMERIC(12,2) NOT NULL,
      monthly_fee      NUMERIC(12,2) NOT NULL,
      org_name         TEXT NOT NULL,
      owner_name       TEXT NOT NULL,
      owner_email      TEXT NOT NULL,
      owner_phone      TEXT,
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
    )
  `);

  await run("onboarding_sessions", `
    CREATE TABLE IF NOT EXISTS onboarding_sessions (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      product     TEXT NOT NULL,
      step        INT NOT NULL DEFAULT 1,
      data        JSONB NOT NULL DEFAULT '{}',
      completed   BOOLEAN DEFAULT FALSE,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("waitlist", `
    CREATE TABLE IF NOT EXISTS waitlist (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      product     TEXT NOT NULL,
      email       TEXT NOT NULL,
      phone       TEXT,
      school_name TEXT,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("service_inquiries", `
    CREATE TABLE IF NOT EXISTS service_inquiries (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      phone       TEXT,
      service     TEXT,
      budget      TEXT,
      description TEXT,
      status      TEXT DEFAULT 'new',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("idx_orgs_subdomain", `CREATE INDEX IF NOT EXISTS idx_orgs_subdomain ON organisations(subdomain)`);
  await run("idx_orgs_email",     `CREATE INDEX IF NOT EXISTS idx_orgs_email     ON organisations(owner_email)`);
  await run("idx_orgs_product",   `CREATE INDEX IF NOT EXISTS idx_orgs_product   ON organisations(product)`);
  await run("idx_orgs_status",    `CREATE INDEX IF NOT EXISTS idx_orgs_status    ON organisations(status)`);

  // Verify what actually exists
  let existing: string[] = [];
  try {
    const rows = await sql.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('organisations','onboarding_sessions','waitlist','service_inquiries')
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

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// GET /api/content/setup
// Creates the jobs, job_applications, posts and case_studies tables.
// Safe to run multiple times (IF NOT EXISTS). Run once after deploy.
export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });
  }

  const sql = neon(process.env.DATABASE_URL);
  const created: string[] = [];
  const errors: string[] = [];

  // Neon http driver: one statement per call, no .unsafe(). Use sql.query(string).
  async function run(name: string, query: string) {
    try {
      await sql.query(query);
      created.push(name);
    } catch (err) {
      errors.push(`${name}: ${String(err)}`);
    }
  }

  await run("pgcrypto", `CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);

  await run("jobs", `
    CREATE TABLE IF NOT EXISTS jobs (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title       TEXT NOT NULL,
      department  TEXT,
      location    TEXT,
      type        TEXT,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'open',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("job_applications", `
    CREATE TABLE IF NOT EXISTS job_applications (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id     UUID REFERENCES jobs(id) ON DELETE CASCADE,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT,
      cv_url     TEXT,
      cover_note TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("posts", `
    CREATE TABLE IF NOT EXISTS posts (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title        TEXT NOT NULL,
      slug         TEXT UNIQUE NOT NULL,
      cover_image  TEXT,
      excerpt      TEXT,
      body         TEXT,
      author       TEXT,
      type         TEXT NOT NULL DEFAULT 'blog',
      status       TEXT NOT NULL DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("case_studies", `
    CREATE TABLE IF NOT EXISTS case_studies (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      client_name  TEXT NOT NULL,
      product      TEXT,
      slug         TEXT UNIQUE NOT NULL,
      cover_image  TEXT,
      challenge    TEXT,
      solution     TEXT,
      results      TEXT,
      status       TEXT NOT NULL DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("agency_services", `
    CREATE TABLE IF NOT EXISTS agency_services (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      slug          TEXT UNIQUE NOT NULL,
      label         TEXT NOT NULL,
      short_label   TEXT,
      number        TEXT,
      icon          TEXT,
      tier          TEXT,
      tagline       TEXT,
      description   TEXT,
      demo_slug     TEXT,
      price_from    TEXT,
      price_to      TEXT,
      price_alt     TEXT,
      price_monthly TEXT,
      delivery_note TEXT,
      highlight     BOOLEAN DEFAULT FALSE,
      features      JSONB DEFAULT '[]',
      best_for      JSONB DEFAULT '[]',
      status        TEXT NOT NULL DEFAULT 'published',
      sort_order    INT DEFAULT 0,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("desk_products", `
    CREATE TABLE IF NOT EXISTS desk_products (
      id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      product_key      TEXT UNIQUE NOT NULL,
      name             TEXT NOT NULL,
      tagline          TEXT,
      description      TEXT,
      status           TEXT NOT NULL DEFAULT 'live',
      color            TEXT DEFAULT '#8B5CF6',
      slug             TEXT UNIQUE NOT NULL,
      href             TEXT,
      get_started_href TEXT,
      icon             TEXT,
      features         JSONB DEFAULT '[]',
      domains          JSONB DEFAULT '[]',
      use_cases        JSONB DEFAULT '[]',
      sort_order       INT DEFAULT 0,
      created_at       TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("idx_jobs_status",      `CREATE INDEX IF NOT EXISTS idx_jobs_status      ON jobs(status)`);
  await run("idx_services_slug",    `CREATE INDEX IF NOT EXISTS idx_services_slug    ON agency_services(slug)`);
  await run("idx_products_slug",    `CREATE INDEX IF NOT EXISTS idx_products_slug    ON desk_products(slug)`);
  await run("idx_apps_job",         `CREATE INDEX IF NOT EXISTS idx_apps_job         ON job_applications(job_id)`);
  await run("idx_posts_status",     `CREATE INDEX IF NOT EXISTS idx_posts_status     ON posts(status)`);
  await run("idx_posts_slug",       `CREATE INDEX IF NOT EXISTS idx_posts_slug       ON posts(slug)`);
  await run("idx_cases_status",     `CREATE INDEX IF NOT EXISTS idx_cases_status     ON case_studies(status)`);
  await run("idx_cases_slug",       `CREATE INDEX IF NOT EXISTS idx_cases_slug       ON case_studies(slug)`);

  let existing: string[] = [];
  try {
    const rows = await sql.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('jobs','job_applications','posts','case_studies','agency_services','desk_products')
      ORDER BY table_name
    `);
    existing = rows.map((r: Record<string, unknown>) => r.table_name as string);
  } catch (err) {
    errors.push(`verification: ${String(err)}`);
  }

  return NextResponse.json({ ok: errors.length === 0, created, errors, tablesInDb: existing });
}

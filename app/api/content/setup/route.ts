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
      setup_price      BIGINT,
      monthly_price    BIGINT,
      price_note       TEXT,
      sort_order       INT DEFAULT 0,
      created_at       TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  // Migrations for existing databases (CREATE IF NOT EXISTS won't add new columns)
  await run("desk_products.setup_price",   `ALTER TABLE desk_products ADD COLUMN IF NOT EXISTS setup_price   BIGINT`);
  await run("desk_products.monthly_price", `ALTER TABLE desk_products ADD COLUMN IF NOT EXISTS monthly_price BIGINT`);
  await run("desk_products.price_note",    `ALTER TABLE desk_products ADD COLUMN IF NOT EXISTS price_note    TEXT`);

  await run("service_inquiries", `
    CREATE TABLE IF NOT EXISTS service_inquiries (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT,
      email         TEXT,
      phone         TEXT,
      business_name TEXT,
      service       TEXT,
      budget        TEXT,
      timeline      TEXT,
      message       TEXT,
      source        TEXT NOT NULL DEFAULT 'inquiry',
      meta          JSONB DEFAULT '{}',
      status        TEXT NOT NULL DEFAULT 'new',
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_inquiries_status", `CREATE INDEX IF NOT EXISTS idx_inquiries_status ON service_inquiries(status)`);
  await run("idx_inquiries_created", `CREATE INDEX IF NOT EXISTS idx_inquiries_created ON service_inquiries(created_at DESC)`);

  await run("site_content", `
    CREATE TABLE IF NOT EXISTS site_content (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("testimonials", `
    CREATE TABLE IF NOT EXISTS testimonials (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      quote       TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_role TEXT,
      company     TEXT,
      avatar_url  TEXT,
      rating      INT DEFAULT 5,
      status      TEXT NOT NULL DEFAULT 'published',
      sort_order  INT DEFAULT 0,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await run("watch_videos", `
    CREATE TABLE IF NOT EXISTS watch_videos (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      page_key    TEXT NOT NULL,
      title       TEXT NOT NULL,
      description TEXT,
      duration    TEXT,
      youtube_id  TEXT,
      coming_soon BOOLEAN DEFAULT FALSE,
      sort_order  INT DEFAULT 0,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_videos_page", `CREATE INDEX IF NOT EXISTS idx_videos_page ON watch_videos(page_key, sort_order)`);

  // ---- Staff / team (BDRs, sales reps) + their tasks and targets ----
  await run("staff", `
    CREATE TABLE IF NOT EXISTS staff (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT NOT NULL,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      role          TEXT NOT NULL DEFAULT 'bdr',
      phone         TEXT,
      active        BOOLEAN DEFAULT TRUE,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("staff_tasks", `
    CREATE TABLE IF NOT EXISTS staff_tasks (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_id    UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'todo',
      due_date    DATE,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("staff_targets", `
    CREATE TABLE IF NOT EXISTS staff_targets (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_id      UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
      label         TEXT NOT NULL,
      metric        TEXT,
      target_value  NUMERIC DEFAULT 0,
      current_value NUMERIC DEFAULT 0,
      period        TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_staff_tasks",   `CREATE INDEX IF NOT EXISTS idx_staff_tasks   ON staff_tasks(staff_id)`);
  await run("idx_staff_targets", `CREATE INDEX IF NOT EXISTS idx_staff_targets ON staff_targets(staff_id)`);

  // ---- Daily KPI tracking (BDR / sales outreach metrics) ----
  await run("kpi_entries", `
    CREATE TABLE IF NOT EXISTS kpi_entries (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_id        UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
      entry_date      DATE NOT NULL,
      messages_sent   INT DEFAULT 0,
      conversations   INT DEFAULT 0,
      qualified_leads INT DEFAULT 0,
      demos_booked    INT DEFAULT 0,
      follow_ups      INT DEFAULT 0,
      candidates_sourced INT DEFAULT 0,
      screens         INT DEFAULT 0,
      interviews      INT DEFAULT 0,
      offers          INT DEFAULT 0,
      hires           INT DEFAULT 0,
      created_at      TIMESTAMPTZ DEFAULT NOW(),
      updated_at      TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (staff_id, entry_date)
    )
  `);
  // Recruitment metric columns for existing databases
  await run("kpi.candidates_sourced", `ALTER TABLE kpi_entries ADD COLUMN IF NOT EXISTS candidates_sourced INT DEFAULT 0`);
  await run("kpi.screens",    `ALTER TABLE kpi_entries ADD COLUMN IF NOT EXISTS screens    INT DEFAULT 0`);
  await run("kpi.interviews", `ALTER TABLE kpi_entries ADD COLUMN IF NOT EXISTS interviews INT DEFAULT 0`);
  await run("kpi.offers",     `ALTER TABLE kpi_entries ADD COLUMN IF NOT EXISTS offers     INT DEFAULT 0`);
  await run("kpi.hires",      `ALTER TABLE kpi_entries ADD COLUMN IF NOT EXISTS hires      INT DEFAULT 0`);
  await run("idx_kpi_staff_date", `CREATE INDEX IF NOT EXISTS idx_kpi_staff_date ON kpi_entries(staff_id, entry_date DESC)`);

  // ---- Team / staff (BDRs, marketers) with role-based access ----
  await run("staff", `
    CREATE TABLE IF NOT EXISTS staff (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name          TEXT NOT NULL,
      email         TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role          TEXT NOT NULL DEFAULT 'bdr',
      phone         TEXT,
      active        BOOLEAN DEFAULT TRUE,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("staff_tasks", `
    CREATE TABLE IF NOT EXISTS staff_tasks (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_id    UUID REFERENCES staff(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      description TEXT,
      status      TEXT NOT NULL DEFAULT 'todo',
      due_date    DATE,
      created_at  TIMESTAMPTZ DEFAULT NOW(),
      updated_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("staff_targets", `
    CREATE TABLE IF NOT EXISTS staff_targets (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      staff_id      UUID REFERENCES staff(id) ON DELETE CASCADE,
      label         TEXT NOT NULL,
      metric        TEXT,
      target_value  NUMERIC DEFAULT 0,
      current_value NUMERIC DEFAULT 0,
      period        TEXT,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_tasks_staff",   `CREATE INDEX IF NOT EXISTS idx_tasks_staff   ON staff_tasks(staff_id, status)`);
  await run("idx_targets_staff", `CREATE INDEX IF NOT EXISTS idx_targets_staff ON staff_targets(staff_id)`);

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
      AND table_name IN ('jobs','job_applications','posts','case_studies','agency_services','desk_products','service_inquiries','site_content','testimonials','watch_videos')
      ORDER BY table_name
    `);
    existing = rows.map((r: Record<string, unknown>) => r.table_name as string);
  } catch (err) {
    errors.push(`verification: ${String(err)}`);
  }

  return NextResponse.json({ ok: errors.length === 0, created, errors, tablesInDb: existing });
}

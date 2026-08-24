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

  // Defensive backfill: every column above was written straight into
  // CREATE TABLE with no ALTER backup, so any database where this table
  // already existed before a given column was added to the code never
  // got it (CREATE TABLE IF NOT EXISTS is a no-op once the table exists,
  // regardless of column differences -- confirmed by a real "column source
  // does not exist" error on a pre-existing database). Making every base
  // column explicitly additive closes that gap for good.
  await run("inquiries.name",          `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS name TEXT`);
  await run("inquiries.email",         `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS email TEXT`);
  await run("inquiries.phone",         `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS phone TEXT`);
  await run("inquiries.business_name", `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS business_name TEXT`);
  await run("inquiries.service",       `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS service TEXT`);
  await run("inquiries.budget",        `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS budget TEXT`);
  await run("inquiries.timeline",      `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS timeline TEXT`);
  await run("inquiries.message",       `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS message TEXT`);
  await run("inquiries.source",        `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'inquiry'`);
  await run("inquiries.meta",          `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS meta JSONB DEFAULT '{}'`);
  await run("inquiries.status",        `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'`);
  await run("inquiries.created_at",    `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW()`);

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

  // ---- Newsletter signups (homepage footer) ----
  await run("newsletter_subscribers", `
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email        TEXT UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

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
  // Batch 03: staff_tasks becomes reusable for lead-scoped follow-ups
  // (nullable lead_id keeps existing personal staff tasks working unchanged).
  // service_inquiries becomes the real Leads entity -- additive only, `name`
  // stays intact for the public website's existing insert; first_name/last_name
  // are used by CRM-created leads. Placed here (not earlier) because these
  // columns/tables reference staff(id), which must exist first.
  await run("leads.first_name",      `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS first_name TEXT`);
  await run("leads.last_name",       `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS last_name TEXT`);
  await run("leads.owner_staff_id",  `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS owner_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL`);
  await run("leads.industry",        `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS industry TEXT`);
  await run("leads.employees",       `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS employees TEXT`);
  await run("leads.website",         `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS website TEXT`);
  await run("leads.tags",            `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'`);
  await run("leads.next_follow_up",  `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS next_follow_up TIMESTAMPTZ`);
  await run("leads.converted_at",    `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS converted_at TIMESTAMPTZ`);
  await run("leads.conversion_data", `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS conversion_data JSONB`);
  await run("idx_leads_owner",  `CREATE INDEX IF NOT EXISTS idx_leads_owner ON service_inquiries(owner_staff_id)`);
  await run("idx_leads_source", `CREATE INDEX IF NOT EXISTS idx_leads_source ON service_inquiries(source)`);

  // Lead timeline -- created/email/call/note/status_change events. A "note"
  // is simply an activity of type 'note', so Notes and Activity share one model.
  // Batch 04 (CRM -- Opportunities & Sales). New entity: a lead converts
  // into a real opportunity here (see /api/leads/[id]/convert, which both
  // sets conversion_data on the lead AND creates the row below).
  await run("opportunities", `
    CREATE TABLE IF NOT EXISTS opportunities (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id             UUID REFERENCES service_inquiries(id) ON DELETE SET NULL,
      name                TEXT NOT NULL,
      customer_name       TEXT NOT NULL,
      contact_name        TEXT,
      contact_email       TEXT,
      contact_phone       TEXT,
      industry            TEXT,
      company_size        TEXT,
      location            TEXT,
      pipeline            TEXT NOT NULL DEFAULT 'New Business Pipeline',
      stage               TEXT NOT NULL DEFAULT 'Qualification',
      probability         INT DEFAULT 50,
      estimated_value     NUMERIC(14,2) DEFAULT 0,
      expected_close_date DATE,
      actual_value        NUMERIC(14,2),
      won_date            DATE,
      close_reason        TEXT,
      source              TEXT,
      owner_staff_id      UUID REFERENCES staff(id) ON DELETE SET NULL,
      description         TEXT,
      tags                JSONB DEFAULT '[]',
      products            JSONB DEFAULT '[]',
      status              TEXT NOT NULL DEFAULT 'open',
      project_requested   BOOLEAN DEFAULT FALSE,
      created_at          TIMESTAMPTZ DEFAULT NOW(),
      updated_at          TIMESTAMPTZ DEFAULT NOW(),
      closed_at           TIMESTAMPTZ
    )
  `);
  await run("idx_opportunities_stage",  `CREATE INDEX IF NOT EXISTS idx_opportunities_stage ON opportunities(stage)`);
  await run("idx_opportunities_owner",  `CREATE INDEX IF NOT EXISTS idx_opportunities_owner ON opportunities(owner_staff_id)`);
  await run("idx_opportunities_status", `CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status)`);

  await run("lead_activities", `
    CREATE TABLE IF NOT EXISTS lead_activities (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      lead_id        UUID NOT NULL REFERENCES service_inquiries(id) ON DELETE CASCADE,
      type           TEXT NOT NULL DEFAULT 'note',
      title          TEXT NOT NULL,
      body           TEXT,
      actor_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      created_at     TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_lead_activities_lead", `CREATE INDEX IF NOT EXISTS idx_lead_activities_lead ON lead_activities(lead_id, created_at DESC)`);

  // Batch 04: lead_activities becomes dual-purpose (leads AND opportunities)
  // rather than building a parallel opportunity_activities table -- same
  // reuse pattern as staff_tasks.lead_id in Batch 03. The name stays
  // "lead_activities" (renaming an existing table is avoided) but an
  // activity now has exactly one of lead_id / opportunity_id set.
  await run("lead_activities.opportunity_id", `ALTER TABLE lead_activities ADD COLUMN IF NOT EXISTS opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE`);
  await run("lead_activities.lead_id_nullable", `ALTER TABLE lead_activities ALTER COLUMN lead_id DROP NOT NULL`);
  await run("idx_lead_activities_opportunity", `CREATE INDEX IF NOT EXISTS idx_lead_activities_opportunity ON lead_activities(opportunity_id, created_at DESC)`);

  await run("staff_tasks.lead_id",  `ALTER TABLE staff_tasks ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES service_inquiries(id) ON DELETE CASCADE`);
  await run("staff_tasks.priority", `ALTER TABLE staff_tasks ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium'`);
  await run("idx_staff_tasks_lead", `CREATE INDEX IF NOT EXISTS idx_staff_tasks_lead ON staff_tasks(lead_id)`);

  // Batch 04: same reuse pattern for opportunity-scoped follow-up tasks.
  await run("staff_tasks.opportunity_id", `ALTER TABLE staff_tasks ADD COLUMN IF NOT EXISTS opportunity_id UUID REFERENCES opportunities(id) ON DELETE CASCADE`);
  await run("idx_staff_tasks_opportunity", `CREATE INDEX IF NOT EXISTS idx_staff_tasks_opportunity ON staff_tasks(opportunity_id)`);
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

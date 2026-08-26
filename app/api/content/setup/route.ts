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

  // Batch 05 (Proposal System). Line items/deliverables are stored as JSONB
  // rather than separate line-item tables -- each proposal customizes its own
  // set (per the wireframe's Add Offerings / Pricing steps), and nothing else
  // in the platform needs to query into individual line items relationally.
  // access_token secures the public client-facing accept page on jktl-website
  // (jktl.com.ng/proposal/[token]) -- admin.jktl.com.ng is internal-only by
  // design, so the client never logs into it to view/accept a proposal.
  await run("proposals", `
    CREATE TABLE IF NOT EXISTS proposals (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      proposal_number     TEXT UNIQUE NOT NULL,
      opportunity_id      UUID REFERENCES opportunities(id) ON DELETE SET NULL,
      customer_name       TEXT NOT NULL,
      contact_name        TEXT,
      contact_email       TEXT,
      name                TEXT NOT NULL,
      currency            TEXT NOT NULL DEFAULT 'NGN',
      valid_until         DATE,
      prepared_by_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      notes_internal      TEXT,
      line_items          JSONB DEFAULT '[]',
      client_note         TEXT,
      subtotal            NUMERIC(14,2) DEFAULT 0,
      discount_total      NUMERIC(14,2) DEFAULT 0,
      tax_pct             NUMERIC(5,2) DEFAULT 0,
      total               NUMERIC(14,2) DEFAULT 0,
      deliverables        JSONB DEFAULT '[]',
      start_date          DATE,
      duration_weeks      INT,
      end_date            DATE,
      payment_terms       TEXT,
      maintenance_terms   TEXT,
      status              TEXT NOT NULL DEFAULT 'draft',
      sent_to             JSONB DEFAULT '[]',
      sent_cc             JSONB DEFAULT '[]',
      sent_subject        TEXT,
      sent_message         TEXT,
      sent_at             TIMESTAMPTZ,
      request_acceptance  BOOLEAN DEFAULT TRUE,
      expiry_date         DATE,
      access_token        TEXT UNIQUE,
      accepted_at         TIMESTAMPTZ,
      accepted_by_name    TEXT,
      declined_at         TIMESTAMPTZ,
      decline_reason      TEXT,
      owner_staff_id      UUID REFERENCES staff(id) ON DELETE SET NULL,
      created_at          TIMESTAMPTZ DEFAULT NOW(),
      updated_at          TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_proposals_status",      `CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status)`);
  await run("idx_proposals_opportunity", `CREATE INDEX IF NOT EXISTS idx_proposals_opportunity ON proposals(opportunity_id)`);
  await run("idx_proposals_token",       `CREATE INDEX IF NOT EXISTS idx_proposals_token ON proposals(access_token)`);

  // Batch 06 (Customers / Customer 360). `customers` is the top-level CRM
  // account -- distinct from `organisations` (product-tenant purchases,
  // owned by /api/onboarding/setup). A customer can have multiple
  // `businesses` (subsidiaries/divisions, per the wireframe's "TechNova Ltd
  // has 2 businesses") and multiple `customer_contacts`. `organisations`,
  // `opportunities`, `proposals` and `lead_activities` all get an additive
  // nullable customer_id link -- real relationships, not text-matching.
  await run("customers", `
    CREATE TABLE IF NOT EXISTS customers (
      id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_number       TEXT UNIQUE NOT NULL,
      name                  TEXT NOT NULL,
      status                TEXT NOT NULL DEFAULT 'active',
      rating                INT DEFAULT 0,
      primary_contact_name  TEXT,
      primary_contact_role  TEXT,
      primary_contact_email TEXT,
      primary_contact_phone TEXT,
      location              TEXT,
      customer_since        DATE DEFAULT NOW(),
      owner_staff_id        UUID REFERENCES staff(id) ON DELETE SET NULL,
      opportunity_id        UUID REFERENCES opportunities(id) ON DELETE SET NULL,
      notes_internal        TEXT,
      created_at            TIMESTAMPTZ DEFAULT NOW(),
      updated_at            TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_customers_status", `CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status)`);
  await run("idx_customers_owner",  `CREATE INDEX IF NOT EXISTS idx_customers_owner ON customers(owner_staff_id)`);

  await run("businesses", `
    CREATE TABLE IF NOT EXISTS businesses (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      name        TEXT NOT NULL,
      is_primary  BOOLEAN DEFAULT FALSE,
      industry    TEXT,
      employees   TEXT,
      website     TEXT,
      status      TEXT NOT NULL DEFAULT 'active',
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_businesses_customer", `CREATE INDEX IF NOT EXISTS idx_businesses_customer ON businesses(customer_id)`);

  await run("customer_contacts", `
    CREATE TABLE IF NOT EXISTS customer_contacts (
      id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      name        TEXT NOT NULL,
      position    TEXT,
      email       TEXT,
      phone       TEXT,
      is_primary  BOOLEAN DEFAULT FALSE,
      created_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_customer_contacts_customer", `CREATE INDEX IF NOT EXISTS idx_customer_contacts_customer ON customer_contacts(customer_id)`);

  await run("opportunities.customer_id",   `ALTER TABLE opportunities ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL`);
  await run("leads.customer_id",           `ALTER TABLE service_inquiries ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL`);
  await run("proposals.customer_id",       `ALTER TABLE proposals ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL`);
  await run("lead_activities.customer_id", `ALTER TABLE lead_activities ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE CASCADE`);
  await run("idx_lead_activities_customer", `CREATE INDEX IF NOT EXISTS idx_lead_activities_customer ON lead_activities(customer_id, created_at DESC)`);
  // Defensive: organisations is owned by /api/onboarding/setup, which may not
  // have run yet on a brand-new database -- this is non-fatal (shows in the
  // errors array) and resolves once both setup endpoints have been run.
  await run("organisations.customer_id", `ALTER TABLE organisations ADD COLUMN IF NOT EXISTS customer_id UUID REFERENCES customers(id) ON DELETE SET NULL`);

  // Batch 07 (Projects). New entity, but wired to consume the intent flags
  // every prior batch left for it: Batch 04's opportunities.project_requested,
  // Batch 05's proposal-accepted "Create Project" step, and Batch 06's
  // customer_id link -- a project can trace back to the deal that created it.
  await run("projects", `
    CREATE TABLE IF NOT EXISTS projects (
      id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_number           TEXT UNIQUE NOT NULL,
      name                     TEXT NOT NULL,
      customer_id              UUID REFERENCES customers(id) ON DELETE SET NULL,
      opportunity_id           UUID REFERENCES opportunities(id) ON DELETE SET NULL,
      proposal_id              UUID REFERENCES proposals(id) ON DELETE SET NULL,
      type                     TEXT NOT NULL DEFAULT 'website',
      status                   TEXT NOT NULL DEFAULT 'not_started',
      start_date               DATE,
      due_date                 DATE,
      completed_at             TIMESTAMPTZ,
      project_manager_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      description              TEXT,
      project_value            NUMERIC(14,2) DEFAULT 0,
      paid_amount              NUMERIC(14,2) DEFAULT 0,
      currency                 TEXT NOT NULL DEFAULT 'NGN',
      created_at               TIMESTAMPTZ DEFAULT NOW(),
      updated_at               TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_projects_status",   `CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status)`);
  await run("idx_projects_customer", `CREATE INDEX IF NOT EXISTS idx_projects_customer ON projects(customer_id)`);
  await run("idx_projects_pm",       `CREATE INDEX IF NOT EXISTS idx_projects_pm ON projects(project_manager_staff_id)`);

  await run("project_milestones", `
    CREATE TABLE IF NOT EXISTS project_milestones (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      name         TEXT NOT NULL,
      description  TEXT,
      start_date   DATE,
      due_date     DATE,
      status       TEXT NOT NULL DEFAULT 'not_started',
      progress_pct INT DEFAULT 0,
      sort_order   INT DEFAULT 0,
      created_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_milestones_project", `CREATE INDEX IF NOT EXISTS idx_milestones_project ON project_milestones(project_id, sort_order)`);

  await run("project_team_members", `
    CREATE TABLE IF NOT EXISTS project_team_members (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      staff_id     UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
      project_role TEXT,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE(project_id, staff_id)
    )
  `);
  await run("idx_team_project", `CREATE INDEX IF NOT EXISTS idx_team_project ON project_team_members(project_id)`);

  // Same reuse pattern established in Batch 03/04/06 -- staff_tasks and
  // lead_activities become project-aware too, rather than new parallel tables.
  await run("staff_tasks.project_id",      `ALTER TABLE staff_tasks ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE CASCADE`);
  await run("idx_staff_tasks_project",     `CREATE INDEX IF NOT EXISTS idx_staff_tasks_project ON staff_tasks(project_id)`);
  await run("lead_activities.project_id",  `ALTER TABLE lead_activities ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE CASCADE`);
  await run("idx_lead_activities_project", `CREATE INDEX IF NOT EXISTS idx_lead_activities_project ON lead_activities(project_id, created_at DESC)`);

  // Batch 08 (Project Collaboration & Delivery). Designs (Sheet 2) are just
  // project_files filtered by category='designs', rendered as a grid instead
  // of a table -- not a second table. Messages/Activity (Sheets 7/8) reuse
  // lead_activities a fifth time (type='message' for the chat thread,
  // everything else for the system event log) -- see JKTL_CODEBASE_MAP.md.
  await run("project_files", `
    CREATE TABLE IF NOT EXISTS project_files (
      id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id        UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      name              TEXT NOT NULL,
      category          TEXT NOT NULL DEFAULT 'other',
      design_type       TEXT,
      file_type         TEXT,
      file_url          TEXT NOT NULL,
      size_bytes        BIGINT,
      uploaded_by_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      created_at        TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_project_files_project", `CREATE INDEX IF NOT EXISTS idx_project_files_project ON project_files(project_id, created_at DESC)`);

  await run("project_feedback", `
    CREATE TABLE IF NOT EXISTS project_feedback (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      file_id      UUID REFERENCES project_files(id) ON DELETE SET NULL,
      title        TEXT NOT NULL,
      body         TEXT NOT NULL,
      author_name  TEXT NOT NULL,
      author_type  TEXT NOT NULL DEFAULT 'client',
      status       TEXT NOT NULL DEFAULT 'open',
      logged_by_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      created_at   TIMESTAMPTZ DEFAULT NOW(),
      updated_at   TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_feedback_project", `CREATE INDEX IF NOT EXISTS idx_feedback_project ON project_feedback(project_id, created_at DESC)`);

  await run("project_feedback_replies", `
    CREATE TABLE IF NOT EXISTS project_feedback_replies (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      feedback_id    UUID NOT NULL REFERENCES project_feedback(id) ON DELETE CASCADE,
      body           TEXT NOT NULL,
      author_name    TEXT NOT NULL,
      author_type    TEXT NOT NULL DEFAULT 'staff',
      author_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      created_at     TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_feedback_replies_feedback", `CREATE INDEX IF NOT EXISTS idx_feedback_replies_feedback ON project_feedback_replies(feedback_id, created_at ASC)`);

  await run("project_approvals", `
    CREATE TABLE IF NOT EXISTS project_approvals (
      id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id          UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      item_name           TEXT NOT NULL,
      type                TEXT NOT NULL DEFAULT 'design',
      submitted_by_staff_id UUID REFERENCES staff(id) ON DELETE SET NULL,
      status              TEXT NOT NULL DEFAULT 'pending',
      notes               TEXT,
      submitted_at        TIMESTAMPTZ DEFAULT NOW(),
      reviewed_at         TIMESTAMPTZ
    )
  `);
  await run("idx_approvals_project", `CREATE INDEX IF NOT EXISTS idx_approvals_project ON project_approvals(project_id, submitted_at DESC)`);

  await run("project_handover_items", `
    CREATE TABLE IF NOT EXISTS project_handover_items (
      id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      task       TEXT NOT NULL,
      status     TEXT NOT NULL DEFAULT 'pending',
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
  await run("idx_handover_project", `CREATE INDEX IF NOT EXISTS idx_handover_project ON project_handover_items(project_id, sort_order)`);

  await run("projects.target_handover_date", `ALTER TABLE projects ADD COLUMN IF NOT EXISTS target_handover_date DATE`);
  await run("projects.handover_to",          `ALTER TABLE projects ADD COLUMN IF NOT EXISTS handover_to TEXT`);
  await run("projects.client_contact",       `ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_contact TEXT`);
  await run("projects.handover_notes",       `ALTER TABLE projects ADD COLUMN IF NOT EXISTS handover_notes TEXT`);
  await run("projects.handover_status",      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS handover_status TEXT NOT NULL DEFAULT 'not_ready'`);
  await run("projects.client_rating",        `ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_rating INT`);
  await run("projects.client_feedback",      `ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_feedback TEXT`);

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

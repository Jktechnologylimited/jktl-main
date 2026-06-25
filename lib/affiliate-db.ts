import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL || "";
export const sql = DATABASE_URL ? neon(DATABASE_URL) : null as any;

// Run once to set up schema: GET /api/affiliate/setup
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
  bank_name     TEXT,
  bank_account  TEXT,
  bank_holder   TEXT,
  signup_bonus  NUMERIC(12,2) NOT NULL DEFAULT 20000,
  bonus_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  bonus_expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '90 days',
  last_active_at TIMESTAMPTZ DEFAULT NOW(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referral_clicks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  ip_address    TEXT,
  user_agent    TEXT,
  landing_page  TEXT,
  campaign      TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS referral_leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  ref_name      TEXT,
  ref_email     TEXT,
  ref_phone     TEXT,
  service       TEXT,
  notes         TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS commissions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  lead_id       UUID REFERENCES referral_leads(id),
  service_name  TEXT NOT NULL,
  deal_value    NUMERIC(12,2) NOT NULL DEFAULT 0,
  rate          NUMERIC(5,2)  NOT NULL DEFAULT 10,
  amount        NUMERIC(12,2) NOT NULL DEFAULT 0,
  type          TEXT NOT NULL DEFAULT 'one-time',
  status        TEXT NOT NULL DEFAULT 'pending',
  paid_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payout_requests (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  amount        NUMERIC(12,2) NOT NULL,
  status        TEXT NOT NULL DEFAULT 'requested',
  bank_name     TEXT,
  bank_account  TEXT,
  bank_holder   TEXT,
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

CREATE TABLE IF NOT EXISTS campaign_links (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id  UUID REFERENCES affiliates(id) ON DELETE CASCADE,
  label         TEXT NOT NULL,
  campaign      TEXT NOT NULL,
  service_slug  TEXT,
  clicks        INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS password_resets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL,
  token         TEXT UNIQUE NOT NULL,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clicks_aff      ON referral_clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_leads_aff       ON referral_leads(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_commissions_aff ON commissions(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_affiliates_email ON affiliates(email);
`;

//  QUERY HELPERS 

export async function getAffiliateByEmail(email: string) {
  const rows = await sql`SELECT * FROM affiliates WHERE email = ${email} LIMIT 1`;
  return rows[0] || null;
}

export async function getAffiliateById(id: string) {
  const rows = await sql`SELECT * FROM affiliates WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function getAffiliateByCode(code: string) {
  const rows = await sql`SELECT * FROM affiliates WHERE referral_code = ${code} LIMIT 1`;
  return rows[0] || null;
}

export async function getDashboardStats(affiliateId: string) {
  const [clicks, leads, commissions, affiliate] = await Promise.all([
    sql`SELECT COUNT(*) as total FROM referral_clicks WHERE affiliate_id = ${affiliateId}`,
    sql`SELECT COUNT(*) as total FROM referral_leads WHERE affiliate_id = ${affiliateId}`,
    sql`
      SELECT
        COALESCE(SUM(CASE WHEN status = 'pending'  THEN amount ELSE 0 END), 0) as pending,
        COALESCE(SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END), 0) as approved,
        COALESCE(SUM(CASE WHEN status = 'paid'     THEN amount ELSE 0 END), 0) as paid,
        COALESCE(SUM(amount), 0) as total
      FROM commissions WHERE affiliate_id = ${affiliateId}
    `,
    sql`SELECT signup_bonus, bonus_unlocked, bonus_expires_at, last_active_at FROM affiliates WHERE id = ${affiliateId} LIMIT 1`,
  ]);

  const aff = affiliate[0];
  const bonusExpired = aff?.bonus_expires_at ? new Date(aff.bonus_expires_at) < new Date() : false;
  const bonusAmount = aff?.bonus_unlocked ? Number(aff.signup_bonus) : 0;
  const approvedBase = Number(commissions[0]?.approved || 0);

  // Bonus adds to approved balance only after first referral closes
  const availableForPayout = approvedBase + bonusAmount;

  return {
    clicks:             Number(clicks[0]?.total || 0),
    leads:              Number(leads[0]?.total || 0),
    pending:            Number(commissions[0]?.pending || 0),
    approved:           approvedBase,
    paid:               Number(commissions[0]?.paid || 0),
    totalEarned:        Number(commissions[0]?.total || 0),
    signupBonus:        Number(aff?.signup_bonus || 20000),
    bonusUnlocked:      Boolean(aff?.bonus_unlocked),
    bonusExpired,
    bonusExpiresAt:     aff?.bonus_expires_at || null,
    availableForPayout,
  };
}

export async function getRecentActivity(affiliateId: string) {
  const [clicks, commissions] = await Promise.all([
    sql`SELECT 'click' as type, created_at, landing_page as detail FROM referral_clicks WHERE affiliate_id = ${affiliateId} ORDER BY created_at DESC LIMIT 5`,
    sql`SELECT 'commission' as type, created_at, service_name as detail, amount, status FROM commissions WHERE affiliate_id = ${affiliateId} ORDER BY created_at DESC LIMIT 5`,
  ]);
  return [...clicks, ...commissions].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 8);
}

export async function getMonthlyEarnings(affiliateId: string) {
  return sql`
    SELECT
      TO_CHAR(created_at, 'Mon YYYY') as month,
      DATE_TRUNC('month', created_at) as month_date,
      SUM(amount) as total
    FROM commissions
    WHERE affiliate_id = ${affiliateId}
    GROUP BY month, month_date
    ORDER BY month_date DESC
    LIMIT 12
  `;
}

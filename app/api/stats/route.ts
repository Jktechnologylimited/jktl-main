import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // Default stats for when DB is not connected
  const defaults = {
    orgsActive: 0,
    faithdeskClients: 0,
    detaildeskClients: 0,
    totalMrr: 0,
    affiliatesActive: 0,
  };

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(defaults);
  }

  try {
    const { sql } = await import("@/lib/db");
    const [orgs, affiliates] = await Promise.all([
      sql`
        SELECT
          COUNT(*) FILTER (WHERE status = 'active') as active,
          COUNT(*) FILTER (WHERE product = 'faithdesk' AND status = 'active') as faithdesk,
          COUNT(*) FILTER (WHERE product = 'detaildesk' AND status = 'active') as detaildesk,
          COALESCE(SUM(CASE WHEN status = 'active' THEN monthly_fee ELSE 0 END), 0) as mrr
        FROM organisations
      `,
      sql`SELECT COUNT(*) FILTER (WHERE status = 'active') as active FROM affiliates`,
    ]);

    return NextResponse.json({
      orgsActive:        Number(orgs[0]?.active || 0),
      faithdeskClients:  Number(orgs[0]?.faithdesk || 0),
      detaildeskClients: Number(orgs[0]?.detaildesk || 0),
      totalMrr:          Number(orgs[0]?.mrr || 0),
      affiliatesActive:  Number(affiliates[0]?.active || 0),
    });
  } catch {
    return NextResponse.json(defaults);
  }
}

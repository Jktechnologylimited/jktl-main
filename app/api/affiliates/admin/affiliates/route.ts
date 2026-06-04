import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


function checkAdmin(req: NextRequest) {
  const key = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key");
  return key === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const affiliates = await sql`
    SELECT
      a.*,
      COUNT(DISTINCT rc.id) as total_clicks,
      COUNT(DISTINCT rl.id) as total_leads,
      COALESCE(SUM(CASE WHEN c.status = 'pending'  THEN c.amount ELSE 0 END), 0) as pending_commission,
      COALESCE(SUM(CASE WHEN c.status = 'approved' THEN c.amount ELSE 0 END), 0) as approved_commission,
      COALESCE(SUM(CASE WHEN c.status = 'paid'     THEN c.amount ELSE 0 END), 0) as paid_commission
    FROM affiliates a
    LEFT JOIN referral_clicks rc ON rc.affiliate_id = a.id
    LEFT JOIN referral_leads  rl ON rl.affiliate_id = a.id
    LEFT JOIN commissions      c ON c.affiliate_id  = a.id
    GROUP BY a.id
    ORDER BY a.created_at DESC
  `;

  return NextResponse.json({ affiliates });
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { sql, getDashboardStats, getRecentActivity, getMonthlyEarnings } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.status !== "active") return NextResponse.json({ error: "Account not active" }, { status: 403 });

  const [stats, activity, monthlyEarnings, commissions, leads, clicks] = await Promise.all([
    getDashboardStats(session.id),
    getRecentActivity(session.id),
    getMonthlyEarnings(session.id),
    sql`SELECT * FROM commissions WHERE affiliate_id = ${session.id} ORDER BY created_at DESC LIMIT 50`,
    sql`SELECT * FROM referral_leads WHERE affiliate_id = ${session.id} ORDER BY created_at DESC LIMIT 50`,
    sql`SELECT DATE(created_at) as date, COUNT(*) as count FROM referral_clicks WHERE affiliate_id = ${session.id} GROUP BY DATE(created_at) ORDER BY date DESC LIMIT 30`,
  ]);

  return NextResponse.json({ stats, activity, monthlyEarnings, commissions, leads, clicks });
}

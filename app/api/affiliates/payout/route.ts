import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { sql, getDashboardStats } from "@/lib/affiliate-db";
import { PAYOUT } from "@/lib/affiliate-offers";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = await getDashboardStats(session.id);
  const available = stats.availableForPayout;

  if (available < PAYOUT.minimum) {
    return NextResponse.json({
      error: `Minimum payout is ₦${PAYOUT.minimum.toLocaleString()}. You have ₦${available.toLocaleString()} available.`,
    }, { status: 400 });
  }

  // Check bonus not expired
  if (!stats.bonusUnlocked && stats.bonusExpired) {
    return NextResponse.json({
      error: "Your signup bonus has expired (90 days without a referral). Your earned commissions are still available.",
    }, { status: 400 });
  }

  const { bankName, bankAccount, bankHolder } = await req.json();
  if (!bankName || !bankAccount || !bankHolder) {
    return NextResponse.json({ error: "Bank details are required for payout" }, { status: 400 });
  }

  await sql`
    INSERT INTO payout_requests (affiliate_id, amount, bank_name, bank_account, bank_holder)
    VALUES (${session.id}, ${available}, ${bankName}, ${bankAccount}, ${bankHolder})
  `;

  // Update last active
  await sql`UPDATE affiliates SET last_active_at = NOW() WHERE id = ${session.id}`;

  return NextResponse.json({ ok: true, amount: available });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payouts = await sql`
    SELECT * FROM payout_requests WHERE affiliate_id = ${session.id} ORDER BY created_at DESC
  `;
  return NextResponse.json({ payouts });
}

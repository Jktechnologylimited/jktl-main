import { NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { getAffiliateById, getDashboardStats } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";


export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const affiliate = await getAffiliateById(session.id);
  if (!affiliate) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const stats = await getDashboardStats(session.id);

  return NextResponse.json({
    id: affiliate.id,
    firstName: affiliate.first_name,
    lastName: affiliate.last_name,
    email: affiliate.email,
    phone: affiliate.phone,
    businessName: affiliate.business_name,
    referralCode: affiliate.referral_code,
    tier: affiliate.tier,
    status: affiliate.status,
    createdAt: affiliate.created_at,
    bankName: affiliate.bank_name,
    bankAccount: affiliate.bank_account,
    bankHolder: affiliate.bank_holder,
    stats,
  });
}

import { NextResponse } from "next/server";
import { getSession } from "@/lib/affiliate-auth";
import { getAffiliateByEmail } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";

// Standalone affiliate session: reads the jktl_aff_token cookie (set at login).
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false });
  }

  // Re-read the live record so status changes (approval/suspension) take effect.
  try {
    const aff = await getAffiliateByEmail(session.email.toLowerCase().trim());
    if (!aff) {
      return NextResponse.json({ authenticated: true, email: session.email, isAffiliate: false });
    }
    return NextResponse.json({
      authenticated: true,
      email: aff.email,
      isAffiliate: true,
      status: aff.status,
      firstName: aff.first_name,
      lastName: aff.last_name,
      referralCode: aff.referral_code,
      tier: aff.tier,
    });
  } catch {
    // Fall back to token contents if the lookup fails
    return NextResponse.json({
      authenticated: true,
      email: session.email,
      isAffiliate: true,
      status: session.status,
      firstName: session.firstName,
      lastName: session.lastName,
      referralCode: session.referralCode,
      tier: session.tier,
    });
  }
}

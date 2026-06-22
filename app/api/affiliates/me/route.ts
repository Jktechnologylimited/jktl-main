import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/affiliate-db";
import { getSsoSession } from "@/lib/sso";

export const dynamic = "force-dynamic";

// Reads the shared JKTL SSO session and returns the matching affiliate record.
export async function GET(req: NextRequest) {
  const hasCookie =
    req.cookies.get("jktl-session-token")?.value ||
    req.cookies.get("__Secure-jktl-session-token")?.value ||
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value;

  if (!hasCookie) {
    return NextResponse.json({ authenticated: false, reason: "no_cookie" });
  }

  const session = await getSsoSession(req);
  if (!session?.email) {
    // Cookie present but undecodable — almost always an AUTH_SECRET mismatch
    // between this app and accounts.jktl.com.ng.
    return NextResponse.json({ authenticated: true, hasSession: true, reason: "cant_read_email" });
  }

  const email = session.email.trim().toLowerCase();

  try {
    const rows = await sql`SELECT id, first_name, last_name, email, referral_code, tier, status FROM affiliates WHERE email = ${email} LIMIT 1`;
    const aff = rows[0];
    if (!aff) return NextResponse.json({ authenticated: true, email, isAffiliate: false });

    return NextResponse.json({
      authenticated: true,
      email,
      isAffiliate: true,
      status: aff.status,
      firstName: aff.first_name,
      lastName: aff.last_name,
      referralCode: aff.referral_code,
      tier: aff.tier,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: true, email, error: String(err) });
  }
}

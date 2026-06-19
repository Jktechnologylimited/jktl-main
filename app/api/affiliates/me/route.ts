import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";

// Client-side session check for affiliates
// Reads the JKTL session cookie and returns affiliate record
export async function GET(req: NextRequest) {
  const cookies = req.cookies;

  const sessionCookie =
    cookies.get("jktl-session-token")?.value ||
    cookies.get("authjs.session-token")?.value ||
    cookies.get("next-auth.session-token")?.value ||
    cookies.get("__Secure-authjs.session-token")?.value ||
    cookies.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ authenticated: false, reason: "no_cookie" });
  }

  let email: string | null = null;

  // Try JWE decryption
  const secret = process.env.AUTH_SECRET;
  if (secret) {
    try {
      const { jwtDecrypt } = await import("jose");
      const key = new TextEncoder().encode(secret);
      const { payload } = await jwtDecrypt(sessionCookie, key);
      const p = payload as Record<string, unknown>;
      email = (p.email as string) ||
              ((p.user as Record<string,string>)?.email) || null;
    } catch (e) {
      console.log("[affiliate/me] JWE decrypt failed:", String(e));
    }
  }

  // Fallback: base64 decode
  if (!email) {
    try {
      const parts = sessionCookie.split(".");
      if (parts.length === 3) {
        const b64 = parts[1].replace(/-/g,"+").replace(/_/g,"/");
        const padded = b64 + "=".repeat((4 - b64.length % 4) % 4);
        const decoded = JSON.parse(Buffer.from(padded,"base64").toString("utf-8"));
        email = decoded.email || decoded?.user?.email || null;
        if (email) console.log("[affiliate/me] Got email from base64 fallback");
      }
    } catch {}
  }

  if (!email) {
    return NextResponse.json({ authenticated: true, hasSession: true, reason: "cant_read_email" });
  }

  // Look up affiliate
  try {
    const rows = await sql`SELECT id, first_name, last_name, email, referral_code, tier, status FROM affiliates WHERE email = ${email.toLowerCase()} LIMIT 1`;
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

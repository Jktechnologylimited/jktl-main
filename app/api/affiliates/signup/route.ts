import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, getAffiliateByEmail } from "@/lib/affiliate-db";
import { generateReferralCode } from "@/lib/affiliate-auth";
import { sendApplicationReceived, notifyAdminNewApplication } from "@/lib/affiliate-emails";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, businessName, howPromote, password } = await req.json();

    if (!firstName || !lastName || !email || !phone || !howPromote) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }
    if (!password || String(password).length < 8) {
      return NextResponse.json({ error: "Please choose a password of at least 8 characters" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await getAffiliateByEmail(cleanEmail);

    if (existing) {
      if (existing.status === "active")   return NextResponse.json({ ok: true, alreadyActive: true });
      if (existing.status === "pending")  return NextResponse.json({ ok: true, pending: true });
      if (existing.status === "rejected") return NextResponse.json({ error: "Your previous application was not approved. Contact info@jktl.com.ng." }, { status: 403 });
    }

    // Generate unique referral code
    let referralCode = generateReferralCode(firstName, lastName);
    for (let i = 0; i < 10; i++) {
      const exists = await sql`SELECT id FROM affiliates WHERE referral_code = ${referralCode} LIMIT 1`;
      if (exists.length === 0) break;
      referralCode = generateReferralCode(firstName, lastName);
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    await sql`
      INSERT INTO affiliates (first_name, last_name, email, phone, referral_code, business_name, how_promote, password_hash, status, tier)
      VALUES (${firstName.trim()}, ${lastName.trim()}, ${cleanEmail}, ${phone.trim()}, ${referralCode}, ${businessName || null}, ${howPromote.trim()}, ${passwordHash}, 'pending', 'standard')
    `;

    // Send emails (non-blocking)
    await Promise.allSettled([
      sendApplicationReceived(cleanEmail, firstName.trim()),
      notifyAdminNewApplication(firstName.trim(), lastName.trim(), cleanEmail, howPromote.trim()),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Affiliate signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

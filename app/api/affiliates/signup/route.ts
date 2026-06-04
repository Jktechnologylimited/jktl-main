import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql, getAffiliateByEmail } from "@/lib/affiliate-db";
import { signToken, generateReferralCode, sendNewApplicationEmail, COOKIE_NAME } from "@/lib/affiliate-auth";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, businessName, howPromote } = await req.json();

    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await getAffiliateByEmail(email.toLowerCase().trim());
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    let referralCode = generateReferralCode(firstName, lastName);

    // Ensure unique referral code
    let attempts = 0;
    while (attempts < 10) {
      const exists = await sql`SELECT id FROM affiliates WHERE referral_code = ${referralCode} LIMIT 1`;
      if (exists.length === 0) break;
      referralCode = generateReferralCode(firstName, lastName);
      attempts++;
    }

    const rows = await sql`
      INSERT INTO affiliates (first_name, last_name, email, phone, password_hash, referral_code, business_name, how_promote, status, signup_bonus, bonus_unlocked, bonus_expires_at)
      VALUES (${firstName.trim()}, ${lastName.trim()}, ${email.toLowerCase().trim()}, ${phone.trim()}, ${passwordHash}, ${referralCode}, ${businessName || null}, ${howPromote || null}, 'pending', 20000, FALSE, NOW() + INTERVAL '90 days')
      RETURNING id, first_name, last_name, email, referral_code, tier, status
    `;

    const affiliate = rows[0];

    // Notify JKTL admin of new application
    await sendNewApplicationEmail(`${firstName} ${lastName}`, email).catch(() => {});

    // Sign token even for pending -- they see the pending screen
    const token = signToken({
      id: affiliate.id,
      email: affiliate.email,
      firstName: affiliate.first_name,
      lastName: affiliate.last_name,
      referralCode: affiliate.referral_code,
      tier: affiliate.tier,
      status: affiliate.status,
    });

    const res = NextResponse.json({ ok: true, status: "pending" });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

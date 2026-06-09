import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getAffiliateByEmail } from "@/lib/affiliate-db";
import { signToken, COOKIE_NAME } from "@/lib/affiliate-auth";

export const dynamic = "force-dynamic";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const affiliate = await getAffiliateByEmail(email.toLowerCase().trim());
    if (!affiliate) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, affiliate.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken({
      id: affiliate.id,
      email: affiliate.email,
      firstName: affiliate.first_name,
      lastName: affiliate.last_name,
      referralCode: affiliate.referral_code,
      tier: affiliate.tier,
      status: affiliate.status,
    });

    const res = NextResponse.json({
      ok: true,
      status: affiliate.status,
      redirect: affiliate.status === "active" ? "/dashboard" : "/pending",
    });

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

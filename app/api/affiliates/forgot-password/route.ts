import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { sql, getAffiliateByEmail } from "@/lib/affiliate-db";
import { sendPasswordResetEmail } from "@/lib/affiliate-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    const cleanEmail = String(email).toLowerCase().trim();
    const aff = await getAffiliateByEmail(cleanEmail);
    // Always respond ok so we never reveal whether an email is registered.
    if (aff) {
      const token = randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
      await sql`INSERT INTO password_resets (email, token, expires_at) VALUES (${aff.email}, ${token}, ${expires})`;
      await sendPasswordResetEmail(aff.email, aff.first_name, token);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ ok: true });
  }
}

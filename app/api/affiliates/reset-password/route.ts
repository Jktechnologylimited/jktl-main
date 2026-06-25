import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/affiliate-db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    if (String(password).length < 8) return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

    const rows = await sql`SELECT id, email, expires_at FROM password_resets WHERE token = ${token} LIMIT 1`;
    const reset = rows[0];
    if (!reset || new Date(reset.expires_at) < new Date()) {
      return NextResponse.json({ error: "This reset link is invalid or has expired. Please request a new one." }, { status: 400 });
    }
    const hash = await bcrypt.hash(String(password), 10);
    await sql`UPDATE affiliates SET password_hash = ${hash}, updated_at = NOW() WHERE email = ${reset.email}`;
    // single-use: clear all reset tokens for this email
    await sql`DELETE FROM password_resets WHERE email = ${reset.email}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

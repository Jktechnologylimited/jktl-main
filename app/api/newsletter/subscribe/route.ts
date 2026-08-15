import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// POST /api/newsletter/subscribe { email } -- public footer signup
export async function POST(req: NextRequest) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  try {
    const { email } = await req.json();
    const clean = typeof email === "string" ? email.trim().toLowerCase() : "";
    if (!clean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
    await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${clean})
      ON CONFLICT (email) DO NOTHING
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

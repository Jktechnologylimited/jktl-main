import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });
  }
  try {
    const { sql, ONBOARDING_SCHEMA } = await import("@/lib/db");
    await sql.unsafe(ONBOARDING_SCHEMA);
    return NextResponse.json({ ok: true, message: "Onboarding schema created" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

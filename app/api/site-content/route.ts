import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { mergeHomepage } from "@/data/homepage-defaults";

export const dynamic = "force-dynamic";

// GET /api/site-content — effective homepage content (defaults merged with DB)
export async function GET() {
  let stored: unknown = null;
  if (sql) {
    try {
      const rows = await sql`SELECT value FROM site_content WHERE key = 'homepage' LIMIT 1`;
      stored = rows[0]?.value ?? null;
    } catch { stored = null; }
  }
  return NextResponse.json({ homepage: mergeHomepage(stored) });
}

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/jobs — public list of open jobs
export async function GET() {
  if (!sql) return NextResponse.json({ jobs: [] });
  try {
    const jobs = await sql`
      SELECT id, title, department, location, type, description, created_at
      FROM jobs WHERE status = 'open'
      ORDER BY created_at DESC
    `;
    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ error: String(err), jobs: [] }, { status: 500 });
  }
}

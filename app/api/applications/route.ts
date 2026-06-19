import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// POST /api/applications — public job application submission
export async function POST(req: NextRequest) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  try {
    const { job_id, name, email, phone, cv_url, cover_note } = await req.json();
    if (!job_id || !name || !email) {
      return NextResponse.json({ error: "name, email and job are required" }, { status: 400 });
    }
    // Confirm the job exists and is open
    const job = await sql`SELECT id FROM jobs WHERE id = ${job_id} AND status = 'open' LIMIT 1`;
    if (job.length === 0) {
      return NextResponse.json({ error: "This role is no longer accepting applications" }, { status: 404 });
    }
    await sql`
      INSERT INTO job_applications (job_id, name, email, phone, cv_url, cover_note)
      VALUES (${job_id}, ${name}, ${email.toLowerCase()}, ${phone || ""}, ${cv_url || ""}, ${cover_note || ""})
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

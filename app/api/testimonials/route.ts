import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/testimonials — published testimonials
export async function GET() {
  if (!sql) return NextResponse.json({ testimonials: [] });
  try {
    const testimonials = await sql`
      SELECT id, quote, author_name, author_role, company, avatar_url, rating
      FROM testimonials WHERE status = 'published'
      ORDER BY sort_order ASC, created_at DESC
    `;
    return NextResponse.json({ testimonials });
  } catch (err) {
    return NextResponse.json({ error: String(err), testimonials: [] }, { status: 500 });
  }
}

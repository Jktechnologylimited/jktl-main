import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/case-studies — public list of published case studies
export async function GET() {
  if (!sql) return NextResponse.json({ caseStudies: [] });
  try {
    const caseStudies = await sql`
      SELECT id, client_name, product, slug, cover_image, published_at
      FROM case_studies WHERE status = 'published'
      ORDER BY published_at DESC NULLS LAST
    `;
    return NextResponse.json({ caseStudies });
  } catch (err) {
    return NextResponse.json({ error: String(err), caseStudies: [] }, { status: 500 });
  }
}

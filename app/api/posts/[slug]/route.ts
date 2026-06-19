import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/posts/[slug] — public single published post
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!sql) return NextResponse.json({ error: "No database" }, { status: 503 });
  try {
    const { slug } = await params;
    const rows = await sql`
      SELECT id, title, slug, cover_image, excerpt, body, author, type, published_at
      FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
    `;
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post: rows[0] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/posts?type=blog|news — public list of published posts
export async function GET(req: NextRequest) {
  if (!sql) return NextResponse.json({ posts: [] });
  try {
    const type = req.nextUrl.searchParams.get("type");
    const posts = type
      ? await sql`
          SELECT id, title, slug, cover_image, excerpt, author, type, published_at
          FROM posts WHERE status = 'published' AND type = ${type}
          ORDER BY published_at DESC NULLS LAST`
      : await sql`
          SELECT id, title, slug, cover_image, excerpt, author, type, published_at
          FROM posts WHERE status = 'published'
          ORDER BY published_at DESC NULLS LAST`;
    return NextResponse.json({ posts });
  } catch (err) {
    return NextResponse.json({ error: String(err), posts: [] }, { status: 500 });
  }
}

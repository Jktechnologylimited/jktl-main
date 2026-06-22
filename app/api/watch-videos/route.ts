import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/watch-videos?page=faithdesk — public list for a page
export async function GET(req: NextRequest) {
  if (!sql) return NextResponse.json({ videos: [] });
  const page = req.nextUrl.searchParams.get("page");
  try {
    const rows = page
      ? await sql`SELECT id, title, description, duration, youtube_id, coming_soon
                  FROM watch_videos WHERE page_key = ${page} ORDER BY sort_order ASC, created_at ASC`
      : await sql`SELECT id, title, description, duration, youtube_id, coming_soon, page_key
                  FROM watch_videos ORDER BY page_key ASC, sort_order ASC`;
    // Map to the shape the page components expect
    const videos = rows.map((r: Record<string, unknown>) => ({
      id: r.id, title: r.title, desc: r.description || "", duration: r.duration || "",
      youtubeId: r.youtube_id || "", comingSoon: Boolean(r.coming_soon),
    }));
    return NextResponse.json({ videos });
  } catch (err) {
    return NextResponse.json({ error: String(err), videos: [] }, { status: 500 });
  }
}

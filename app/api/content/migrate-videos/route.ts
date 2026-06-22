import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { WATCH_VIDEOS_DEFAULTS } from "@/data/watch-videos-defaults";

export const dynamic = "force-dynamic";

// GET /api/content/migrate-videos
// Seeds the existing hardcoded watch-&-learn videos into watch_videos so they
// can be edited in the admin. Idempotent per page: skips a page that already
// has any rows.
export async function GET() {
  if (!sql) return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });
  const seeded: Record<string, number> = {};
  const errors: string[] = [];

  for (const [pageKey, vids] of Object.entries(WATCH_VIDEOS_DEFAULTS)) {
    try {
      const existing = await sql`SELECT id FROM watch_videos WHERE page_key = ${pageKey} LIMIT 1`;
      if (existing.length > 0) { seeded[pageKey] = 0; continue; }
      let n = 0;
      for (let i = 0; i < vids.length; i++) {
        const v = vids[i];
        await sql`
          INSERT INTO watch_videos (page_key, title, description, duration, youtube_id, coming_soon, sort_order)
          VALUES (${pageKey}, ${v.title}, ${v.desc}, ${v.duration}, ${v.youtubeId}, ${v.comingSoon}, ${i})
        `;
        n++;
      }
      seeded[pageKey] = n;
    } catch (err) {
      errors.push(`${pageKey}: ${String(err)}`);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, seeded, errors });
}

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/pages/nav-items -- published pages opted into nav/footer display.
export async function GET() {
  if (!sql) return NextResponse.json({ nav: [], footer: [] });
  try {
    const rows = await sql`
      SELECT title, slug, show_in_nav, show_in_footer FROM pages
      WHERE status = 'published' AND (show_in_nav = true OR show_in_footer = true)
      ORDER BY title ASC
    `;
    const nav = rows.filter((r: { show_in_nav: boolean }) => r.show_in_nav).map((r: { title: string; slug: string }) => ({ title: r.title, slug: r.slug }));
    const footer = rows.filter((r: { show_in_footer: boolean }) => r.show_in_footer).map((r: { title: string; slug: string }) => ({ title: r.title, slug: r.slug }));
    return NextResponse.json({ nav, footer });
  } catch (err) {
    return NextResponse.json({ error: String(err), nav: [], footer: [] }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { legacyPosts } from "@/data/legacy-posts";

export const dynamic = "force-dynamic";

// GET /api/content/migrate-blog
// Inserts the original hardcoded blog articles into the posts table as
// published markdown posts. Idempotent: skips any slug that already exists,
// so it is safe to run more than once and across environments.
export async function GET() {
  if (!sql) return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });

  const migrated: string[] = [];
  const skipped: string[] = [];
  const errors: string[] = [];

  for (const p of legacyPosts) {
    try {
      const exists = await sql`SELECT id FROM posts WHERE slug = ${p.slug} LIMIT 1`;
      if (exists.length > 0) { skipped.push(p.slug); continue; }
      await sql`
        INSERT INTO posts (title, slug, cover_image, excerpt, body, author, type, status, published_at)
        VALUES (${p.title}, ${p.slug}, ${""}, ${p.excerpt}, ${p.body}, ${p.author},
                ${p.type}, 'published', ${p.publishedAt})
      `;
      migrated.push(p.slug);
    } catch (err) {
      errors.push(`${p.slug}: ${String(err)}`);
    }
  }

  return NextResponse.json({ ok: errors.length === 0, migrated, skipped, errors });
}

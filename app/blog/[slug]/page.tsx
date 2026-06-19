import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "@/lib/db";
import Markdown from "@/components/Markdown";
import { CTA } from "@/components/sections/Sections";

export const dynamic = "force-dynamic";

type Post = {
  title: string; slug: string; cover_image: string | null; excerpt: string | null;
  body: string | null; author: string | null; type: string; published_at: string | null;
};

async function getPost(slug: string): Promise<Post | null> {
  if (!sql) return null;
  try {
    const rows = (await sql`
      SELECT title, slug, cover_image, excerpt, body, author, type, published_at
      FROM posts WHERE slug = ${slug} AND status = 'published' LIMIT 1
    `) as Post[];
    return rows[0] || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found | JKTL" };
  return {
    title: `${post.title} | JKTL`,
    description: post.excerpt || undefined,
    alternates: { canonical: `https://jktl.com.ng/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt || undefined, type: "article", images: post.cover_image ? [post.cover_image] : undefined },
  };
}

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <section style={{ background: "var(--navy-950)", paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="max-w-3xl mx-auto px-8">
          <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: "14px" }}>
            {[post.type === "news" ? "News" : "Insights", post.author, fmtDate(post.published_at)].filter(Boolean).join(" | ")}
          </p>
          <h1 className="display-xl mb-5" style={{ color: "var(--cream-50)", maxWidth: "680px" }}>{post.title}</h1>
          {post.excerpt && (
            <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", maxWidth: "560px" }}>{post.excerpt}</p>
          )}
        </div>
      </section>

      {post.cover_image && (
        <div style={{ background: "var(--cream-50)", paddingTop: "48px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.cover_image} alt={post.title} style={{ display: "block", maxWidth: "900px", width: "100%", margin: "0 auto", borderRadius: "4px" }} />
        </div>
      )}

      <article className="section-pad" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-3xl mx-auto px-8">
          <Markdown>{post.body || ""}</Markdown>
          <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(6,14,42,0.1)" }}>
            <Link href="/blog" style={{ color: "var(--navy-600)", textDecoration: "underline", fontSize: "0.9rem" }}>← Back to all insights</Link>
          </div>
        </div>
      </article>

      <CTA heading="Want results like this for your business?" subtext="Book a free 30-minute call and we'll map out exactly what would move the needle for you." />
    </>
  );
}

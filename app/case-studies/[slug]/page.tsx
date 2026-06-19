import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { sql } from "@/lib/db";
import Markdown from "@/components/Markdown";
import { CTA } from "@/components/sections/Sections";

export const dynamic = "force-dynamic";

type CaseStudy = {
  client_name: string; product: string | null; slug: string; cover_image: string | null;
  challenge: string | null; solution: string | null; results: string | null; published_at: string | null;
};

async function getCase(slug: string): Promise<CaseStudy | null> {
  if (!sql) return null;
  try {
    const rows = (await sql`
      SELECT client_name, product, slug, cover_image, challenge, solution, results, published_at
      FROM case_studies WHERE slug = ${slug} AND status = 'published' LIMIT 1
    `) as CaseStudy[];
    return rows[0] || null;
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCase(slug);
  if (!c) return { title: "Case study not found | JKTL" };
  const title = `${c.client_name}${c.product ? ` — ${c.product}` : ""} | JKTL Case Study`;
  return {
    title,
    alternates: { canonical: `https://jktl.com.ng/case-studies/${c.slug}` },
    openGraph: { title, type: "article", images: c.cover_image ? [c.cover_image] : undefined },
  };
}

function Section({ label, body }: { label: string; body: string | null }) {
  if (!body) return null;
  return (
    <div style={{ marginBottom: "40px" }}>
      <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: "14px" }}>{label}</p>
      <Markdown>{body}</Markdown>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCase(slug);
  if (!c) notFound();

  return (
    <>
      <section style={{ background: "var(--navy-950)", paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="max-w-3xl mx-auto px-8">
          {c.product && <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: "14px" }}>{c.product}</p>}
          <h1 className="display-xl mb-3" style={{ color: "var(--cream-50)", maxWidth: "680px" }}>{c.client_name}</h1>
        </div>
      </section>

      {c.cover_image && (
        <div style={{ background: "var(--cream-50)", paddingTop: "48px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.cover_image} alt={c.client_name} style={{ display: "block", maxWidth: "900px", width: "100%", margin: "0 auto", borderRadius: "4px" }} />
        </div>
      )}

      <article className="section-pad" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-3xl mx-auto px-8">
          <Section label="The Challenge" body={c.challenge} />
          <Section label="Our Solution" body={c.solution} />
          <Section label="The Results" body={c.results} />
          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(6,14,42,0.1)" }}>
            <Link href="/case-studies" style={{ color: "var(--navy-600)", textDecoration: "underline", fontSize: "0.9rem" }}>← Back to all case studies</Link>
          </div>
        </div>
      </article>

      <CTA heading="Want results like this?" subtext="Book a free 30-minute call and we'll map out exactly what would move the needle for your business." />
    </>
  );
}

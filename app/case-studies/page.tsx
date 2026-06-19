import type { Metadata } from "next";
import Link from "next/link";
import { sql } from "@/lib/db";
import { CTA } from "@/components/sections/Sections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies | JK Technology Limited",
  description: "Real results for real businesses. See how JK Technology Limited has helped clients grow with websites, automation and growth systems.",
  alternates: { canonical: "https://jktl.com.ng/case-studies" },
};

type CaseStudy = {
  client_name: string; product: string | null; slug: string;
  cover_image: string | null; published_at: string | null;
};

export default async function CaseStudiesPage() {
  let cases: CaseStudy[] = [];
  if (sql) {
    try {
      cases = (await sql`
        SELECT client_name, product, slug, cover_image, published_at
        FROM case_studies WHERE status = 'published'
        ORDER BY published_at DESC NULLS LAST
      `) as CaseStudy[];
    } catch { cases = []; }
  }

  return (
    <>
      <section style={{ background: "var(--navy-950)", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display: "block" }} />
          <h1 className="display-hero mb-4" style={{ color: "var(--cream-50)", maxWidth: "700px" }}>
            The work,<br /><em className="not-italic gold-text">and the results.</em>
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", maxWidth: "520px" }}>
            We measure success in outcomes, not deliverables. Here&apos;s what that looks like for the businesses we work with.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-5xl mx-auto px-8">
          {cases.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)" }}>
                Case studies coming soon.
              </h2>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {cases.map((c) => (
                <Link key={c.slug} href={`/case-studies/${c.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-light" style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
                    {c.cover_image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.cover_image} alt={c.client_name} style={{ display: "block", width: "100%", height: "200px", objectFit: "cover" }} />
                    )}
                    <div style={{ padding: "28px", flex: 1, display: "flex", flexDirection: "column" }}>
                      {c.product && <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: "10px" }}>{c.product}</p>}
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.5rem", color: "var(--navy-900)", lineHeight: 1.25 }}>
                        {c.client_name}
                      </h3>
                      <p className="label-xs" style={{ color: "var(--navy-600)", marginTop: "auto", paddingTop: "18px" }}>Read the case study →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA heading="Want to be our next success story?" subtext="Book a free 30-minute call and we'll map out exactly what would move the needle for your business." />
    </>
  );
}

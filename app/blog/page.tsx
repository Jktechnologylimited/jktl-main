import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Insights: SEO, Web Design & AI Websites | JK Technology Limited",
  description: "Practical guides for business owners who want more traffic, better conversions, and measurable ROI. SEO, AI websites, landing pages, and growth strategy.",
  alternates: { canonical: "https://jktl.com.ng/blog" },
};

export default function BlogPage() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)", maxWidth:"700px" }}>
            Insights &amp;<br/><em className="not-italic gold-text">Resources.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"500px" }}>
            Practical guides for business owners who want more from their online presence. No fluff. No generic advice.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-5xl mx-auto px-8">
          {/* Featured */}
          <Link href={`/blog/${blogPosts[0].slug}`} style={{ textDecoration:"none", display:"block", marginBottom:"16px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0", background:"var(--navy-900)", borderRadius:"4px", overflow:"hidden" }} className="grid-cols-1 md:grid-cols-2">
              <div style={{ padding:"48px 40px" }}>
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"10px" }}>Featured · {blogPosts[0].category}</p>
                <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"clamp(1.4rem,2.5vw,2rem)", color:"var(--cream-50)", lineHeight:1.25, marginBottom:"14px" }}>
                  {blogPosts[0].title}
                </h2>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.5)", marginBottom:"20px" }}>{blogPosts[0].excerpt}</p>
                <p className="label-xs" style={{ color:"rgba(249,247,240,0.25)" }}>{blogPosts[0].readTime} read · {blogPosts[0].date}</p>
              </div>
              <div style={{ background:"rgba(201,168,76,0.06)", borderLeft:"1px solid rgba(249,247,240,0.06)", padding:"48px 40px", display:"flex", flexDirection:"column", justifyContent:"center", gap:"12px" }}>
                {["Traffic vs. Conversion", "The 7 Conversion Killers", "How to Diagnose the Problem", "Quick Wins You Can Implement Today"].map((item) => (
                  <div key={item} style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                    <span style={{ color:"var(--gold-400)", fontSize:"0.8rem" }}>→</span>
                    <span style={{ fontSize:"0.875rem", color:"rgba(249,247,240,0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Other posts */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"32px", height:"100%", display:"flex", flexDirection:"column" }}>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"10px" }}>{post.category} · {post.readTime} read</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"12px", flex:1 }}>
                    {post.title}
                  </h3>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.55)", marginBottom:"16px" }}>{post.excerpt}</p>
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)" }}>{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section style={{ background:"var(--navy-900)", padding:"72px 32px" }}>
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="display-lg mb-4" style={{ color:"var(--cream-50)" }}>Free: 15-Point Website Audit Checklist</h2>
          <p className="body-md" style={{ color:"rgba(249,247,240,0.5)", marginBottom:"24px" }}>
            The exact checklist we use when auditing a new client&apos;s website. Find which of the 15 common problems are costing you leads right now.
          </p>
          <a href={`mailto:${siteConfig.email}?subject=Website Audit Checklist Request`} className="btn-gold">
            Request the Checklist by Email
          </a>
        </div>
      </section>

      <CTA heading="Want Us to Run the Audit for You?" subtext="Book a free 30-minute Zoom call. We'll go through your site live and give you a specific, actionable plan." />
    </>
  );
}

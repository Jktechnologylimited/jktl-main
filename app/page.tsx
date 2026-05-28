import type { Metadata } from "next";
import Link from "next/link";
import {
  Hero, Problem, ServicesPreview, Process,
  TestimonialSection, FounderStrip, WhyUs, CTA,
} from "@/components/sections/Sections";
import {
  blogPosts, targetAudiences, problemsSolved,
  siteConfig, revenueStreams, flagshipPackage,
} from "@/data/index";

export const metadata: Metadata = {
  title: "JK Technology Limited | Digital Growth & Business Systems Agency — Nigeria",
  description:
    "JK Technology builds digital systems that help Nigerian and UK businesses get customers, convert leads, and automate operations. Websites, SEO, CRM, automation, AI — delivered since 2019.",
  alternates: { canonical: "https://jktl.com.ng" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ── PROBLEMS WE SOLVE strip ── */}
      <section style={{ background:"var(--navy-800)", padding:"36px 32px", borderTop:"1px solid rgba(249,247,240,0.06)", borderBottom:"1px solid rgba(249,247,240,0.06)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"14px", alignItems:"center", justifyContent:"center" }}>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", flexShrink:0 }}>Problems We Solve:</p>
            {problemsSolved.map((p) => (
              <span key={p} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"0.8rem", color:"rgba(249,247,240,0.65)", fontWeight:400 }}>
                <span style={{ color:"var(--gold-400)", fontSize:"0.7rem" }}>✓</span> {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Problem />
      <ServicesPreview />

      {/* ── FLAGSHIP PACKAGE CALLOUT ── */}
      <section style={{ background:"var(--gold-400)", padding:"56px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div style={{ display:"flex", flexWrap:"wrap", gap:"24px", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ maxWidth:"560px" }}>
              <p className="label-xs" style={{ color:"var(--navy-900)", marginBottom:"8px", opacity:0.7 }}>
                {flagshipPackage.number} — {flagshipPackage.label}
              </p>
              <h2 className="display-lg" style={{ color:"var(--navy-900)", marginBottom:"10px" }}>
                {flagshipPackage.name}
              </h2>
              <p className="body-md" style={{ color:"rgba(6,14,42,0.7)", marginBottom:"16px" }}>
                {flagshipPackage.description}
              </p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:300, color:"var(--navy-900)" }}>
                {flagshipPackage.priceFrom} – {flagshipPackage.priceTo}
              </p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent:"center" }}>
                Book a Free Discovery Call
              </a>
              <Link href="/packages" className="btn-outline-navy" style={{ justifyContent:"center", borderColor:"var(--navy-900)" }}>
                View All Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Process />

      {/* ── TARGET AUDIENCES ── */}
      <section className="section-pad" style={{ background:"var(--navy-900)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="gold-rule mb-5" style={{ display:"block" }} />
              <h2 className="display-xl mb-5" style={{ color:"var(--cream-50)" }}>
                Who We Build Systems For
              </h2>
              <p className="body-lg" style={{ color:"rgba(249,247,240,0.5)", marginBottom:"32px" }}>
                We work across industries — if your business needs to attract customers, convert leads, and operate efficiently, we can build the system for it.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
                {targetAudiences.map((a) => (
                  <div key={a.title} style={{ display:"flex", gap:"16px", padding:"18px 20px", background:"rgba(249,247,240,0.04)", border:"1px solid rgba(249,247,240,0.08)", borderRadius:"4px" }}>
                    <span style={{ fontSize:"1.5rem", flexShrink:0 }}>{a.icon}</span>
                    <div>
                      <p style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--cream-50)", marginBottom:"3px" }}>{a.title}</p>
                      <p className="body-sm" style={{ color:"rgba(249,247,240,0.45)" }}>{a.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue model */}
            <div style={{ padding:"36px", background:"rgba(249,247,240,0.03)", border:"1px solid rgba(249,247,240,0.08)", borderRadius:"4px" }}>
              <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"20px" }}>Multiple Revenue Streams</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.4rem", color:"var(--cream-50)", lineHeight:1.3, marginBottom:"24px" }}>
                Our systems create multiple income streams for your business — not just a one-off project.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                {revenueStreams.map((r) => (
                  <div key={r.label} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 16px", background:"rgba(249,247,240,0.04)", borderRadius:"2px" }}>
                    <span style={{ width:10, height:10, borderRadius:"50%", background:r.color, flexShrink:0 }} />
                    <div>
                      <p style={{ fontWeight:600, fontSize:"0.85rem", color:"var(--cream-50)" }}>{r.label}</p>
                      {r.detail && <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)" }}>{r.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <FounderStrip />
      <WhyUs />

      {/* ── BLOG PREVIEW ── */}
      <section className="section-pad" style={{ background:"var(--cream-200)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="gold-rule mb-4" style={{ display:"block" }} />
              <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Latest Insights</h2>
            </div>
            <Link href="/blog" className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none" }}>All articles →</Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.slice(0,2).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"32px", height:"100%" }}>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"10px" }}>{post.category}</p>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"12px" }}>{post.title}</h3>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"16px" }}>{post.excerpt}</p>
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)" }}>{post.readTime} read · {post.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

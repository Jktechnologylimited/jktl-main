import type { Metadata } from "next";
import Link from "next/link";
import BeforeAfter from "@/components/ui/BeforeAfter";
import {  testimonial, siteConfig } from "@/data/index";
// import { caseStudies, testimonial, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio | JK Technology Limited",
  description: "Real client results — law firms, coaches, and medical practices ranking page 1 on Google, converting at 14%, and generating consistent inbound leads.",
  alternates: { canonical: "https://jktl.com.ng/work" },
};

export default function WorkPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"700px" }}>
            Real Businesses.<br/>
            <em className="not-italic gold-text">Measurable Results.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"520px" }}>
            We don&apos;t report on impressions. We track rankings, leads, conversion rates, and revenue impact.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background:"var(--gold-400)", padding:"18px 32px" }}>
        <div className="max-w-7xl mx-auto px-8" style={{ display:"flex", flexWrap:"wrap", gap:"36px", justifyContent:"center" }}>
          {[
            { v:"8–14%", l:"Landing page conversion" },
            { v:"60 days", l:"Avg. time to page 1 rankings" },
            { v:"55%", l:"Avg. ad spend reduction" },
            { v:"7×", l:"Avg. lead increase" },
          ].map((s) => (
            <div key={s.l} style={{ textAlign:"center" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:"1.6rem", color:"var(--navy-900)", lineHeight:1 }}>{s.v}</p>
              <p className="label-xs" style={{ color:"rgba(6,14,42,0.6)", marginTop:"3px" }}>{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Case studies */}
      {/* <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8 space-y-24">
          {caseStudies.map((cs, i) => (
            <div key={cs.slug}>
              {/* Header */}
              {/* <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"36px" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.5rem", fontWeight:300, color:"var(--cream-300)", lineHeight:1 }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <div>
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.35)" }}>{cs.category} · {cs.location}</p>
                  <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>{cs.client}</h2>
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginTop:"4px" }}>{cs.service}</p>
                </div>
              </div> */}

              {/* Before / After slider */}
              {/* <div style={{ marginBottom:"36px" }}>
                <BeforeAfter
                  beforeSrc={`/placeholder-before-${cs.slug}`}
                  afterSrc={`/placeholder-after-${cs.slug}`}
                  beforeAlt={`${cs.client} website before`}
                  afterAlt={`${cs.client} website after JKTL rebuild`}
                  beforeLabel="Before"
                  afterLabel="After"
                  height={380}
                />
                <p style={{ fontSize:"0.72rem", color:"rgba(28,28,30,0.3)", textAlign:"center", marginTop:"8px" }}>
                  ← Drag the slider to compare before and after
                  {" · "}
                  <span style={{ color:"rgba(28,28,30,0.45)" }}>
                    Replace placeholder images by adding screenshots to <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem" }}>/public/work/{cs.slug}-before.jpg</code> and <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem" }}>/public/work/{cs.slug}-after.jpg</code>
                  </span>
                </p>
              </div> */}

              {/* Before / After cards */}
              {/* <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div style={{ padding:"32px", background:"rgba(239,68,68,0.04)", border:"1px solid rgba(239,68,68,0.1)", borderRadius:"4px" }}>
                  <p style={{ fontWeight:700, fontSize:"0.82rem", color:"#EF4444", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>{cs.before.title}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {cs.before.points.map((p) => (
                      <li key={p} style={{ display:"flex", gap:"10px", fontSize:"0.875rem", color:"rgba(28,28,30,0.65)", fontWeight:300 }}>
                        <span style={{ color:"#EF4444", flexShrink:0 }}>×</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ padding:"32px", background:"rgba(16,185,129,0.04)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:"4px" }}>
                  <p style={{ fontWeight:700, fontSize:"0.82rem", color:"#10B981", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>{cs.after.title}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px" }}>
                    {cs.after.points.map((p) => (
                      <li key={p} style={{ display:"flex", gap:"10px", fontSize:"0.875rem", color:"rgba(28,28,30,0.65)", fontWeight:300 }}>
                        <span style={{ color:"#10B981", flexShrink:0 }}>✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

              {/* Results */}
              {/* <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px" }}>
                {cs.results.map((r) => (
                  <div key={r.label} style={{ padding:"20px 24px", background:"var(--navy-900)", borderRadius:"4px", textAlign:"center" }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"4px" }}>{r.value}</p>
                    <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>{r.label}</p>
                  </div>
                ))}
              </div> */}

              {/* CTA inline */}
              {/* <div style={{ marginTop:"24px" }}>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>
                  Get similar results — Book a free Zoom audit →
                </a>
              </div> */}
            {/* </div>  */}
          {/* ))}  */}
        {/* </div>  */}
      {/* </section>  */}

      {/* Testimonial */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <div className="ornament mb-8" style={{ color:"var(--gold-400)" }}>
            <span className="label-xs">Law Firm — New York, NY</span>
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.3rem,2.5vw,2rem)", color:"var(--navy-900)", lineHeight:1.55, fontStyle:"italic", marginBottom:"28px" }}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)" }}>{testimonial.name}</p>
          <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)", marginTop:"4px" }}>{testimonial.role} · {testimonial.firm}</p>
          <div style={{ marginTop:"12px", display:"inline-block", padding:"5px 14px", background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:"2px" }}>
            <p className="label-xs" style={{ color:"var(--gold-400)" }}>{testimonial.metric}</p>
          </div>
        </div>
      </section>

      <CTA heading="Your Business Could Be the Next Case Study." subtext="Book a free 30-minute Zoom audit. We'll assess your current digital presence and tell you honestly what results you can expect, what we'd build, and what it would cost." />
    </>
  );
}

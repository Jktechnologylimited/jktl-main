import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, whyUs, usStates } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "About JK Technology Limited | AI Business Website Design & SEO",
  description: "JK Technology Limited is a results-driven web design and SEO studio with 6+ years of experience serving US businesses across all 50 states. Learn our story and approach.",
  alternates: { canonical: "https://jktl.com.ng/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            We Build Websites That Work.<br/>
            <em className="not-italic gold-text">Not Websites That Look Nice.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            JK Technology Limited is a web design and SEO studio that operates at the intersection of strategy, copy, and technology — because that&apos;s where results actually live.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-6" style={{ color:"var(--navy-900)" }}>Our Story</h2>
            {[
              "JK Technology Limited was founded in 2019 with a clear observation: businesses were investing in websites that produced nothing. Beautiful designs sitting invisible on page four of Google. Sites with decent traffic that converted nobody because the copy didn't speak to anyone in particular.",
              "The problem was fragmentation. Designers didn't think like marketers. Developers didn't consider copy. SEO was an afterthought. Nobody in the process was asking the question that mattered: will this make the client's phone ring?",
              "We built JKTL to solve that. Every website we deliver is treated as a business development asset first — designed to rank, written to persuade, and engineered to convert. Strategy, copy, design, and SEO in a single integrated engagement.",
              "Over six years, we have delivered projects for law firms, medical practices, coaches, consultants, agencies, and service businesses across the United States, United Kingdom, Canada, and Nigeria.",
            ].map((p, i) => <p key={i} className="body-md" style={{ color:"rgba(28,28,30,0.62)", marginBottom:"14px" }}>{p}</p>)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            {[
              { v:"2019",  l:"Year founded",                   s:"Over half a decade in business" },
              { v:"50+",   l:"Projects delivered",              s:"US, UK, Canada, Nigeria" },
              { v:"All 50", l:"US states served",              s:"100% remote delivery" },
              { v:"100%",  l:"Copywriting in-house",           s:"No templates, no outsourcing" },
            ].map(s => (
              <div key={s.l} style={{ padding:"24px 20px", background:"var(--navy-900)", borderRadius:"4px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"4px" }}>{s.v}</p>
                <p style={{ fontWeight:600, fontSize:"0.85rem", color:"var(--cream-50)", marginBottom:"3px" }}>{s.l}</p>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)" }}>{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section style={{ background:"var(--cream-100)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="display-lg mb-3" style={{ color:"var(--navy-900)" }}>Our Approach</h2>
            <p className="body-md" style={{ color:"rgba(28,28,30,0.5)", maxWidth:"480px", margin:"0 auto" }}>Three principles that govern every project we take on.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n:"I",   title:"Strategy precedes design",   body:"We don't open a design tool until we understand your ideal client, their search intent, your competitors, and the messaging that will convert. Design serves strategy — not the reverse." },
              { n:"II",  title:"We write your copy",         body:"Every word on your website is written by us — headlines, body copy, CTAs, meta descriptions. You brief us. We research your market and write. Included in every project." },
              { n:"III", title:"SEO from the first decision", body:"Keyword architecture, URL structure, heading hierarchy, schema, page speed, and technical setup are determined before any page is designed. You launch with a site Google already trusts." },
            ].map(item => (
              <div key={item.n} style={{ padding:"32px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:300, color:"var(--gold-400)", marginBottom:"14px" }}>{item.n}</p>
                <h3 style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"10px" }}>{item.title}</h3>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="display-lg mb-2" style={{ color:"var(--cream-50)" }}>Why Choose JKTL</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:"rgba(249,247,240,0.06)" }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ padding:"32px", background:"var(--navy-800)" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem", fontWeight:300, color:"rgba(249,247,240,0.07)", lineHeight:1, marginBottom:"14px" }}>
                  {String(i+1).padStart(2,"0")}
                </p>
                <h3 style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--cream-50)", marginBottom:"8px", letterSpacing:"0.02em" }}>{item.title}</h3>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.45)" }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* US states */}
      <section style={{ background:"var(--cream-50)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-8">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Serving All 50 US States</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>100% remote delivery. We have never needed to meet a client in person to deliver exceptional results.</p>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
            {usStates.map(s => (
              <span key={s} style={{ fontSize:"0.78rem", color:"rgba(28,28,30,0.6)", background:"var(--cream-100)", padding:"5px 12px", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Availability */}
      <section style={{ background:"var(--cream-100)", padding:"48px 32px", textAlign:"center" }}>
        <div className="max-w-xl mx-auto px-8">
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)", color:"#10B981", fontSize:"0.82rem", fontWeight:600, padding:"8px 18px", borderRadius:"2px", marginBottom:"16px" }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#10B981", display:"inline-block" }} />
            Currently accepting new US clients
          </div>
          <p className="body-md" style={{ color:"rgba(28,28,30,0.6)", marginBottom:"20px" }}>
            We keep our client roster intentionally small. If you&apos;re interested in working together, start with a free Zoom audit.
          </p>
          <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ display:"inline-flex" }}>
            Book a Free Zoom Audit
          </a>
        </div>
      </section>

      <CTA heading="Work With a Team That Cares About Your Revenue." subtext="Book a free 30-minute Zoom audit. No pitch, no pressure — an honest assessment of your digital presence and a clear plan for what comes next." />
    </>
  );
}

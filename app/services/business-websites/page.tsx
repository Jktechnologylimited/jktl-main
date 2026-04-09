import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/data/index";
import { TestimonialSection, CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "AI Business Website Designer for US Companies | JK Technology Limited",
  description: "Custom AI-powered business websites built to rank on Google and convert visitors into leads. Full copywriting, on-page SEO, and technical setup included. Serving all 50 US states.",
  keywords: ["business website designer USA", "AI business website", "professional business website", "custom website design", "website designer for small business"],
  alternates: { canonical: "https://jktl.com.ng/services/business-websites" },
};

const service = services.find(s => s.slug === "business-websites")!;

export default function BusinessWebsitesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"14px" }}>AI Business Websites</p>
            <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)" }}>
              Smart Websites That<br/>
              <em className="not-italic gold-text">Rank and Convert.</em>
            </h1>
            <p className="body-lg" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"560px", marginBottom:"32px" }}>
              Not just a beautiful design — a complete client-acquisition system engineered to bring you inbound leads from Google and turn visitors into customers.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Book Free Zoom Audit
              </a>
              <Link href="/work" className="btn-outline-cream">See Examples</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-5" style={{ color:"var(--navy-900)" }}>
              The Problem With Most Business Websites
            </h2>
            {[
              "They're built by designers thinking about aesthetics — not marketers thinking about results. Nobody in the process is asking: will this make the phone ring?",
              "Your site needs to earn Google's trust so it ranks. Communicate your value in 5 seconds. And guide every visitor toward one clear action. Most websites fail at all three simultaneously.",
              "We fix all three — in a single project, not three separate invoices.",
            ].map((p, i) => (
              <p key={i} className="body-md" style={{ color:"rgba(28,28,30,0.62)", marginBottom:"14px" }}>{p}</p>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
            {[
              { v:"Page 1", d:"Target keyword rankings for our clients" },
              { v:"6+yrs",  d:"Experience building high-performance websites" },
              { v:"14 days", d:"Average time from brief to live site" },
              { v:"100%",  d:"Projects include professional copywriting" },
            ].map((item) => (
              <div key={item.d} style={{ padding:"24px 20px", background:"var(--navy-900)", borderRadius:"4px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.8rem", fontWeight:300, color:"var(--gold-400)", lineHeight:1, marginBottom:"6px" }}>{item.v}</p>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)" }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ background:"var(--cream-100)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="display-lg mb-3" style={{ color:"var(--navy-900)" }}>Everything Included in Every Build</h2>
            <p className="body-md" style={{ color:"rgba(28,28,30,0.5)", maxWidth:"480px", margin:"0 auto" }}>No add-ons, no surprises. All of this is standard in every website project.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title:"Strategy & Research", icon:"🎯", items:["Target keyword identification","Competitor analysis","Ideal client profiling","Site architecture planning"] },
              { title:"Copywriting",          icon:"✍️", items:["All pages written by us","Pain-point led messaging","Benefit-driven headlines","Conversion-focused CTAs"] },
              { title:"Design & Build",       icon:"🎨", items:["Custom design — no templates","Mobile-first responsive","AI-enhanced features","Built on Next.js (fast)"] },
              { title:"SEO & Launch",         icon:"🔍", items:["On-page SEO throughout","Schema markup","Google Search Console","Analytics + conversion tracking"] },
            ].map((cat) => (
              <div key={cat.title} style={{ background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"4px", padding:"28px 24px" }}>
                <div style={{ fontSize:"1.75rem", marginBottom:"12px" }}>{cat.icon}</div>
                <h3 style={{ fontWeight:700, fontSize:"0.95rem", color:"var(--navy-900)", marginBottom:"14px" }}>{cat.title}</h3>
                <ul className="check-list" style={{ listStyle:"none" }}>
                  {cat.items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="display-lg mb-3" style={{ color:"var(--cream-50)" }}>Investment</h2>
          <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"32px" }}>Fixed-scope projects. No scope creep surprises.</p>
          <div style={{ background:"rgba(249,247,240,0.04)", border:"1px solid rgba(201,168,76,0.25)", borderRadius:"4px", padding:"44px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"24px", marginBottom:"32px" }}>
              {[
                { l:"Starting from", v:"$1,500" },
                { l:"Delivery",      v:"10–14 days" },
                { l:"Deposit",       v:"50% to start" },
              ].map(item => (
                <div key={item.l}>
                  <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"6px" }}>{item.l}</p>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.75rem", color:"var(--cream-50)", lineHeight:1 }}>{item.v}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent:"center" }}>
                Book a Free Zoom Audit
              </a>
              <Link href="/packages" style={{ color:"rgba(249,247,240,0.35)", fontSize:"0.8rem", textDecoration:"none" }}>
                View all pricing packages →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <CTA
        heading="Ready to Build a Website That Actually Works?"
        subtext="Book a free 30-minute Zoom audit. We'll review your current presence, identify your top opportunities, and outline exactly what we'd build for your business."
      />
    </>
  );
}

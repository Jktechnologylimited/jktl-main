import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "High-Converting Landing Page Designer USA | JK Technology Limited",
  description: "Landing pages that average 8–14% conversion rates. Full copywriting, A/B testing ready, built for paid ads or organic traffic. Serving all 50 US states. From $800.",
  keywords: ["high converting landing page", "landing page designer USA", "landing page with SEO", "conversion rate optimisation", "landing page for Google Ads"],
  alternates: { canonical: "https://jktl.com.ng/services/landing-pages" },
};

export default function LandingPagesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"14px" }}>High-Converting Landing Pages</p>
            <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)" }}>
              Landing Pages That<br/>
              <em className="not-italic gold-text">Convert at 8–14%.</em>
            </h1>
            <p className="body-lg" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"560px", marginBottom:"12px" }}>
              The industry average is 2–4%. That gap is the difference between a campaign that bleeds money and one that prints it.
            </p>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)", marginBottom:"32px" }}>
              From $800 · 3–5 business day delivery · 48-hour rush available
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                Book Free Zoom Audit
              </a>
              <a href={`mailto:${siteConfig.email}?subject=Landing Page Enquiry`} className="btn-outline-cream">
                Email Your Brief
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion comparison */}
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-5" style={{ color:"var(--navy-900)" }}>Why Most Landing Pages Fail</h2>
            {[
              "They try to do too many things — multiple offers, too many navigation options, unfocused copy written for everyone and persuading nobody.",
              "Or they're built by the same person running your ads — great at targeting, but with no background in conversion psychology or professional copywriting.",
              "A high-converting landing page has one job: take a visitor who is mildly interested and move them to take one specific action. Every element exists for that purpose.",
            ].map((p, i) => <p key={i} className="body-md" style={{ color:"rgba(28,28,30,0.62)", marginBottom:"14px" }}>{p}</p>)}
          </div>
          {/* Conversion chart */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"32px" }}>
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)", marginBottom:"24px" }}>Conversion Rate Comparison</p>
            {[
              { label:"Industry average",    rate:2.4,  color:"#EF4444" },
              { label:"Good landing page",   rate:5.5,  color:"#F59E0B" },
              { label:"Our landing pages",   rate:11.2, color:"var(--gold-400)" },
            ].map(item => (
              <div key={item.label} style={{ marginBottom:"20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span className="body-sm" style={{ color:"rgba(249,247,240,0.55)" }}>{item.label}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:item.color, fontSize:"0.9rem" }}>{item.rate}%</span>
                </div>
                <div style={{ height:"8px", background:"rgba(249,247,240,0.07)", borderRadius:"2px", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(item.rate/14)*100}%`, background:item.color, borderRadius:"2px" }} />
                </div>
              </div>
            ))}
            <p className="label-xs" style={{ color:"rgba(249,247,240,0.2)", marginTop:"20px", borderTop:"1px solid rgba(249,247,240,0.06)", paddingTop:"14px" }}>
              Based on client campaign data 2024–2026
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ background:"var(--cream-100)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="display-lg mb-10 text-center" style={{ color:"var(--navy-900)" }}>What Every Landing Page Includes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title:"Conversion Strategy", icon:"🧠", items:["Audience & offer analysis","Funnel position assessment","Competitor page audit","Hook and angle development"] },
              { title:"Copywriting",          icon:"✍️", items:["Full page copy — we write it","Three headline variants","Objection-handling sections","Genuine urgency elements"] },
              { title:"Design & Build",       icon:"🎨", items:["Custom conversion design","Mobile-first (70%+ traffic)","Sub-2s load time","A/B testing ready"] },
              { title:"Tracking",             icon:"📊", items:["Facebook Pixel setup","Google Ads conversion tracking","CRM / email integration","Analytics with events"] },
            ].map(cat => (
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

      {/* Pricing */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="display-lg mb-8" style={{ color:"var(--cream-50)" }}>Investment</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title:"Standard",      price:"$800",  delivery:"3–5 business days", note:"All deliverables above included",         highlight:false },
              { title:"Rush Delivery", price:"$1,100", delivery:"48 hours",          note:"Priority queue + same-day briefing call",  highlight:true },
            ].map(pkg => (
              <div key={pkg.title} style={{ background: pkg.highlight ? "rgba(201,168,76,0.08)" : "rgba(249,247,240,0.04)", border: pkg.highlight ? "1px solid rgba(201,168,76,0.3)" : "1px solid rgba(249,247,240,0.1)", borderRadius:"4px", padding:"32px" }}>
                <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"8px" }}>{pkg.title}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.2rem", color:"var(--cream-50)", lineHeight:1, marginBottom:"6px" }}>{pkg.price}</p>
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"4px" }}>{pkg.delivery}</p>
                <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)", marginBottom:"24px" }}>{pkg.note}</p>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className={pkg.highlight ? "btn-gold" : "btn-outline-cream"} style={{ width:"100%", justifyContent:"center" }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        heading="One Better Landing Page. One Better Campaign."
        subtext="Book a free Zoom audit. We'll review your current page or campaign brief, identify the conversion gaps, and show you exactly what we'd build differently."
      />
    </>
  );
}

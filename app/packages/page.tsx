import type { Metadata } from "next";
import Link from "next/link";
import { packages, seoTiers, addOns, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Pricing & Packages — Web Design & SEO | JK Technology Limited",
  description: "Transparent pricing for AI business websites, landing pages, and SEO retainers. Fixed scope. No hidden fees. Projects from $800. SEO from $600/month.",
  alternates: { canonical: "https://jktl.com.ng/packages" },
};

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px", textAlign:"center" }}>
        <div className="max-w-4xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block", margin:"0 auto 24px" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)" }}>
            Transparent Pricing.<br/>
            <em className="not-italic gold-text">Clear Deliverables.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"520px", margin:"0 auto 16px" }}>
            Every project is scoped before we begin. You know what you&apos;re getting, what it costs, and when it will be delivered.
          </p>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.3)" }}>
            50% deposit to begin · 50% on delivery · Instalment plans available for Growth &amp; Authority
          </p>
        </div>
      </section>

      {/* Website packages */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Website Packages</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>One-time project. Full design, copy, and SEO included.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px mb-6" style={{ background:"var(--cream-300)" }}>
            {packages.map(pkg => (
              <div key={pkg.name} style={{ padding:"40px 36px", background: pkg.highlight ? "var(--navy-900)" : "var(--cream-50)", display:"flex", flexDirection:"column", position:"relative" }}>
                {pkg.highlight && (
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />
                )}
                <p className="label-xs" style={{ color: pkg.highlight ? "rgba(249,247,240,0.4)" : "rgba(28,28,30,0.35)", marginBottom:"8px" }}>{pkg.name}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.8rem", color: pkg.highlight ? "var(--cream-50)" : "var(--navy-900)", lineHeight:1, marginBottom:"8px" }}>{pkg.price}</p>
                <p className="body-sm" style={{ color: pkg.highlight ? "rgba(249,247,240,0.5)" : "rgba(28,28,30,0.5)", marginBottom:"4px" }}>{pkg.tagline}</p>
                <p className="label-xs" style={{ color: pkg.highlight ? "var(--gold-400)" : "var(--navy-500)", marginBottom:"28px" }}>Delivery: {pkg.delivery}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", flex:1, marginBottom:"28px" }}>
                  {pkg.features.map(f => (
                    <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <span style={{ color: pkg.highlight ? "var(--gold-400)" : "var(--navy-600)", flexShrink:0, fontSize:"0.8rem" }}>✓</span>
                      <span className="body-sm" style={{ color: pkg.highlight ? "rgba(249,247,240,0.7)" : "rgba(28,28,30,0.65)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className={pkg.highlight ? "btn-gold" : "btn-outline-navy"} style={{ justifyContent:"center" }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
          {/* All include */}
          <div style={{ padding:"22px 24px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
            <p style={{ fontWeight:600, fontSize:"0.85rem", color:"var(--navy-900)", marginBottom:"12px" }}>All website packages include:</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"10px" }}>
              {["Strategy & discovery call","Written proposal with fixed scope","Custom design — no templates","Two rounds of revisions","Launch support & handover session","Google Search Console submission"].map(item => (
                <span key={item} style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"0.78rem", color:"rgba(28,28,30,0.6)", background:"#fff", padding:"5px 12px", borderRadius:"2px", border:"1px solid var(--cream-300)" }}>
                  <span style={{ color:"var(--success,#10B981)" }}>✓</span> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Landing page pricing */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Landing Page Pricing</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>One focused page. One clear goal. Full copywriting included.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4" style={{ maxWidth:"580px" }}>
            {[
              { title:"Standard",      price:"$800",  delivery:"3–5 business days", note:"All deliverables included", highlight:false },
              { title:"Rush Delivery", price:"$1,100", delivery:"48 hours",          note:"Priority queue + same-day briefing", highlight:true },
            ].map(pkg => (
              <div key={pkg.title} style={{ padding:"32px", background: pkg.highlight ? "var(--navy-900)" : "#fff", border: pkg.highlight ? "none" : "1px solid var(--cream-300)", borderRadius:"4px" }}>
                <p className="label-xs" style={{ color: pkg.highlight ? "rgba(249,247,240,0.4)" : "rgba(28,28,30,0.4)", marginBottom:"8px" }}>{pkg.title}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.2rem", color: pkg.highlight ? "var(--cream-50)" : "var(--navy-900)", lineHeight:1, marginBottom:"6px" }}>{pkg.price}</p>
                <p className="label-xs" style={{ color: pkg.highlight ? "var(--gold-400)" : "var(--navy-500)", marginBottom:"4px" }}>{pkg.delivery}</p>
                <p className="body-sm" style={{ color: pkg.highlight ? "rgba(249,247,240,0.4)" : "rgba(28,28,30,0.45)", marginBottom:"24px" }}>{pkg.note}</p>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className={pkg.highlight ? "btn-gold" : "btn-outline-navy"} style={{ width:"100%", justifyContent:"center" }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO tiers */}
      <section style={{ background:"var(--navy-900)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <h2 className="display-lg mb-2" style={{ color:"var(--cream-50)" }}>SEO Retainer Plans</h2>
            <p className="body-sm" style={{ color:"rgba(249,247,240,0.4)" }}>Minimum 3-month engagement. Cancel anytime after that.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ background:"rgba(249,247,240,0.06)" }}>
            {seoTiers.map(tier => (
              <div key={tier.name} style={{ padding:"36px 32px", background: tier.highlight ? "var(--navy-700)" : "var(--navy-800)", position:"relative" }}>
                {tier.highlight && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />}
                <p className="label-xs" style={{ color: tier.highlight ? "var(--gold-400)" : "rgba(249,247,240,0.35)", marginBottom:"8px" }}>{tier.name}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.5rem", color:"var(--cream-50)", lineHeight:1 }}>{tier.price}</p>
                <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)", marginBottom:"24px" }}>{tier.period}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px" }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display:"flex", gap:"8px" }}>
                      <span style={{ color:"var(--gold-400)", flexShrink:0, fontSize:"0.8rem" }}>✓</span>
                      <span className="body-sm" style={{ color:"rgba(249,247,240,0.6)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className={tier.highlight ? "btn-gold" : "btn-outline-cream"} style={{ width:"100%", justifyContent:"center" }}>
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ background:"var(--cream-50)", padding:"72px 32px" }}>
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Add-Ons</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Add to any package or order as standalone services.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"6px" }}>
            {addOns.map(a => (
              <div key={a.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <span className="body-sm">{a.name}</span>
                <span style={{ fontWeight:700, fontSize:"0.82rem", color:"var(--navy-600)", whiteSpace:"nowrap", marginLeft:"12px" }}>{a.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="display-lg mb-8 text-center" style={{ color:"var(--navy-900)" }}>Pricing Questions</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {[
              { q:"Do I pay everything upfront?", a:"No. For projects under $2,000: 50% upfront and 50% on delivery. For Growth and Authority packages: 40% upfront, 40% at design approval, 20% on launch. SEO retainers are billed monthly." },
              { q:"Are prices in USD?", a:"Yes. All prices are in USD. We accept bank transfer, Stripe, and Wise. We work with US-based clients across all time zones." },
              { q:"What if I need something custom?", a:"Email us at info@jktl.com.ng or book a Zoom call. We quote custom projects within 24 hours. Custom scopes don't cost more — they're just scoped differently." },
              { q:"Is the Zoom audit really free?", a:"Yes, entirely. We review your site, identify your top three opportunities, and give you a specific plan. We only propose work if there's a genuine fit. Many audits simply result in useful advice." },
            ].map((faq, i) => (
              <div key={i} style={{ padding:"22px 24px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)", marginBottom:"6px" }}>{faq.q}</p>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.6)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA heading="Not Sure Which Package Is Right?" subtext="Book a free Zoom call. We'll assess your situation and recommend the right combination — or build a custom scope that fits your exact needs and budget." />
    </>
  );
}

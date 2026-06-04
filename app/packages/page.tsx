import type { Metadata } from "next";
import Link from "next/link";
import { packages, services, flagshipPackage, addOns, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import TryDemoButton from "@/components/ui/TryDemoButton";

export const metadata: Metadata = {
  title: "Packages & Pricing | JK Technology Limited",
  description: "Transparent pricing for digital systems -- websites, landing pages, SEO, CRM, email automation, AI. Starter from N150,000. Enterprise systems to N5,000,000+.",
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
            All prices in Nigerian Naira (N) | 50% deposit to begin | Instalment plans available
          </p>
        </div>
      </section>

      {/* 3 main packages */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>System Packages</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Choose the package that matches where your business is today -- and where you want to go.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px mb-6" style={{ background:"var(--cream-300)" }}>
            {packages.map((pkg) => (
              <div key={pkg.name} style={{ padding:"40px 36px", background: pkg.highlight ? "var(--navy-900)" : "var(--cream-50)", display:"flex", flexDirection:"column", position:"relative" }}>
                {pkg.highlight && <div style={{ position:"absolute", top:0, left:0, right:0, height:"2px", background:"var(--gold-400)" }} />}
                <p className="label-xs" style={{ color: pkg.highlight ? "rgba(249,247,240,0.4)" : "rgba(28,28,30,0.35)", marginBottom:"4px" }}>{pkg.name}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1rem", color: pkg.highlight ? "var(--gold-400)" : "var(--navy-500)", marginBottom:"10px" }}>{pkg.subtitle}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2.4rem", color: pkg.highlight ? "var(--cream-50)" : "var(--navy-900)", lineHeight:1, marginBottom:"4px" }}>{pkg.price}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color: pkg.highlight ? "rgba(249,247,240,0.45)" : "rgba(28,28,30,0.4)", marginBottom:"4px" }}>to {pkg.priceTo}</p>
                <p className="label-xs" style={{ color: pkg.highlight ? "var(--gold-400)" : "var(--navy-500)", marginBottom:"16px" }}>{pkg.priceNote}</p>
                <p className="body-sm" style={{ color: pkg.highlight ? "rgba(249,247,240,0.5)" : "rgba(28,28,30,0.5)", marginBottom:"24px", flex:0 }}>{pkg.tagline}</p>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"10px", flex:1, marginBottom:"28px" }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <span style={{ color: pkg.highlight ? "var(--gold-400)" : "var(--navy-600)", flexShrink:0, fontSize:"0.8rem", marginTop:"2px" }}>v</span>
                      <span className="body-sm" style={{ color: pkg.highlight ? "rgba(249,247,240,0.7)" : "rgba(28,28,30,0.65)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={`mailto:${siteConfig.email}`} className={pkg.highlight ? "btn-gold" : "btn-outline-navy"} style={{ justifyContent:"center" }}>
                  Get Started
                </a>
                <TryDemoButton href="/demos" label="Try Demo First" variant="outline" style={{ justifyContent:"center", width:"100%" }} />
              </div>
            ))}
          </div>

          {/* Flagship */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"var(--gold-400)" }} />
            <div className="grid md:grid-cols-3">
              <div style={{ padding:"40px 36px", borderRight:"1px solid rgba(249,247,240,0.08)" }} className="md:col-span-2">
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"6px" }}>
                  {flagshipPackage.number} -- {flagshipPackage.label}
                </p>
                <h3 className="display-lg mb-3" style={{ color:"var(--cream-50)" }}>{flagshipPackage.name}</h3>
                <p className="body-md" style={{ color:"rgba(249,247,240,0.55)", marginBottom:"20px" }}>{flagshipPackage.description}</p>
                <ul style={{ listStyle:"none", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"8px" }}>
                  {flagshipPackage.features.map((f) => (
                    <li key={f} style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
                      <span style={{ color:"var(--gold-400)", flexShrink:0, fontSize:"0.8rem", marginTop:"2px" }}>v</span>
                      <span className="body-sm" style={{ color:"rgba(249,247,240,0.65)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start", gap:"12px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2rem", color:"var(--cream-50)", lineHeight:1 }}>{flagshipPackage.priceFrom}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"rgba(249,247,240,0.4)", lineHeight:1 }}>to {flagshipPackage.priceTo}</p>
                <p className="label-xs" style={{ color:"var(--gold-400)" }}>{flagshipPackage.deliveryNote}</p>
                <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ marginTop:"8px" }}>
                  Discuss This Package
                </a>
              <TryDemoButton href="/demos" label="Try All Demos" variant="outline" style={{ width:"100%", justifyContent:"center" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All 7 individual services */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Individual Service Pricing</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Pick the services your business needs most, or bundle them into a package above.</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
            {services.map((s) => (
              <div key={s.slug} style={{ display:"flex", flexWrap:"wrap", gap:"12px", alignItems:"center", justifyContent:"space-between", padding:"18px 24px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <div style={{ display:"flex", gap:"14px", alignItems:"center" }}>
                  <span style={{ fontSize:"1.2rem" }}>{s.icon}</span>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--navy-900)" }}>{s.label}</p>
                    <p className="label-xs" style={{ color:"var(--navy-500)", marginTop:"2px" }}>{s.tier}</p>
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.25rem", color:"var(--navy-900)", lineHeight:1 }}>
                    {s.priceFrom} - {s.priceTo}
                  </p>
                  {s.priceMonthly && <p className="label-xs" style={{ color:"var(--navy-500)", marginTop:"3px" }}>+ {s.priceMonthly}</p>}
                  {s.priceAlt && !s.priceMonthly && <p className="label-xs" style={{ color:"rgba(28,28,30,0.35)", marginTop:"3px" }}>{s.priceAlt}</p>}
                </div>
                <Link href={`/services/${s.slug}`} className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"underline", textUnderlineOffset:"3px" }}>
                  Details {"->"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section style={{ background:"var(--cream-50)", padding:"72px 32px" }}>
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-8">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Add-Ons</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Add to any package or order standalone.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:"6px" }}>
            {addOns.map((a) => (
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
              { q:"Do I pay everything upfront?", a:"No. Standard projects require 50% upfront and 50% on delivery. Larger projects (N500,000+) can use a 40/40/20 split: 40% to start, 40% at design approval, 20% on launch. Monthly retainers are billed monthly." },
              { q:"What if I want to start small and scale up?", a:"That's common and it's exactly why we have the Starter package. Many clients begin with a basic website, then add SEO, then add CRM as their budget grows. We build everything to be upgradeable from day one." },
              { q:"Do you work with businesses outside Lagos or Port Harcourt?", a:"Yes -- 100% remote delivery. We work with businesses across all Nigerian states, as well as the UK. We have never needed to meet a client in person to deliver excellent results." },
              { q:"Is the discovery call really free?", a:"Yes, entirely. We review your current situation, identify your top opportunities, and give you a specific recommendation. If there's no fit, we'll tell you honestly. No pitch at the end -- just useful advice." },
            ].map((faq, i) => (
              <div key={i} style={{ padding:"22px 24px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                <p style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)", marginBottom:"6px" }}>{faq.q}</p>
                <p className="body-sm" style={{ color:"rgba(28,28,30,0.6)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA heading="Ready to Invest in Systems That Pay for Themselves?" subtext="contact us. We'll assess your situation and recommend the right package -- or build a custom scope that fits your exact stage and budget." />
    </>
  );
}

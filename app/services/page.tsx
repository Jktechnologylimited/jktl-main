import type { Metadata } from "next";
import Link from "next/link";
import { services, flagshipPackage, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Digital Systems & Services | JK Technology Limited",
  description: "8 digital services: websites, landing pages, email automation, SEO, CRM, payment systems, AI — fully integrated to help your business get customers, convert leads, and automate operations.",
  alternates: { canonical: "https://jktl.com.ng/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            8 Systems.<br/>
            <em className="not-italic gold-text">One Integrated Strategy.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            Every service we offer connects to the others. Together they form a complete business growth system — attract, capture, nurture, convert, retain.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8 space-y-4">
          {services.map((s, i) => (
            <div key={s.slug} style={{ background:"#fff", border: s.highlight ? `2px solid var(--navy-600)` : "1px solid var(--cream-300)", borderRadius:"4px", overflow:"hidden" }}>
              {s.highlight && (
                <div style={{ background:"var(--navy-900)", padding:"10px 28px" }}>
                  <p className="label-xs" style={{ color:"var(--gold-400)" }}>— Most Popular Service</p>
                </div>
              )}
              <div className="grid md:grid-cols-5">
                {/* Left */}
                <div style={{ padding:"40px 36px", background: i % 2 !== 0 ? "var(--cream-100)" : "#fff" }} className="md:col-span-2">
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"12px" }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.2rem", fontWeight:300, color:"var(--gold-400)" }}>{s.number}</span>
                    <span style={{ fontSize:"1.4rem" }}>{s.icon}</span>
                    <p className="label-xs" style={{ color:"var(--navy-500)" }}>{s.tier}</p>
                  </div>
                  <h2 className="display-lg mb-2" style={{ color:"var(--navy-900)" }}>{s.label}</h2>
                  <p className="body-md" style={{ color:"rgba(28,28,30,0.6)", marginBottom:"20px" }}>{s.tagline}</p>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.55)", marginBottom:"20px" }}>{s.description}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"20px" }}>
                    {s.bestFor.map((b) => (
                      <span key={b} style={{ fontSize:"0.72rem", fontWeight:600, color:"var(--navy-600)", background:"var(--navy-50,#EEF2F9)", padding:"4px 12px", borderRadius:"2px", border:"1px solid var(--navy-100,#D0DAED)" }}>{b}</span>
                    ))}
                  </div>
                  <div style={{ padding:"16px 18px", background:"var(--navy-900)", borderRadius:"2px", marginBottom:"16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"4px" }}>
                      <span className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>From</span>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.3rem", color:"var(--cream-50)", lineHeight:1 }}>{s.priceFrom}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>Up to</span>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"rgba(249,247,240,0.7)", lineHeight:1 }}>{s.priceTo}</span>
                    </div>
                    {s.priceMonthly && (
                      <div style={{ display:"flex", justifyContent:"space-between", marginTop:"4px", paddingTop:"6px", borderTop:"1px solid rgba(249,247,240,0.08)" }}>
                        <span className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>Monthly</span>
                        <span className="label-xs" style={{ color:"var(--gold-400)" }}>{s.priceMonthly}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    <Link href={`/services/${s.slug}`} className="btn-primary" style={{ justifyContent:"center" }}>
                      View Full Details
                    </Link>
                    <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-outline-navy" style={{ justifyContent:"center" }}>
                      Book Free Consultation
                    </a>
                  </div>
                </div>
                {/* Right: features */}
                <div style={{ padding:"40px 36px", borderLeft:"1px solid var(--cream-300)" }} className="md:col-span-3">
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)", marginBottom:"20px" }}>What&apos;s Included</p>
                  <ul className="check-list" style={{ listStyle:"none", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"4px" }}>
                    {s.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {/* Flagship */}
          <div style={{ background:"var(--navy-900)", borderRadius:"4px", overflow:"hidden", border:"2px solid var(--gold-400)", position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:"var(--gold-400)" }} />
            <div className="grid md:grid-cols-5">
              <div style={{ padding:"40px 36px" }} className="md:col-span-3">
                <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"6px" }}>{flagshipPackage.number} — {flagshipPackage.label}</p>
                <h2 className="display-lg mb-3" style={{ color:"var(--cream-50)" }}>{flagshipPackage.name}</h2>
                <p className="body-md" style={{ color:"rgba(249,247,240,0.55)", marginBottom:"20px" }}>{flagshipPackage.description}</p>
                <ul className="check-list" style={{ listStyle:"none", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px" }}>
                  {flagshipPackage.features.map((f) => <li key={f} style={{ color:"rgba(249,247,240,0.7)" }}>{f}</li>)}
                </ul>
              </div>
              <div style={{ padding:"40px 36px", borderLeft:"1px solid rgba(249,247,240,0.08)", display:"flex", flexDirection:"column", justifyContent:"center", gap:"12px" }} className="md:col-span-2">
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"2rem", color:"var(--cream-50)", lineHeight:1 }}>{flagshipPackage.priceFrom}</p>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"rgba(249,247,240,0.4)", lineHeight:1 }}>to {flagshipPackage.priceTo}</p>
                <p className="label-xs" style={{ color:"var(--gold-400)" }}>{flagshipPackage.deliveryNote}</p>
                <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Discuss This Package
                </a>
                <Link href="/packages" className="btn-outline-cream" style={{ justifyContent:"center", textAlign:"center" }}>
                  View All Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA heading="Not Sure Which Service You Need?" subtext="Book a free discovery call. We'll assess your current situation and recommend exactly which services will move the needle fastest for your business." />
    </>
  );
}

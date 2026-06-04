import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import TryDemoButton from "@/components/ui/TryDemoButton";
import DemoCallout from "@/components/ui/DemoCallout";

const service = services.find(s => s.slug === "seo")!;

export const metadata: Metadata = {
  title: `${service?.label} | JK Technology Limited`,
  description: `${service?.tagline}. ${service?.description}`,
  alternates: { canonical: `https://jktl.com.ng/services/seo` },
};

export default function ServicePage() {
  if (!service) return null;
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"10px" }}>{service.number} -- {service.tier}</p>
            <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)" }}>
              <em className="not-italic" style={{ fontSize:"2rem", display:"block", marginBottom:"8px" }}>{service.icon}</em>
              {service.label}
            </h1>
            <p className="body-lg" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"560px", marginBottom:"12px" }}>{service.tagline}</p>
            <p className="body-md" style={{ color:"rgba(249,247,240,0.45)", maxWidth:"560px", marginBottom:"28px" }}>{service.description}</p>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:300, color:"var(--gold-300)", marginBottom:"28px" }}>
              {service.priceFrom} - {service.priceTo}
              {service.priceMonthly && <span style={{ fontSize:"1rem", color:"rgba(249,247,240,0.4)", marginLeft:"10px" }}>+ {service.priceMonthly}</span>}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
              <a href={`mailto:${siteConfig.email}`} className="btn-gold">Book Free Consultation</a>
              <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream">Email Us</a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-6" style={{ color:"var(--navy-900)" }}>What&apos;s Included</h2>
            <ul className="check-list" style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"4px" }}>
              {service.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="display-lg mb-6" style={{ color:"var(--navy-900)" }}>Best For</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"32px" }}>
              {service.bestFor.map(b => (
                <div key={b} style={{ display:"flex", gap:"12px", alignItems:"center", padding:"14px 18px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                  <span style={{ color:"var(--gold-400)" }}>{"->"}</span>
                  <span style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)" }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"24px", background:"var(--navy-900)", borderRadius:"4px" }}>
              <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"10px" }}>Investment</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.8rem", color:"var(--cream-50)", lineHeight:1, marginBottom:"4px" }}>{service.priceFrom}</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"rgba(249,247,240,0.4)", marginBottom: service.priceMonthly ? "8px" : "20px" }}>to {service.priceTo}</p>
              {service.priceMonthly && <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"20px" }}>+ {service.priceMonthly}</p>}
              <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ width:"100%", justifyContent:"center" }}>
                Book Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background:"var(--cream-100)", padding:"56px 32px" }}>
        <div className="max-w-5xl mx-auto px-8 text-center">
          <h2 className="display-lg mb-4" style={{ color:"var(--navy-900)" }}>Other Services</h2>
          <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginBottom:"24px" }}>Our services are most effective when integrated. See what else we build.</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", justifyContent:"center" }}>
            {["/services", "/services/website-systems", "/services/lead-generation", "/services/email-automation", "/services/seo", "/services/crm-operations", "/services/payment-infrastructure", "/services/ai-automation"].filter(h => h !== `/services/seo`).map(href => (
              <Link key={href} href={href} className="label-xs" style={{ color:"var(--navy-600)", textDecoration:"underline", textUnderlineOffset:"3px", padding:"6px 12px", background:"#fff", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                {href === "/services" ? "All Services" : href.split("/").pop()?.replace(/-/g," ")}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DemoCallout
        demoSlug="seo"
        demoTitle="SEO & Google Visibility Dashboard"
        demoDescription="See a live Google SERP preview for your business, explore keyword rankings, and run through the full SEO health checklist -- all with your own business name and city."
        accentColor="#DC2626"
        extraDemos={[{ slug: "website", label: "Website System" }]}
      />
      <CTA />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { services, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Web Design & SEO Services for US Businesses | JK Technology Limited",
  description: "AI business websites, high-converting landing pages, and SEO services for service businesses across all 50 US states. 6+ years experience. Book a free Zoom audit.",
  alternates: { canonical: "https://jktl.com.ng/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-5" style={{ color:"var(--cream-50)", maxWidth:"700px" }}>
            Everything Your Business Needs to{" "}
            <em className="not-italic gold-text">Rank, Convert, and Grow.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"520px" }}>
            Three core services. One integrated strategy. Built for US service businesses that want measurable results.
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
                <div style={{ padding:"44px 40px", background: i % 2 !== 0 ? "var(--cream-100)" : "#fff" }} className="md:col-span-2">
                  <p className="label-xs" style={{ color:"var(--navy-500)", marginBottom:"8px" }}>{s.tier}</p>
                  <h2 className="display-lg mb-3" style={{ color:"var(--navy-900)" }}>{s.label}</h2>
                  <p className="body-md" style={{ color:"rgba(28,28,30,0.6)", marginBottom:"24px" }}>{s.description}</p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"24px" }}>
                    {s.bestFor.map((b) => (
                      <span key={b} style={{ fontSize:"0.72rem", fontWeight:600, color:"var(--navy-600)", background:"var(--navy-50,#EEF2F9)", padding:"4px 12px", borderRadius:"2px", border:"1px solid var(--navy-100,#D0DAED)" }}>{b}</span>
                    ))}
                  </div>

                  <div style={{ padding:"18px 20px", background:"var(--navy-900)", borderRadius:"2px", marginBottom:"20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                      <span className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>Starting from</span>
                      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--cream-50)", lineHeight:1 }}>{s.price}</span>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between" }}>
                      <span className="label-xs" style={{ color:"rgba(249,247,240,0.4)" }}>Delivery</span>
                      <span className="label-xs" style={{ color:"var(--gold-400)" }}>{s.delivery}</span>
                    </div>
                  </div>

                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    <Link href={`/services/${s.slug}`} className="btn-primary" style={{ justifyContent:"center" }}>
                      View Full Details
                    </Link>
                    <a href={siteConfig.zoomLink} target="_blank" rel="noopener noreferrer" className="btn-outline-navy" style={{ justifyContent:"center" }}>
                      Book Free Zoom Audit
                    </a>
                  </div>
                </div>

                {/* Right: features */}
                <div style={{ padding:"44px 40px", borderLeft:"1px solid var(--cream-300)" }} className="md:col-span-3">
                  <p className="label-xs" style={{ color:"rgba(28,28,30,0.3)", marginBottom:"20px" }}>What&apos;s Included</p>
                  <ul className="check-list" style={{ listStyle:"none", display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"4px" }}>
                    {s.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA
        heading="Not Sure Which Service You Need?"
        subtext="Book a free 30-minute Zoom audit. We'll assess your current digital presence and recommend the exact service combination that will move the needle fastest for your business."
      />
    </>
  );
}

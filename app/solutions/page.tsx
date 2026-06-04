import type { Metadata } from "next";
import { coupledSolutions, industrySystems, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import TryDemoButton from "@/components/ui/TryDemoButton";

export const metadata: Metadata = {
  title: "Complete Business Solutions | JK Technology Limited",
  description: "Pre-built, fully integrated systems for local services, clinics, SMEs, online sales, real estate, hotels, and supermarkets. Built for African businesses.",
  alternates: { canonical: "https://jktl.com.ng/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            Complete Systems for<br/>
            <em className="not-italic gold-text">Your Industry.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px" }}>
            Pre-built, fully integrated systems designed for specific industries. Not generic tools -- purpose-built infrastructure that covers every part of your operations.
          </p>
        </div>
      </section>

      {/* 5 coupled solutions */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Complete Coupled Solutions</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Pre-Built Systems for Different Industries</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            {coupledSolutions.map((sol) => (
              <div key={sol.slug} style={{ background:"#fff", border:"1px solid var(--cream-300)", borderLeft:`4px solid ${sol.color}`, borderRadius:"4px", padding:"32px 36px" }}>
                <div className="grid md:grid-cols-3 gap-10 items-start">
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"10px" }}>
                      <span style={{ fontSize:"1.75rem" }}>{sol.icon}</span>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.4rem", color:"var(--navy-900)", lineHeight:1.2 }}>{sol.title}</h3>
                    </div>
                    <p style={{ fontStyle:"italic", fontSize:"0.85rem", color:sol.color, fontWeight:600, marginBottom:"10px" }}>{sol.outcome}</p>
                    <p className="body-sm" style={{ color:"rgba(28,28,30,0.55)" }}><strong>Best for:</strong> {sol.bestFor}</p>
                  </div>
                  <div>
                    <p className="label-xs" style={{ color:"rgba(28,28,30,0.4)", marginBottom:"12px" }}>What&apos;s Included</p>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"7px" }}>
                      {sol.includes.map(inc => (
                        <li key={inc} style={{ display:"flex", gap:"8px", fontSize:"0.875rem", color:"rgba(28,28,30,0.7)" }}>
                          <span style={{ color:sol.color, flexShrink:0 }}>v</span>{inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    <a href={`mailto:${siteConfig.email}`} className="btn-primary" style={{ justifyContent:"center" }}>
                      Get This System
                    </a>
                    {sol.demoSlug && (
                      <TryDemoButton href={sol.demoSlug} label="Try Demo" variant="outline" style={{ justifyContent:"center", width:"100%" }} />
                    )}
                    <a href={`mailto:${siteConfig.email}`} className="btn-outline-navy" style={{ justifyContent:"center" }}>
                      Ask a Question
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry-specific */}
      <section style={{ background:"var(--cream-100)", padding:"72px 32px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10">
            <span className="gold-rule mb-4" style={{ display:"block" }} />
            <h2 className="display-lg" style={{ color:"var(--navy-900)" }}>Industry-Specific Systems</h2>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.5)", marginTop:"6px" }}>Build Once. Deploy Many. Scale Forever.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {industrySystems.map((sys) => (
              <div key={sys.slug} style={{ background:"var(--navy-900)", borderRadius:"4px", padding:"36px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
                  <span style={{ fontSize:"2rem" }}>{sys.icon}</span>
                  <div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.5rem", color:"var(--cream-50)", lineHeight:1.15 }}>{sys.title}</h3>
                    <p className="label-xs" style={{ color:"var(--gold-400)", marginTop:"3px" }}>{sys.subtitle}</p>
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px", marginBottom:"20px" }}>
                  {sys.modules.map(mod => (
                    <span key={mod} style={{ fontSize:"0.72rem", fontWeight:600, color:"rgba(249,247,240,0.7)", background:"rgba(249,247,240,0.07)", padding:"5px 12px", borderRadius:"2px" }}>{mod}</span>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-20px" style={{ marginBottom:"20px" }}>
                  <div style={{ padding:"12px 14px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.15)", borderRadius:"2px" }}>
                    <p className="label-xs" style={{ color:"#F87171", marginBottom:"6px" }}>Problems Solved</p>
                    <p style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.55)" }}>{sys.problemsSolved}</p>
                  </div>
                  <div style={{ padding:"12px 14px", background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:"2px" }}>
                    <p className="label-xs" style={{ color:"#34D399", marginBottom:"6px" }}>Target Audience</p>
                    <p style={{ fontSize:"0.78rem", color:"rgba(249,247,240,0.55)" }}>{sys.targetAudience}</p>
                  </div>
                </div>
                <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ width:"100%", justifyContent:"center" }}>
                  Enquire About This System
                </a>
                <TryDemoButton href="/demos" label="Try a Demo First" variant="outline" style={{ width:"100%", justifyContent:"center", borderColor:"rgba(201,168,76,0.4)", color:"var(--gold-400)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA heading="Which System Is Right for Your Business?" subtext="Reach out via email or phone. We'll assess your operations and recommend the exact system that will give you the highest ROI." />
    </>
  );
}

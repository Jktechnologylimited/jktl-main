import { services, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";
import TryDemoButton from "@/components/ui/TryDemoButton";
import DemoCallout from "@/components/ui/DemoCallout";
import type { Metadata } from "next";

const s = services.find(x => x.slug === "website-systems")!;

export const metadata: Metadata = {
  title: "Website & Landing Page Systems | JK Technology Limited",
  description: "Your digital front door -- built to impress, rank, and convert. N150,000 - N800,000.",
};

export default function Page() {
  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-5xl mx-auto px-8">
          <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"10px" }}>01 -- Foundation</p>
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)" }}>Website & Landing Page Systems</h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.58)", maxWidth:"560px", marginBottom:"24px" }}>Your digital front door -- built to impress, rank, and convert</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:300, color:"var(--gold-300)", marginBottom:"28px" }}>
            N150,000 - N800,000
            
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"12px" }}>
            <a href={`mailto:${siteConfig.email}`} className="btn-gold">Get Started</a>
            <TryDemoButton href="/demos/website" label="Try Demo First" variant="outline" style={{ borderColor:"rgba(249,247,240,0.4)", color:"rgba(249,247,240,0.8)" }} />
            <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream">Email Us</a>
          </div>
        </div>
      </section>
      <section style={{ background:"var(--cream-50)", padding:"80px 32px" }}>
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="gold-rule mb-5" style={{ display:"block" }} />
            <h2 className="display-lg mb-5" style={{ color:"var(--navy-900)" }}>What&apos;s Included</h2>
            <ul className="check-list" style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"4px" }}>
              {s.features.map(f => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="display-lg mb-5" style={{ color:"var(--navy-900)" }}>Best For</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", marginBottom:"28px" }}>
              {s.bestFor.map(b => (
                <div key={b} style={{ display:"flex", gap:"12px", alignItems:"center", padding:"14px 18px", background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"2px" }}>
                  <span style={{ color:"var(--gold-400)" }}>{"->"}</span>
                  <span style={{ fontWeight:600, fontSize:"0.9rem", color:"var(--navy-900)" }}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:"24px", background:"var(--navy-900)", borderRadius:"4px" }}>
              <p className="label-xs" style={{ color:"rgba(249,247,240,0.4)", marginBottom:"10px" }}>Investment</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.8rem", color:"var(--cream-50)", lineHeight:1, marginBottom:"4px" }}>N150,000</p>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.1rem", color:"rgba(249,247,240,0.4)", marginBottom:"20px" }}>to N800,000</p>
              
              <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ width:"100%", justifyContent:"center" }}>Get Started</a>
              <div style={{ marginTop:"10px" }}>
                <TryDemoButton href="/demos/website" label="Try Live Demo First" variant="outline" style={{ width:"100%", justifyContent:"center" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <DemoCallout
        demoSlug="website"
        demoTitle="Website System"
        demoDescription="Click through a live business website -- homepage, services page, contact form, and mobile view. See exactly what your visitors experience before we build yours."
        accentColor="#1A4A8A"
        extraDemos={[{ slug: "seo", label: "SEO Dashboard" }, { slug: "lead-generation", label: "Lead Generation" }]}
      />
      <CTA />
    </>
  );
}

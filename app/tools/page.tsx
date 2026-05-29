import type { Metadata } from "next";
import { freeTools, siteConfig } from "@/data/index";
import { CTA } from "@/components/sections/Sections";

export const metadata: Metadata = {
  title: "Free Business Tools | JK Technology Limited",
  description: "Free invoice generator, receipt generator, profit calculator, and pricing calculator for Nigerian businesses. Free forever. Premium features coming soon.",
  alternates: { canonical: "https://jktl.com.ng/tools" },
};

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)", maxWidth:"700px" }}>
            Free Business Tools.<br/>
            <em className="not-italic gold-text">Built for African Businesses.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px", marginBottom:"8px" }}>
            Professional tools that make your business look and run better — completely free. No credit card. No trial. Just tools that work.
          </p>
          <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)", maxWidth:"520px", fontStyle:"italic" }}>
            Each tool lives on its own subdomain (like Google does it). Premium features — history, team access, integrations — unlock when you upgrade.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {freeTools.map((tool) => (
              <div key={tool.slug} style={{ background:"#fff", border:"1px solid var(--cream-300)", borderTop:`3px solid ${tool.color}`, borderRadius:"4px", padding:"36px", display:"flex", flexDirection:"column" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", gap:"14px", marginBottom:"16px" }}>
                  <span style={{ fontSize:"2.2rem" }}>{tool.icon}</span>
                  <div>
                    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.5rem", color:"var(--navy-900)", lineHeight:1.1 }}>{tool.name}</h2>
                    <p className="label-xs" style={{ color:tool.color, marginTop:"4px" }}>{tool.subdomain}</p>
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", background:"rgba(16,185,129,0.1)", color:"#059669", padding:"4px 12px", borderRadius:"2px", border:"1px solid rgba(16,185,129,0.2)" }}>
                    FREE
                  </span>
                </div>
                <p className="body-md" style={{ color:"rgba(28,28,30,0.6)", marginBottom:"24px" }}>{tool.description}</p>

                {/* Free vs Premium */}
                <div className="grid md:grid-cols-2 gap-4 mb-24px" style={{ marginBottom:"24px" }}>
                  <div style={{ padding:"14px 16px", background:"rgba(16,185,129,0.04)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:"2px" }}>
                    <p className="label-xs" style={{ color:"#059669", marginBottom:"10px" }}>Free Forever</p>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                      {tool.freeFeatures.map(f => (
                        <li key={f} style={{ display:"flex", gap:"8px", fontSize:"0.8rem", color:"rgba(28,28,30,0.65)" }}>
                          <span style={{ color:"#10B981", flexShrink:0 }}>✓</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ padding:"14px 16px", background:"rgba(201,168,76,0.04)", border:"1px solid rgba(201,168,76,0.15)", borderRadius:"2px" }}>
                    <p className="label-xs" style={{ color:"var(--gold-400)", marginBottom:"10px" }}>Premium (Soon)</p>
                    <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"6px" }}>
                      {tool.premiumFeatures.map(f => (
                        <li key={f} style={{ display:"flex", gap:"8px", fontSize:"0.8rem", color:"rgba(28,28,30,0.45)" }}>
                          <span style={{ color:"var(--gold-400)", flexShrink:0 }}>◦</span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a href={`https://${tool.subdomain}`} target="_blank" rel="noopener noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px", padding:"14px 24px", background:tool.color, color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", textDecoration:"none", borderRadius:"2px", marginTop:"auto" }}>
                  Open {tool.name} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why free section */}
      <section style={{ background:"var(--navy-900)", padding:"72px 32px" }}>
        <div className="max-w-3xl mx-auto px-8 text-center">
          <div className="ornament mb-8" style={{ color:"var(--gold-400)" }}>
            <span className="label-xs">Why We Give These Away Free</span>
          </div>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"clamp(1.4rem,2.5vw,2rem)", color:"var(--cream-50)", lineHeight:1.55, marginBottom:"20px" }}>
            &ldquo;We believe every African business deserves professional tools — not just the ones who can afford expensive software. Use these freely. When you&apos;re ready to scale, we&apos;ll be here.&rdquo;
          </p>
          <p className="label-xs" style={{ color:"var(--gold-400)" }}>JK Technology Limited · {siteConfig.email}</p>
        </div>
      </section>

      <CTA heading="Need a Full Business System?" subtext="The free tools are just the beginning. Book a discovery call to see how a complete integrated system can transform your business operations and revenue." />
    </>
  );
}

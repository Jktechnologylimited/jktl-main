import { siteConfig } from "@/data/index";

// Standalone CTA used at the bottom of custom client pages served by
// app/[slug]/page.tsx (real, published pages for existing client
// businesses -- law firm sites, school/church sites, etc.). Extracted from
// the old components/sections/Sections.tsx bundle so it doesn't depend on
// data (services, processSteps, flagshipPackage) that no longer exists.
export function CTA({
  heading = "Ready to get started?",
  subtext = "Reach out via email or phone and we'll help however we can.",
}: { heading?: string; subtext?: string }) {
  return (
    <section style={{ background: "var(--navy-900)", padding: "100px 32px", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "250px", background: "radial-gradient(ellipse,rgba(201,168,76,0.08) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto" }}>
        <div className="ornament mb-8" style={{ color: "var(--gold-400)" }}>
          <span className="label-xs">Begin</span>
        </div>
        <h2 className="display-xl mb-5" style={{ color: "var(--cream-50)" }}>{heading}</h2>
        <p className="body-lg" style={{ color: "rgba(249,247,240,0.5)", marginBottom: "36px" }}>{subtext}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "20px" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="btn-outline-cream">
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}

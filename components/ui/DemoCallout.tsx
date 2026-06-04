import Link from "next/link";
import { siteConfig } from "@/data/index";

interface DemoCalloutProps {
  demoSlug: string;
  demoTitle: string;
  demoDescription: string;
  accentColor?: string;
  extraDemos?: { slug: string; label: string }[];
}

export default function DemoCallout({
  demoSlug,
  demoTitle,
  demoDescription,
  accentColor = "var(--navy-600)",
  extraDemos = [],
}: DemoCalloutProps) {
  return (
    <section style={{ background: "var(--cream-100)", padding: "56px 32px", borderTop: "1px solid var(--cream-300)" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div style={{
          background: "var(--navy-900)",
          borderRadius: "4px",
          padding: "40px 44px",
          display: "flex",
          flexWrap: "wrap",
          gap: "28px",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          borderLeft: `4px solid ${accentColor}`,
        }}>
          {/* Background glow */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: `radial-gradient(ellipse at right, ${accentColor}18 0%, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ flex: 1, minWidth: "260px", position: "relative" }}>
            {/* Label */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <div style={{ width: 28, height: 28, background: accentColor, borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(249,247,240,0.45)" }}>
                Live Interactive Demo
              </span>
            </div>

            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "clamp(1.25rem,2.5vw,1.75rem)", color: "var(--cream-50)", lineHeight: 1.2, marginBottom: "8px" }}>
              Try {demoTitle} -- Before You Commit
            </h3>
            <p style={{ fontSize: "0.85rem", color: "rgba(249,247,240,0.5)", lineHeight: 1.6, maxWidth: "460px" }}>
              {demoDescription}
            </p>

            {/* Extra demos */}
            {extraDemos.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                <span style={{ fontSize: "0.68rem", color: "rgba(249,247,240,0.3)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Also try:</span>
                {extraDemos.map(d => (
                  <Link key={d.slug} href={`/demos/${d.slug}`}
                    style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.55)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    {d.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flexShrink: 0, position: "relative" }}>
            <Link href={`/demos/${demoSlug}`}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px 28px", background: "var(--gold-400)", color: "var(--navy-900)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px", whiteSpace: "nowrap" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Try Demo Now
            </Link>
            <a href={`mailto:${siteConfig.email}`}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px 28px", background: "transparent", color: "rgba(249,247,240,0.55)", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", border: "1px solid rgba(249,247,240,0.15)", borderRadius: "2px", whiteSpace: "nowrap" }}>
              Get This for My Business
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

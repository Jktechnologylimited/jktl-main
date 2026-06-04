"use client";
import Link from "next/link";
import { deskProducts } from "@/data/index";

export default function GetStartedPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="gold-rule" style={{ display: "inline-block", marginBottom: 16 }} />
          <h1 className="display-hero" style={{ color: "#fff", marginBottom: 12 }}>What are you building?</h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.45)" }}>Choose your path. Self-service for Desk products. Inquiry for custom work.</p>
        </div>

        {/* Desk products */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 4, marginBottom: 20 }}>
          {deskProducts.map((p) => (
            <Link key={p.id} href={p.status === "live" ? `https://accounts.jktl.com.ng/signup?product=${p.id}` : `/${p.slug}`} style={{ textDecoration: "none", display: "block", background: "rgba(249,247,240,0.04)", border: "1px solid rgba(249,247,240,0.08)", borderTop: "3px solid " + p.color, borderRadius: 4, padding: "28px 24px", transition: "background 0.15s" }}>
              <div style={{ width: 44, height: 44, background: p.color+"20", border: "1px solid "+p.color+"40", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", fontWeight: 700, color: p.color }}>{p.icon}</span>
              </div>
              <p style={{ fontWeight: 800, fontSize: "1.05rem", color: "#fff", marginBottom: 4 }}>{p.name}</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.4)", marginBottom: 14, lineHeight: 1.55 }}>{p.tagline}</p>
              <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: p.status === "live" ? p.color : "rgba(249,247,240,0.25)", fontWeight: 700 }}>
                {p.status === "live" ? "Start onboarding ->" : "Join waitlist ->"}
              </p>
            </Link>
          ))}
        </div>

        {/* Agency services */}
        <Link href="/get-started/services" style={{ textDecoration: "none", display: "block", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "24px 28px", transition: "background 0.15s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", fontWeight: 700, color: "var(--gold-400)" }}>AG</span>
                </div>
                <p style={{ fontWeight: 800, fontSize: "1rem", color: "var(--gold-400)" }}>Custom Agency Services</p>
              </div>
              <p style={{ fontSize: "0.82rem", color: "rgba(249,247,240,0.45)", maxWidth: 500, lineHeight: 1.6 }}>
                Need a custom website, SEO, CRM, AI chatbot, or payment system? Tell us what you need and we will scope a proposal within 24 hours.
              </p>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "var(--gold-400)", fontWeight: 700, flexShrink: 0 }}>
              NOT self-service -- requires JKTL review
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

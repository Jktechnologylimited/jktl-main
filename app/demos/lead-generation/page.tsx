import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Lead Generation Landing Page Demo | JK Technology Limited",
  description: "High-converting landing pages built for paid ad campaigns -- with lead capture, CRM submission, and conversion tracking.",
  alternates: { canonical: "https://jktl.com.ng/demos/lead-generation" },
};

const subdomains = [
  { label: "Service Business Leads", url: "https://service-leads.jktl.com.ng", desc: "For plumbers, electricians, home service businesses" },
  { label: "Real Estate Leads", url: "https://realestate-leads.jktl.com.ng", desc: "For realtors, property firms, estate developers" },
  { label: "Consultant Leads", url: "https://consultant-leads.jktl.com.ng", desc: "For consultants, coaches, training institutes" },
];

export default function DemoPage() {
  return (
    <div style={{ background: "var(--cream-50)", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Demo header */}
      <div style={{ background: "var(--navy-900)", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ width: 32, height: 32, background: "#1A6E3C", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", fontWeight: 700, color: "#fff" }}>02</span>
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "var(--cream-50)" }}>
              Lead Generation Landing Page
            </p>
          </div>
          <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.45)" }}>
            High-converting landing pages built for paid ad campaigns -- with lead capture, CRM submission, and conversion tracking.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link href="/demos" style={{ padding: "8px 16px", background: "rgba(249,247,240,0.08)", color: "rgba(249,247,240,0.7)", fontSize: "0.72rem", fontWeight: 600, textDecoration: "none", borderRadius: "2px" }}>
            All Demos
          </Link>
          <a href={"mailto:" + siteConfig.email} className="btn-gold" style={{ padding: "8px 16px", fontSize: "0.72rem" }}>
            Get This System
          </a>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "32px auto", padding: "0 24px" }}>

        {/* Subdomain selector + iframes */}
        {subdomains.map((sub, i) => (
          <div key={sub.label} style={{ marginBottom: "40px" }}>

            {/* Label row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: 28, height: 28, background: "#1A6E3C", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: "#fff" }}>{"0" + (i + 1)}</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)" }}>{"" + sub.label}</p>
                  <p style={{ fontSize: "0.75rem", color: "rgba(28,28,30,0.45)" }}>{"" + sub.desc}</p>
                </div>
              </div>
              <a href={sub.url} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", background: "transparent", border: "1px solid #1A6E3C", color: "#1A6E3C", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none", borderRadius: "2px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Open Full Screen
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

            {/* iframe */}
            <div style={{ position: "relative", background: "#fff", border: "1px solid var(--cream-300)", borderRadius: "4px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
              {/* Browser chrome */}
              <div style={{ background: "#f5f5f5", borderBottom: "1px solid #e0e0e0", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28ca41" }} />
                </div>
                <div style={{ flex: 1, background: "#fff", border: "1px solid #e0e0e0", borderRadius: "4px", padding: "4px 12px", fontSize: "0.72rem", color: "#666", display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  {"" + sub.url.replace("https://", "")}
                </div>
              </div>

              {/* The iframe */}
              <iframe
                src={sub.url}
                title={sub.label + " Demo"}
                style={{ width: "100%", height: "700px", border: "none", display: "block" }}
                loading="lazy"
                allow="clipboard-write"
              />

              {/* Coming soon overlay -- shown when subdomain not yet live */}
              {/* Remove this div once your subdomain is deployed */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(6,14,42,0.92)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                gap: "16px",
              }}>
                <div style={{ width: 56, height: 56, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#fff", fontWeight: 300 }}>Coming Soon</p>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "rgba(249,247,240,0.4)" }}>{"" + sub.url.replace("https://", "")}</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(249,247,240,0.5)", textAlign: "center", maxWidth: "320px" }}>
                  This demo is being built. In the meantime, contact us to see a live walkthrough.
                </p>
                <a href={"mailto:" + siteConfig.email}
                  style={{ padding: "10px 24px", background: "#C9A84C", color: "#0b1f3a", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px" }}>
                  Request Live Walkthrough
                </a>
              </div>
              {/* END coming soon overlay */}
            </div>
          </div>
        ))}

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
          <a href={"mailto:" + siteConfig.email} className="btn-primary">
            Get This System -- {siteConfig.email}
          </a>
          <Link href="/demos/email-automation" className="btn-outline-navy">Next: Email Automation</Link>
          <Link href="/demos" className="btn-outline-navy">All Demos</Link>
        </div>
      </div>
    </div>
  );
}

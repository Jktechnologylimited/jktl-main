import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Live Service Demos | JK Technology Limited",
  description: "Try all 8 of our business systems live before you commit. Real working demos for websites, CRM, payments, SEO, email automation, AI chatbot, and more.",
  alternates: { canonical: "https://jktl.com.ng/demos" },
};

const demos = [
  {
    slug: "website",
    number: "01",
    title: "Website & Landing Page System",
    description: "See a fully built business website -- homepage, services, about, contact form, mobile-responsive.",
    subdomains: [
      { label: "Law Firm", url: "https://lawfirm-website.jktl.com.ng" },
      { label: "Clinic",   url: "https://clinic-website.jktl.com.ng" },
      { label: "Service Business", url: "https://service-website.jktl.com.ng" },
      { label: "Consultant", url: "https://consultant-website.jktl.com.ng" },
    ],
    color: "#1A4A8A",
  },
  {
    slug: "lead-generation",
    number: "02",
    title: "Lead Generation Landing Page",
    description: "A high-converting landing page built for paid ads and direct response -- with lead capture and CRM submission.",
    subdomains: [
      { label: "Service Business", url: "https://service-leads.jktl.com.ng" },
      { label: "Real Estate",      url: "https://realestate-leads.jktl.com.ng" },
      { label: "Consultant",       url: "https://consultant-leads.jktl.com.ng" },
    ],
    color: "#1A6E3C",
  },
  {
    slug: "email-automation",
    number: "03",
    title: "Email & Follow-up Automation",
    description: "5-step automated email sequence that nurtures every lead from first contact to conversion -- on autopilot.",
    subdomains: [
      { label: "General Business", url: "https://email-demo.jktl.com.ng" },
    ],
    color: "#7C3AED",
  },
  {
    slug: "crm",
    number: "04",
    title: "CRM & Business Operations",
    description: "Full CRM dashboard -- add leads, manage pipeline, track deals, view analytics, log activities.",
    subdomains: [
      { label: "Law Firm CRM",   url: "https://lawfirm-crm.jktl.com.ng" },
      { label: "Clinic CRM",     url: "https://clinic-crm.jktl.com.ng" },
      { label: "Business CRM",   url: "https://business-crm.jktl.com.ng" },
    ],
    color: "#D97706",
  },
  {
    slug: "payments",
    number: "05",
    title: "Payment & Billing System",
    description: "Create invoices, generate payment links, issue receipts, and track transactions -- all in one system.",
    subdomains: [
      { label: "Invoice Generator", url: "https://invoice.jktl.com.ng" },
      { label: "Receipt Generator", url: "https://receipt.jktl.com.ng" },
      { label: "Payment Links",     url: "https://payments-demo.jktl.com.ng" },
    ],
    color: "#059669",
  },
  {
    slug: "seo",
    number: "06",
    title: "SEO & Google Visibility",
    description: "Full SEO dashboard -- keyword rankings, Google SERP preview, SEO health score, local visibility.",
    subdomains: [
      { label: "SEO Dashboard", url: "https://seo-demo.jktl.com.ng" },
    ],
    color: "#DC2626",
  },
  {
    slug: "ai-chatbot",
    number: "07",
    title: "AI Chatbot & Automation",
    description: "Live AI assistant trained on your business -- qualifies leads, answers questions, books appointments 24/7.",
    subdomains: [
      { label: "Law Firm Chatbot",    url: "https://lawfirm-chatbot.jktl.com.ng" },
      { label: "Clinic Chatbot",      url: "https://clinic-chatbot.jktl.com.ng" },
      { label: "Business Chatbot",    url: "https://business-chatbot.jktl.com.ng" },
    ],
    color: "#0F172A",
  },
  {
    slug: "business-tools",
    number: "08",
    title: "Free Business Tools",
    description: "Invoice Generator, Receipt Generator, Profit Calculator, and Pricing Calculator -- free forever.",
    subdomains: [
      { label: "Invoice Generator",  url: "https://invoice.jktl.com.ng" },
      { label: "Receipt Generator",  url: "https://receipt.jktl.com.ng" },
      { label: "Profit Calculator",  url: "https://profit.jktl.com.ng" },
      { label: "Pricing Calculator", url: "https://pricing.jktl.com.ng" },
    ],
    color: "#C9A84C",
  },
];

export default function DemosPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--navy-950)", paddingTop: "clamp(88px,12vw,120px)", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display: "block" }} />
          <h1 className="display-hero mb-4" style={{ color: "var(--cream-50)", maxWidth: "800px" }}>
            Try Before You Buy.<br/>
            <em className="not-italic gold-text">Live System Demos.</em>
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", maxWidth: "560px", marginBottom: "8px" }}>
            Every system we build has a live demo you can try right now. No login. No credit card. Just the real thing.
          </p>
          <p className="body-sm" style={{ color: "rgba(249,247,240,0.35)", fontStyle: "italic" }}>
            Each demo runs on its own subdomain -- industry-specific, realistic, and built to show you exactly what your business would get.
          </p>
        </div>
      </section>

      {/* Demo grid */}
      <section className="section-pad" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {demos.map((demo) => (
              <div key={demo.slug} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderTop: "3px solid " + demo.color, borderRadius: "4px", padding: "28px", display: "flex", flexDirection: "column" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                  <div style={{ width: 40, height: 40, background: demo.color, borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "#fff" }}>{demo.number}</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.25rem", color: "var(--navy-900)", lineHeight: 1.2 }}>
                    {demo.title}
                  </h2>
                </div>

                <p className="body-sm" style={{ color: "rgba(28,28,30,0.58)", marginBottom: "20px" }}>
                  {demo.description}
                </p>

                {/* Subdomain links */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px", flex: 1 }}>
                  <p className="label-xs" style={{ color: "rgba(28,28,30,0.35)", marginBottom: "4px" }}>Available demos:</p>
                  {demo.subdomains.map((sub) => (
                    <a key={sub.label} href={sub.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "var(--cream-100)", border: "1px solid var(--cream-300)", borderRadius: "2px", textDecoration: "none", transition: "border-color 0.15s" }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy-900)" }}>{sub.label}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "rgba(28,28,30,0.35)" }}>
                          {sub.url.replace("https://", "")}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={demo.color} strokeWidth="2.5">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

                {/* View full demo page */}
                <Link href={"/demos/" + demo.slug}
                  style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px 20px", background: demo.color, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: "2px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Open Full Demo
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: "56px", padding: "40px", background: "var(--navy-900)", borderRadius: "4px", display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.75rem", color: "var(--cream-50)", marginBottom: "8px" }}>
                Seen enough? Ready to build the real thing?
              </h3>
              <p className="body-sm" style={{ color: "rgba(249,247,240,0.5)" }}>
                Email us or call us. We respond within 24 hours.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexShrink: 0, flexWrap: "wrap" }}>
              <a href={"mailto:" + siteConfig.email} className="btn-gold">{siteConfig.email}</a>
              <a href={"tel:" + siteConfig.phone.replace(/\s/g, "")} className="btn-outline-cream">{siteConfig.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

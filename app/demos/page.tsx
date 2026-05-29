import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Interactive Service Demos | JK Technology Limited",
  description: "Try our 8 business systems before you buy. Live interactive demos of website builder, landing page, email automation, CRM, payment system, SEO dashboard, AI chatbot, and business tools.",
  alternates: { canonical: "https://jktl.com.ng/demos" },
};

const demos = [
  {
    slug: "website",
    number: "01",
    title: "Website & Landing Page System",
    description: "See how we structure a professional business website — homepage, services, contact form, and SEO architecture.",
    features: ["Homepage layout", "Services page", "Contact form", "Mobile-responsive preview"],
    color: "#1A4A8A",
    time: "2 min demo",
  },
  {
    slug: "lead-generation",
    number: "02",
    title: "Lead Generation Landing Page",
    description: "Experience a high-converting landing page with lead capture form, CRM integration, and conversion tracking.",
    features: ["Lead capture form", "Form validation", "CRM submission preview", "Conversion tracking"],
    color: "#1A6E3C",
    time: "2 min demo",
  },
  {
    slug: "email-automation",
    number: "03",
    title: "Email & Follow-up Automation",
    description: "See how automated email sequences nurture leads from first contact to conversion — without manual effort.",
    features: ["Email sequence builder", "Trigger conditions", "Preview emails", "Automation flow"],
    color: "#7C3AED",
    time: "3 min demo",
  },
  {
    slug: "crm",
    number: "04",
    title: "CRM & Business Operations",
    description: "Explore a live CRM dashboard — manage leads, track pipeline stages, and monitor your business metrics.",
    features: ["Lead pipeline board", "Customer records", "Deal tracking", "Activity log"],
    color: "#D97706",
    time: "3 min demo",
  },
  {
    slug: "payments",
    number: "05",
    title: "Payment & Billing System",
    description: "Try generating an invoice, creating a payment link, and seeing how payments flow through the system.",
    features: ["Invoice generator", "Payment link creation", "Transaction log", "Receipt generation"],
    color: "#059669",
    time: "2 min demo",
  },
  {
    slug: "seo",
    number: "06",
    title: "SEO & Google Visibility",
    description: "See how your business appears on Google, track keyword rankings, and explore the SEO optimisation checklist.",
    features: ["Google SERP preview", "Keyword tracker", "SEO checklist", "Local visibility map"],
    color: "#DC2626",
    time: "2 min demo",
  },
  {
    slug: "ai-chatbot",
    number: "07",
    title: "AI Chatbot & Automation",
    description: "Chat with a live AI assistant trained for a business — experience how it qualifies leads and answers questions 24/7.",
    features: ["Live AI chat", "Lead qualification flow", "FAQ handling", "Handoff to human"],
    color: "#0F172A",
    time: "3 min demo",
  },
  {
    slug: "business-tools",
    number: "08",
    title: "Free Business Tools",
    description: "Try our free Invoice Generator, Profit Calculator, and Pricing Calculator — tools your business can use today.",
    features: ["Invoice generator", "Profit calculator", "Pricing calculator", "PDF export"],
    color: "#C9A84C",
    time: "2 min demo",
  },
];

export default function DemosPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display:"block" }} />
          <h1 className="display-hero mb-4" style={{ color:"var(--cream-50)", maxWidth:"800px" }}>
            Try Before You Buy.<br/>
            <em className="not-italic gold-text">Live System Demos.</em>
          </h1>
          <p className="body-lg" style={{ color:"rgba(249,247,240,0.55)", maxWidth:"560px", marginBottom:"8px" }}>
            Explore all 8 of our business systems interactively before making any commitment. No login required.
          </p>
          <p className="body-sm" style={{ color:"rgba(249,247,240,0.35)", fontStyle:"italic" }}>
            Each demo is a realistic preview of the actual system your business would get.
          </p>
        </div>
      </section>

      {/* Demo grid */}
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {demos.map((demo) => (
              <Link key={demo.slug} href={`/demos/${demo.slug}`} style={{ textDecoration:"none" }}>
                <div className="card-light" style={{ padding:"28px", height:"100%", display:"flex", flexDirection:"column", borderTop:`3px solid ${demo.color}`, transition:"transform 0.25s, box-shadow 0.25s" }}>
                  {/* Number */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <div style={{ width:40, height:40, background:demo.color, borderRadius:"2px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.75rem", fontWeight:700, color:"#fff" }}>{demo.number}</span>
                    </div>
                    <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:demo.color, background:`${demo.color}15`, padding:"3px 10px", borderRadius:"2px" }}>
                      {demo.time}
                    </span>
                  </div>

                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:400, fontSize:"1.2rem", color:"var(--navy-900)", lineHeight:1.25, marginBottom:"10px" }}>
                    {demo.title}
                  </h2>
                  <p className="body-sm" style={{ color:"rgba(28,28,30,0.58)", marginBottom:"16px", flex:1 }}>
                    {demo.description}
                  </p>

                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"5px", marginBottom:"18px" }}>
                    {demo.features.map((f) => (
                      <li key={f} style={{ display:"flex", gap:"7px", fontSize:"0.75rem", color:"rgba(28,28,30,0.6)" }}>
                        <span style={{ color:demo.color, flexShrink:0 }}>✓</span>{f}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display:"flex", alignItems:"center", gap:"6px", color:demo.color, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
                    Launch Demo
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* After demos CTA */}
          <div style={{ marginTop:"56px", padding:"40px", background:"var(--navy-900)", borderRadius:"4px", display:"flex", flexWrap:"wrap", gap:"24px", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:"1.75rem", color:"var(--cream-50)", marginBottom:"8px" }}>
                Ready to build the real thing for your business?
              </h3>
              <p className="body-sm" style={{ color:"rgba(249,247,240,0.5)" }}>
                Email us or call us. We respond within 24 hours.
              </p>
            </div>
            <div style={{ display:"flex", gap:"12px", flexShrink:0 }}>
              <a href={`mailto:${siteConfig.email}`} className="btn-gold">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/\s/g,"")}`} className="btn-outline-cream">
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

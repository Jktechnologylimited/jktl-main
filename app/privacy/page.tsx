import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Privacy Policy | JK Technology Limited",
  description: "How JK Technology Limited collects and protects your personal information.",
};

export default function PrivacyPage() {
  const sections = [
    { title:"1. Information We Collect", body:"When you submit our contact form or communicate with us, we may collect your name, email address, business name, website URL, and project details. We also collect standard analytics data (page views, session duration, device type) via Google Analytics 4." },
    { title:"2. How We Use Your Information", body:"We use your information to respond to enquiries, deliver our services, send project updates and proposals, and — only if you opt in — share periodic business insights. We never sell your data to third parties." },
    { title:"3. Data Sharing", body:"We share data only with trusted service providers necessary to deliver our services (email delivery, analytics). We may disclose information if required by law. We do not sell or rent your personal data." },
    { title:"4. Data Retention", body:"Enquiry data is retained for up to 24 months. Client project data is retained for up to 5 years for accounting and legal compliance. You may request deletion at any time by emailing info@jktl.com.ng." },
    { title:"5. Cookies", body:"We use essential cookies (required for basic functionality) and analytics cookies (Google Analytics 4). You may opt out of analytics cookies via your browser settings or the Google Analytics opt-out add-on." },
    { title:"6. Your Rights", body:`You may request access to, correction of, or deletion of your personal data at any time by emailing ${siteConfig.email}. We will respond within 30 days.` },
    { title:"7. Security", body:"We use SSL/TLS encryption and appropriate technical safeguards. No transmission method is 100% secure, but we take commercially reasonable measures to protect your information." },
    { title:"8. Changes", body:"We may update this policy periodically. Updates will be posted on this page with a revised date. Continued use of our website constitutes acceptance of changes." },
  ];

  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"64px" }}>
        <div className="max-w-4xl mx-auto px-8">
          <span className="gold-rule mb-5" style={{ display:"block" }} />
          <h1 className="display-xl mb-2" style={{ color:"var(--cream-50)" }}>Privacy Policy</h1>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)" }}>Last updated: March 2026</p>
        </div>
      </section>
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-4xl mx-auto px-8">
          <div style={{ background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"4px", padding:"20px 24px", marginBottom:"36px" }}>
            <p className="body-md" style={{ color:"rgba(28,28,30,0.65)" }}>
              JK Technology Limited (&quot;JKTL&quot;, &quot;we&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information when you use jktl.com.ng or engage our services.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {sections.map(s => (
              <div key={s.title}>
                <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--navy-900)", marginBottom:"8px", paddingBottom:"8px", borderBottom:"1px solid rgba(201,168,76,0.2)" }}>{s.title}</h2>
                <p className="body-md" style={{ color:"rgba(28,28,30,0.62)" }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"40px", paddingTop:"24px", borderTop:"1px solid var(--cream-300)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.35)" }}>Last updated March 2026</p>
            <div style={{ display:"flex", gap:"16px" }}>
              <Link href="/terms" style={{ color:"var(--navy-600)", fontSize:"0.85rem", textDecoration:"underline", textUnderlineOffset:"3px" }}>Terms of Service</Link>
              <Link href="/contact" style={{ color:"var(--navy-600)", fontSize:"0.85rem", textDecoration:"underline", textUnderlineOffset:"3px" }}>Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { pageMetadata } from "@/lib/seo/metadata";
import { ReferralPreferences } from "@/components/shared/ReferralConsent";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = pageMetadata("/privacy", {
  title: "Privacy Policy",
  description:
    "How JKTL Business collects and protects your personal and business information.",
});

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      body: "On jktl.com.ng, we collect information you submit through our contact form (name, email, message) and standard analytics data (page views, device type). Inside the JKTL Business app itself (business.jktl.com.ng), we collect account information, business details, and the customer, booking, invoice, and inventory data you enter to run your business -- that data belongs to you and the business you manage.",
    },
    {
      title: "2. How We Use Your Information",
      body: "We use this information to operate the JKTL Business app, process payments via Paystack, respond to enquiries, send account and service notifications, and improve the product. We never sell your data to third parties.",
    },
    {
      title: "3. Data Sharing",
      body: "We share data only with service providers necessary to operate JKTL Business -- for example, Paystack for payment processing, and our hosting and email providers. We may disclose information if required by law. We do not sell or rent personal or business data.",
    },
    {
      title: "4. Data Retention",
      body: "Account and business data is retained for as long as your account is active, and for a reasonable period afterward for accounting and legal compliance. You may request deletion of your account and data at any time by emailing info@jktl.com.ng.",
    },
    {
      title: "5. Cookies",
      body: "We use essential cookies for sign-in and core functionality. Optional referral attribution uses a 30-day cookie only after you allow it. You may decline or remove that cookie here or through browser settings. Existing financial attribution records are retained where required for accounting.",
    },
    {
      title: "6. Your Rights",
      body: `You may request access to, correction of, or deletion of your personal data at any time by emailing ${siteConfig.email}. We will respond within 30 days.`,
    },
    {
      title: "7. Security",
      body: "We use SSL/TLS encryption and appropriate technical safeguards to protect your data and your customers' data. No transmission method is 100% secure, but we take commercially reasonable measures to protect your information.",
    },
    {
      title: "8. Changes",
      body: "We may update this policy periodically. Updates will be posted on this page with a revised date. Continued use of jktl.com.ng or JKTL Business constitutes acceptance of changes.",
    },
  ];

  return (
    <>
      <section
        style={{
          background: "var(--navy-950)",
          paddingTop: "120px",
          paddingBottom: "64px",
        }}
      >
        <div className="max-w-4xl mx-auto px-8">
          <span className="gold-rule mb-5" style={{ display: "block" }} />
          <h1 className="display-xl mb-2" style={{ color: "var(--cream-50)" }}>
            Privacy Policy
          </h1>
          <p className="label-xs" style={{ color: "rgba(249,247,240,0.35)" }}>
            Last updated: March 2026
          </p>
        </div>
      </section>
      <section
        className="section-pad"
        style={{ background: "var(--site-paper)" }}
      >
        <div className="max-w-4xl mx-auto px-8">
          <div
            style={{
              background: "var(--site-tint)",
              border: "1px solid var(--cream-300)",
              borderRadius: "4px",
              padding: "20px 24px",
              marginBottom: "36px",
            }}
          >
            <p className="body-md" style={{ color: "var(--site-muted)" }}>
              JK Technology Limited (&quot;JKTL&quot;, &quot;we&quot;,
              &quot;us&quot;) is committed to protecting your privacy. This
              policy explains how we collect, use, and safeguard your
              information when you use jktl.com.ng or the JKTL Business app.
            </p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            {sections.map((s) => (
              <div key={s.title}>
                <h2
                  style={{
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--site-text)",
                    marginBottom: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {s.title}
                </h2>
                <p className="body-md" style={{ color: "var(--site-muted)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <ReferralPreferences />
          <div
            style={{
              marginTop: "40px",
              paddingTop: "24px",
              borderTop: "1px solid var(--cream-300)",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <p className="body-sm" style={{ color: "var(--site-muted)" }}>
              Last updated 26 October 2026
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link
                href="/terms"
                style={{
                  color: "var(--site-text)",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                style={{
                  color: "var(--site-text)",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

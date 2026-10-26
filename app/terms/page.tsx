import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing use of JKTL Business.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. The Service",
      body: "JKTL Business is a business-management application provided by JK Technology Limited, including customer records, booking/sales tracking, invoicing, inventory and expense tracking, and a published business website. Core features are available free; a paid plan unlocks additional team seats, storage, and a custom domain, as described on our Pricing page.",
    },
    {
      title: "2. Accounts",
      body: "You must provide accurate information when creating an account and are responsible for keeping your login credentials secure. You are responsible for all activity under your business's account, including actions taken by team members you invite.",
    },
    {
      title: "3. Payment Terms",
      body: "The AI receptionist is ₦650,000, payable in full or as six monthly instalments of ₦108,333.33. From month 7 the ongoing fee is ₦59,000 per month. All amounts are in Nigerian Naira and are billed in advance via Paystack. Subscriptions renew monthly until cancelled, and you may cancel at any time from the first month with no exit fee; instalments not yet billed are never charged. Communication credit (texts, calls and your dedicated number) is billed separately from your wallet at cost.",
    },
    {
      title: "4. Cancellation",
      body: "You may cancel at any time from your first month. There is no minimum term and no exit fee: instalments not yet billed are never charged, and the service continues to the end of the period already paid for. Your data is not deleted. The first website-plan payment is covered by the 14-day guarantee below. Other fees are non-refundable except where required by law or a separate written agreement.",
    },
    {
      title: "5. Your Data",
      body: "You own the customer, booking, invoice, inventory, and other business data you enter into JKTL Business. We do not sell your data or your customers' data. See our Privacy Policy for details on how data is handled.",
    },
    {
      title: "6. Acceptable Use",
      body: "You agree not to use JKTL Business for unlawful purposes, to misrepresent your business to customers, or to attempt to disrupt or reverse-engineer the platform.",
    },
    {
      title: "7. Service Availability",
      body: "We aim to keep JKTL Business available at all times but do not guarantee uninterrupted service. We may perform maintenance or updates that cause brief downtime.",
    },
    {
      title: "8. Affiliate Program",
      body: "Participation in the JKTL Business affiliate program is subject to the terms shown on our Affiliates page and during affiliate sign-up, including the signup bonus, the subscription bonus, the monthly recurring commission, and the payout terms in effect at the time. The programme is administered at business.jktl.com.ng/affiliates.",
    },
    {
      title: "9. Limitation of Liability",
      body: "To the extent permitted by law, our total liability for any claim relating to JKTL Business shall not exceed the fees you paid us in the 12 months before the claim. We are not liable for indirect, incidental, or consequential damages including lost profits or lost business.",
    },
    {
      title: "10. Governing Law",
      body: `These Terms are governed by the laws of the Federal Republic of Nigeria. Disputes will first be addressed amicably. For any questions, contact us at ${siteConfig.email}.`,
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
            Terms of Service
          </h1>
          <p className="label-xs" style={{ color: "rgba(249,247,240,0.35)" }}>
            Last updated: 24 October 2026
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
              By creating an account or using JKTL Business, you agree to the
              following terms. Please read them carefully.
            </p>
          </div>
          <section
            id="website-guarantee"
            style={{
              scrollMarginTop: 100,
              background: "var(--site-surface)",
              borderRadius: 16,
              padding: 28,
              marginBottom: 36,
            }}
          >
            <h2
              style={{
                fontSize: 24,
                color: "var(--site-text)",
                marginBottom: 15,
              }}
            >
              14-day money-back guarantee for website plans
            </h2>
            <p className="body-md">
              Your first paid JKTL website-plan purchase is covered for 14 days
              from the successful payment time. If you are not satisfied, the
              business owner can request a full refund of that website-plan
              payment in JKTL Business → Settings → Billing → Website plans
              within the 14-day window. You can also contact info@jktl.com.ng
              within the window with your payment reference. The JKTL billing
              team processes eligible refunds to the original payment method;
              payment-provider processing times apply. Your free website and
              core business data remain available. Paid capabilities end when
              the refund is processed.
            </p>
            <p className="body-md" style={{ marginTop: 14 }}>
              The guarantee applies to the first website-subscription payment,
              whether monthly or yearly. It does not cover renewal payments,
              domain registration or renewals, email, usage charges, AI
              receptionist contracts, custom development or other separately
              scoped services. Existing written agreements and statutory rights
              are unchanged.
            </p>
            <h3 style={{ marginTop: 24, fontSize: 18 }}>
              Website renewal, plan changes and cancellation
            </h3>
            <p className="body-md" style={{ marginTop: 12 }}>
              Website plans are billed in NGN via Paystack. The selected monthly
              or annual total is shown before checkout. With your explicit
              consent, the subscription renews automatically at the same price
              and interval until cancelled. Cancel renewal in JKTL Business or
              through Paystack’s subscription manager. Paid access continues
              until the end of the current period. Plan changes are scheduled
              for the end of that period; the owner confirms any new paid plan
              at checkout. Scheduling a change stops the old subscription’s
              renewal and does not create a second automatic subscription. There
              is no mid-period charge or prorated credit. Included image storage
              is capped at 1 GB (Starter), 5 GB (Growth), 15 GB (Business) or 30
              GB (Business Elite); new uploads stop at the cap, without
              automatic overage charges. Features identified as coming later are
              not currently activated or represented as available. Existing
              customers keep their current access and contractual terms.
            </p>
          </section>
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
              Last updated March 2026
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <Link
                href="/privacy"
                style={{
                  color: "var(--site-text)",
                  fontSize: "0.85rem",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Privacy Policy
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

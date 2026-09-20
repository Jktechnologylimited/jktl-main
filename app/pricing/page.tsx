import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/shared/Reveal";
import { pricing, competitors, appSignupUrl } from "@/data/index";

export const metadata: Metadata = {
  title: "Pricing",
  description: "JKTL Business is free to start. Upgrade for ₦5,000/month or ₦50,000/year for extra staff seats, storage and a custom domain -- or go custom for a bespoke website, portal or email setup.",
  alternates: { canonical: "https://jktl.com.ng/pricing" },
};

const FAQS = [
  { q: "Is JKTL Business really free?", a: "Yes. Customer records, bookings or sales tracking, invoicing with online payment, inventory tracking, expense tracking, and a published business website are all free -- no plan required." },
  { q: "What do I get on the paid plan?", a: "Extra staff seats beyond the owner, more photo/storage space, and a custom domain for your business website. Everything else is already included free." },
  { q: "How much cheaper is the yearly plan?", a: "₦50,000/year works out to about ₦4,167/month -- roughly 17% cheaper than paying ₦5,000 every month." },
  { q: "Can I cancel anytime?", a: "Yes, there's no lock-in contract. If you cancel a paid plan, your account simply returns to the Free plan -- your data stays intact." },
  { q: "Do you take a cut of my sales or bookings?", a: "No. JKTL Business charges a flat monthly or yearly fee for the paid plan -- nothing based on your revenue." },
  { q: "What if I need more than the Paid plan offers?", a: "If your business needs something beyond the standard app -- a fully custom website, a client or student portal, business email hosting, or a bespoke integration -- reach out and we'll scope it as a custom project." },
];

export default function PricingPage() {
  return (
    <div className="bg-cream-50">
      <section className="text-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(112px,14vw,140px)", paddingBottom: 56, background: "var(--navy-950)" }}>
        <Reveal className="max-w-[640px] mx-auto">
          <span className="label-xs" style={{ color: "var(--gold-400)" }}>Pricing</span>
          <h1 className="display-hero mt-3 mb-5" style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)" }}>Simple, Honest Pricing</h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)" }}>Start completely free. Upgrade only when your team or your storage needs outgrow it.</p>
        </Reveal>
      </section>

      {/* Plan cards */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        <Stagger className="max-w-[1140px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pricing-grid" stagger={0.12}>
          {/* Free */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="card-light p-8 h-full" style={{ background: "#fff" }}>
                <p className="label-xs mb-3" style={{ color: "rgba(28,28,30,0.4)" }}>{pricing.free.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3rem", color: "var(--navy-900)", lineHeight: 1 }}>{pricing.free.price}</p>
                <p className="body-sm text-black/45 mb-5">{pricing.free.period}</p>
                <p className="body-sm text-black/60 mb-6">{pricing.free.tagline}</p>
                <ul className="check-list mb-8">
                  {pricing.free.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href={appSignupUrl()} className="btn-outline-navy w-full justify-center px-7 py-3.5 text-sm uppercase tracking-wide">Get Started Free</a>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Paid */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="p-8 rounded h-full" style={{ background: "var(--navy-900)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <p className="label-xs mb-3" style={{ color: "var(--gold-400)" }}>{pricing.paid.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3rem", color: "#fff", lineHeight: 1 }}>
                  {pricing.paid.priceMonthly}<span className="text-lg">/mo</span>
                </p>
                <p className="body-sm mb-1" style={{ color: "rgba(249,247,240,0.5)" }}>or {pricing.paid.priceYearly}/year</p>
                <p className="body-sm mb-5" style={{ color: "var(--gold-400)" }}>{pricing.paid.savingsNote}</p>
                <p className="body-sm mb-6" style={{ color: "rgba(249,247,240,0.6)" }}>{pricing.paid.tagline}</p>
                <ul className="flex flex-col gap-2 mb-8">
                  {pricing.paid.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.875rem]" style={{ color: "rgba(249,247,240,0.75)" }}>
                      <CheckCircle2 size={16} style={{ color: "var(--gold-400)", flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={appSignupUrl()} className="btn-gold w-full justify-center px-7 py-3.5 text-sm uppercase tracking-wide">Upgrade to Paid</a>
              </div>
            </HoverLift>
          </StaggerItem>

          {/* Custom */}
          <StaggerItem>
            <HoverLift className="h-full">
              <div className="card-light p-8 h-full" style={{ background: "#fff" }}>
                <p className="label-xs mb-3" style={{ color: "rgba(28,28,30,0.4)" }}>{pricing.custom.name}</p>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2.2rem", color: "var(--navy-900)", lineHeight: 1.1 }}>{pricing.custom.price}</p>
                <p className="body-sm text-black/45 mb-5">{pricing.custom.period}</p>
                <p className="body-sm text-black/60 mb-6">{pricing.custom.tagline}</p>
                <ul className="check-list mb-8">
                  {pricing.custom.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href="/contact" className="btn-outline-navy w-full justify-center px-7 py-3.5 text-sm uppercase tracking-wide">Talk to Us</a>
              </div>
            </HoverLift>
          </StaggerItem>
        </Stagger>
      </section>

      {/* Competitor comparison */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
        <Reveal className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <span className="gold-rule mx-auto mb-4" />
            <h2 className="display-xl text-navy-900 mb-2">How We Compare</h2>
            <p className="body-sm text-black/45">Approximate published pricing as of writing -- always check the provider's own site for current rates.</p>
          </div>
          <div className="table-scroll">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <tbody>
                {competitors.map(c => (
                  <tr key={c.name} style={{ borderBottom: "1px solid var(--cream-300)", background: c.highlight ? "rgba(201,168,76,0.08)" : "transparent" }}>
                    <td className="py-3.5 px-4 font-semibold text-[0.9rem]" style={{ color: c.highlight ? "var(--navy-900)" : "rgba(28,28,30,0.75)" }}>
                      {c.name}{c.highlight && <span className="label-xs ml-2" style={{ color: "var(--gold-400)" }}>THAT'S US</span>}
                    </td>
                    <td className="py-3.5 px-4 text-[0.85rem] text-right" style={{ color: "rgba(28,28,30,0.55)" }}>{c.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20" style={{ background: "var(--cream-100)" }}>
        <div className="max-w-[720px] mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="display-xl text-navy-900">Pricing FAQ</h2>
          </Reveal>
          <Stagger className="flex flex-col gap-2" stagger={0.06}>
            {FAQS.map(faq => (
              <StaggerItem key={faq.q} className="bg-white border border-cream-300 rounded p-6">
                <p className="font-semibold text-[0.9rem] text-navy-900 mb-1.5">{faq.q}</p>
                <p className="body-sm text-black/60">{faq.a}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTABanner
        heading="Start Free Today"
        subhead="No card required. Upgrade only when you need to."
        primaryLabel="Get Started Free"
        primaryHref={appSignupUrl()}
        secondaryLabel="Talk to Us"
        secondaryHref="/contact"
      />
    </div>
  );
}

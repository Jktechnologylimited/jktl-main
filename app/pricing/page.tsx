import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import CTABanner from "@/components/shared/CTABanner";
import { Reveal, Stagger, StaggerItem, HoverLift } from "@/components/shared/Reveal";
import { pricing, competitors, appSignupUrl } from "@/data/index";

export const metadata: Metadata = {
  title: "Pricing",
  description: "The JKTL Business AI receptionist: ₦650,000 to set up, or six monthly payments of ₦108,333.33 — then ₦59,000/month. It answers every call your clinic cannot, books the patient, and texts back anyone it missed. Cancel any time.",
  alternates: { canonical: "https://jktl.com.ng/pricing" },
};

const FAQS = [
  {
    q: "Why is it ₦108,333.33 and not a round number?",
    a: "Because ₦650,000 divided by six is not a round number. Six payments of ₦108,333.33 come to ₦650,000 exactly — the odd figure is the honest one, and it means you pay the package off with nothing added on top.",
  },
  {
    q: "What happens after the first six months?",
    a: "The ₦650,000 is paid off, so the fee drops to ₦59,000/month — the ongoing cost of the platform, your dedicated line and the assistant. Month 7 onwards is ₦59,000, whether you paid monthly or in full.",
  },
  {
    q: "What does the ₦650,000 actually pay for?",
    a: "Setting you up properly: your own dedicated phone number, the assistant trained on your services, prices and opening hours, your website built from your own photographs and reviews, and your team shown how to use it. It is a launch, not a licence key.",
  },
  {
    q: "Can I cancel?",
    a: "Any time from month one. There is no minimum term and no exit fee — if you cancel in month two, the remaining instalments are simply never charged. You keep your data.",
  },
  {
    q: "Is there anything on top?",
    a: "₦15,000 of communication credit is included, which covers your texts, calls and the line for a good while. After that you top up and pay only for what you use — a text is about ₦4.50, and your dedicated number is $1.90 a month at cost. No markup, no per-seat charge.",
  },
  {
    q: "Do you take a cut of my sales or bookings?",
    a: "No. We never take a percentage of your revenue. Card payments are processed by Paystack and go straight to your own bank account.",
  },
  {
    q: "What if I want something beyond this?",
    a: "If your business needs a fully custom website, a patient or client portal, business email hosting, or a bespoke integration, get in touch and we will scope it separately.",
  },
  {
    q: "What if I miss calls outside working hours?",
    a: "That is the point. The assistant answers every call, day or night, and texts back whoever it could not reach so they can book by link. Most of the revenue this recovers comes from calls nobody was there to pick up.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-cream-50">
      <section className="text-center px-4 sm:px-6 lg:px-8" style={{ paddingTop: "clamp(112px,14vw,140px)", paddingBottom: 56, background: "var(--navy-950)" }}>
        <Reveal className="max-w-[640px] mx-auto">
          <span className="label-xs" style={{ color: "var(--gold-400)" }}>Pricing</span>
          <h1 className="display-hero mt-3 mb-5" style={{ color: "#fff", fontSize: "clamp(2.4rem,5vw,4rem)" }}>Simple, Honest Pricing</h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)" }}>
            ₦650,000 to set you up — or six payments of ₦108,333.33. Then ₦59,000 a month, cancel any time.
          </p>
        </Reveal>
      </section>

      {/* Two cards: the monthly entry point first, then the ₦650,000 anchor. */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 pb-16">
        <Stagger className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 pricing-grid" stagger={0.12}>
          {[pricing.monthly, pricing.upfront].map((plan) => (
            <StaggerItem key={plan.id}>
              <HoverLift className="h-full">
                <div
                  className="card-light p-8 h-full flex flex-col"
                  style={
                    plan.featured
                      ? { background: "var(--navy-900)", border: "1px solid rgba(201,168,76,0.35)" }
                      : { background: "#fff" }
                  }
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <p className="label-xs" style={{ color: plan.featured ? "var(--gold-400)" : "rgba(28,28,30,0.4)" }}>
                      {plan.name}
                    </p>
                    <span
                      className="label-xs px-2 py-1 rounded-sm"
                      style={
                        plan.featured
                          ? { background: "rgba(201,168,76,0.15)", color: "var(--gold-400)" }
                          : { background: "var(--cream-100)", color: "rgba(28,28,30,0.45)" }
                      }
                    >
                      {plan.badge}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond',serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.2rem,4.6vw,3rem)",
                      color: plan.featured ? "#fff" : "var(--navy-900)",
                      lineHeight: 1,
                    }}
                  >
                    {plan.headline}
                    {plan.headlineSuffix ? <span className="text-lg">{plan.headlineSuffix}</span> : null}
                  </p>
                  <p className="body-sm mt-2 mb-3" style={{ color: plan.featured ? "rgba(249,247,240,0.5)" : "rgba(28,28,30,0.45)" }}>
                    {plan.period}
                  </p>
                  <p className="body-sm mb-5" style={{ color: plan.featured ? "rgba(249,247,240,0.65)" : "rgba(28,28,30,0.6)" }}>
                    {plan.explains}
                  </p>

                  {/* The ongoing fee, stated on both cards so neither hides it. */}
                  <div
                    className="rounded p-3 mb-5"
                    style={plan.featured ? { background: "rgba(249,247,240,0.06)" } : { background: "var(--cream-100)" }}
                  >
                    <p className="label-xs mb-1" style={{ color: plan.featured ? "rgba(249,247,240,0.45)" : "rgba(28,28,30,0.4)" }}>
                      {plan.ongoingLabel}
                    </p>
                    <p className="font-semibold text-[0.95rem]" style={{ color: plan.featured ? "var(--gold-400)" : "var(--navy-900)" }}>
                      {plan.ongoing}
                    </p>
                    <p className="body-sm mt-1" style={{ color: plan.featured ? "rgba(249,247,240,0.5)" : "rgba(28,28,30,0.5)" }}>
                      {plan.ongoingNote}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="size-4 shrink-0 mt-0.5"
                          style={{ color: plan.featured ? "var(--gold-400)" : "var(--navy-700)" }}
                        />
                        <span className="body-sm" style={{ color: plan.featured ? "rgba(249,247,240,0.75)" : "rgba(28,28,30,0.7)" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="body-sm mb-5" style={{ color: plan.featured ? "rgba(249,247,240,0.5)" : "rgba(28,28,30,0.5)" }}>
                    {plan.cancellation}
                  </p>

                  <a
                    href={appSignupUrl()}
                    className={plan.featured ? "btn-gold w-full justify-center px-7 py-3.5 text-sm uppercase tracking-wide" : "btn-outline-navy w-full justify-center px-7 py-3.5 text-sm uppercase tracking-wide"}
                  >
                    Get started
                  </a>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>

        {/* What comes with both, so neither card has to repeat it. */}
        <Reveal className="max-w-[900px] mx-auto mt-8">
          <div className="card-light p-6" style={{ background: "var(--cream-100)" }}>
            <p className="font-semibold text-[0.9rem] text-navy-900 mb-3">
              {pricing.shared.freeCredit} of communication credit, included with both
            </p>
            <p className="body-sm text-black/60 mb-3">{pricing.shared.freeCreditNote}</p>
            <ul className="flex flex-col gap-1.5">
              <li className="body-sm text-black/55">{pricing.shared.lineRental}</li>
              <li className="body-sm text-black/55">{pricing.shared.noCommission}</li>
            </ul>
          </div>
        </Reveal>
      </section>

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
        heading="See it answer a call"
        subhead="We'll set up your line and your assistant, and show you what it books."
        primaryLabel="Get started"
        primaryHref={appSignupUrl()}
        secondaryLabel="Talk to Us"
        secondaryHref="/contact"
      />
    </div>
  );
}

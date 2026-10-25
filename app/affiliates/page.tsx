import Link from "next/link";
import { TIERS, PAYOUT, PRODUCT, fmtNaira, firstYearValue } from "@/lib/affiliate-offers";
import { siteConfig } from "@/data/index";

/**
 * The programme's landing page — on the public site, where people find things.
 *
 * The application, the approval queue and the partner dashboard all live in the
 * business app, because that is where the subscriptions and the money are. This
 * page does the one job the app cannot: explaining the offer to somebody who has
 * never heard of JKTL, on the domain they already trust.
 *
 * The CTAs therefore link to the app rather than to routes here. They are plain
 * links, not a signed-in check: the dashboard is on another domain with its own
 * cookie, so this site genuinely cannot tell whether a visitor is already a
 * partner, and guessing produced a "Go to My Dashboard" button that 404ed.
 */
const APPLY_URL = `${siteConfig.appUrl}/affiliates/apply`;
const LOGIN_URL = `${siteConfig.appUrl}/affiliates/login`;

function AffiliateCTA() {
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <a href={APPLY_URL} className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">
        Apply to join
      </a>
      <a href={LOGIN_URL} className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">
        Affiliate sign in
      </a>
    </div>
  );
}

const HOW_IT_WORKS = [
  { n: "01", title: "Apply in minutes", desc: "Fill out a quick application and tell us how you plan to promote JKTL Business. We review every application within 24-48 hours." },
  { n: "02", title: "Get approved", desc: "Once approved, you get your unique referral link and access to your affiliate dashboard and marketing materials." },
  { n: "03", title: "Share your link", desc: "Share it with business owners who'd benefit from JKTL Business -- WhatsApp, Instagram, LinkedIn, wherever your audience is." },
  { n: "03", title: "Earn three times over", desc: `${fmtNaira(TIERS.signup)} when a business you referred creates an account, ${fmtNaira(TIERS.subscription)} more when they subscribe, then ${fmtNaira(TIERS.recurring)} every month they stay subscribed.` },
  { n: "04", title: "Get paid monthly", desc: `Payout requests open from the ${PAYOUT.payoutDay}st of each month, straight to a Nigerian bank account in your name. ${fmtNaira(TIERS.firstYearValue)} from one referral in the first year.` },
];

const FAQS = [
  { q: "How much do I actually earn?", a: `Three ways. ${fmtNaira(TIERS.signup)} when a business you referred creates an account, ${fmtNaira(TIERS.subscription)} more when they subscribe, then ${fmtNaira(TIERS.recurring)} every month they stay subscribed. That is ${fmtNaira(firstYearValue())} from one referral in the first year, and there is no cap on how many you refer.` },
  { q: `Why is the ${fmtNaira(TIERS.signup)} signup bonus held?`, a: `It appears in your dashboard the moment your referral creates an account — you can watch it accrue — but it becomes withdrawable when they subscribe. That is what stops the bonus being earned by free accounts, and it costs an honest partner nothing: your ${fmtNaira(TIERS.signup + TIERS.subscription)} lands in one go as soon as they pay.` },
  { q: "How does tracking work?", a: `Every click on your referral link is tracked with a ${PAYOUT.cookieDays}-day cookie. If the business signs up within ${PAYOUT.cookieDays} days, the referral is credited to you, and stays credited for as long as they remain a customer.` },
  { q: "When do I get paid?", a: `Payout requests open from the ${PAYOUT.payoutDay}st of every month. The minimum payout is ${fmtNaira(PAYOUT.minimum)}, by bank transfer to any Nigerian bank account.` },
  { q: "How long does the recurring commission last?", a: `As long as the business you referred stays subscribed, you are paid ${fmtNaira(TIERS.recurring)} a month. There is no cutoff and no cap.` },
  { q: "How long do approvals take, and how do I sign in?", a: "Applications are reviewed by hand, usually within 24–48 hours, and we email you the moment you are approved. Then sign in at business.jktl.com.ng/affiliates/login with the email and password you applied with — your referral link, your earnings and your payout requests are all there." },
  { q: "Can I promote on social media?", a: "Yes — Instagram, TikTok, WhatsApp, LinkedIn, X, YouTube, wherever you reach Nigerian business owners. There are ready-made materials in your dashboard." },
];

export default function AffiliatesLandingPage() {
  return (
    <div style={{ background: "var(--site-paper)" }}>

      {/* HERO */}
      <section style={{ background: "var(--navy-950)", padding: "clamp(120px,14vw,148px) 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", padding: "6px 16px", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)", flexShrink: 0 }} />
            <span className="label-xs" style={{ color: "var(--gold-400)" }}>Affiliate Program -- Now Open</span>
          </div>
          <h1 className="display-hero" style={{ color: "#fff", marginBottom: 20 }}>
            Earn <span className="gold-text">{fmtNaira(firstYearValue())}</span><br />From One Referral
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)", marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Introduce a Nigerian business to {PRODUCT.name}. {fmtNaira(TIERS.signup)} when they sign up, {fmtNaira(TIERS.subscription)} when they subscribe, then {fmtNaira(TIERS.recurring)} every month they stay subscribed.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <AffiliateCTA />
            <a href="#faq" className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">Read the FAQ</a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(201,168,76,0.12)" }}>
            {[
              { v: fmtNaira(firstYearValue()), l: "Per referral, year one" },
              { v: fmtNaira(TIERS.signup), l: "When they sign up" },
              { v: fmtNaira(TIERS.subscription), l: "When they subscribe" },
              { v: `${fmtNaira(TIERS.recurring)}/mo`, l: "For as long as they stay" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 300, fontSize: "2rem", color: "#fff", lineHeight: 1, marginBottom: 4 }}>{s.v}</p>
                <p className="label-xs" style={{ color: "rgba(249,247,240,0.35)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14"><p className="text-gold-600 text-xs tracking-widest">JKTL AFFILIATES</p><h2 className="text-3xl mt-4">Your audience. Their next opportunity.</h2><p className="mt-5 text-sm leading-relaxed text-black/65">Creators, influencers and business educators introduce JKTL to their audiences. Earn commissions when referred customers make qualifying purchases under the affiliate programme terms. Signup bonuses remain held until a qualifying subscription is paid.</p><div className="mt-7 border border-gold-400/30 rounded-xl p-6"><h3 className="font-semibold">Work directly with business clients?</h3><p className="text-sm mt-3 text-black/65">Website developers, marketing agencies, business consultants and CAC registration agents can apply for JKTL Partners, with commission terms agreed separately.</p><Link href="/partners" className="inline-block mt-4 text-sm underline">Explore JKTL Partners →</Link></div></section>
      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 32px", background: "var(--site-paper)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="gold-rule" style={{ marginBottom: 14, display: "inline-block" }} />
            <h2 className="display-xl" style={{ color: "var(--site-text)" }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2, background: "var(--site-line)" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: "var(--site-paper)", padding: "32px 28px" }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--gold-400)", marginBottom: 12 }}>{step.n}</p>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--site-text)", marginBottom: 10 }}>{step.title}</h3>
                <p className="body-sm" style={{ color: "var(--site-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE OFFER -- three fixed tiers, in the order they happen. */}
      <section style={{ padding: "80px 32px", background: "var(--navy-900)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 className="display-xl" style={{ color: "var(--cream-50)", marginBottom: 12 }}>One Referral, Paid Three Times</h2>
          <p className="body-md" style={{ color: "rgba(249,247,240,0.5)", marginBottom: 40 }}>{fmtNaira(firstYearValue())} in the first year, from a single business you introduce.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2, background: "rgba(249,247,240,0.06)" }}>
            <div style={{ padding: "36px 28px", background: "var(--navy-800)" }}>
              <p style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 300, fontSize: "3rem", color: "var(--cream-50)", lineHeight: 1, marginBottom: 8 }}>{fmtNaira(TIERS.signup)}</p>
              <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)" }}>When they create an account, released once they subscribe</p>
            </div>
            <div style={{ padding: "36px 28px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 300, fontSize: "3rem", color: "var(--gold-400)", lineHeight: 1, marginBottom: 8 }}>{fmtNaira(TIERS.subscription)}</p>
              <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)" }}>When they subscribe</p>
            </div>
            <div style={{ padding: "36px 28px", background: "var(--navy-800)" }}>
              <p style={{ fontFamily: "var(--font-plus-jakarta-sans), sans-serif", fontWeight: 300, fontSize: "3rem", color: "var(--cream-50)", lineHeight: 1, marginBottom: 8 }}>{fmtNaira(TIERS.recurring)}<span style={{ fontSize: "1.1rem" }}>/mo</span></p>
              <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)" }}>Every month they stay subscribed — no cap, no cutoff</p>
            </div>
          </div>
          <p style={{ marginTop: 24, fontSize: "0.82rem", color: "rgba(249,247,240,0.45)" }}>
            {PRODUCT.description}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 32px", background: "var(--site-paper)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="display-xl" style={{ color: "var(--site-text)" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "var(--site-surface)", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "20px 24px" }}>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--site-text)", marginBottom: 6 }}>{faq.q}</p>
                <p className="body-sm" style={{ color: "var(--site-muted)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "var(--navy-950)", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 className="display-xl" style={{ color: "var(--cream-50)", marginBottom: 16 }}>Ready to Start Earning?</h2>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", marginBottom: 32 }}>
            Join free. Get approved in 24–48 hours. Share your link, and earn {fmtNaira(firstYearValue())} from every business that stays.
          </p>
          <AffiliateCTA />
          <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(249,247,240,0.3)" }}>Free to join — no fees, no monthly charges, no catch.</p>
        </div>
      </section>
    </div>
  );
}

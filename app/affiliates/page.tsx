"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { COMMISSION, BONUS, PAYOUT, PRODUCT, fmtNaira } from "@/lib/affiliate-offers";

function AffiliateCTA() {
  const [signedIn, setSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/affiliates/me", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { setSignedIn(!!(d.authenticated && d.isAffiliate)); setChecked(true); })
      .catch(() => setChecked(true));
  }, []);

  if (!checked) return null;
  return signedIn ? (
    <Link href="/affiliates/dashboard" className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">Go to My Dashboard</Link>
  ) : (
    <Link href="/affiliates/join" className="btn-gold px-7 py-3.5 text-sm uppercase tracking-wide">Join Free -- Start Earning</Link>
  );
}

const HOW_IT_WORKS = [
  { n: "01", title: "Apply in minutes", desc: "Fill out a quick application and tell us how you plan to promote JKTL Business. We review every application within 24-48 hours." },
  { n: "02", title: "Get approved", desc: "Once approved, you get your unique referral link and access to your affiliate dashboard and marketing materials." },
  { n: "03", title: "Share your link", desc: "Share it with business owners who'd benefit from JKTL Business -- WhatsApp, Instagram, LinkedIn, wherever your audience is." },
  { n: "04", title: "Earn every month", desc: `When a business you referred subscribes to a paid plan, you earn ${COMMISSION.rate}% of what they pay -- every month, for as long as they stay subscribed.` },
];

const FAQS = [
  { q: "How does tracking work?", a: `Every click on your referral link is tracked with a ${PAYOUT.cookieDays}-day cookie. If the business signs up within ${PAYOUT.cookieDays} days, the referral is credited to you.` },
  { q: "When do I get paid?", a: `Commissions are paid on the 28th of every month. Minimum payout is ${fmtNaira(PAYOUT.minimum)}, via bank transfer to any Nigerian bank.` },
  { q: `What is the ${fmtNaira(BONUS.amount)} welcome bonus?`, a: `Every approved affiliate gets a one-time ${fmtNaira(BONUS.amount)} bonus, credited ${BONUS.trigger}.` },
  { q: "How long does the recurring commission last?", a: `As long as the business you referred stays on a paid plan, you keep earning ${COMMISSION.rate}% of their subscription every month. There's no cutoff.` },
  { q: "Can I promote on social media?", a: "Yes -- Instagram, TikTok, WhatsApp, LinkedIn, X, YouTube, wherever you reach Nigerian business owners." },
  { q: "How long do approvals take?", a: "We review all applications within 24-48 hours and email you once your account is approved." },
];

export default function AffiliatesLandingPage() {
  return (
    <div style={{ background: "var(--cream-50)" }}>

      {/* HERO */}
      <section style={{ background: "var(--navy-950)", padding: "clamp(120px,14vw,148px) 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", padding: "6px 16px", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)", flexShrink: 0 }} />
            <span className="label-xs" style={{ color: "var(--gold-400)" }}>Affiliate Program -- Now Open</span>
          </div>
          <h1 className="display-hero" style={{ color: "#fff", marginBottom: 20 }}>
            Earn <span className="gold-text">{COMMISSION.rate}% Recurring</span><br />Referring Businesses to JKTL
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.6)", marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Refer a business to {PRODUCT.name}. When they subscribe to a paid plan, you earn {COMMISSION.rate}% of what they pay every month -- for as long as they stay subscribed.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <AffiliateCTA />
            <a href="#faq" className="btn-outline-cream px-7 py-3.5 text-sm uppercase tracking-wide">Read the FAQ</a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(201,168,76,0.12)" }}>
            {[
              { v: `${COMMISSION.rate}%`, l: "Recurring commission" },
              { v: fmtNaira(BONUS.amount), l: "Welcome bonus" },
              { v: fmtNaira(PAYOUT.minimum), l: "Minimum payout" },
              { v: "28th", l: "Monthly payout date" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2rem", color: "#fff", lineHeight: 1, marginBottom: 4 }}>{s.v}</p>
                <p className="label-xs" style={{ color: "rgba(249,247,240,0.35)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 32px", background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="gold-rule" style={{ marginBottom: 14, display: "inline-block" }} />
            <h2 className="display-xl" style={{ color: "var(--navy-900)" }}>How It Works</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 2, background: "var(--cream-300)" }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} style={{ background: "var(--cream-50)", padding: "32px 28px" }}>
                <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: "var(--gold-400)", marginBottom: 12 }}>{step.n}</p>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--navy-900)", marginBottom: 10 }}>{step.title}</h3>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.58)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE OFFER -- single flat rate, no tiers */}
      <section style={{ padding: "80px 32px", background: "var(--navy-900)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 className="display-xl" style={{ color: "var(--cream-50)", marginBottom: 12 }}>One Simple Rate. No Tiers.</h2>
          <p className="body-md" style={{ color: "rgba(249,247,240,0.5)", marginBottom: 40 }}>Every affiliate earns the same, from their very first referral.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 2, background: "rgba(249,247,240,0.06)" }}>
            <div style={{ padding: "36px 28px", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3rem", color: "var(--gold-400)", lineHeight: 1, marginBottom: 8 }}>{COMMISSION.rate}%</p>
              <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)" }}>Recurring commission, for the life of the subscription</p>
            </div>
            <div style={{ padding: "36px 28px", background: "var(--navy-800)" }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3rem", color: "var(--cream-50)", lineHeight: 1, marginBottom: 8 }}>{fmtNaira(BONUS.amount)}</p>
              <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)" }}>One-time welcome bonus, {BONUS.trigger}</p>
            </div>
          </div>
          <p style={{ marginTop: 24, fontSize: "0.82rem", color: "rgba(249,247,240,0.45)" }}>
            {PRODUCT.description}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 32px", background: "var(--cream-50)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="display-xl" style={{ color: "var(--navy-900)" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "20px 24px" }}>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--navy-900)", marginBottom: 6 }}>{faq.q}</p>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.6)" }}>{faq.a}</p>
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
            Join free. Get approved in 24-48 hours. Start sharing your link and earning {COMMISSION.rate}% recurring on every business you refer.
          </p>
          <AffiliateCTA />
          <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(249,247,240,0.3)" }}>Free to join -- no fees, no monthly charges, no catch.</p>
        </div>
      </section>
    </div>
  );
}

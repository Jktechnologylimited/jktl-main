"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TIERS, OFFERS, PAYOUT, calcCommission, fmtNaira } from "@/lib/affiliate-offers";


function AffiliateNav() {
  const [signedIn, setSignedIn] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/affiliates/me", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { setSignedIn(!!(d.authenticated && d.isAffiliate)); setChecked(true); })
      .catch(() => setChecked(true));
  }, []);

  return (
    <nav style={{ background: "var(--navy-950)", padding: "0 clamp(16px,4vw,32px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100 }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <Image src="/logo.png" alt="JK Technology Limited" width={36} height={36} style={{ objectFit: "contain" }} />
        <div>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "0.88rem", color: "#fff", lineHeight: 1 }}>JK Technology</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.5rem", color: "#C9A84C", letterSpacing: "0.12em" }}>AFFILIATE</p>
        </div>
      </a>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {!checked ? null : signedIn ? (
          <>
            <Link href="/affiliates/dashboard"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.25)", textDecoration: "none" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399" }} />
              My Dashboard
            </Link>
          </>
        ) : (
          <>
            <a href="/affiliates/login"
              style={{ color: "rgba(249,247,240,0.65)", fontSize: "0.8rem", textDecoration: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Sign In
            </a>
            <Link href="/affiliates/join"
              style={{ display: "inline-flex", padding: "8px 18px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, background: "#C9A84C", color: "#060E2A", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Join Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const HOW_IT_WORKS = [
  { n:"01", title:"Apply in Minutes",        desc:"Fill out a quick application. Tell us how you plan to promote JKTL. We review every application within 24-48 hours." },
  { n:"02", title:"Get Approved",            desc:"Once approved you receive your unique referral link and access to your full affiliate dashboard, marketing materials, and offers." },
  { n:"03", title:"Share Your Link",         desc:"Share your referral link with businesses that could benefit from a JKTL system. Use our pre-written WhatsApp, email, and social media templates." },
  { n:"04", title:"Earn Commission",         desc:"When a referred business signs up and pays, you earn your commission. One-time fees paid within 7 days. Recurring commissions paid monthly." },
];

const FAQS = [
  { q:"How does tracking work?",              a:"Every click on your referral link is tracked with a 30-day cookie. If the prospect converts within 30 days, you get the commission." },
  { q:"When do I get paid?",                  a:"Commissions are paid on the 28th of every month. Minimum payout is N50,000. Payment is via bank transfer to any Nigerian bank." },
  { q:"What is the N20,000 signup bonus?",    a:"Every approved affiliate gets N20,000 credited to their account. It unlocks and becomes withdrawable as soon as your first referral closes. If you have not referred anyone within 90 days, the bonus expires." },
  { q:"What is the minimum payout?",          a:"N50,000. Once your balance (earned commissions + unlocked bonus) reaches N50,000, you can request a payout. It will be processed on the 28th." },
  { q:"What if a client buys multiple services?", a:"You earn commission on the total deal value, including all services in the package." },
  { q:"How long are approvals taking?",       a:"We review all applications within 24-48 hours. You will receive an email notification when your account is approved." },
  { q:"Can I promote on social media?",       a:"Yes -- Instagram, LinkedIn, Facebook, WhatsApp, X, YouTube. We provide ready-made templates for all platforms." },
  { q:"Is there an expiry on commissions?",   a:"Commission on a closed deal is approved within 60 days. If a deal falls through and the client has not paid JKTL within 60 days, the commission expires. Accounts with zero activity for 12 months go dormant." },
];

export default function LandingPage() {
  const stdRate = TIERS.standard.oneTime;
  const goldRate = TIERS.gold.oneTime;

  return (
    <div style={{ background: "var(--cream-50)", minHeight: "100vh" }}>

      {/* NAV */}
      <AffiliateNav />

      {/* HERO */}
      <section style={{ background: "var(--navy-950)", padding: "96px 32px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.25)", padding: "6px 16px", borderRadius: 2, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold-400)", flexShrink: 0 }} />
            <span className="label-xs" style={{ color: "var(--gold-400)" }}>Affiliate Program -- Now Open</span>
          </div>
          <h1 className="display-hero fade-up" style={{ color: "#fff", marginBottom: 20 }}>
            Earn Up to <span style={{ color: "var(--gold-400)" }}>15% Commission</span><br/>Promoting JKTL Business Systems
          </h1>
          <p className="body-lg fade-up fade-up-d1" style={{ color: "rgba(249,247,240,0.6)", marginBottom: 32, maxWidth: 560, margin: "0 auto 32px" }}>
            Refer businesses to JK Technology Limited and earn on every deal that closes. One-time commissions on setup fees. Recurring commissions every month for up to 12 months.
          </p>
          <div className="fade-up fade-up-d2" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/affiliates/join" className="btn btn-gold btn-lg">Start Earning -- Join Free</Link>
            <a href="#offers" className="btn btn-ghost btn-lg">View All Offers</a>
          </div>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginTop: 48, paddingTop: 40, borderTop: "1px solid rgba(201,168,76,0.12)" }}>
            {[
              { v: "Up to 15%",  l: "Commission rate" },
              { v: "N20,000",    l: "Signup bonus" },
              { v: "N50,000",    l: "Minimum payout" },
              { v: "28th",       l: "Monthly payout date" },
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

      {/* COMMISSION TIERS */}
      <section style={{ padding: "80px 32px", background: "var(--navy-900)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="display-xl" style={{ color: "var(--cream-50)", marginBottom: 12 }}>Commission Tiers</h2>
            <p className="body-md" style={{ color: "rgba(249,247,240,0.5)" }}>The more you refer, the more you earn. Upgrade automatically.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "rgba(249,247,240,0.06)" }}>
            {Object.entries(TIERS).map(([key, tier], i) => (
              <div key={key} style={{ padding: "32px 28px", background: i === 2 ? "rgba(201,168,76,0.08)" : "var(--navy-800)", border: i === 2 ? "1px solid rgba(201,168,76,0.2)" : "none", position: "relative" }}>
                {i === 2 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--gold-400)" }} />}
                <div style={{ display: "inline-block", padding: "3px 12px", background: `${tier.color}20`, border: `1px solid ${tier.color}40`, borderRadius: 2, marginBottom: 16 }}>
                  <span className="label-xs" style={{ color: tier.color }}>{tier.label}</span>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "3rem", color: i === 2 ? "var(--gold-400)" : "var(--cream-50)", lineHeight: 1, marginBottom: 4 }}>{tier.oneTime}%</p>
                <p className="label-xs" style={{ color: "rgba(249,247,240,0.4)", marginBottom: 20 }}>on all deals</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    `${tier.oneTime}% on one-time fees`,
                    `${tier.recurring}% recurring for ${tier.recurringMonths} months`,
                    i === 0 ? "Starter -- join instantly" : i === 1 ? "Unlocked at 3 referrals" : "Unlocked at 8 referrals",
                  ].map(f => (
                    <div key={f} style={{ display: "flex", gap: 8, fontSize: "0.82rem", color: "rgba(249,247,240,0.65)" }}>
                      <span style={{ color: "var(--gold-400)", flexShrink: 0 }}>v</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" style={{ padding: "80px 32px", background: "var(--cream-100)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="display-xl" style={{ color: "var(--navy-900)", marginBottom: 12 }}>What You Can Promote</h2>
            <p className="body-md" style={{ color: "rgba(28,28,30,0.55)" }}>Every JKTL service and package is available to promote. Commission shown at Standard rate (10%).</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 6 }}>
            {OFFERS.map(offer => {
              const comm = calcCommission(offer.priceMin, offer.priceMax, stdRate);
              return (
                <div key={offer.id} style={{ background: "#fff", border: `1px solid var(--cream-300)`, borderTop: `3px solid ${offer.color}`, borderRadius: 4, padding: "20px", position: "relative" }}>
                  {offer.featured && (
                    <div style={{ position: "absolute", top: 12, right: 12, background: "var(--gold-400)", color: "var(--navy-900)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 2 }}>Popular</div>
                  )}
                  <p className="label-xs" style={{ color: `${offer.color}`, marginBottom: 6 }}>{offer.category}</p>
                  <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--navy-900)", marginBottom: 4, lineHeight: 1.3 }}>{offer.name}</h3>
                  <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)", marginBottom: 14, fontSize: "0.78rem" }}>{offer.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 12, borderTop: "1px solid var(--cream-200)" }}>
                    <div>
                      <p className="label-xs" style={{ color: "rgba(28,28,30,0.35)", marginBottom: 2 }}>Your commission</p>
                      <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.2rem", color: "var(--green)" }}>
                        {fmtNaira(comm.min)} -- {fmtNaira(comm.max)}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="label-xs" style={{ color: "rgba(28,28,30,0.35)", marginBottom: 2 }}>Deal value</p>
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--navy-700)" }}>{fmtNaira(offer.priceMin)} -- {fmtNaira(offer.priceMax)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: "0.78rem", color: "rgba(28,28,30,0.4)", fontStyle: "italic" }}>
            Gold tier affiliates earn 15% -- up to 50% more commission on every deal.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 32px", background: "var(--cream-50)" }}>
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
            Join free. Get approved in 24-48 hours. Start sharing your link and earning commissions on every JKTL deal you refer.
          </p>
          <Link href="/affiliates/join" className="btn btn-gold btn-lg">Join the Affiliate Program</Link>
          <p style={{ marginTop: 16, fontSize: "0.75rem", color: "rgba(249,247,240,0.3)" }}>Free to join -- No fees, no monthly charges, no catch.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--navy-950)", borderTop: "1px solid rgba(249,247,240,0.06)", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <p style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.25)" }}>
          {new Date().getFullYear()} JK Technology Limited -- affiliate.jktl.com.ng
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="https://jktl.com.ng" style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.3)", textDecoration: "none" }}>jktl.com.ng</a>
          <a href="mailto:info@jktl.com.ng" style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.3)", textDecoration: "none" }}>info@jktl.com.ng</a>
        </div>
      </footer>
    </div>
  );
}

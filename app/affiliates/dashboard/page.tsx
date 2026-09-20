import { getSession } from "@/lib/affiliate-auth";
import CopyButton from "./CopyButton";
import { getDashboardStats, getRecentActivity, getMonthlyEarnings } from "@/lib/affiliate-db";
import { COMMISSION, BONUS, PAYOUT, fmtNaira } from "@/lib/affiliate-offers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const [stats, activity] = await Promise.all([
    getDashboardStats(session.id),
    getRecentActivity(session.id),
    getMonthlyEarnings(session.id),
  ]);

  const mainLink = `https://jktl.com.ng?ref=${session.referralCode}`;

  const statCards = [
    { label: "Total Clicks",        value: stats.clicks,                              color: "#1A4A8A", sub: "on your referral links" },
    { label: "Total Referrals",     value: stats.leads,                               color: "#7C3AED", sub: "businesses referred" },
    { label: "Pending Commission",  value: fmtNaira(stats.pending),                    color: "#D97706", sub: "awaiting approval" },
    { label: "Approved",            value: fmtNaira(stats.approved),                   color: "#059669", sub: "ready for payout" },
    { label: "Welcome Bonus",       value: fmtNaira(stats.bonusUnlocked ? stats.signupBonus : 0), color: stats.bonusUnlocked ? "#C9A84C" : "#6B7280", sub: stats.bonusUnlocked ? "Unlocked -- added to balance" : "Unlocks on first referral upgrade" },
    { label: "Available to Withdraw", value: fmtNaira(stats.availableForPayout), color: "#059669", sub: `Min. ${fmtNaira(PAYOUT.minimum)} -- paid on the 28th` },
  ];

  return (
    <div>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>
              Good day, {session.firstName}.
            </h1>
            <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>
              Here is a snapshot of your affiliate performance.
            </p>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", padding: "6px 14px", borderRadius: 2 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
            <span className="label-xs" style={{ color: "#C9A84C" }}>{COMMISSION.rate}% Recurring Commission</span>
          </div>
        </div>
      </div>

      <div className="page-body">

        {/* Referral link box */}
        <div style={{ background: "var(--navy-900)", borderRadius: 4, padding: "20px 24px", marginBottom: 24, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: 8 }}>Your Referral Link</p>
            <div className="copy-box">
              <span className="copy-box-text">{mainLink}</span>
              <CopyButton text={mainLink} />
            </div>
          </div>
          <Link href="/affiliates/dashboard/links" className="btn-ghost btn-sm" style={{ flexShrink: 0 }}>
            Manage Links
          </Link>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginBottom: 28 }}>
          {statCards.map(s => (
            <div key={s.label} className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "2rem", color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--navy-900)", marginBottom: 2 }}>{s.label}</p>
              <p className="body-sm" style={{ color: "rgba(28,28,30,0.4)", fontSize: "0.72rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* What you're promoting */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--navy-900)" }}>What You're Promoting</p>
            <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Share your link. You earn {COMMISSION.rate}% recurring commission on every business that subscribes through you, for as long as they stay subscribed.</p>
          </div>
          <div className="product-ref-grid">
            <div className="product-ref-card">
              <div className="prc-accent" style={{ background: "#C9A84C" }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--navy-900)" }}>JKTL Business</p>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Free plan available; paid plan ₦5,000/mo or ₦50,000/yr</p>
              </div>
              <div className="copy-box light">
                <span className="copy-box-text">{mainLink}</span>
                <CopyButton text={mainLink} />
              </div>
            </div>
          </div>
        </div>

        {/* Two columns: activity + payout */}
        <div className="dash-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>

          {/* Recent activity */}
          <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--cream-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)" }}>Recent Activity</p>
              <Link href="/affiliates/dashboard/referrals" style={{ fontSize: "0.72rem", color: "var(--navy-600)", textDecoration: "none" }}>View all</Link>
            </div>
            {activity.length === 0 ? (
              <div style={{ padding: "32px", textAlign: "center" }}>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.35)", fontStyle: "italic" }}>No activity yet. Share your referral link to get started.</p>
              </div>
            ) : (
              <div>
                {(activity as {type:string;created_at:string;detail?:string;amount?:number;status?:string}[]).map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, padding: "12px 20px", borderBottom: "1px solid var(--cream-100)", alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 2, background: item.type === "click" ? "#EEF2F9" : "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", fontWeight: 700, color: item.type === "click" ? "#1A4A8A" : "#059669" }}>
                        {item.type === "click" ? "CLK" : "COM"}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--navy-900)" }}>
                        {item.type === "click" ? `Link clicked -- ${item.detail || "/"}` : `Commission -- ${item.detail}`}
                      </p>
                      <p style={{ fontSize: "0.7rem", color: "rgba(28,28,30,0.4)" }}>
                        {new Date(item.created_at as string).toLocaleDateString("en-NG", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" })}
                      </p>
                    </div>
                    {item.amount && (
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#059669" }}>{fmtNaira(Number(item.amount))}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payout summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--navy-900)", borderRadius: 4, padding: "20px" }}>
              <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: 14 }}>Payout Summary</p>
              {[
                { l: "Earned Commission", v: fmtNaira(stats.approved),           c: "#059669" },
                { l: "Welcome Bonus",     v: fmtNaira(stats.bonusUnlocked ? stats.signupBonus : 0), c: stats.bonusUnlocked ? "#C9A84C" : "#6B7280" },
                { l: "Available",         v: fmtNaira(stats.availableForPayout), c: "#fff" },
                { l: "Paid Out",          v: fmtNaira(stats.paid),               c: "rgba(249,247,240,0.4)" },
              ].map(r => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.5)" }}>{r.l}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: r.c }}>{r.v}</span>
                </div>
              ))}
              {!stats.bonusUnlocked && (
                <p style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", marginTop: 10, lineHeight: 1.5 }}>
                  Your {fmtNaira(BONUS.amount)} welcome bonus unlocks {BONUS.trigger}.
                </p>
              )}
              <div style={{ marginTop: 14 }}>
                {stats.availableForPayout >= PAYOUT.minimum ? (
                  <Link href="/affiliates/dashboard/earnings" className="btn-gold btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                    Request Payout
                  </Link>
                ) : (
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.3)", marginBottom: 8, textAlign: "center" }}>
                      {fmtNaira(PAYOUT.minimum - stats.availableForPayout)} more to reach minimum payout
                    </p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min((stats.availableForPayout / PAYOUT.minimum) * 100, 100)}%` }} />
                    </div>
                    <p style={{ fontSize: "0.65rem", color: "rgba(249,247,240,0.25)", marginTop: 6, textAlign: "center" }}>
                      Paid on the 28th of each month
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 18px" }}>
              <p className="label-xs" style={{ color: "rgba(28,28,30,0.4)", marginBottom: 10 }}>Quick Links</p>
              {[
                { label: "Get marketing copy",href: "/affiliates/dashboard/materials" },
                { label: "Edit profile",      href: "/affiliates/dashboard/profile" },
                { label: "Contact support",   href: "/affiliates/dashboard/support" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--cream-100)", textDecoration: "none", fontSize: "0.82rem", color: "var(--navy-700)" }}>
                  {l.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

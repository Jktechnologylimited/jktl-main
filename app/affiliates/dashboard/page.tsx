import { getSession } from "@/lib/affiliate-auth";
import CopyButton from "./CopyButton";
import { getDashboardStats, getRecentActivity, getMonthlyEarnings } from "@/lib/affiliate-db";
import { TIERS, PAYOUT } from "@/lib/affiliate-offers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const [stats, activity, monthly] = await Promise.all([
    getDashboardStats(session.id),
    getRecentActivity(session.id),
    getMonthlyEarnings(session.id),
  ]);

  const tier = TIERS[session.tier as keyof typeof TIERS] || TIERS.standard;
  const nextTier = session.tier === "standard" ? TIERS.silver : session.tier === "silver" ? TIERS.gold : null;
  const nextTierMin = session.tier === "standard" ? 3 : session.tier === "silver" ? 8 : 0;
  const tierProgress = nextTierMin > 0 ? Math.min((stats.leads / nextTierMin) * 100, 100) : 100;

  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://jktl.com.ng";
  const refLink = `${APP_URL}?ref=${session.referralCode}`;
  const mainLink = `https://jktl.com.ng?ref=${session.referralCode}`;

  const statCards = [
    { label: "Total Clicks",        value: stats.clicks,                              color: "#1A4A8A", sub: "on your referral links" },
    { label: "Total Referrals",     value: stats.leads,                               color: "#7C3AED", sub: "leads generated" },
    { label: "Pending Commission",  value: `N${stats.pending.toLocaleString()}`,       color: "#D97706", sub: "awaiting approval" },
    { label: "Approved",            value: `N${stats.approved.toLocaleString()}`,      color: "#059669", sub: "ready for payout" },
    { label: "Signup Bonus",        value: `N${stats.signupBonus.toLocaleString()}`,   color: stats.bonusUnlocked ? "#C9A84C" : stats.bonusExpired ? "#DC2626" : "#6B7280", sub: stats.bonusUnlocked ? "Unlocked -- added to balance" : stats.bonusExpired ? "Expired -- refer a client to earn" : "Unlocks on first referral" },
    { label: "Available to Withdraw", value: `N${stats.availableForPayout.toLocaleString()}`, color: "#059669", sub: `Min. N${PAYOUT.minimum.toLocaleString()} -- paid on 28th` },
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
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${tier.color}15`, border: `1px solid ${tier.color}30`, padding: "6px 14px", borderRadius: 2 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: tier.color, flexShrink: 0 }} />
            <span className="label-xs" style={{ color: tier.color }}>{tier.label} Affiliate -- {tier.oneTime}% Commission</span>
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
          <Link href="/affiliates/dashboard/links" className="btn btn-ghost btn-sm" style={{ flexShrink: 0 }}>
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

        {/* Tier progress */}
        {nextTier && (
          <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", marginBottom: 2 }}>
                  Progress to {nextTier.label} Tier
                </p>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>
                  {stats.leads} of {nextTierMin} referrals needed -- earn {nextTier.oneTime}% commission at {nextTier.label}
                </p>
              </div>
              <span className="badge badge-pending">{nextTier.label}</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${tierProgress}%` }} />
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(28,28,30,0.35)", marginTop: 6 }}>
              {nextTierMin - stats.leads > 0 ? `${nextTierMin - stats.leads} more referrals to unlock ${nextTier.label}` : `Upgrade ready!`}
            </p>
          </div>
        )}

        {/* Two columns: activity + payout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>

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
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#059669" }}>N{Number(item.amount).toLocaleString()}</span>
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
                { l: "Earned Commission", v: `N${stats.approved.toLocaleString()}`,           c: "#059669" },
                { l: "Signup Bonus",      v: `N${stats.bonusUnlocked ? stats.signupBonus.toLocaleString() : "0"}`, c: stats.bonusUnlocked ? "#C9A84C" : "#6B7280" },
                { l: "Available",         v: `N${stats.availableForPayout.toLocaleString()}`, c: "#fff" },
                { l: "Paid Out",          v: `N${stats.paid.toLocaleString()}`,               c: "rgba(249,247,240,0.4)" },
              ].map(r => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.5)" }}>{r.l}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.85rem", color: r.c }}>{r.v}</span>
                </div>
              ))}
              {!stats.bonusUnlocked && !stats.bonusExpired && (
                <p style={{ fontSize: "0.68rem", color: "rgba(201,168,76,0.6)", marginTop: 10, lineHeight: 1.5 }}>
                  Your N20,000 bonus unlocks when your first referral closes.
                  {stats.bonusExpiresAt && ` Expires ${new Date(stats.bonusExpiresAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}.`}
                </p>
              )}
              <div style={{ marginTop: 14 }}>
                {stats.availableForPayout >= PAYOUT.minimum ? (
                  <Link href="/affiliates/dashboard/earnings" className="btn btn-gold btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                    Request Payout
                  </Link>
                ) : (
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.3)", marginBottom: 8, textAlign: "center" }}>
                      N{(PAYOUT.minimum - stats.availableForPayout).toLocaleString()} more to reach minimum payout
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
                { label: "View all offers",   href: "/affiliates/dashboard/offers" },
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

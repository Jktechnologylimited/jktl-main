import { getSession } from "@/lib/affiliate-auth";
import { OFFERS, TIERS, calcCommission, fmtNaira } from "@/lib/affiliate-offers";
import Link from "next/link";

export default async function OffersPage() {
  const session = await getSession();
  if (!session) return null;
  const tier = TIERS[session.tier as keyof typeof TIERS] || TIERS.standard;
  const rate = tier.oneTime;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://affiliate.jktl.com.ng";

  const categories = ["All", "Package", "Service"];

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>
          Available Offers
        </h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>
          Promote any of these services and packages. Commission shown at your current rate ({rate}% -- {tier.label} tier).
        </p>
      </div>

      <div className="page-body">
        {/* Tier notice */}
        {session.tier !== "gold" && (
          <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <p style={{ fontSize: "0.82rem", color: "var(--navy-900)" }}>
              You are on the <strong>{tier.label}</strong> tier at <strong>{tier.oneTime}%</strong> commission.
              {session.tier === "standard" ? " Refer 3 clients to unlock Silver (12%)." : " Refer 8 total clients to unlock Gold (15%)."}
            </p>
            <Link href="/affiliates/dashboard" className="btn btn-outline btn-sm">View Progress</Link>
          </div>
        )}

        {/* Offers grid */}
        {categories.slice(1).map(cat => (
          <div key={cat} style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "2px solid var(--cream-300)" }}>
              {cat}s
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 8 }}>
              {OFFERS.filter(o => o.category === cat).map(offer => {
                const comm = calcCommission(offer.priceMin, offer.priceMax, rate);
                const refLink = `https://jktl.com.ng/${offer.slug}?ref=${session.referralCode}`;
                return (
                  <div key={offer.id} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderTop: `3px solid ${offer.color}`, borderRadius: 4, padding: "20px", display: "flex", flexDirection: "column" }}>
                    {offer.featured && (
                      <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 2, padding: "2px 10px", marginBottom: 8, width: "fit-content" }}>
                        <span className="label-xs" style={{ color: "var(--gold-400)" }}>Popular</span>
                      </div>
                    )}
                    <h3 style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--navy-900)", marginBottom: 4, lineHeight: 1.3 }}>{offer.name}</h3>
                    <p style={{ fontSize: "0.72rem", fontWeight: 600, color: offer.color, marginBottom: 8 }}>{offer.subtitle}</p>
                    <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)", marginBottom: 14, fontSize: "0.78rem", flex: 1 }}>{offer.description}</p>

                    <div style={{ background: "var(--cream-100)", border: "1px solid var(--cream-300)", borderRadius: 2, padding: "10px 12px", marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span className="label-xs" style={{ color: "rgba(28,28,30,0.4)" }}>Your commission</span>
                        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.1rem", color: "#059669" }}>
                          {fmtNaira(comm.min)} -- {fmtNaira(comm.max)}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span className="label-xs" style={{ color: "rgba(28,28,30,0.4)" }}>Deal value</span>
                        <span style={{ fontSize: "0.78rem", color: "var(--navy-700)", fontWeight: 600 }}>
                          {fmtNaira(offer.priceMin)} -- {fmtNaira(offer.priceMax)}
                        </span>
                      </div>
                      {offer.commissionType === "both" && (
                        <p style={{ fontSize: "0.68rem", color: "rgba(28,28,30,0.4)", marginTop: 4, fontStyle: "italic" }}>
                          + {rate}% recurring for {tier.recurringMonths} months on monthly retainer
                        </p>
                      )}
                    </div>

                    {/* Copy link */}
                    <div className="copy-box" style={{ marginBottom: 8 }}>
                      <span className="copy-box-text">{refLink}</span>
                      <button className="copy-box-btn" onClick={() => {}}>Copy</button>
                    </div>

                    <a href={`https://jktl.com.ng/${offer.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "0.72rem", color: "rgba(28,28,30,0.4)", textDecoration: "none", textAlign: "center" }}>
                      View offer page on jktl.com.ng
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

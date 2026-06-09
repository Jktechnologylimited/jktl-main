"use client";
import { useState, useEffect } from "react";
import { PAYOUT } from "@/lib/affiliate-offers";

interface Stats { pending: number; approved: number; paid: number; totalEarned: number; }
interface Commission { id: string; service_name: string; deal_value: number; rate: number; amount: number; type: string; status: string; created_at: string; }
interface Payout { id: string; amount: number; status: string; bank_name: string; created_at: string; paid_at: string | null; }
interface MonthEarning { month: string; total: number; }

export default function EarningsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [monthly, setMonthly] = useState<MonthEarning[]>([]);
  const [showPayoutForm, setShowPayoutForm] = useState(false);
  const [bank, setBank] = useState({ name: "", account: "", holder: "" });
  const [payoutMsg, setPayoutMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/affiliates/dashboard").then(r => r.json()).then(d => {
      setStats(d.stats);
      setCommissions(d.commissions || []);
      setMonthly(d.monthlyEarnings || []);
    });
    fetch("/api/affiliates/payout").then(r => r.json()).then(d => setPayouts(d.payouts || []));
  }, []);

  async function requestPayout() {
    setLoading(true); setPayoutMsg("");
    const res = await fetch("/api/affiliates/payout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bankName: bank.name, bankAccount: bank.account, bankHolder: bank.holder }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) { setPayoutMsg(`Payout of N${Number(data.amount).toLocaleString()} requested successfully!`); setShowPayoutForm(false); }
    else setPayoutMsg(data.error || "Error requesting payout");
  }

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { pending: "badge-pending", approved: "badge-approved", paid: "badge-paid" };
    return <span className={`badge ${map[s] || "badge-pending"}`}>{s}</span>;
  };

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>Earnings</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Your commission history and payout management.</p>
      </div>

      <div className="page-body">
        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10, marginBottom: 24 }}>
          {stats && [
            { l: "Total Earned",   v: `N${stats.totalEarned.toLocaleString()}`, c: "#C9A84C" },
            { l: "Pending",        v: `N${stats.pending.toLocaleString()}`,   c: "#D97706" },
            { l: "Approved",       v: `N${stats.approved.toLocaleString()}`,  c: "#059669" },
            { l: "Paid Out",       v: `N${stats.paid.toLocaleString()}`,      c: "#1A4A8A" },
          ].map(s => (
            <div key={s.l} className="stat-card" style={{ borderTop: `3px solid ${s.c}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.75rem", color: s.c, lineHeight: 1, marginBottom: 4 }}>{s.v}</p>
              <p style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--navy-900)" }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Payout request */}
        {stats && (
          <div style={{ background: "var(--navy-900)", borderRadius: 4, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 4 }}>Request Payout</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(249,247,240,0.5)" }}>
                  Available: <strong style={{ color: "#fff" }}>N{stats.approved.toLocaleString()}</strong> -- Minimum: N{PAYOUT.minimum.toLocaleString()} -- Paid monthly
                </p>
              </div>
              {stats.approved >= PAYOUT.minimum ? (
                <button onClick={() => setShowPayoutForm(!showPayoutForm)} className="btn btn-gold btn-sm">
                  {showPayoutForm ? "Cancel" : "Request Payout"}
                </button>
              ) : (
                <span style={{ fontSize: "0.75rem", color: "rgba(249,247,240,0.4)" }}>
                  N{(PAYOUT.minimum - stats.approved).toLocaleString()} more to reach minimum
                </span>
              )}
            </div>

            {showPayoutForm && (
              <div style={{ marginTop: 16, padding: "16px 20px", background: "rgba(249,247,240,0.04)", border: "1px solid rgba(249,247,240,0.08)", borderRadius: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
                  {[
                    { k: "name",    label: "Bank Name",       ph: "e.g. Access Bank" },
                    { k: "account", label: "Account Number",  ph: "10-digit account number" },
                    { k: "holder",  label: "Account Name",    ph: "Name on account" },
                  ].map(f => (
                    <div key={f.k}>
                      <label className="label label-dark">{f.label}</label>
                      <input className="input input-dark" placeholder={f.ph} value={bank[f.k as keyof typeof bank]}
                        onChange={e => setBank(prev => ({ ...prev, [f.k]: e.target.value }))} />
                    </div>
                  ))}
                </div>
                <button onClick={requestPayout} disabled={loading} className="btn btn-gold btn-sm">
                  {loading ? "Submitting..." : `Confirm -- Request N${stats.approved.toLocaleString()}`}
                </button>
                {payoutMsg && <p style={{ fontSize: "0.78rem", color: payoutMsg.includes("success") ? "#34D399" : "#F87171", marginTop: 8 }}>{payoutMsg}</p>}
              </div>
            )}
          </div>
        )}

        {/* Commission table */}
        <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, marginBottom: 20 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--cream-200)" }}>
            <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)" }}>Commission History</p>
          </div>
          {commissions.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center" }}>
              <p className="body-sm" style={{ color: "rgba(28,28,30,0.35)", fontStyle: "italic" }}>No commissions yet. Refer a client to get started.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead><tr>
                  <th>Service</th><th>Deal Value</th><th>Rate</th><th>Commission</th><th>Type</th><th>Status</th><th>Date</th>
                </tr></thead>
                <tbody>
                  {commissions.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.service_name}</td>
                      <td>N{Number(c.deal_value).toLocaleString()}</td>
                      <td>{c.rate}%</td>
                      <td style={{ fontWeight: 700, color: "#059669" }}>N{Number(c.amount).toLocaleString()}</td>
                      <td><span className="badge" style={{ background: "var(--cream-200)", color: "var(--navy-700)" }}>{c.type}</span></td>
                      <td>{statusBadge(c.status)}</td>
                      <td style={{ fontSize: "0.75rem" }}>{new Date(c.created_at).toLocaleDateString("en-NG")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Payout history */}
        {payouts.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4 }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--cream-200)" }}>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)" }}>Payout History</p>
            </div>
            <table className="table">
              <thead><tr><th>Amount</th><th>Bank</th><th>Status</th><th>Requested</th><th>Paid</th></tr></thead>
              <tbody>
                {payouts.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 700, color: "#059669" }}>N{Number(p.amount).toLocaleString()}</td>
                    <td>{p.bank_name}</td>
                    <td>{statusBadge(p.status)}</td>
                    <td style={{ fontSize: "0.75rem" }}>{new Date(p.created_at).toLocaleDateString("en-NG")}</td>
                    <td style={{ fontSize: "0.75rem" }}>{p.paid_at ? new Date(p.paid_at).toLocaleDateString("en-NG") : "--"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

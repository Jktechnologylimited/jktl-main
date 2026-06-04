"use client";
import { useState, useEffect } from "react";

interface Lead { id: string; ref_name: string; ref_email: string; service: string; status: string; created_at: string; }
interface Click { date: string; count: number; }

export default function ReferralsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clicks, setClicks] = useState<Click[]>([]);
  const [stats, setStats] = useState({ clicks: 0, leads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/affiliates/dashboard").then(r => r.json()).then(d => {
      setLeads(d.leads || []);
      setClicks(d.clicks || []);
      setStats(d.stats || {});
      setLoading(false);
    });
  }, []);

  const statusBadge = (s: string) => {
    const map: Record<string, string> = { new: "badge-pending", contacted: "badge-approved", converted: "badge-active", lost: "badge-rejected" };
    return <span className={`badge ${map[s] || "badge-pending"}`}>{s}</span>;
  };

  const converted = leads.filter(l => l.status === "converted").length;
  const convRate = leads.length > 0 ? ((converted / leads.length) * 100).toFixed(1) : "0";

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>Referrals</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Every lead and click generated through your referral links.</p>
      </div>

      <div className="page-body">
        {/* Quick stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10, marginBottom: 24 }}>
          {[
            { l: "Total Clicks",     v: stats.clicks,   c: "#1A4A8A" },
            { l: "Total Leads",      v: stats.leads,    c: "#7C3AED" },
            { l: "Converted",        v: converted,      c: "#059669" },
            { l: "Conversion Rate",  v: `${convRate}%`, c: "#D97706" },
          ].map(s => (
            <div key={s.l} className="stat-card" style={{ borderTop: `3px solid ${s.c}` }}>
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "1.75rem", color: s.c, lineHeight: 1, marginBottom: 4 }}>{s.v}</p>
              <p style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--navy-900)" }}>{s.l}</p>
            </div>
          ))}
        </div>

        {/* Leads table */}
        <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, marginBottom: 20 }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--cream-200)" }}>
            <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)" }}>Lead History</p>
          </div>
          {loading ? (
            <div style={{ padding: 32, textAlign: "center" }}><p style={{ color: "rgba(28,28,30,0.35)" }}>Loading...</p></div>
          ) : leads.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center" }}>
              <p className="body-sm" style={{ color: "rgba(28,28,30,0.35)", fontStyle: "italic" }}>No referrals yet. Share your link to get started.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table">
                <thead><tr><th>#</th><th>Name</th><th>Service Interest</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={lead.id}>
                      <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: "rgba(28,28,30,0.35)" }}>#{String(i+1).padStart(3,"0")}</td>
                      <td style={{ fontWeight: 600 }}>{lead.ref_name || "Anonymous"}</td>
                      <td>{lead.service || "--"}</td>
                      <td>{statusBadge(lead.status)}</td>
                      <td style={{ fontSize: "0.75rem" }}>{new Date(lead.created_at).toLocaleDateString("en-NG")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Click history */}
        {clicks.length > 0 && (
          <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4 }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--cream-200)" }}>
              <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)" }}>Daily Clicks (last 30 days)</p>
            </div>
            <table className="table">
              <thead><tr><th>Date</th><th>Clicks</th></tr></thead>
              <tbody>
                {clicks.map((c, i) => (
                  <tr key={i}>
                    <td>{new Date(c.date).toLocaleDateString("en-NG", { weekday:"short", day:"numeric", month:"short" })}</td>
                    <td style={{ fontWeight: 700, color: "#1A4A8A" }}>{c.count}</td>
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

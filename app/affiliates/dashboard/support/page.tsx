"use client";
import { useState, useEffect } from "react";

interface Ticket { id: string; subject: string; message: string; status: string; created_at: string; }

const FAQS = [
  { q: "When will my commission be paid?", a: "Commissions are paid on the last business day of each month. The minimum payout is N20,000. Payment is via bank transfer to any Nigerian bank account." },
  { q: "How do I know if my referral converted?", a: "Once JKTL confirms a deal closed from your referral, a commission entry appears in your Earnings page with 'pending' status. We update it to 'approved' once payment is received from the client." },
  { q: "What is the cookie duration?", a: "30 days. If someone clicks your link and signs up within 30 days, you get the commission -- even if they did not convert on the first visit." },
  { q: "Can I promote on any platform?", a: "Yes -- WhatsApp, Instagram, LinkedIn, Facebook, YouTube, email, in person. Just do not spam, misrepresent JKTL's services, or use paid ads that could conflict with JKTL's own campaigns without permission." },
  { q: "How do I move to Silver or Gold tier?", a: "Silver unlocks automatically after 3 successful referrals (deals that closed). Gold unlocks after 8. Your tier updates in your dashboard within 24 hours of qualification." },
  { q: "Who counts as a referral?", a: "Anyone who clicks your referral link and contacts JKTL within the 30-day window, and whose deal ultimately closes. JKTL reserves the right to verify referrals." },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/affiliates/support").then(r => r.json()).then(d => setTickets(d.tickets || []));
  }, []);

  async function submit() {
    if (!form.subject || !form.message) { setError("Please fill in both fields"); return; }
    setSending(true); setError("");
    const res = await fetch("/api/affiliates/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSending(false);
    if (res.ok) {
      setSent(true);
      setForm({ subject: "", message: "" });
      // Refresh tickets
      fetch("/api/affiliates/support").then(r => r.json()).then(d => setTickets(d.tickets || []));
    } else {
      setError("Failed to send. Please try again.");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>Support</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Get help from the JKTL affiliate team. We respond within 24-48 hours.</p>
      </div>

      <div className="page-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>

          {/* Left: FAQ + ticket form */}
          <div>
            {/* FAQ */}
            <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Common Questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 32 }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "14px 18px" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--navy-900)", marginBottom: 5 }}>{faq.q}</p>
                  <p className="body-sm" style={{ color: "rgba(28,28,30,0.6)" }}>{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Submit ticket */}
            <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Submit a Ticket
            </h2>
            {sent ? (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 4, padding: "20px 24px", marginBottom: 20 }}>
                <p style={{ fontWeight: 700, color: "#166534", marginBottom: 4 }}>Ticket submitted successfully.</p>
                <p className="body-sm" style={{ color: "#166534" }}>We will get back to you within 24-48 hours.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: 10, background: "none", border: "none", color: "#166534", fontSize: "0.78rem", cursor: "pointer", textDecoration: "underline" }}>Submit another</button>
              </div>
            ) : (
              <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "20px 24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label className="label">Subject</label>
                    <input className="input" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="e.g. Question about my commission" />
                  </div>
                  <div>
                    <label className="label">Message</label>
                    <textarea className="input" rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Describe your question or issue in detail..." style={{ resize: "none" }} />
                  </div>
                  {error && <p style={{ color: "var(--red)", fontSize: "0.78rem" }}>{error}</p>}
                  <button onClick={submit} disabled={sending} className="btn btn-navy" style={{ alignSelf: "flex-start" }}>
                    {sending ? "Sending..." : "Submit Ticket"}
                  </button>
                </div>
              </div>
            )}

            {/* Previous tickets */}
            {tickets.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
                  Your Tickets
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {tickets.map(t => (
                    <div key={t.id} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "14px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--navy-900)" }}>{t.subject}</p>
                        <span className={`badge ${t.status === "open" ? "badge-pending" : "badge-active"}`}>{t.status}</span>
                      </div>
                      <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)", marginBottom: 4 }}>{t.message}</p>
                      <p style={{ fontSize: "0.7rem", color: "rgba(28,28,30,0.3)" }}>{new Date(t.created_at).toLocaleDateString("en-NG")}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: contact details */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--navy-900)", borderRadius: 4, padding: "20px" }}>
              <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: 14 }}>Direct Contact</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="mailto:info@jktl.com.ng" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none" }}>
                  <div style={{ width: 32, height: 32, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", fontWeight: 700, color: "var(--gold-400)" }}>EM</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.4)" }}>Email</p>
                    <p style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>info@jktl.com.ng</p>
                  </div>
                </a>
                <a href="tel:+2347036580994" style={{ display: "flex", gap: 10, alignItems: "center", textDecoration: "none" }}>
                  <div style={{ width: 32, height: 32, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", fontWeight: 700, color: "var(--gold-400)" }}>PH</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.4)" }}>Phone / WhatsApp</p>
                    <p style={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>+234 703 658 0994</p>
                  </div>
                </a>
              </div>
              <p style={{ fontSize: "0.72rem", color: "rgba(249,247,240,0.3)", marginTop: 16 }}>Response time: 24-48 hours on tickets, same day on WhatsApp.</p>
            </div>

            <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 18px" }}>
              <p className="label-xs" style={{ color: "rgba(28,28,30,0.4)", marginBottom: 8 }}>Quick info</p>
              {[
                { l: "Payout date",    v: "28th of every month" },
                { l: "Minimum payout", v: "N50,000" },
                { l: "Signup bonus",   v: "N20,000 (unlocks on 1st referral)" },
                { l: "Bonus expiry",   v: "90 days from signup" },
                { l: "Cookie window",  v: "30 days" },
                { l: "Standard rate",  v: "10% commission" },
                { l: "Gold rate",      v: "15% commission" },
              ].map(r => (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid var(--cream-100)", fontSize: "0.78rem" }}>
                  <span style={{ color: "rgba(28,28,30,0.45)" }}>{r.l}</span>
                  <span style={{ fontWeight: 600, color: "var(--navy-900)" }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

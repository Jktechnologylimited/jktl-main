"use client";
import { useState, useEffect } from "react";

interface Aff { firstName: string; lastName: string; email: string; phone: string; businessName: string; referralCode: string; tier: string; createdAt: string; bankName?: string; bankAccount?: string; bankHolder?: string; }

export default function ProfilePage() {
  const [aff, setAff] = useState<Aff | null>(null);
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", businessName:"", bankName:"", bankAccount:"", bankHolder:"" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/affiliates/me").then(r => r.json()).then((d: Aff) => {
      setAff(d);
      setForm({ firstName: d.firstName || "", lastName: d.lastName || "", phone: d.phone || "", businessName: d.businessName || "", bankName: d.bankName || "", bankAccount: d.bankAccount || "", bankHolder: d.bankHolder || "" });
    });
  }, []);

  async function save() {
    setSaving(true); setError(""); setSaved(false);
    const res = await fetch("/api/affiliates/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
    else setError("Failed to save. Please try again.");
  }

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1.5px solid #e5e1d4", borderRadius: 2, fontSize: "0.875rem", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" };

  if (!aff) return <div style={{ padding: 40 }}><p style={{ color: "rgba(28,28,30,0.4)" }}>Loading...</p></div>;

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>Profile</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Manage your account details and bank information for payouts.</p>
      </div>

      <div className="page-body">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

          {/* Edit form */}
          <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "24px 28px" }}>

            <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Personal Information</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[
                { k: "firstName", l: "First Name" },
                { k: "lastName",  l: "Last Name" },
              ].map(f => (
                <div key={f.k}>
                  <label className="label">{f.l}</label>
                  <input value={form[f.k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inputStyle} />
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label className="label">Phone / WhatsApp</label>
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label className="label">Business Name (optional)</label>
                <input value={form.businessName} onChange={e => setForm(p => ({ ...p, businessName: e.target.value }))} style={inputStyle} placeholder="Optional" />
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--cream-200)", paddingTop: 20, marginBottom: 20, marginTop: 6 }}>
              <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Bank Details for Payouts</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                {[
                  { k: "bankName",    l: "Bank Name",      ph: "e.g. Access Bank" },
                  { k: "bankAccount", l: "Account Number", ph: "10-digit number" },
                  { k: "bankHolder",  l: "Account Name",   ph: "Name on account" },
                ].map(f => (
                  <div key={f.k}>
                    <label className="label">{f.l}</label>
                    <input value={form[f.k as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} style={inputStyle} placeholder={f.ph} />
                  </div>
                ))}
              </div>
            </div>

            {error && <p style={{ color: "var(--red)", fontSize: "0.78rem", marginBottom: 10 }}>{error}</p>}
            {saved && <p style={{ color: "#059669", fontSize: "0.78rem", marginBottom: 10 }}>Profile saved successfully.</p>}

            <button onClick={save} disabled={saving} className="btn btn-navy">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* Account info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "var(--navy-900)", borderRadius: 4, padding: "20px" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "2px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--gold-400)" }}>
                  {aff.firstName[0]}{aff.lastName[0]}
                </span>
              </div>
              <p style={{ textAlign: "center", fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: 4 }}>{aff.firstName} {aff.lastName}</p>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(249,247,240,0.4)", marginBottom: 14 }}>{aff.email}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: "Referral Code", v: aff.referralCode },
                  { l: "Tier",          v: aff.tier.charAt(0).toUpperCase() + aff.tier.slice(1) },
                  { l: "Member since",  v: new Date(aff.createdAt).toLocaleDateString("en-NG", { month: "long", year: "numeric" }) },
                ].map(r => (
                  <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(249,247,240,0.06)", fontSize: "0.78rem" }}>
                    <span style={{ color: "rgba(249,247,240,0.4)" }}>{r.l}</span>
                    <span style={{ fontWeight: 700, color: "#fff", fontFamily: r.l === "Referral Code" ? "'JetBrains Mono',monospace" : "inherit" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 18px" }}>
              <p className="label-xs" style={{ color: "rgba(28,28,30,0.4)", marginBottom: 8 }}>Email cannot be changed</p>
              <p className="body-sm" style={{ color: "rgba(28,28,30,0.6)" }}>To change your email address, contact support at info@jktl.com.ng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", background: "#fff",
  border: "1.5px solid rgba(6,14,42,0.12)", borderRadius: "4px",
  color: "var(--navy-900)", fontSize: "0.9rem", outline: "none",
  fontFamily: "'Plus Jakarta Sans',sans-serif",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--navy-600)", marginBottom: "6px",
};

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", cv_url: "", cover_note: "" });

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function submit() {
    setErr("");
    if (!form.name || !form.email) { setErr("Name and email are required."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, ...form }),
      });
      const data = await res.json();
      if (!res.ok) { setErr(data.error || "Something went wrong."); setSaving(false); return; }
      setDone(true);
    } catch {
      setErr("Network error. Please try again.");
    }
    setSaving(false);
  }

  if (done) {
    return (
      <p style={{ fontSize: "0.9rem", color: "var(--navy-600)", fontWeight: 600 }}>
        Thank you — your application for {jobTitle} has been received. We&apos;ll be in touch.
      </p>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        style={{ padding: "11px 24px", borderRadius: "4px", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", background: "var(--navy-900)", color: "var(--cream-50)", border: "none", cursor: "pointer" }}>
        Apply for this role
      </button>
    );
  }

  return (
    <div style={{ borderTop: "1px solid rgba(6,14,42,0.08)", paddingTop: "20px", marginTop: "4px", display: "grid", gap: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input style={inputStyle} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="grid-cols-1 md:grid-cols-2">
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>CV link (Drive / Dropbox)</label>
          <input style={inputStyle} placeholder="https://..." value={form.cv_url} onChange={(e) => set("cv_url", e.target.value)} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Cover note</label>
        <textarea style={{ ...inputStyle, minHeight: "90px", resize: "vertical" }} value={form.cover_note} onChange={(e) => set("cover_note", e.target.value)} />
      </div>
      {err && <p style={{ color: "#B91C1C", fontSize: "0.82rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button onClick={submit} disabled={saving}
          style={{ padding: "11px 24px", borderRadius: "4px", fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", background: "var(--gold-400)", color: "var(--navy-950)", border: "none", cursor: saving ? "default" : "pointer", opacity: saving ? 0.6 : 1 }}>
          {saving ? "Submitting..." : "Submit application"}
        </button>
        <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", color: "var(--navy-600)" }}>Cancel</button>
      </div>
    </div>
  );
}

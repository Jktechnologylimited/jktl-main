"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/affiliates/forgot-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSent(true); setLoading(false);
  }

  const input: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 9, color: "#fff", fontSize: "0.9rem", outline: "none" };
  const label: React.CSSProperties = { display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(226,232,240,0.5)", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Reset your password</h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.45)" }}>We&apos;ll email you a link to set a new one</p>
        </div>
        {sent ? (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: "0.9rem", marginBottom: 8 }}>Check your email</p>
            <p style={{ color: "rgba(226,232,240,0.5)", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: 18 }}>If an account exists for <span style={{ color: "#C9A84C" }}>{email}</span>, we&apos;ve sent a reset link. It expires in 1 hour.</p>
            <Link href="/affiliates/login" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>Back to login</Link>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, display: "grid", gap: 16 }}>
            <div>
              <label style={label}>Email</label>
              <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
            </div>
            <button type="submit" disabled={loading}
              style={{ padding: "13px", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "#C9A84C", color: "#060E2A", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sending..." : "Send reset link"}
            </button>
            <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(226,232,240,0.45)", margin: 0 }}>
              <Link href="/affiliates/login" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}>Back to login</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

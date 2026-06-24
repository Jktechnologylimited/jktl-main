"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token") || "";
    setToken(t);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/affiliates/reset-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Reset failed"); setLoading(false); return; }
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again."); setLoading(false);
    }
  }

  const input: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 9, color: "#fff", fontSize: "0.9rem", outline: "none" };
  const label: React.CSSProperties = { display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(226,232,240,0.5)", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Set a new password</h1>
        </div>
        {done ? (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: "0.9rem", marginBottom: 8 }}>Password updated ✓</p>
            <p style={{ color: "rgba(226,232,240,0.5)", fontSize: "0.83rem", marginBottom: 18 }}>You can now sign in with your new password.</p>
            <Link href="/affiliates/login" style={{ display: "inline-block", background: "#C9A84C", color: "#060E2A", fontWeight: 700, fontSize: "0.8rem", padding: "11px 24px", borderRadius: 8, textDecoration: "none" }}>Go to login</Link>
          </div>
        ) : !token ? (
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, textAlign: "center" }}>
            <p style={{ color: "#F87171", fontSize: "0.85rem", marginBottom: 14 }}>This reset link is missing its token. Please use the link from your email, or request a new one.</p>
            <Link href="/affiliates/forgot-password" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600, fontSize: "0.85rem" }}>Request a new link</Link>
          </div>
        ) : (
          <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, display: "grid", gap: 16 }}>
            <div>
              <label style={label}>New password</label>
              <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" required />
            </div>
            <div>
              <label style={label}>Confirm password</label>
              <input style={input} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" required />
            </div>
            {error && <p style={{ color: "#F87171", fontSize: "0.82rem", margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading}
              style={{ padding: "13px", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "#C9A84C", color: "#060E2A", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Saving..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

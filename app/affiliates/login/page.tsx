"use client";
import { useState } from "react";
import Link from "next/link";

export default function AffiliateLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/affiliates/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Login failed"); setLoading(false); return; }
      window.location.href = d.status === "active" ? "/affiliates/dashboard" : "/affiliates/pending";
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const input: React.CSSProperties = { width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.12)", borderRadius: 9, color: "#fff", fontSize: "0.9rem", outline: "none" };
  const label: React.CSSProperties = { display: "block", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(226,232,240,0.5)", marginBottom: 6 };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: 6 }}>Affiliate Login</h1>
          <p style={{ fontSize: "0.85rem", color: "rgba(226,232,240,0.45)" }}>Sign in to your JKTL affiliate dashboard</p>
        </div>
        <form onSubmit={submit} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 28, display: "grid", gap: 16 }}>
          <div>
            <label style={label}>Email</label>
            <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div>
            <label style={label}>Password</label>
            <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            <div style={{ textAlign: "right", marginTop: 6 }}>
              <Link href="/affiliates/forgot-password" style={{ color: "rgba(201,168,76,0.85)", textDecoration: "none", fontSize: "0.76rem" }}>Forgot password?</Link>
            </div>
          </div>
          {error && <p style={{ color: "#F87171", fontSize: "0.82rem", margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding: "13px", borderRadius: 9, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em", background: "#C9A84C", color: "#060E2A", border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(226,232,240,0.45)", margin: 0 }}>
            New here? <Link href="/affiliates/join" style={{ color: "#C9A84C", textDecoration: "none", fontWeight: 600 }}>Become an affiliate</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

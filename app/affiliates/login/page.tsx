"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const rejected = params.get("rejected");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setError("Email and password are required"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/affiliates/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Login failed"); return; }
      router.push(data.redirect || "/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px",
    border: "1.5px solid #e5e1d4", borderRadius: 2,
    fontSize: "0.9rem", outline: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", display: "flex", flexDirection: "column" }}>
      <nav style={{ padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
        <Link href="/affiliates" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>
          JK Technology <span style={{ color: "var(--gold-400)" }}>Affiliate</span>
        </Link>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>

          {rejected && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 4, padding: "14px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: "0.85rem", color: "#DC2626", fontWeight: 600 }}>Your application was not approved.</p>
              <p style={{ fontSize: "0.78rem", color: "#DC2626", marginTop: 4 }}>Contact info@jktl.com.ng for more information.</p>
            </div>
          )}

          <div style={{ background: "#fff", borderRadius: 4, padding: "36px 40px", boxShadow: "0 24px 48px rgba(0,0,0,0.3)" }}>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.75rem", color: "var(--navy-900)", marginBottom: 4 }}>Welcome Back</h1>
            <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginBottom: 28 }}>Log in to your affiliate dashboard</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="label">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={inputStyle} placeholder="your@email.com" />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label className="label" style={{ marginBottom: 0 }}>Password</label>
                  <Link href="/forgot-password" style={{ fontSize: "0.72rem", color: "var(--navy-600)", textDecoration: "none" }}>Forgot password?</Link>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={inputStyle} placeholder="Your password" />
              </div>

              {error && (
                <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 2, padding: "10px 14px" }}>
                  <p style={{ fontSize: "0.82rem", color: "#DC2626" }}>{error}</p>
                </div>
              )}

              <button onClick={handleLogin} disabled={loading} className="btn btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>

            <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(28,28,30,0.45)", marginTop: 20 }}>
              Do not have an account?{" "}
              <Link href="/affiliates/join" style={{ color: "var(--navy-700)", fontWeight: 700, textDecoration: "none" }}>Join the program</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

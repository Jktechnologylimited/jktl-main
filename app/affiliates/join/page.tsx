"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


interface SessionData { authenticated: boolean; name: string | null; email: string | null; }

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  border: "1.5px solid rgba(255,255,255,0.1)",
  borderRadius: 8, fontSize: "0.9rem", outline: "none",
  fontFamily: "'Plus Jakarta Sans',sans-serif",
  background: "rgba(255,255,255,0.06)", color: "#fff",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.68rem", fontWeight: 700,
  letterSpacing: "0.1em", textTransform: "uppercase",
  color: "rgba(226,232,240,0.4)", marginBottom: 6,
};

export default function JoinPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [checking, setChecking] = useState(false);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [business,  setBusiness]  = useState("");
  const [howPromote,setHowPromote]= useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [agree,     setAgree]     = useState(false);

  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  useEffect(() => { setChecking(false); }, []);

  async function handleSubmit() {
    if (!firstName || !lastName || !email || !phone || !howPromote) {
      setError("Please fill in all required fields"); return;
    }
    if (password.length < 8) { setError("Choose a password of at least 8 characters"); return; }
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (!agree) { setError("You must agree to the terms"); return; }

    setLoading(true); setError("");
    try {
      const res = await fetch("/api/affiliates/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, businessName: business, howPromote, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        // If already an affiliate, redirect to dashboard
        if (data.error?.includes("already exists") || data.error?.includes("already registered")) {
          router.push("/affiliates/login");
          return;
        }
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/affiliates/pending");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 32, height: 32, border: "2px solid rgba(16,185,129,0.2)", borderTop: "2px solid #10B981", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(226,232,240,0.4)", fontSize: "0.85rem", fontFamily: "sans-serif" }}>Checking your account...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#060E2A", fontFamily: "'Plus Jakarta Sans', sans-serif", padding: "clamp(80px,12vw,120px) 20px 60px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <a href="/affiliates" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 24 }}>
            <Image src="/logo.png" alt="JK Technology Limited" width={44} height={44} style={{ objectFit: "contain" }} />
          </a>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            Join the Affiliate Programme
          </h1>
          <p style={{ fontSize: "0.88rem", color: "rgba(226,232,240,0.45)", lineHeight: 1.6 }}>
            Earn commissions promoting JKTL Desk products.
            N10,000 welcome bonus. 5% on setup fees. 2% recurring.
          </p>
        </div>

        {/* Signed in as */}
        {session?.authenticated && (
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", flexShrink: 0 }} />
            <p style={{ fontSize: "0.82rem", color: "rgba(226,232,240,0.7)" }}>
              Signed in as <strong style={{ color: "#fff" }}>{session.email}</strong>
            </p>
          </div>
        )}

        {/* Form */}
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

            {/* Name row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input style={inputStyle} value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John" />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input style={inputStyle} value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Adeyemi" />
              </div>
            </div>

            {/* Email -- pre-filled, readonly if from session */}
            <div>
              <label style={labelStyle}>Email Address *</label>
              <input style={{ ...inputStyle, opacity: session?.email ? 0.7 : 1 }}
                type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                readOnly={false}
                placeholder="your@email.com" />
              {session?.email && (
                <p style={{ fontSize: "0.68rem", color: "rgba(226,232,240,0.3)", marginTop: 4 }}>
                  Using your JKTL account email
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>WhatsApp / Phone *</label>
              <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 803 000 0000" />
            </div>

            {/* Business name */}
            <div>
              <label style={labelStyle}>Business / Brand Name (optional)</label>
              <input style={inputStyle} value={business} onChange={e => setBusiness(e.target.value)} placeholder="Your business name if applicable" />
            </div>

            {/* Password */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label style={labelStyle}>Password *</label>
                <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters" />
              </div>
              <div>
                <label style={labelStyle}>Confirm password *</label>
                <input style={inputStyle} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" />
              </div>
            </div>

            {/* How promote */}
            <div>
              <label style={labelStyle}>How do you plan to promote JKTL? *</label>
              <textarea
                style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
                value={howPromote}
                onChange={e => setHowPromote(e.target.value)}
                placeholder="e.g. I run a WhatsApp group for church administrators, Instagram page for auto detailers, LinkedIn for school owners..." />
            </div>

            {/* Terms */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: "pointer" }} />
              <p style={{ fontSize: "0.78rem", color: "rgba(226,232,240,0.5)", lineHeight: 1.5 }}>
                I agree to the JKTL Affiliate Programme terms and confirm that I will promote products ethically and honestly.
              </p>
            </div>

            {error && (
              <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#F87171", fontSize: "0.82rem" }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", background: loading ? "rgba(201,168,76,0.5)" : "#C9A84C", color: "#060E2A", border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(226,232,240,0.3)" }}>
              Applications are reviewed within 24-48 hours. You will be notified by email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

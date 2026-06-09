"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string; lastName: string; email: string;
  phone: string; password: string; confirm: string;
  businessName: string; howPromote: string; agree: boolean;
}

const EMPTY: FormData = {
  firstName:"", lastName:"", email:"", phone:"",
  password:"", confirm:"", businessName:"", howPromote:"", agree:false,
};

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const set = (k: keyof FormData, v: string | boolean) =>
    setForm(prev => ({ ...prev, [k]: v }));

  function validateStep1() {
    const e: Partial<FormData> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.email.includes("@")) e.email  = "Valid email required";
    if (form.phone.length < 7)  e.phone     = "Valid phone required";
    if (form.password.length < 8) e.password = "Min 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e: Partial<FormData> = {};
    if (!form.howPromote.trim()) e.howPromote = "Please tell us how you plan to promote JKTL";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    if (!form.agree) { setApiError("You must agree to the terms to continue."); return; }
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch("/api/affiliates/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName, lastName: form.lastName,
          email: form.email, phone: form.phone, password: form.password,
          businessName: form.businessName, howPromote: form.howPromote,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setApiError(data.error || "Something went wrong"); return; }
      router.push("/affiliates/pending");
    } catch {
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (err?: string) => ({
    width: "100%", padding: "11px 14px",
    border: `1.5px solid ${err ? "#DC2626" : "#e5e1d4"}`,
    borderRadius: 2, fontSize: "0.9rem", outline: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif",
  } as React.CSSProperties);

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <nav style={{ padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
        <Link href="/affiliates" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>
          JK Technology <span style={{ color: "var(--gold-400)" }}>Affiliate</span>
        </Link>
        <Link href="/affiliates/login" style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.5)", textDecoration: "none" }}>
          Already have an account? Login
        </Link>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>

          {/* Progress steps */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32, justifyContent: "center" }}>
            {[1,2,3].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step >= s ? "var(--gold-400)" : "rgba(249,247,240,0.08)", border: step >= s ? "none" : "1px solid rgba(249,247,240,0.15)" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", fontWeight: 700, color: step >= s ? "var(--navy-900)" : "rgba(249,247,240,0.3)" }}>{s}</span>
                </div>
                {s < 3 && <div style={{ width: 40, height: 1, background: step > s ? "var(--gold-400)" : "rgba(249,247,240,0.1)" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", borderRadius: 4, padding: "36px 40px", boxShadow: "0 24px 48px rgba(0,0,0,0.3)" }}>

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.75rem", color: "var(--navy-900)", marginBottom: 4 }}>Create Your Account</h1>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginBottom: 28 }}>Step 1 of 3 -- Personal information</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label className="label">First Name</label>
                      <input value={form.firstName} onChange={e => set("firstName", e.target.value)} style={inputStyle(errors.firstName)} placeholder="John" />
                      {errors.firstName && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input value={form.lastName} onChange={e => set("lastName", e.target.value)} style={inputStyle(errors.lastName)} placeholder="Adeyemi" />
                      {errors.lastName && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.lastName}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle(errors.email)} placeholder="john@example.com" />
                    {errors.email && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label">Phone / WhatsApp</label>
                    <input value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle(errors.phone)} placeholder="+234 803 000 0000" />
                    {errors.phone && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="label">Password</label>
                    <input type="password" value={form.password} onChange={e => set("password", e.target.value)} style={inputStyle(errors.password)} placeholder="At least 8 characters" />
                    {form.password && (
                      <div style={{ marginTop: 6 }}>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: form.password.length >= 12 ? "100%" : form.password.length >= 8 ? "60%" : "30%" }} />
                        </div>
                        <p style={{ fontSize: "0.68rem", color: form.password.length >= 8 ? "#059669" : "#DC2626", marginTop: 3 }}>
                          {form.password.length >= 12 ? "Strong" : form.password.length >= 8 ? "Good" : "Too short"}
                        </p>
                      </div>
                    )}
                    {errors.password && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.password}</p>}
                  </div>
                  <div>
                    <label className="label">Confirm Password</label>
                    <input type="password" value={form.confirm} onChange={e => set("confirm", e.target.value)} style={inputStyle(errors.confirm)} placeholder="Repeat your password" />
                    {errors.confirm && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.confirm}</p>}
                  </div>
                  <button onClick={() => validateStep1() && setStep(2)} className="btn btn-navy" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                    Continue to Step 2
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.75rem", color: "var(--navy-900)", marginBottom: 4 }}>About Your Promotion</h1>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginBottom: 28 }}>Step 2 of 3 -- How you plan to promote JKTL</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label className="label">Business / Brand Name (Optional)</label>
                    <input value={form.businessName} onChange={e => set("businessName", e.target.value)} style={inputStyle()} placeholder="Your business name if applicable" />
                  </div>
                  <div>
                    <label className="label">How Will You Promote JKTL? *</label>
                    <textarea value={form.howPromote} onChange={e => set("howPromote", e.target.value)}
                      placeholder="e.g. I have a WhatsApp group of 500+ business owners. I run a LinkedIn page about digital business. I work with SMEs as a consultant..."
                      rows={4}
                      style={{ ...inputStyle(errors.howPromote), resize: "none" } as React.CSSProperties}
                    />
                    {errors.howPromote && <p style={{ color: "#DC2626", fontSize: "0.72rem", marginTop: 4 }}>{errors.howPromote}</p>}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setStep(1)} className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                    <button onClick={() => validateStep2() && setStep(3)} className="btn btn-navy" style={{ flex: 2, justifyContent: "center" }}>Continue to Review</button>
                  </div>
                </div>
              </>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <>
                <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.75rem", color: "var(--navy-900)", marginBottom: 4 }}>Review & Submit</h1>
                <p className="body-sm" style={{ color: "rgba(28,28,30,0.5)", marginBottom: 24 }}>Step 3 of 3 -- Confirm your details</p>
                <div style={{ background: "var(--cream-100)", border: "1px solid var(--cream-300)", borderRadius: 2, padding: "16px 20px", marginBottom: 20 }}>
                  {[
                    { l: "Name", v: `${form.firstName} ${form.lastName}` },
                    { l: "Email", v: form.email },
                    { l: "Phone", v: form.phone },
                    { l: "Business", v: form.businessName || "Not specified" },
                  ].map(row => (
                    <div key={row.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--cream-200)", fontSize: "0.85rem" }}>
                      <span style={{ color: "rgba(28,28,30,0.4)", fontWeight: 600 }}>{row.l}</span>
                      <span style={{ color: "var(--navy-900)" }}>{row.v}</span>
                    </div>
                  ))}
                  <div style={{ padding: "8px 0 0", fontSize: "0.82rem" }}>
                    <span style={{ color: "rgba(28,28,30,0.4)", fontWeight: 600, display: "block", marginBottom: 4 }}>How you will promote:</span>
                    <span style={{ color: "var(--navy-900)" }}>{form.howPromote}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 20 }}>
                  <input type="checkbox" id="agree" checked={form.agree} onChange={e => set("agree", e.target.checked)}
                    style={{ marginTop: 3, flexShrink: 0, accentColor: "var(--navy-900)", width: 16, height: 16 }} />
                  <label htmlFor="agree" style={{ fontSize: "0.82rem", color: "rgba(28,28,30,0.65)", lineHeight: 1.5 }}>
                    I agree to the JKTL Affiliate Program terms. I understand that commission is paid on deals that close, subject to JKTL approval, with a minimum payout of N20,000.
                  </label>
                </div>
                {apiError && (
                  <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 2, padding: "10px 14px", marginBottom: 14 }}>
                    <p style={{ fontSize: "0.82rem", color: "#DC2626" }}>{apiError}</p>
                  </div>
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setStep(2)} className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button onClick={handleSubmit} disabled={loading} className="btn btn-gold" style={{ flex: 2, justifyContent: "center" }}>
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

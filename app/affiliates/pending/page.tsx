import Link from "next/link";
import { getSession } from "@/lib/affiliate-auth";

export default async function PendingPage() {
  const session = await getSession();

  return (
    <div style={{ minHeight: "100vh", background: "var(--navy-950)", display: "flex", flexDirection: "column" }}>
      <nav style={{ padding: "0 32px", height: 60, display: "flex", alignItems: "center", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
        <Link href="/affiliates" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, color: "#fff", textDecoration: "none", fontSize: "0.95rem" }}>
          JK Technology <span style={{ color: "var(--gold-400)" }}>Affiliate</span>
        </Link>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>

          {/* Status icon */}
          <div style={{ width: 72, height: 72, background: "rgba(201,168,76,0.12)", border: "2px solid rgba(201,168,76,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>

          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: "clamp(1.75rem,4vw,2.5rem)", color: "#fff", marginBottom: 12 }}>
            Application Under Review
          </h1>

          {session && (
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--gold-400)", marginBottom: 16 }}>
              Hi {session.firstName} -- your application has been received.
            </p>
          )}

          <p className="body-md" style={{ color: "rgba(249,247,240,0.55)", maxWidth: 420, margin: "0 auto 32px", lineHeight: 1.7 }}>
            We review every affiliate application personally. You will receive an email notification at{" "}
            {session ? <strong style={{ color: "#fff" }}>{session.email}</strong> : "your email address"}{" "}
            once your account is approved. This typically takes 24-48 hours.
          </p>

          {/* What happens next */}
          <div style={{ background: "rgba(249,247,240,0.04)", border: "1px solid rgba(249,247,240,0.08)", borderRadius: 4, padding: "24px 28px", marginBottom: 28, textAlign: "left" }}>
            <p className="label-xs" style={{ color: "var(--gold-400)", marginBottom: 16 }}>What happens next</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "01", t: "Application Review", d: "Our team reviews your application and promotion plan." },
                { n: "02", t: "Email Notification", d: "You receive an approval email with your login link." },
                { n: "03", t: "Dashboard Access", d: "Log in and get your unique referral link instantly." },
                { n: "04", t: "Start Earning",     d: "Share your link and earn on every deal that closes." },
              ].map(s => (
                <div key={s.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 28, height: 28, background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", fontWeight: 700, color: "var(--gold-400)" }}>{s.n}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#fff", marginBottom: 2 }}>{s.t}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(249,247,240,0.45)" }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "0.8rem", color: "rgba(249,247,240,0.3)", marginBottom: 16 }}>
            Questions? Contact us at{" "}
            <a href="mailto:info@jktl.com.ng" style={{ color: "var(--gold-400)", textDecoration: "none" }}>info@jktl.com.ng</a>
            {" "}or call{" "}
            <a href="tel:+2347036580994" style={{ color: "var(--gold-400)", textDecoration: "none" }}>+234 703 658 0994</a>
          </p>

          <Link href="/affiliates" style={{ fontSize: "0.78rem", color: "rgba(249,247,240,0.3)", textDecoration: "none" }}>
            Back to affiliate.jktl.com.ng
          </Link>
        </div>
      </div>
    </div>
  );
}

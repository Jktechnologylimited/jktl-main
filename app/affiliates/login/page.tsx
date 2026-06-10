"use client";
import { useEffect } from "react";

// Affiliate login now uses the JKTL SSO
// Redirect to accounts.jktl.com.ng/sign-in with return URL
export default function AffiliateLoginRedirect() {
  useEffect(() => {
    const returnUrl = encodeURIComponent(window.location.origin + "/affiliates/dashboard");
    const accountsUrl = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";
    window.location.href = `${accountsUrl}/sign-in?return=${returnUrl}`;
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 32, height: 32, border: "2px solid rgba(201,168,76,0.2)", borderTop: "2px solid #C9A84C", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(226,232,240,0.4)", fontSize: "0.85rem" }}>Redirecting to sign in...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

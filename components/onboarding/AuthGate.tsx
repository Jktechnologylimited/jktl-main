"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

interface AuthGateProps {
  children: React.ReactNode;
  color: string;
}

export function AuthGate({ children, color }: AuthGateProps) {
  const params = useSearchParams();
  const [status, setStatus] = useState<"checking" | "ok" | "redirect">("checking");

  useEffect(() => {
    // Dev bypass
    if (params.get("mock") === "bypass") {
      setStatus("ok");
      return;
    }

    // Token returned from accounts (future use)
    const token = params.get("token");
    if (token) {
      sessionStorage.setItem("jktl_session", token);
      setStatus("ok");
      return;
    }

    // Already verified this session
    if (sessionStorage.getItem("jktl_session")) {
      setStatus("ok");
      return;
    }

    // Check session -- retry up to 3 times with delay
    // (cookie may take a moment to be readable after cross-domain redirect)
    let attempts = 0;
    const maxAttempts = 3;

    async function checkSession() {
      attempts++;
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await res.json();
        if (data.authenticated) {
          // Cache so we don't check on every render
          sessionStorage.setItem("jktl_session", "1");
          setStatus("ok");
        } else if (attempts < maxAttempts) {
          // Retry after 800ms
          setTimeout(checkSession, 800);
        } else {
          setStatus("redirect");
        }
      } catch {
        if (attempts < maxAttempts) {
          setTimeout(checkSession, 800);
        } else {
          setStatus("redirect");
        }
      }
    }

    checkSession();
  }, [params]);

  useEffect(() => {
    if (status !== "redirect") return;
    // Strip www to ensure cookie domain matches
    const cleanUrl = window.location.href.replace("://www.jktl.com.ng", "://jktl.com.ng");
    const returnUrl = encodeURIComponent(cleanUrl);
    window.location.href = `${ACCOUNTS_URL}/sign-in?return=${returnUrl}`;
  }, [status]);

  if (status === "checking") return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#060E2A" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 32, height: 32, border: `2px solid ${color}40`, borderTop: `2px solid ${color}`, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "rgba(226,232,240,0.4)", fontSize: "0.85rem", fontFamily: "sans-serif" }}>
          Checking your account...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (status === "redirect") return null;
  return <>{children}</>;
}

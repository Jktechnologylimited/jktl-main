"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

function AuthGate({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const [status, setStatus] = useState<"checking"|"ok"|"redirect">("checking");

  useEffect(() => {
    // Dev bypass
    if (params.get("mock") === "bypass") { setStatus("ok"); return; }

    // Token returned from accounts after sign-in
    const token = params.get("token");
    if (token) { sessionStorage.setItem("jktl_session", token); setStatus("ok"); return; }

    // Already checked this session
    if (sessionStorage.getItem("jktl_session")) { setStatus("ok"); return; }

    // Check NextAuth cookie via session API
    fetch("/api/auth/session")
      .then(r => r.json())
      .then(d => setStatus(d.authenticated ? "ok" : "redirect"))
      .catch(() => setStatus("redirect"));
  }, [params]);

  useEffect(() => {
    if (status !== "redirect") return;
    const returnUrl = encodeURIComponent(window.location.href);
    const accountsUrl = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "http://localhost:3001";
    window.location.href = `${accountsUrl}/sign-in?return=${returnUrl}`;
  }, [status]);

  if (status === "checking") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:32, height:32, border:"2px solid rgba(139,92,246,0.3)", borderTop:"2px solid #8B5CF6", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"rgba(226,232,240,0.4)", fontSize:"0.85rem" }}>Checking your account...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (status === "redirect") return null;
  return <>{children}</>;
}

function FaithDeskContent() {
  return (
    <Suspense>
      <AuthGate>
        <OnboardingFlow config={{
          id: "faithdesk",
          name: "FaithDesk",
          color: "#8B5CF6",
          icon: "FD",
          orgLabel: "Church / Ministry",
          ownerLabel: "Pastor / Leader",
          sizeLabel: "Congregation size",
          sizeOptions: [
            "Under 50 members",
            "50 - 200 members",
            "200 - 500 members",
            "500 - 1,000 members",
            "1,000 - 5,000 members",
            "Over 5,000 members",
          ],
          addressLabel: "Church Address / City",
          subdomainHint: "triumphchurch",
          subdomainSuffix: ".jktl.com.ng",
        }} />
      </AuthGate>
    </Suspense>
  );
}

export default function FaithDeskOnboarding() {
  return <Suspense><FaithDeskContent /></Suspense>;
}

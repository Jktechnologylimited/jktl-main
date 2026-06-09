"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

function AuthGate({ children }: { children: React.ReactNode }) {
  const params = useSearchParams();
  const [status, setStatus] = useState<"checking"|"ok"|"redirect">("checking");

  useEffect(() => {
    if (params.get("mock") === "bypass") { setStatus("ok"); return; }

    const token = params.get("token");
    if (token) { sessionStorage.setItem("jktl_session", token); setStatus("ok"); return; }

    if (sessionStorage.getItem("jktl_session")) { setStatus("ok"); return; }

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
        <div style={{ width:32, height:32, border:"2px solid rgba(245,158,11,0.3)", borderTop:"2px solid #F59E0B", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"rgba(226,232,240,0.4)", fontSize:"0.85rem" }}>Checking your account...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (status === "redirect") return null;
  return <>{children}</>;
}

function DetailDeskContent() {
  return (
    <Suspense>
      <AuthGate>
        <OnboardingFlow config={{
          id: "detaildesk",
          name: "DetailDesk",
          color: "#F59E0B",
          icon: "DD",
          orgLabel: "Business",
          ownerLabel: "Owner / Manager",
          sizeLabel: "Team size",
          sizeOptions: [
            "Just me",
            "2 - 5 staff",
            "6 - 15 staff",
            "16 - 30 staff",
            "31 - 50 staff",
            "Over 50 staff",
          ],
          addressLabel: "Business Address / City",
          subdomainHint: "elitedetailing",
          subdomainSuffix: ".jktl.com.ng",
        }} />
      </AuthGate>
    </Suspense>
  );
}

export default function DetailDeskOnboarding() {
  return <Suspense><DetailDeskContent /></Suspense>;
}

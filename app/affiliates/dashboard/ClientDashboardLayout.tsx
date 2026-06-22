"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "./DashboardShell";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

interface AffiliateData {
  firstName: string;
  lastName: string;
  email: string;
  referralCode: string;
  tier: string;
  status: string;
}

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [signedInEmail, setSignedInEmail] = useState("");
  const [status, setStatus] = useState<"loading" | "ok" | "redirect" | "notaffiliate">("loading");

  useEffect(() => {
    let attempts = 0;

    async function check() {
      attempts++;
      try {
        const res = await fetch(`${ACCOUNTS_URL}/api/affiliate-me`, { credentials: "include", cache: "no-store" });
        const data = await res.json();

        if (!data.authenticated) {
          // Not signed in to JKTL at all
          const returnUrl = encodeURIComponent("https://jktl.com.ng/affiliates/dashboard");
          window.location.href = `${ACCOUNTS_URL}/sign-in?return=${returnUrl}`;
          return;
        }

        if (data.hasSession && data.reason === "cant_read_email") {
          // Session exists but can't read it -- retry
          if (attempts < 3) { setTimeout(check, 800); return; }
          // Give up -- ask them to sign out and back in
          setStatus("redirect");
          return;
        }

        if (!data.isAffiliate) {
          // Signed in to JKTL, but this email has no affiliate account.
          // Most often an email mismatch: they applied with a different address.
          setSignedInEmail(data.email || "");
          setStatus("notaffiliate");
          return;
        }

        if (data.status === "pending") {
          router.push("/affiliates/pending");
          return;
        }

        if (data.status === "rejected") {
          router.push("/affiliates?rejected=1");
          return;
        }

        setAffiliate({
          firstName: data.firstName,
          lastName:  data.lastName,
          email:     data.email,
          referralCode: data.referralCode,
          tier:      data.tier,
          status:    data.status,
        });
        setStatus("ok");

      } catch {
        if (attempts < 3) { setTimeout(check, 800); return; }
        setStatus("redirect");
      }
    }

    check();
  }, [router]);

  if (status === "loading") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:32, height:32, border:"2px solid rgba(201,168,76,0.2)", borderTop:"2px solid #C9A84C", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"rgba(226,232,240,0.4)", fontSize:"0.85rem" }}>Loading your dashboard...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (status === "notaffiliate") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif", padding:24 }}>
      <div style={{ maxWidth:460, textAlign:"center" }}>
        <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:12, padding:"32px" }}>
          <p style={{ fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:8 }}>No affiliate account for this email</p>
          <p style={{ color:"rgba(226,232,240,0.55)", fontSize:"0.85rem", marginBottom:8, lineHeight:1.6 }}>
            You&apos;re signed in as <span style={{ color:"#C9A84C" }}>{signedInEmail || "this account"}</span>, but that email isn&apos;t registered in the affiliate programme.
          </p>
          <p style={{ color:"rgba(226,232,240,0.45)", fontSize:"0.82rem", marginBottom:22, lineHeight:1.6 }}>
            If you applied with a different email, sign out and sign back in with that address. Otherwise you can apply, or contact us at info@jktl.com.ng.
          </p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <a href={`${ACCOUNTS_URL}/sign-out`}
              style={{ display:"inline-block", background:"#C9A84C", color:"#060E2A", fontWeight:700, fontSize:"0.76rem", textTransform:"uppercase", letterSpacing:"0.08em", padding:"11px 22px", borderRadius:8, textDecoration:"none" }}>
              Sign out &amp; switch email
            </a>
            <a href="/affiliates/join"
              style={{ display:"inline-block", background:"rgba(255,255,255,0.06)", color:"rgba(226,232,240,0.8)", fontWeight:600, fontSize:"0.76rem", padding:"11px 22px", borderRadius:8, textDecoration:"none", border:"1px solid rgba(255,255,255,0.1)" }}>
              Apply to the programme
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (status === "redirect" || !affiliate) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif", padding:24 }}>
      <div style={{ maxWidth:420, textAlign:"center" }}>
        <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:12, padding:"32px" }}>
          <p style={{ fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:8 }}>Session error</p>
          <p style={{ color:"rgba(226,232,240,0.5)", fontSize:"0.85rem", marginBottom:20, lineHeight:1.6 }}>
            Please sign out and sign back in to continue.
          </p>
          <a href={`${ACCOUNTS_URL}/sign-out`}
            style={{ display:"inline-block", background:"#C9A84C", color:"#060E2A", fontWeight:700, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", padding:"12px 28px", borderRadius:8, textDecoration:"none" }}>
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardShell session={{
      firstName:    affiliate.firstName,
      lastName:     affiliate.lastName,
      email:        affiliate.email,
      referralCode: affiliate.referralCode,
      tier:         affiliate.tier,
    }}>
      {children}
    </DashboardShell>
  );
}

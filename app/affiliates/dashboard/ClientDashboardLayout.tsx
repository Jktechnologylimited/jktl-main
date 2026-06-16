// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import DashboardShell from "./DashboardShell";

// const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

// interface AffiliateData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   referralCode: string;
//   tier: string;
//   status: string;
// }

// export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
//   const [status, setStatus] = useState<"loading" | "ok" | "redirect">("loading");

//   useEffect(() => {
//     let attempts = 0;

//     async function check() {
//       attempts++;
//       try {
//         const res = await fetch("/api/affiliates/me", { cache: "no-store" });
//         const data = await res.json();

//         if (!data.authenticated) {
//           // Not signed in to JKTL at all
//           const returnUrl = encodeURIComponent("https://jktl.com.ng/affiliates/dashboard");
//           window.location.href = `${ACCOUNTS_URL}/sign-in?return=${returnUrl}`;
//           return;
//         }

//         if (data.hasSession && data.reason === "cant_read_email") {
//           // Session exists but can't read it -- retry
//           if (attempts < 3) { setTimeout(check, 800); return; }
//           // Give up -- ask them to sign out and back in
//           setStatus("redirect");
//           return;
//         }

//         if (!data.isAffiliate) {
//           // Signed in but not an affiliate
//           router.push("/affiliates/join");
//           return;
//         }

//         if (data.status === "pending") {
//           router.push("/affiliates/pending");
//           return;
//         }

//         if (data.status === "rejected") {
//           router.push("/affiliates?rejected=1");
//           return;
//         }

//         setAffiliate({
//           firstName: data.firstName,
//           lastName:  data.lastName,
//           email:     data.email,
//           referralCode: data.referralCode,
//           tier:      data.tier,
//           status:    data.status,
//         });
//         setStatus("ok");

//       } catch {
//         if (attempts < 3) { setTimeout(check, 800); return; }
//         setStatus("redirect");
//       }
//     }

//     check();
//   }, [router]);

//   if (status === "loading") return (
//     <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif" }}>
//       <div style={{ textAlign:"center" }}>
//         <div style={{ width:32, height:32, border:"2px solid rgba(201,168,76,0.2)", borderTop:"2px solid #C9A84C", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
//         <p style={{ color:"rgba(226,232,240,0.4)", fontSize:"0.85rem" }}>Loading your dashboard...</p>
//         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
//       </div>
//     </div>
//   );

//   if (status === "redirect" || !affiliate) return (
//     <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif", padding:24 }}>
//       <div style={{ maxWidth:420, textAlign:"center" }}>
//         <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:12, padding:"32px" }}>
//           <p style={{ fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:8 }}>Session error</p>
//           <p style={{ color:"rgba(226,232,240,0.5)", fontSize:"0.85rem", marginBottom:20, lineHeight:1.6 }}>
//             Please sign out and sign back in to continue.
//           </p>
//           <a href={`${ACCOUNTS_URL}/sign-out`}
//             style={{ display:"inline-block", background:"#C9A84C", color:"#060E2A", fontWeight:700, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", padding:"12px 28px", borderRadius:8, textDecoration:"none" }}>
//             Sign Out
//           </a>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <DashboardShell session={{
//       firstName:    affiliate.firstName,
//       lastName:     affiliate.lastName,
//       email:        affiliate.email,
//       referralCode: affiliate.referralCode,
//       tier:         affiliate.tier,
//     }}>
//       {children}
//     </DashboardShell>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardShell from "./DashboardShell";

const ACCOUNTS_URL = process.env.NEXT_PUBLIC_ACCOUNTS_URL || "https://accounts.jktl.com.ng";

interface AffiliateData {
  firstName: string; lastName: string; email: string;
  referralCode: string; tier: string; status: string;
}

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [status,    setStatus]    = useState<"loading"|"ok"|"redirect">("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const justAuthed = params.get("_auth") === "1" || params.get("mock") === "bypass";

    if (justAuthed) {
      params.delete("_auth");
      const newUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
      window.history.replaceState({}, "", newUrl);
    }

    const maxAttempts = justAuthed ? 8 : 4;
    const delay = 700;
    let attempts = 0;

    async function check() {
      attempts++;
      try {
        // Call our OWN session API (same domain, cookie always readable)
        const res  = await fetch("/api/auth/session", { cache: "no-store" });
        const data = await res.json();

        if (!data.authenticated || !data.email) {
          if (attempts < maxAttempts) { setTimeout(check, delay); return; }
          const returnUrl = encodeURIComponent("https://jktl.com.ng/affiliates/dashboard");
          window.location.href = `${ACCOUNTS_URL}/sign-in?return=${returnUrl}`;
          return;
        }

        // Check affiliate status via our own API
        const affRes  = await fetch("/api/affiliates/me", { cache: "no-store" });
        const affData = await affRes.json();

        if (!affData.authenticated || !affData.isAffiliate) {
          if (!affData.authenticated && attempts < maxAttempts) { setTimeout(check, delay); return; }
          if (!affData.isAffiliate) { router.push("/affiliates/join"); return; }
          const returnUrl = encodeURIComponent("https://jktl.com.ng/affiliates/dashboard");
          window.location.href = `${ACCOUNTS_URL}/sign-in?return=${returnUrl}`;
          return;
        }

        if (affData.status === "pending")  { router.push("/affiliates/pending"); return; }
        if (affData.status === "rejected") { router.push("/affiliates?rejected=1"); return; }

        setAffiliate({
          firstName:    affData.firstName,
          lastName:     affData.lastName,
          email:        affData.email || data.email,
          referralCode: affData.referralCode,
          tier:         affData.tier,
          status:       affData.status,
        });
        setStatus("ok");
      } catch {
        if (attempts < maxAttempts) { setTimeout(check, delay); return; }
        setStatus("redirect");
      }
    }

    check();
  }, [router]);

  if (status === "loading") return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:32, height:32, border:"2px solid rgba(201,168,76,0.2)", borderTop:"2px solid #C9A84C", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 12px" }} />
        <p style={{ color:"rgba(226,232,240,0.4)", fontSize:"0.85rem", fontFamily:"sans-serif" }}>Loading your dashboard...</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  if (status === "redirect" || !affiliate) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#060E2A", fontFamily:"sans-serif", padding:24 }}>
      <div style={{ maxWidth:420, textAlign:"center" }}>
        <div style={{ background:"rgba(201,168,76,0.08)", border:"1px solid rgba(201,168,76,0.2)", borderRadius:12, padding:"32px" }}>
          <p style={{ fontWeight:700, color:"#fff", fontSize:"1rem", marginBottom:8 }}>Session error</p>
          <p style={{ color:"rgba(226,232,240,0.5)", fontSize:"0.85rem", marginBottom:20, lineHeight:1.6 }}>
            Please sign out and sign back in.
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
      firstName: affiliate.firstName, lastName: affiliate.lastName,
      email: affiliate.email, referralCode: affiliate.referralCode, tier: affiliate.tier,
    }}>
      {children}
    </DashboardShell>
  );
}

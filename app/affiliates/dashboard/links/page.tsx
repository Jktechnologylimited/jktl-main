"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Affiliate {
  firstName: string; lastName: string; email: string; phone: string;
  businessName: string; referralCode: string; tier: string;
  bankName?: string; bankAccount?: string; bankHolder?: string;
}

export default function LinksPage() {
  const [aff, setAff] = useState<Affiliate | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const APP_URL = typeof window !== "undefined" ? window.location.origin : "https://affiliate.jktl.com.ng";

  useEffect(() => {
    fetch("/api/affiliates/me").then(r => r.json()).then(d => setAff(d));
  }, []);

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (!aff) return <div style={{ padding: 40 }}><p style={{ color: "rgba(28,28,30,0.4)" }}>Loading...</p></div>;

  const mainSite = `https://jktl.com.ng`;
  const links = [
    { key: "main",    label: "Main Website",          url: `${mainSite}?ref=${aff.referralCode}`, desc: "General referral -- works for all services" },
    { key: "pkgs",    label: "Packages Page",          url: `${mainSite}/packages?ref=${aff.referralCode}`, desc: "Direct to packages and pricing" },
    { key: "website", label: "Website Service",        url: `${mainSite}/services/website-systems?ref=${aff.referralCode}`, desc: "For businesses that need a website" },
    { key: "seo",     label: "SEO Service",            url: `${mainSite}/services/seo?ref=${aff.referralCode}`, desc: "For businesses that need Google visibility" },
    { key: "crm",     label: "CRM Service",            url: `${mainSite}/services/crm-operations?ref=${aff.referralCode}`, desc: "For businesses needing operations systems" },
    { key: "ai",      label: "AI & Automation",        url: `${mainSite}/services/ai-automation?ref=${aff.referralCode}`, desc: "For businesses wanting AI chatbots" },
    { key: "demos",   label: "Try Demos Page",         url: `${mainSite}/demos?ref=${aff.referralCode}`, desc: "Send prospects to try before they buy" },
    { key: "solutions", label: "Solutions Page",       url: `${mainSite}/solutions?ref=${aff.referralCode}`, desc: "Industry-specific system solutions" },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>My Referral Links</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Your unique code: <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: "var(--navy-700)" }}>{aff.referralCode}</span> -- tracked with a 30-day cookie.</p>
      </div>

      <div className="page-body">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {links.map(link => (
            <div key={link.key} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", marginBottom: 2 }}>{link.label}</p>
                  <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)", fontSize: "0.75rem" }}>{link.desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div className="copy-box" style={{ flex: 1 }}>
                  <span className="copy-box-text">{link.url}</span>
                  <button className="copy-box-btn" onClick={() => copy(link.url, link.key)}>
                    {copied === link.key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <a href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", padding: "0 14px", background: "var(--cream-100)", border: "1px solid var(--cream-300)", borderRadius: 2, color: "rgba(28,28,30,0.5)", flexShrink: 0 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--cream-100)", border: "1px solid var(--cream-300)", borderRadius: 4, padding: "16px 20px", marginTop: 20 }}>
          <p className="label-xs" style={{ color: "rgba(28,28,30,0.4)", marginBottom: 6 }}>Tip</p>
          <p className="body-sm" style={{ color: "rgba(28,28,30,0.6)" }}>
            Use the Demos link when talking to prospects who are unsure -- it lets them try the system before committing. The Packages link works best for warm leads who are ready to see pricing.
          </p>
        </div>
      </div>
    </div>
  );
}

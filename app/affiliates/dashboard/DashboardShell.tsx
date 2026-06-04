"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { TIERS } from "@/lib/affiliate-offers";

interface Props {
  session: { firstName: string; lastName: string; email: string; referralCode: string; tier: string; };
  children: React.ReactNode;
}

const NAV = [
  { href: "/affiliates/dashboard",            label: "Overview",    icon: "OV" },
  { href: "/affiliates/dashboard/offers",     label: "Offers",      icon: "OF" },
  { href: "/affiliates/dashboard/links",      label: "My Links",    icon: "LK" },
  { href: "/affiliates/dashboard/referrals",  label: "Referrals",   icon: "RF" },
  { href: "/affiliates/dashboard/earnings",   label: "Earnings",    icon: "ER" },
  { href: "/affiliates/dashboard/materials",  label: "Materials",   icon: "MT" },
  { href: "/affiliates/dashboard/profile",    label: "Profile",     icon: "PR" },
  { href: "/affiliates/dashboard/support",    label: "Support",     icon: "SP" },
];

export default function DashboardShell({ session, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const tier = TIERS[session.tier as keyof typeof TIERS] || TIERS.standard;
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://affiliate.jktl.com.ng";
  const refLink = `${APP_URL}?ref=${session.referralCode}`;

  async function handleLogout() {
    await fetch("/api/affiliates/logout", { method: "POST" });
    router.push("/affiliates/login");
  }

  const Sidebar = () => (
    <div className="sidebar" style={{ display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
        <Link href="/affiliates" style={{ textDecoration: "none" }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff" }}>JK Technology</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.6rem", color: "var(--gold-400)", marginTop: 2 }}>AFFILIATE PORTAL</p>
        </Link>
      </div>

      {/* Affiliate info */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(249,247,240,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "0.75rem", color: "var(--gold-400)" }}>
              {session.firstName[0]}{session.lastName[0]}
            </span>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {session.firstName} {session.lastName}
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: `${tier.color}20`, padding: "1px 8px", borderRadius: 2, marginTop: 2 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: tier.color, flexShrink: 0 }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", fontWeight: 700, color: tier.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{tier.label}</span>
            </div>
          </div>
        </div>
        {/* Quick copy ref link */}
        <div style={{ background: "rgba(249,247,240,0.04)", border: "1px solid rgba(249,247,240,0.08)", borderRadius: 2, padding: "6px 10px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.58rem", color: "rgba(249,247,240,0.4)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            ?ref={session.referralCode}
          </span>
          <button onClick={() => navigator.clipboard.writeText(refLink)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "10px 0" }}>
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`nav-item${active ? " active" : ""}`} onClick={() => setMobileOpen(false)}>
              <div style={{ width: 22, height: 22, borderRadius: 2, background: active ? "rgba(201,168,76,0.15)" : "rgba(249,247,240,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.55rem", fontWeight: 700, color: active ? "var(--gold-400)" : "rgba(249,247,240,0.4)" }}>{item.icon}</span>
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(249,247,240,0.06)" }}>
        <button onClick={handleLogout} style={{ background: "none", border: "1px solid rgba(249,247,240,0.1)", borderRadius: 2, padding: "8px 16px", color: "rgba(249,247,240,0.4)", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="layout">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} onClick={() => setMobileOpen(false)} />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "260px", zIndex: 101 }}>
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="main-content">
        {/* Mobile topbar */}
        <div style={{ background: "var(--navy-900)", padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(249,247,240,0.06)" }} className="md:hidden">
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>Affiliate Dashboard</p>
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

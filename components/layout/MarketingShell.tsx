"use client";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode, type CSSProperties } from "react";
import { JourneyAnalytics } from "@/components/shared/JourneyAnalytics";
import { ReferralConsent } from "@/components/shared/ReferralConsent";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BizChat from "@/components/shared/BizChat";
import gameStyles from "@/components/games/GameLanding.module.css";
export default function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const game = /^\/games(?:\/|$)/.test(pathname);
  if (game)
    return (
      <div
        data-site-shell
        className={gameStyles.shell}
        style={{ "--template-catalog-top": "68px" } as CSSProperties}
      >
        <Navbar />
        {children}
      </div>
    );
  const preview =
    /^\/templates\/[^/]+\/?$/.test(pathname) ||
    /^\/template-canvas\/[^/]+(?:\/.*)?$/.test(pathname);
  return preview ? (
    <div style={{ colorScheme: "light", color: "#060e2a", background: "#fff" }}>
      {children}
      {!pathname.startsWith("/template-canvas/") && <JourneyAnalytics compact />}
      {!pathname.startsWith("/template-canvas/") && (
        <BizChat key="template-help" />
      )}
    </div>
  ) : (
    <div
      data-site-shell
      style={{ "--template-catalog-top": "68px" } as CSSProperties}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
      <JourneyAnalytics />
      <Suspense fallback={null}>
        <ReferralConsent />
      </Suspense>
      <BizChat
        key={
          pathname.startsWith("/templates") || pathname === "/landing-pages"
            ? "template-help"
            : "main-help"
        }
      />
    </div>
  );
}

"use client";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ReferralConsent } from "@/components/shared/ReferralConsent";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BizChat from "@/components/shared/BizChat";
export default function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const game = /^\/games(?:\/|$)/.test(pathname);
  if (game)
    return (
      <div data-site-shell>
        <Navbar />
        {children}
      </div>
    );
  const preview = /^\/(?:templates|template-canvas)\/[^/]+\/?$/.test(pathname);
  return preview ? (
    <div style={{ colorScheme: "light", color: "#060e2a", background: "#fff" }}>
      {children}
    </div>
  ) : (
    <div data-site-shell>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Suspense fallback={null}>
        <ReferralConsent />
      </Suspense>
      <BizChat />
    </div>
  );
}

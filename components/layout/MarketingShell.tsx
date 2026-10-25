"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BizChat from "@/components/shared/BizChat";
export default function MarketingShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const game = /^\/games(?:\/|$)/.test(pathname);
  if (game) return <><Navbar/>{children}</>;
  const preview = /^\/(?:templates|template-canvas)\/[^/]+\/?$/.test(
    pathname,
  );
  return preview ? (
    <>{children}</>
  ) : (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BizChat />
    </>
  );
}

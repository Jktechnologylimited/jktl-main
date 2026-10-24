"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BizChat from "@/components/shared/BizChat";
export default function MarketingShell({ children }: { children: ReactNode }) {
  const preview = /^\/templates\/[^/]+\/?$/.test(usePathname());
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

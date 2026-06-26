"use client";
import { usePathname } from "next/navigation";

// Hides the main-site chrome (Navbar/Footer) inside the affiliate dashboard,
// which provides its own full layout.
export default function HideOnDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/affiliates/dashboard")) return null;
  return <>{children}</>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment & Business Infrastructure",
  description: "Complete payment and business infrastructure: payment links, QR codes, online checkout, subscription billing, and automated invoice generation.",
  alternates: { canonical: "https://jktl.com.ng/services/payment-infrastructure" },
  openGraph: { title: "Payment & Business Infrastructure | JK Technology Limited", description: "Complete payment and business infrastructure: payment links, QR codes, online checkout, subscription billing, and automated invoice generation.", url: "https://jktl.com.ng/services/payment-infrastructure", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

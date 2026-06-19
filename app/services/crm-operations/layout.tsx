import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM & Business Operations System",
  description: "A custom CRM and operations dashboard that tracks every lead, manages your client database, monitors your sales pipeline, and gives you real-time business analytics.",
  alternates: { canonical: "https://jktl.com.ng/services/crm-operations" },
  openGraph: { title: "CRM & Business Operations System | JK Technology Limited", description: "A custom CRM and operations dashboard that tracks every lead, manages your client database, monitors your sales pipeline, and gives you real-time business analytics.", url: "https://jktl.com.ng/services/crm-operations", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

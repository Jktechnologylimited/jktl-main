import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DetailDesk — Auto Detailing Business Software",
  description: "Complete operating system for auto detailing businesses. Online store, job assignment, role-based access, CRM and analytics.",
  alternates: { canonical: "https://jktl.com.ng/detaildesk" },
  openGraph: { title: "DetailDesk — Auto Detailing Business Software | JK Technology Limited", description: "Complete operating system for auto detailing businesses. Online store, job assignment, role-based access, CRM and analytics.", url: "https://jktl.com.ng/detaildesk", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

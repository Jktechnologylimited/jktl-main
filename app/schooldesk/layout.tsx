import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SchoolDesk — School Administration Software",
  description: "End-to-end school management. Fee collection, student portal, staff management, public website — built for Nigerian schools.",
  alternates: { canonical: "https://jktl.com.ng/schooldesk" },
  openGraph: { title: "SchoolDesk — School Administration Software | JK Technology Limited", description: "End-to-end school management. Fee collection, student portal, staff management, public website — built for Nigerian schools.", url: "https://jktl.com.ng/schooldesk", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

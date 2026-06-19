import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FaithDesk — Ministry Management Software",
  description: "Complete management system for churches and ministries. Members, tithes, offerings, portals, analytics — all in one place.",
  alternates: { canonical: "https://jktl.com.ng/faithdesk" },
  openGraph: { title: "FaithDesk — Ministry Management Software | JK Technology Limited", description: "Complete management system for churches and ministries. Members, tithes, offerings, portals, analytics — all in one place.", url: "https://jktl.com.ng/faithdesk", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Generation Landing Pages",
  description: "High-converting landing pages engineered for paid ad campaigns, service launches, and lead magnets. Every element serves one purpose: get the visitor to take action.",
  alternates: { canonical: "https://jktl.com.ng/services/lead-generation" },
  openGraph: { title: "Lead Generation Landing Pages | JK Technology Limited", description: "High-converting landing pages engineered for paid ad campaigns, service launches, and lead magnets. Every element serves one purpose: get the visitor to take action.", url: "https://jktl.com.ng/services/lead-generation", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO & Google Visibility System",
  description: "A complete SEO and Google visibility system covering local search, keyword targeting, Google Business Profile, and map rankings — so your ideal clients find you first.",
  alternates: { canonical: "https://jktl.com.ng/services/seo" },
  openGraph: { title: "SEO & Google Visibility System | JK Technology Limited", description: "A complete SEO and Google visibility system covering local search, keyword targeting, Google Business Profile, and map rankings — so your ideal clients find you first.", url: "https://jktl.com.ng/services/seo", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

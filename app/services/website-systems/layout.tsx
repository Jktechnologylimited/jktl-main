import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website & Landing Page Systems",
  description: "A complete, professional website built for your specific industry and audience. SEO-ready, mobile-first, and designed to turn visitors into leads from day one.",
  alternates: { canonical: "https://jktl.com.ng/services/website-systems" },
  openGraph: { title: "Website & Landing Page Systems | JK Technology Limited", description: "A complete, professional website built for your specific industry and audience. SEO-ready, mobile-first, and designed to turn visitors into leads from day one.", url: "https://jktl.com.ng/services/website-systems", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

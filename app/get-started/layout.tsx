import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Start your project with JK Technology Limited. Tell us what you need and get a scoped proposal within 24 hours.",
  alternates: { canonical: "https://jktl.com.ng/get-started" },
  openGraph: { title: "Get Started | JK Technology Limited", description: "Tell us what you need and get a scoped proposal within 24 hours.", url: "https://jktl.com.ng/get-started", type: "website" },
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI & Automation Systems",
  description: "AI-powered systems that handle routine business tasks automatically — website chatbots, WhatsApp auto-replies, FAQ automation, customer onboarding, and workflow automation.",
  alternates: { canonical: "https://jktl.com.ng/services/ai-automation" },
  openGraph: { title: "AI & Automation Systems | JK Technology Limited", description: "AI-powered systems that handle routine business tasks automatically — website chatbots, WhatsApp auto-replies, FAQ automation, customer onboarding, and workflow automation.", url: "https://jktl.com.ng/services/ai-automation", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

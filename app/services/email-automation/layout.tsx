import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email & Follow-up Automation",
  description: "Automated email systems built on Resend that nurture leads, follow up on enquiries, send payment and booking confirmations, and recover missed opportunities — 24/7.",
  alternates: { canonical: "https://jktl.com.ng/services/email-automation" },
  openGraph: { title: "Email & Follow-up Automation | JK Technology Limited", description: "Automated email systems built on Resend that nurture leads, follow up on enquiries, send payment and booking confirmations, and recover missed opportunities — 24/7.", url: "https://jktl.com.ng/services/email-automation", type: "website" },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}

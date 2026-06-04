import type { Metadata } from "next";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started with DetailDesk | JK Technology Limited",
  description: "Set up your DetailDesk auto detailing business system. Online store, job assignment, CRM. Go live in minutes.",
};

export default function DetailDeskOnboarding() {
  return (
    <OnboardingFlow config={{
      id: "detaildesk",
      name: "DetailDesk",
      color: "#F59E0B",
      icon: "DD",
      orgLabel: "Business",
      ownerLabel: "Owner / Manager",
      sizeLabel: "Team size",
      sizeOptions: [
        "Just me",
        "2 - 5 staff",
        "6 - 15 staff",
        "16 - 30 staff",
        "31 - 50 staff",
        "Over 50 staff",
      ],
      addressLabel: "Business Address / City",
      subdomainHint: "elitedetailing",
      subdomainSuffix: ".jktl.com.ng",
    }} />
  );
}

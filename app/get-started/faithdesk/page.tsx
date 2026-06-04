import type { Metadata } from "next";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started with FaithDesk | JK Technology Limited",
  description: "Set up your FaithDesk ministry management system. Choose your plan, configure your subdomain, and go live in minutes.",
};

export default function FaithDeskOnboarding() {
  return (
    <OnboardingFlow config={{
      id: "faithdesk",
      name: "FaithDesk",
      color: "#8B5CF6",
      icon: "FD",
      orgLabel: "Church / Ministry",
      ownerLabel: "Pastor / Leader",
      sizeLabel: "Congregation size",
      sizeOptions: [
        "Under 50 members",
        "50 - 200 members",
        "200 - 500 members",
        "500 - 1,000 members",
        "1,000 - 5,000 members",
        "Over 5,000 members",
      ],
      addressLabel: "Church Address / City",
      subdomainHint: "triumphchurch",
      subdomainSuffix: ".jktl.com.ng",
    }} />
  );
}

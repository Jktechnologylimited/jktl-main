"use client";
import { Suspense } from "react";
import { AuthGate } from "@/components/onboarding/AuthGate";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

function FaithDeskContent() {
  return (
    <Suspense>
      <AuthGate color="#8B5CF6">
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
      </AuthGate>
    </Suspense>
  );
}

export default function FaithDeskOnboarding() {
  return <Suspense><FaithDeskContent /></Suspense>;
}

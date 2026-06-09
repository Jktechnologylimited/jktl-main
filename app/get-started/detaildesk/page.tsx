"use client";
import { Suspense } from "react";
import { AuthGate } from "@/components/onboarding/AuthGate";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

function DetailDeskContent() {
  return (
    <Suspense>
      <AuthGate color="#F59E0B">
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
      </AuthGate>
    </Suspense>
  );
}

export default function DetailDeskOnboarding() {
  return <Suspense><DetailDeskContent /></Suspense>;
}

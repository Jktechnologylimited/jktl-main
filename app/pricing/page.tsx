import { PeopleStory } from "@/components/shared/PeopleStory";
import { ProductCaseStudies } from "@/components/case-studies/ProductCaseStudies";
import { CustomerReviews } from "@/components/support/CustomerReviews";
import { PossibleShowcase } from "@/components/home/PossibleShowcase";
import type { Metadata } from "next";
import { WebsitePricing } from "@/components/pricing/WebsitePricing";
export const metadata: Metadata = {
  title: "Website Plans & Pricing | JKTL Business",
  description:
    "Start free. Compare Starter, Growth, Business and Business Elite with transparent monthly and yearly NGN pricing, included hosting and 200 website designs.",
  alternates: { canonical: "https://jktl.com.ng/pricing" },
};
export default function PricingPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <WebsitePricing afterFoundation={<PossibleShowcase />} />
      <PeopleStory variant="business" />
      <ProductCaseStudies />
      <CustomerReviews milestone="website" />
    </div>
  );
}

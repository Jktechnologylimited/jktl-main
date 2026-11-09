import { pageMetadata } from "@/lib/seo/metadata";
import { PeopleStory } from "@/components/shared/PeopleStory";
import { ProductCaseStudies } from "@/components/case-studies/ProductCaseStudies";
import { CustomerReviews } from "@/components/support/CustomerReviews";
import { PossibleShowcase } from "@/components/home/PossibleShowcase";
import type { Metadata } from "next";
import { TransactionCharges } from "@/components/pricing/TransactionCharges";
import { WebsitePricing } from "@/components/pricing/WebsitePricing";
export const metadata: Metadata = pageMetadata("/pricing", {
  title: "Free Business Tools, Website Plans & Payment Charges",
  description:
    "Start with free websites and invoicing. Compare paid website plans, understand online payment charges and explore domains and business email billed separately.",
  alternates: { canonical: "https://jktl.com.ng/pricing" },
});
export default function PricingPage() {
  return (
    <div style={{ paddingTop: 72 }}>
      <WebsitePricing afterFoundation={<PossibleShowcase />} />
      <TransactionCharges />
      <PeopleStory variant="business" />
      <ProductCaseStudies />
      <CustomerReviews milestone="website" />
    </div>
  );
}

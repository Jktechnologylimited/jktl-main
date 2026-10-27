import { CustomerReviews } from "@/components/support/CustomerReviews";
import type { Metadata } from "next";
import { DomainPage } from "@/components/domains/DomainPage";
import { ProductCaseStudies } from "@/components/case-studies/ProductCaseStudies";
import { getLiveRetailDomainPrices } from "@/lib/domain-catalogue";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Find & Register Your Business Domain | JKTL",
  description:
    "Search .com.ng, .ng and .com domain names. Compare current registration and annual renewal prices, then manage your domain in JKTL Business.",
  alternates: { canonical: "https://jktl.com.ng/domains" },
  openGraph: {
    title: "Find the perfect domain for your business.",
    description: "Search, register and connect your domain with JKTL.",
    url: "https://jktl.com.ng/domains",
    type: "website",
  },
};
export default async function Page() {
  return (
    <>
      <DomainPage prices={await getLiveRetailDomainPrices()} />
      <ProductCaseStudies domain />
      <CustomerReviews milestone="domain" />
    </>
  );
}

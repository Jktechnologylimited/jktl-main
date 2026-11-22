import { pageMetadata } from "./metadata";
import type { featurePages } from "@/data/feature-pages";
type Feature = (typeof featurePages)[number];
type SearchCopy = { title: string; description: string; cta: string; faqs: { question: string; answer: string }[] };

export const entryPageCopy: Record<string, SearchCopy> = {
  "products/website-builder": {
    title: "Free Business Website Builder in Nigeria",
    description: "Create a free business website with JKTL. Choose a template, add your content and publish on a free JKTL address with hosting included. Upgrade when needed.",
    cta: "Create my free website",
    faqs: [
      { question: "What is included with a free website?", answer: "Choose a JKTL template, edit your business content and publish on an available JKTL subdomain. Hosting is included. Custom domains, business email and optional paid services are separate; compare the current plans before upgrading." },
      { question: "Can I explore templates before creating an account?", answer: "Yes. Browse templates and their desktop and mobile previews without signing up. Select Template takes you to JKTL Business and keeps your selected design through account setup." },
    ],
  },
  "products/invoicing-payments": {
    title: "Free Invoice Generator for Nigerian Businesses",
    description: "Create and email professional invoices for free with JKTL Business. Add verified receiving bank details, share payment links and track confirmed payments.",
    cta: "Create a free invoice",
    faqs: [
      { question: "Do I need a paid website plan to create invoices?", answer: "No. Professional invoice creation is free and does not require a paid website subscription. Add and verify your receiving bank details before creating or sending an invoice." },
      { question: "Is accepting an online payment also free?", answer: "Online payment processing has applicable charges. The buyer sees the invoice amount, the applicable JKTL platform fee and the final total before paying. Check the current payment charges; payment verification and bank settlement are separate steps." },
    ],
  },
  "solutions/online-payments": {
    title: "Online Invoice Payments for Nigerian Businesses",
    description: "Accept online invoice payments with JKTL Business and Paystack. Share payment links, review checkout charges and track verified payments from one workspace.",
    cta: "Set up online payments",
    faqs: [
      { question: "How can a customer pay an invoice online?", answer: "Set up your verified receiving bank details and the required Paystack settlement configuration, create an invoice and share its payment link. The customer reviews the invoice and applicable checkout charges before paying." },
      { question: "Does a confirmed payment mean the money has reached my bank?", answer: "Payment verification confirms the payment status. Settlement to your receiving account follows the provider’s schedule. Track the verified invoice payment in JKTL Business and review the provider’s settlement information separately." },
    ],
  },
};

export function featurePageMetadata(page: Feature) {
  const key = `${page.section}/${page.slug}`, copy = entryPageCopy[key];
  return pageMetadata(`/${key}`, {
    title: copy?.title || page.label,
    description: copy?.description || page.intro,
    ...(page.slug === "ai-receptionist" ? { robots: { index: false, follow: true } } : {}),
  });
}

export function featurePageSchema(page: Feature) {
  const url = `https://jktl.com.ng/${page.section}/${page.slug}`;
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url + "#webpage", url, name: page.title, description: entryPageCopy[`${page.section}/${page.slug}`]?.description || page.intro, breadcrumb: { "@id": url + "#breadcrumb" } },
    { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jktl.com.ng" },
      { "@type": "ListItem", position: 2, name: page.label, item: url },
    ] },
  ] };
}

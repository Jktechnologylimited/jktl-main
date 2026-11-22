import { pageMetadata } from "./metadata";
import type { featurePages } from "@/data/feature-pages";
import type { DIGITAL_PRODUCTS } from "@/lib/website-pricing";
type Feature = (typeof featurePages)[number];
type DigitalProduct = (typeof DIGITAL_PRODUCTS)[number];
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

function featureSearchCopy(page: Feature) {
  if (page.section === "products" && page.slug === "ai-chatbot") return {
    title: "Website Chatbot for FAQs & Enquiries",
    description: "Build a website chatbot with approved FAQs, enquiry capture and WhatsApp handoff. Start free with JKTL Business; AI-generated replies require activation.",
  };
  return entryPageCopy[`${page.section}/${page.slug}`];
}

export function digitalProductMetadata(product: DigitalProduct) {
  return pageMetadata(`/products/${product.id}`, {
    title: product.id === "business-email" ? "Business Email for Your Domain in Nigeria" : product.name,
    description: product.id === "business-email"
      ? "Get business email on your domain with JKTL. Compare approved mailbox plans, confirm annual pricing and arrange setup with the JKTL team."
      : product.description,
  });
}

export function featurePageMetadata(page: Feature) {
  const key = `${page.section}/${page.slug}`, copy = featureSearchCopy(page);
  return pageMetadata(`/${key}`, {
    title: copy?.title || page.label,
    description: copy?.description || page.intro,
    ...(page.slug === "ai-receptionist" ? { robots: { index: false, follow: true } } : {}),
  });
}

export function featurePageSchema(page: Feature) {
  const url = `https://jktl.com.ng/${page.section}/${page.slug}`;
  return pageSchema(url, page.label, page.title, featureSearchCopy(page)?.description || page.intro);
}

export function digitalProductSchema(product: DigitalProduct) {
  const metadata = digitalProductMetadata(product);
  return pageSchema(`https://jktl.com.ng/products/${product.id}`, product.name, product.title, metadata.description || product.description);
}

function pageSchema(url: string, label: string, title: string, description: string) {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url + "#webpage", url, name: title, description, breadcrumb: { "@id": url + "#breadcrumb" } },
    { "@type": "BreadcrumbList", "@id": url + "#breadcrumb", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jktl.com.ng" },
      { "@type": "ListItem", position: 2, name: label, item: url },
    ] },
  ] };
}

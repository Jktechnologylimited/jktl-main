import type { WebsiteTemplate } from "@/lib/website-templates";
/** Copy for the outer preview document; iframe headings belong to another page. */
export function templatePageCopy(template: WebsiteTemplate) {
  const kind =
    template.kind === "landing" || template.id === "blank-landing"
      ? "Landing Page Template"
      : "Website Template";
  return {
    heading: `${template.name}: ${template.category} ${kind}`,
    title: `${template.name} ${kind} | ${template.category}`,
    description: `Preview ${template.name}, a ${template.category.toLowerCase()} ${kind.toLowerCase()}. Explore desktop and mobile layouts, then customize it with JKTL Business.`,
    canonical: `https://jktl.com.ng/templates/${template.id}`,
  };
}
export function templatePageSchema(template: WebsiteTemplate) {
  const copy = templatePageCopy(template);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": copy.canonical + "#webpage",
        url: copy.canonical,
        name: copy.heading,
        description: copy.description,
        inLanguage: "en-NG",
        isPartOf: {
          "@type": "WebSite",
          name: "JKTL Business",
          url: "https://jktl.com.ng",
        },
        about: {
          "@type": "CreativeWork",
          name: template.name,
          genre: template.category,
        },
        breadcrumb: { "@id": copy.canonical + "#breadcrumb" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": copy.canonical + "#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://jktl.com.ng",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Website Templates",
            item: "https://jktl.com.ng/templates",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: template.name,
            item: copy.canonical,
          },
        ],
      },
    ],
  };
}

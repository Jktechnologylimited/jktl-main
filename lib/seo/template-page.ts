import { websiteTemplates, websitePagePaths, type WebsiteTemplate } from "@/lib/website-templates";

/** Editions reuse their starter's copy; only original, finished designs are search landing pages. */
export function isIndexableTemplate(template: WebsiteTemplate) {
  return template.kind !== "blank" && (!template.sourceId || template.sourceId === template.id);
}

export const indexableTemplates = websiteTemplates.filter(isIndexableTemplate);

export function templateEditions(template: WebsiteTemplate) {
  const source = template.sourceId || template.id;
  return websiteTemplates.filter(item => (item.sourceId || item.id) === source && item.id !== template.id);
}

export function relatedTemplates(template: WebsiteTemplate) {
  return indexableTemplates.filter(item => item.id !== template.id && item.category === template.category).slice(0, 3);
}

export function templateDetails(template: WebsiteTemplate) {
  const paths = websitePagePaths(template, template.document);
  return {
    pageCount: paths.length,
    kind: paths.length === 1 ? "landing page" : "multi-page website",
    examples: template.document.offerings.slice(0, 3).map(item => item.title),
    sections: [
      ...(template.sectionOrder.includes("about") ? ["About the business"] : []),
      ...(template.sectionOrder.includes("offerings") ? [template.document.offeringsTitle] : []),
      ...(template.sectionOrder.includes("gallery") ? ["Photo gallery"] : []),
      ...(template.sectionOrder.includes("faq") ? ["Frequently asked questions"] : []),
      "Contact information",
    ],
  };
}
/** Copy for the outer preview document; iframe headings belong to another page. */
export function templatePageCopy(template: WebsiteTemplate) {
  const kind =
    template.kind === "landing" || template.id === "blank-landing"
      ? "Landing Page Template"
      : "Website Template";
  const description = `Preview ${template.name}, a free ${template.category.toLowerCase()} template. Customise it and publish with JKTL Business.`;
  return {
    heading: `${template.name}: ${template.category} ${kind}`,
    title: `${template.name.replace(/\bLanding Page\b/gi, "").trim()} ${kind}`.replace(/\s+/g, " "),
    description: description.length <= 160 ? description : description.slice(0, 157).replace(/\s+\S*$/, "") + "…",
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

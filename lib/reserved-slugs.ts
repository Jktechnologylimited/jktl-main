// Every existing top-level static route on jktl-website. A CMS-created page
// can never use one of these slugs -- Next.js would resolve the static
// route first regardless, silently making the CMS page unreachable. Kept
// here as one source of truth rather than duplicated in the admin app.
export const RESERVED_SLUGS = [
  "about",
  "admin",
  "affiliate",
  "affiliates",
  "partners",
  "games",
  "api",
  "blog",
  "businessdesk",
  "careers",
  "case-studies",
  "constructiondesk",
  "contact",
  "demos",
  "desk",
  "detaildesk",
  "faithdesk",
  "gasstationdesk",
  "get-started",
  "industries",
  "insurancedesk",
  "investments",
  "offers",
  "packages",
  "payments",
  "pricing",
  "privacy",
  "proposal",
  "schooldesk",
  "service-areas",
  "services",
  "sitemap",
  "solutions",
  "resources",
  "products",
  "template-canvas",
  "landing-pages",
  "templates",
  "terms",
  "tools",
  "work",
  "how-it-works",
];

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug.toLowerCase());
}

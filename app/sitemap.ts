import type { MetadataRoute } from "next";

const BASE_URL = "https://jktl.com.ng";
const STATIC_ROUTES = [
  // "affiliates" is deliberately absent: it now redirects to the business app,
  // and a sitemap entry pointing at a redirect is a crawl error, not a page.
  "", "about", "industries", "how-it-works", "pricing", "contact", "privacy", "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(route => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(),
  }));
}

import type { MetadataRoute } from "next";

const BASE_URL = "https://jktl.com.ng";
const STATIC_ROUTES = [
  "", "about", "industries", "how-it-works", "pricing", "affiliates", "contact", "privacy", "terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES.map(route => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date(),
  }));
}

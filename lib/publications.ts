import { cache } from "react";
export type Article = {
  id: string;
  slug: string;
  kind: "blog" | "release";
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
};
export const readPublications = cache(
  async (
    kind: "blog" | "release",
    slug?: string,
  ): Promise<{ articles: Article[]; unavailable: boolean }> => {
    if (slug && (slug.length > 100 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) return { articles: [], unavailable: false };
    try {
      const origin =
        process.env.JKTL_PUBLICATIONS_ORIGIN || "https://business.jktl.com.ng";
      const url = new URL("/api/publications", origin);
      url.searchParams.set("kind", kind);
      if (slug) url.searchParams.set("slug", slug);
      const response = await fetch(url, {
        cache: "no-store",
        signal: AbortSignal.timeout(7000),
      });
      if (response.status === 404) return { articles: [], unavailable: false };
      if (!response.ok) throw Error("Unavailable");
      const data = await response.json();
      if (!Array.isArray(data.articles)) throw Error("Invalid feed");
      const articles = data.articles
        .filter(
          (p: Article) =>
            p &&
            p.kind === kind &&
            typeof p.slug === "string" &&
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) &&
            typeof p.title === "string" &&
            typeof p.excerpt === "string" &&
            typeof p.body === "string" &&
            typeof p.author === "string" &&
            typeof p.publishedAt === "string" &&
            Number.isFinite(Date.parse(p.publishedAt)) &&
            (!slug || p.slug === slug),
        )
        .map((p: Article) => ({
          ...p,
          coverImage:
            typeof p.coverImage === "string" &&
            /^https:\/\//i.test(p.coverImage)
              ? p.coverImage
              : "",
        }));
      return { articles, unavailable: false };
    } catch {
      return { articles: [], unavailable: true };
    }
  },
);

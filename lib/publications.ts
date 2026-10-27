import { cache } from "react";
export type PublicationKind = "column" | "blog" | "release" | "update";
export const publicationPath = {
  column: "columns",
  blog: "blog",
  release: "releases",
  update: "updates",
};
export type Article = {
  id: string;
  slug: string;
  kind: PublicationKind;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status?: string;
  subtitle?: string;
  category?: string;
  tags?: string[];
  seoTitle?: string;
  metaDescription?: string;
  seriesSlug?: string;
  chapter?: number | null;
  product?: string;
  versionLabel?: string;
  features?: string[];
  featured?: boolean;
  authorSlug?: string;
  authorBio?: string;
  authorAvatar?: string;
};
export const readPublications = cache(
  async (
    kind: PublicationKind,
    slug?: string,
  ): Promise<{ articles: Article[]; unavailable: boolean }> => {
    if (slug && (slug.length > 100 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)))
      return { articles: [], unavailable: false };
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
            (!p.status || p.status === "published") &&
            typeof p.slug === "string" &&
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) &&
            typeof p.title === "string" &&
            typeof p.excerpt === "string" &&
            typeof p.body === "string" &&
            typeof p.author === "string" &&
            typeof p.publishedAt === "string" &&
            Number.isFinite(Date.parse(p.publishedAt)) &&
            Date.parse(p.publishedAt) <= Date.now() &&
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
export const readAuthor = cache(async (slug: string) => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100)
    return { profile: null, unavailable: false };
  try {
    const url = new URL(
      "/api/editorial-authors/" + slug,
      process.env.JKTL_PUBLICATIONS_ORIGIN || "https://business.jktl.com.ng",
    );
    const r = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
    });
    if (r.status === 404) return { profile: null, unavailable: false };
    if (!r.ok) throw Error("Unavailable");
    const data = await r.json();
    const p = data.profile;
    if (
      !p ||
      p.slug !== slug ||
      typeof p.display_name !== "string" ||
      typeof p.bio !== "string"
    )
      throw Error("Invalid author");
    return {
      profile: {
        slug,
        name: p.display_name as string,
        bio: p.bio as string,
        avatar:
          typeof p.avatar_url === "string" &&
          p.avatar_url.startsWith("https://")
            ? p.avatar_url
            : "",
      },
      unavailable: false,
    };
  } catch {
    return { profile: null, unavailable: true };
  }
});

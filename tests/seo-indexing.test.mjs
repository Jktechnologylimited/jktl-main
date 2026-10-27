import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import * as routing from "../lib/seo/routing.mjs";
import config from "../next.config.mjs";
function load(file, deps) {
  const source = ts.transpileModule(
    readFileSync(new URL(file, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  ).outputText;
  const mod = { exports: {} };
  new Function("require", "module", "exports", source)(
    (n) => {
      if (!(n in deps)) throw Error(n);
      return deps[n];
    },
    mod,
    mod.exports,
  );
  return mod.exports;
}
const reserved = load("../lib/reserved-slugs.ts", {}),
  metadata = load("../lib/seo/metadata.ts", { "./routing.mjs": routing });
const sitemap = load("../lib/seo/sitemap.ts", {
  "./routing.mjs": routing,
  "@/lib/reserved-slugs": reserved,
});
test("legacy redirects are permanent, host-scoped, specific replacements; only www normalizes to apex", async () => {
  const rules = await config.redirects();
  for (const [source, target] of Object.entries(
    routing.LEGACY_SERVICE_REDIRECTS,
  )) {
    const rule = rules.find((r) => r.source === source);
    assert.equal(rule.destination, routing.SITE_ORIGIN + target);
    assert.equal(rule.permanent, true);
    const host = new RegExp("^" + rule.has[0].value + "$");
    for (const h of ["jktl.com.ng", "www.jktl.com.ng"]) assert.ok(host.test(h));
    for (const h of [
      "bae.jktl.com.ng",
      "consultant-website.jktl.com.ng",
      "clinic-website.jktl.com.ng",
      "wwwXjktlYcomZng",
    ])
      assert.equal(host.test(h), false);
  }
  const www = rules.find((r) => r.source === "/:path*");
  const host = new RegExp("^" + www.has[0].value + "$");
  assert.ok(host.test("www.jktl.com.ng"));
  assert.equal(host.test("jktl.com.ng"), false);
  assert.equal(host.test("bae.jktl.com.ng"), false);
  assert.ok(!rules.some((r) => r.source.includes("$")));
});
test("sitemap excludes redirect sources, canonical aliases, utility previews, external/query URLs and reserved or empty CMS pages", () => {
  const records = [
    "/",
    "/pricing",
    "/domains",
    "/domains",
    "/products/domains",
    "/services/web-development",
    "/templates/law-firm",
    "/template-canvas/law-firm",
    "/affiliates/login",
    "/games/business-tycoon",
    "/api/test",
    "/old-page",
  ].map((path) => ({ url: "https://jktl.com.ng" + path }));
  records.push(
    { url: "https://www.jktl.com.ng/about" },
    { url: "https://jktl.com.ng/about?test=1" },
  );
  const result = sitemap.preferredSitemap(records, [
    { from_path: "/old-page", to_path: "/pricing", status_code: 301 },
  ]);
  assert.deepEqual(
    result.map((r) => r.url),
    [
      "https://jktl.com.ng/",
      "https://jktl.com.ng/pricing",
      "https://jktl.com.ng/domains",
    ],
  );
  for (const slug of [
    "domains",
    "columns",
    "releases",
    "authors",
    "admin",
    "../private",
  ])
    assert.equal(
      sitemap.eligibleCmsPath({ slug, content: "A useful page." }),
      null,
    );
  assert.equal(
    sitemap.eligibleCmsPath({ slug: "empty", content: "   " }),
    null,
  );
  assert.equal(
    sitemap.eligibleCmsPath({
      slug: "our-method",
      content: "A useful public explanation.",
    }),
    "/our-method",
  );
});
test("metadata provides self canonicals and page-specific open graph while retaining noindex", () => {
  for (const path of [
    "/contact",
    "/privacy",
    "/terms",
    "/products/business-tools",
    "/solutions/online-presence",
  ]) {
    const m = metadata.pageMetadata(path, {
      title: "Specific page",
      description: "A useful unique description.",
    });
    assert.equal(m.alternates.canonical, "https://jktl.com.ng" + path);
    assert.equal(m.openGraph.url, m.alternates.canonical);
    assert.equal(m.openGraph.title, "Specific page");
  }
  assert.equal(
    metadata.pageMetadata("/private", {
      title: "Private",
      robots: { index: false },
    }).robots.index,
    false,
  );
});
test("malformed, self-referential and cyclic CMS redirects fail safely without affecting valid query targets", () => {
  assert.equal(routing.localRedirectTarget("//evil.test"), null);
  assert.equal(routing.localRedirectTarget("https://evil.test"), null);
  assert.equal(routing.localRedirectTarget("/bad\\path"), null);
  assert.equal(
    routing.resolveRedirect("/a", [{ from_path: "/a", to_path: "/a" }], false),
    null,
  );
  assert.equal(
    routing.resolveRedirect(
      "/a",
      [
        { from_path: "/a", to_path: "/b" },
        { from_path: "/b", to_path: "/a" },
      ],
      false,
    ),
    null,
  );
  assert.equal(
    routing.resolveRedirect(
      "/a",
      [{ from_path: "/a", to_path: "/pricing?utm_source=old" }],
      false,
    ),
    "/pricing",
  );
});
test("published article enumeration follows the real API cursor beyond the first 200 without duplicates", async () => {
  const original = globalThis.fetch;
  try {
    const source = load("../lib/publications.ts", {
      react: { cache: (f) => f },
    });
    const post = (i) => ({
      id: String(i),
      kind: "blog",
      slug: "article-" + i,
      title: "Article " + i,
      excerpt: "Useful business guidance.",
      body: "",
      author: "JKTL Team",
      publishedAt: "2026-01-01T09:00:00Z",
      updatedAt: "2026-01-01T09:00:00Z",
    });
    const offsets = [];
    globalThis.fetch = async (url) => {
      const offset = Number(new URL(url).searchParams.get("offset") || 0);
      offsets.push(offset);
      return Response.json({
        articles: Array.from({ length: offset === 0 ? 200 : 1 }, (_, i) =>
          post(offset + i),
        ),
        nextOffset: offset === 0 ? 200 : null,
      });
    };
    const result = await source.readAllPublications("blog");
    assert.equal(result.articles.length, 201);
    assert.deepEqual(offsets, [0, 200]);
    assert.equal(result.unavailable, false);
  } finally {
    globalThis.fetch = original;
  }
});
test("robots lets Google observe preview noindex while excluding API and Team utilities", () => {
  const { default: robots } = load("../app/robots.ts", {});
  const r = robots();
  assert.equal(r.sitemap, "https://jktl.com.ng/sitemap.xml");
  assert.ok(!r.rules.disallow.includes("/templates/"));
  assert.ok(!r.rules.disallow.includes("/template-canvas/"));
  for (const path of [
    "../app/templates/[slug]/page.tsx",
    "../app/template-canvas/[slug]/page.tsx",
  ])
    assert.match(
      readFileSync(new URL(path, import.meta.url), "utf8"),
      /index: false/,
    );
});
test("password-protected and empty CMS pages remain noindex even if a reader has an unlock cookie", async () => {
  let page = {
    id: "test",
    slug: "our-method",
    title: "Our method",
    content: "A useful public explanation.",
    seo_title: null,
    seo_description: null,
    password_protected: null,
    published_at: "2026-01-01T00:00:00Z",
  };
  const route = load("../app/[slug]/page.tsx", {
    react: { cache: (f) => f },
    "@/lib/seo/metadata": metadata,
    "next/navigation": {
      notFound: () => {
        throw Error("not found");
      },
    },
    "next/headers": { cookies: async () => ({ get: () => ({ value: "1" }) }) },
    "@/lib/db": { sql: async () => [page] },
    "@/components/Markdown": { default: () => null },
    "@/components/shared/CmsPageCTA": { CTA: () => null },
    "@/lib/reserved-slugs": reserved,
    "@/components/shared/PagePasswordGate": { default: () => null },
    "react/jsx-runtime": { jsx: () => null, jsxs: () => null },
  });
  assert.equal(
    (
      await route.generateMetadata({
        params: Promise.resolve({ slug: page.slug }),
      })
    ).robots.index,
    true,
  );
  page = { ...page, password_protected: "protected" };
  assert.equal(
    (
      await route.generateMetadata({
        params: Promise.resolve({ slug: page.slug }),
      })
    ).robots.index,
    false,
  );
  page = { ...page, password_protected: null, content: "" };
  assert.equal(
    (
      await route.generateMetadata({
        params: Promise.resolve({ slug: page.slug }),
      })
    ).robots.index,
    false,
  );
});
test("empty or unavailable publication listings are noindex and automatically become eligible when real content is published", async () => {
  let feed = { articles: [], unavailable: false };
  const pages = load("../components/editorial/EditorialPages.tsx", {
    "@/lib/seo/metadata": metadata,
    "next/link": { default: () => null },
    "react-markdown": { default: () => null },
    "./EditorialSearch": { EditorialSearch: () => null },
    "@/components/shared/PeopleStory": { PeopleStory: () => null },
    "@/lib/publications": {
      readPublications: async () => feed,
      publicationPath: {
        blog: "blog",
        release: "releases",
        column: "columns",
        update: "updates",
      },
    },
    "next/navigation": { notFound: () => {} },
    "./EditorialPages.module.css": { default: {} },
    "react/jsx-runtime": { jsx: () => null, jsxs: () => null },
  });
  assert.equal(
    (await pages.editorialListMetadata("blog", { title: "JKTL Blog" })).robots
      .index,
    false,
  );
  feed = { articles: [], unavailable: true };
  assert.equal(
    (await pages.editorialListMetadata("blog", { title: "JKTL Blog" })).robots
      .index,
    false,
  );
  feed = { articles: [{ id: "published" }], unavailable: false };
  const m = await pages.editorialListMetadata("blog", { title: "JKTL Blog" });
  assert.equal(m.robots.index, true);
  assert.equal(m.alternates.canonical, "https://jktl.com.ng/blog");
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as routing from "../lib/seo/routing.mjs";

const require = createRequire(import.meta.url);
function load(file, dependencies = {}) {
  const module = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  new Function("require", "module", "exports", code)(name => name in dependencies ? dependencies[name] : require(name), module, module.exports);
  return module.exports;
}
const catalog = load("../lib/website-templates.ts");
const seo = load("../lib/seo/template-page.ts", { "@/lib/website-templates": catalog });
const metadata = load("../lib/seo/metadata.ts", { "./routing.mjs": routing });
const reserved = load("../lib/reserved-slugs.ts");
const sitemap = load("../lib/seo/sitemap.ts", { "./routing.mjs": routing, "@/lib/reserved-slugs": reserved, "@/lib/website-templates": catalog, "./template-page": seo });
const Link = ({ children, prefetch: _prefetch, ...props }) => createElement("a", props, children);
const classes = new Proxy({}, { get: (_target, key) => key });
const details = load("../components/templates/TemplateDetails.tsx", {
  "next/link": Link, "lucide-react": { ArrowUpRight: () => null },
  "@/lib/website-templates": catalog, "@/lib/seo/template-page": seo,
  "./TemplateDetails.module.css": { __esModule: true, default: classes },
});
const directory = load("../components/templates/TemplateDirectory.tsx", {
  "next/link": Link, "@/lib/seo/template-page": seo,
  "./TemplateDirectory.module.css": { __esModule: true, default: classes },
});

test("the sitemap admits original designs and rejects editions, blanks, auth, previews, queries and paused products", () => {
  const originalIds = new Set(seo.indexableTemplates.map(item => item.id));
  assert.ok(originalIds.size > 20 && originalIds.size < catalog.websiteTemplates.length);
  const records = catalog.websiteTemplates.map(item => ({ url: `https://jktl.com.ng/templates/${item.id}` }));
  const excluded = ["/login", "/signup?template=law-firm", "/business", "/admin", "/onboarding", "/partners/login", "/affiliates/reset-password", "/template-canvas/law-firm", "/templates/missing", "/templates/law-firm?device=mobile", "/products/ai-receptionist"];
  const result = sitemap.preferredSitemap([...records, ...excluded.map(path => ({ url: "https://jktl.com.ng" + path }))]);
  assert.deepEqual(new Set(result.map(item => new URL(item.url).pathname.slice("/templates/".length))), originalIds);
  assert.equal(seo.isIndexableTemplate(catalog.getWebsiteTemplate("law-firm-editorial")), false);
  assert.equal(seo.isIndexableTemplate(catalog.getWebsiteTemplate("blank-website")), false);
  const redirected = sitemap.preferredSitemap(records, [{ from_path: "/templates/law-firm", to_path: "/templates/family-law" }]);
  assert.ok(!redirected.some(item => item.url.endsWith("/law-firm")));
});

test("the server-rendered directory and edition links expose every designed template without JavaScript or Show more", () => {
  const html = renderToStaticMarkup(createElement(directory.TemplateDirectory));
  assert.equal((html.match(/<h1\b/g) || []).length, 0);
  for (const template of seo.indexableTemplates) assert.ok(html.includes(`href="/templates/${template.id}"`), template.id);
  const reachable = new Set(seo.indexableTemplates.map(item => item.id));
  for (const template of seo.indexableTemplates) for (const edition of seo.templateEditions(template)) reachable.add(edition.id);
  assert.deepEqual(reachable, new Set(catalog.websiteTemplates.filter(item => item.kind !== "blank").map(item => item.id)));
  const landing = renderToStaticMarkup(createElement(directory.TemplateDirectory, { landingOnly: true }));
  for (const template of seo.indexableTemplates) assert.equal(landing.includes(`href="/templates/${template.id}"`), template.kind === "landing", template.id);
});

test("original details contain server-accessible business-specific content and preserve exact selection identifiers", () => {
  for (const template of seo.indexableTemplates) {
    const html = renderToStaticMarkup(createElement(details.TemplateDetails, { template }));
    assert.ok(html.includes('id="template-details"'), template.id);
    assert.equal((html.match(/<h1\b/g) || []).length, 0);
    assert.ok(html.includes(`https://business.jktl.com.ng/login?template=${template.id}`), template.id);
    assert.ok(html.includes("/products/invoicing-payments"));
    assert.ok(html.includes("/solutions/online-payments"));
    assert.ok(html.replace(/<[^>]*>/g, " ").split(/\s+/).length > 200, template.id);
    for (const edition of seo.templateEditions(template)) assert.ok(html.includes(`href="/templates/${edition.id}"`));
    assert.ok(catalog.websitePagePaths(template, template.document).length > 0);
  }
});

test("three existing entry pages have distinct search metadata, visible questions, relevant actions and truthful charges", () => {
  const features = load("../data/feature-pages.ts");
  const entry = load("../lib/seo/feature-page.ts", { "./metadata": metadata });
  const view = load("../components/shared/FeaturePage.tsx", {
    "./PeopleStory": { PeopleStory: () => null },
    "@/components/features/FeatureBadge": { FeatureBadge: () => null },
    "next/image": ({ priority: _priority, ...props }) => createElement("img", props),
    "next/link": Link,
    "@/components/i18n/LanguageProvider": { T: ({ children }) => children },
    "@/lib/seo/feature-page": entry,
  });
  const titles = new Set();
  for (const [key, copy] of Object.entries(entry.entryPageCopy)) {
    const [section, slug] = key.split("/"), page = features.getFeaturePage(section, slug);
    const meta = entry.featurePageMetadata(page), html = renderToStaticMarkup(createElement(view.FeaturePage, { page }));
    titles.add(meta.title);
    assert.equal(meta.alternates.canonical, "https://jktl.com.ng/" + key);
    assert.ok(meta.description.length >= 100 && meta.description.length <= 160);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes(copy.cta));
    for (const faq of copy.faqs) assert.ok(html.includes(faq.question));
    const schema = entry.featurePageSchema(page);
    assert.equal(schema["@graph"][0].url, meta.alternates.canonical);
    assert.equal(schema["@graph"][1].itemListElement.at(-1).item, meta.alternates.canonical);
    if (slug !== "website-builder") assert.ok(html.includes("Online processing is not free"));
  }
  assert.equal(titles.size, 3);
  assert.equal(entry.featurePageMetadata(features.getFeaturePage("products", "ai-receptionist")).robots.index, false);
});

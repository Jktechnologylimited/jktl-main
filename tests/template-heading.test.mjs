import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import * as routing from "../lib/seo/routing.mjs";
const require = createRequire(import.meta.url);
function load(file, deps = {}) {
  const code = ts.transpileModule(
      readFileSync(new URL(file, import.meta.url), "utf8"),
      {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          target: ts.ScriptTarget.ES2022,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      },
    ).outputText,
    m = { exports: {} };
  new Function("require", "module", "exports", code)(
    (n) => (n in deps ? deps[n] : require(n)),
    m,
    m.exports,
  );
  return m.exports;
}
const catalog = load("../lib/website-templates.ts"),
  copy = load("../lib/seo/template-page.ts"),
  metadata = load("../lib/seo/metadata.ts", { "./routing.mjs": routing });
test("every catalog entry has descriptive unique headings, metadata and canonical structured data", async () => {
  const route = load("../app/templates/[slug]/page.tsx", {
    "next/navigation": {
      notFound: () => {
        throw Error("Not found");
      },
    },
    "@/lib/website-templates": catalog,
    "@/lib/seo/metadata": metadata,
    "@/lib/seo/template-page": copy,
    "@/components/templates/TemplatePreview": { TemplatePreview: () => null },
  });
  const titles = new Set(),
    descriptions = new Set();
  for (const template of catalog.websiteTemplates) {
    const content = copy.templatePageCopy(template);
    assert.ok(content.heading.includes(template.name));
    assert.ok(content.heading.includes(template.category));
    const meta = await route.generateMetadata({
      params: Promise.resolve({ slug: template.id }),
    });
    assert.equal(meta.alternates.canonical, content.canonical);
    assert.equal(meta.description, content.description);
    assert.equal(meta.robots.index, false);
    titles.add(meta.title);
    descriptions.add(meta.description);
    const schema = copy.templatePageSchema(template);
    assert.equal(schema["@graph"][0].url, content.canonical);
    assert.equal(
      schema["@graph"][1].itemListElement.at(-1).item,
      content.canonical,
    );
    assert.equal(schema["@graph"][0].about.name, template.name);
  }
  assert.equal(titles.size, catalog.websiteTemplates.length);
  assert.equal(descriptions.size, catalog.websiteTemplates.length);
  await assert.rejects(
    () =>
      route.generateMetadata({
        params: Promise.resolve({ slug: "unknown-template" }),
      }),
    /Not found/,
  );
});
test("the outer preview document renders one primary H1 without relying on its iframe", () => {
  const preview = load("../components/templates/TemplatePreview.tsx", {
    "next/link": ({ children, href, ...p }) =>
      createElement("a", { ...p, href }, children),
    "./useResponsivePreview": {
      useResponsivePreview: () => ({
        device: "desktop",
        setDevice: () => {},
        frameRef: null,
      }),
    },
    "lucide-react": { Monitor: () => null, Smartphone: () => null },
    "@/lib/website-templates": catalog,
    "./TemplateWebsite": { TemplateWebsite: () => null },
    "./TemplatePreview.module.css": {
      shell: "shell",
      toolbar: "toolbar",
      intro: "intro",
      stage: "stage",
    },
    "@/lib/seo/template-page": copy,
  });
  for (const template of catalog.websiteTemplates) {
    const html = renderToStaticMarkup(
      createElement(preview.TemplatePreview, { id: template.id }),
    );
    assert.equal((html.match(/<h1\b/g) || []).length, 1, template.id);
    assert.ok(html.includes("/template-canvas/" + template.id));
    assert.ok(
      html.includes(
        "https://business.jktl.com.ng/login?template=" + template.id,
      ),
    );
    assert.ok(html.includes('aria-labelledby="template-heading"'));
    assert.equal((html.match(/<iframe\b/g) || []).length, 1);
  }
});

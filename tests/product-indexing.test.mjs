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
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  new Function("require", "module", "exports", code)(name => name in dependencies ? dependencies[name] : require(name), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const pricing = load("../lib/website-pricing.ts"), features = load("../data/feature-pages.ts");
const metadata = load("../lib/seo/metadata.ts", { "./routing.mjs": routing });
const seo = load("../lib/seo/feature-page.ts", { "./metadata": metadata });
const route = load("../app/products/[product]/page.tsx", {
  "@/components/chatbot/ChatbotLanding": { ChatbotLanding: () => createElement("main", null, createElement("h1", null, "Website chatbot")) },
  "@/components/business-email/EmailLanding": { EmailLanding: () => createElement("main", null, createElement("h1", null, "Business email")) },
  "@/components/custom/CustomPage": { CustomPage: () => null },
  "@/components/i18n/LanguageProvider": { T: ({ children }) => children },
  "@/components/shared/FeaturePage": { FeaturePage: () => null },
  "next/link": ({ children, ...props }) => createElement("a", props, children),
  "next/navigation": { permanentRedirect: target => { throw Error("Redirect: " + target); }, notFound: () => { throw Error("404"); } },
  "@/lib/seo/metadata": metadata, "@/data/feature-pages": features,
  "@/lib/website-pricing": pricing, "@/lib/seo/feature-page": seo, "@/lib/seo/routing.mjs": routing,
});
const params = product => ({ params: Promise.resolve({ product }) });

test("all registered product routes are built, with only the paused service and domain alias excluded from indexing", async () => {
  const routes = route.generateStaticParams().map(item => item.product);
  const registered = [...pricing.DIGITAL_PRODUCTS.map(item => item.id), ...features.featurePages.filter(item => item.section === "products").map(item => item.slug)];
  assert.deepEqual(new Set(routes), new Set(registered));
  assert.equal(routes.length, new Set(routes).size);
  for (const id of routes) {
    const meta = await route.generateMetadata(params(id));
    assert.equal(meta.alternates.canonical, "https://jktl.com.ng" + (id === "domains" ? "/domains" : "/products/" + id));
    assert.equal(meta.robots?.index === false, id === "ai-receptionist", id);
    assert.ok(meta.title && meta.description, id);
  }
  await assert.rejects(() => route.default(params("domains")), /Redirect: \/domains/);
});

test("email and chatbot search metadata describe the actual offering and match their rendered structured data", async () => {
  const originalFetch = globalThis.fetch;
  // Deliberately empty approved-plan fixture; this test never calls production APIs.
  globalThis.fetch = async url => {
    assert.equal(url, "https://business.jktl.com.ng/api/public/email-plans");
    return Response.json({ plans: [] });
  };
  try {
    for (const id of ["ai-chatbot", "business-email"]) {
      const meta = await route.generateMetadata(params(id));
      assert.ok(meta.description.length >= 100 && meta.description.length <= 160);
      assert.equal(meta.openGraph.url, meta.alternates.canonical);
      assert.equal(meta.openGraph.description, meta.description);
      if (id === "ai-chatbot") assert.match(meta.description, /AI-generated replies require activation/);
      if (id === "business-email") assert.match(meta.description, /confirm annual pricing and arrange setup/);
      const html = renderToStaticMarkup(await route.default(params(id)));
      const json = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
      assert.equal(json.length, 1, "One page schema, without a second footer or page wrapper");
      const graph = json[0]["@graph"];
      assert.equal(graph[0]["@type"], "WebPage");
      assert.equal(graph[0].url, meta.alternates.canonical);
      assert.equal(graph[0].description, meta.description);
      assert.equal(graph[1].itemListElement.at(-1).item, meta.alternates.canonical);
      assert.ok(!JSON.stringify(json).includes('"offers"'), "No invented product pricing");
    }
  } finally { globalThis.fetch = originalFetch; }
});

test("add-on copy clearly preserves the paused receptionist status", () => {
  const addOn = pricing.DIGITAL_PRODUCTS.find(item => item.id === "add-ons");
  assert.match(addOn.description, /AI receptionist call handling is paused/);
});

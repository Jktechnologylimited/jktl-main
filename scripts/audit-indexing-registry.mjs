/** Read-only registry/sitemap audit. Writes evidence files, never changes routes or publishes content. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";
import * as routing from "../lib/seo/routing.mjs";

const require = createRequire(import.meta.url);
const root = new URL("../", import.meta.url);
function load(file, dependencies = {}) {
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(readFileSync(new URL(file, root), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  new Function("require", "module", "exports", code)(name => name in dependencies ? dependencies[name] : require(name), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const catalog = load("lib/website-templates.ts");
const seo = load("lib/seo/template-page.ts", { "@/lib/website-templates": catalog });
const pricing = load("lib/website-pricing.ts"), features = load("data/feature-pages.ts");
const origin = process.env.INDEXING_AUDIT_ORIGIN || routing.SITE_ORIGIN;
const output = path.resolve(process.argv[2] || "/tmp/jktl-indexing-remediation-22nov/registry");
mkdirSync(output, { recursive: true });
const response = await fetch(origin + "/sitemap.xml", { signal: AbortSignal.timeout(20000), redirect: "error" });
if (!response.ok) throw Error("Sitemap request failed: " + response.status);
const xml = await response.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1].replaceAll("&amp;", "&"));
if (new Set(urls).size !== urls.length) throw Error("Duplicate sitemap URLs");
const paths = new Set(urls.map(url => new URL(url).pathname));
const rows = catalog.websiteTemplates.map(template => {
  const indexable = seo.isIndexableTemplate(template), page = "/templates/" + template.id;
  const inSitemap = paths.has(page);
  if (indexable !== inSitemap) throw Error("Template eligibility/sitemap mismatch: " + template.id);
  return {
    id: template.id, name: template.name, kind: template.kind || "website", category: template.category,
    source_id: template.sourceId || template.id, url: routing.SITE_ORIGIN + page,
    indexable, in_live_sitemap: inSitemap,
    reason: indexable ? "Original designed template; intended public search landing page"
      : template.kind === "blank" ? "Blank editor starting point; intentionally noindex"
        : `Edition of /templates/${template.sourceId}; shares starter content and remains selectable with noindex`,
  };
});
if (new Set(rows.map(row => row.url)).size !== rows.length) throw Error("Duplicate public template detail URLs");
const products = [...new Set([
  ...pricing.DIGITAL_PRODUCTS.map(item => item.id),
  ...features.featurePages.filter(item => item.section === "products").map(item => item.slug),
])].map(id => {
  const page = "/products/" + id, preferred = routing.canonicalPath(page);
  const indexable = !routing.isUtilityPath(page) && page === preferred;
  if (indexable && !paths.has(page)) throw Error("Published product missing from sitemap: " + page);
  if (!indexable && paths.has(page)) throw Error("Non-preferred or paused product in sitemap: " + page);
  return {
    url: routing.SITE_ORIGIN + page, preferred_url: routing.SITE_ORIGIN + preferred,
    indexable, in_live_sitemap: paths.has(page),
    treatment: id === "ai-receptionist" ? "Paused; noindex explanatory page"
      : id === "domains" ? "Permanent redirect to /domains; preferred destination is in sitemap"
        : id === "business-email" ? "Approved mailbox plans; team-managed setup"
          : id === "ai-chatbot" ? "FAQs, enquiries and contact options available; generated AI replies await activation"
            : ["custom-websites", "managed-services", "add-ons"].includes(id) ? "Consultation or scoped upgrade; no automatic activation implied"
              : "Public product landing page",
  };
});
for (const page of ["/domains", "/solutions/online-payments"]) if (!paths.has(page)) throw Error("Required entry offer missing: " + page);
const csv = (records, file) => {
  const keys = Object.keys(records[0]), quote = value => '"' + String(value).replaceAll('"', '""') + '"';
  writeFileSync(path.join(output, file), [keys.map(quote).join(","), ...records.map(row => keys.map(key => quote(row[key])).join(","))].join("\n") + "\n");
};
csv(rows, "template-inventory.csv"); csv(products, "product-inventory.csv");
const summary = {
  templateEntries: rows.length, designedChoices: rows.filter(row => row.kind !== "blank").length,
  distinctPublicTemplateDetailUrls: new Set(rows.map(row => row.url)).size,
  indexableTemplates: rows.filter(row => row.indexable).length,
  templatesInLiveSitemap: rows.filter(row => row.in_live_sitemap).length,
  omittedTemplates: rows.filter(row => !row.in_live_sitemap).length,
  omittedEditions: rows.filter(row => !row.indexable && row.kind !== "blank").length,
  omittedBlanks: rows.filter(row => row.kind === "blank").length,
  liveSitemapUrls: urls.length, productRouteEntries: products.length,
  indexableProductPrefixPages: products.filter(row => row.indexable).length,
};
writeFileSync(path.join(output, "summary.json"), JSON.stringify(summary, null, 2) + "\n");
writeFileSync(path.join(output, "live-sitemap.xml"), xml);
console.log(JSON.stringify(summary, null, 2));

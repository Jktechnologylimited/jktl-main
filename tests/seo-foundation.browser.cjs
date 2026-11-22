/* Read-only verification against built local apps. No form submission, accounts, email or charges. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const { chromium } = require("playwright");
const main = process.env.SEO_MAIN_ORIGIN || "http://localhost:3317";
const business = process.env.SEO_BUSINESS_ORIGIN || "http://localhost:3318";
const publicOrigin = "https://jktl.com.ng";
const output = process.env.SEO_AUDIT_OUTPUT || "/tmp/jktl-seo-audit/after";
fs.mkdirSync(output, { recursive: true });
const catalogModule = { exports: {} };
new Function("module", "exports", ts.transpileModule(fs.readFileSync(path.join(__dirname, "../lib/website-templates.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText)(catalogModule, catalogModule.exports);
const templates = catalogModule.exports.websiteTemplates;
const originals = templates.filter(item => item.kind !== "blank" && (!item.sourceId || item.sourceId === item.id));

(async () => {
  const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] });
  const context = await browser.newContext();
  const analyser = await context.newPage();
  const rows = [], records = new Map(), failures = [], redirects = [];
  const parse = html => analyser.evaluate(source => {
    const doc = new DOMParser().parseFromString(source, "text/html");
    const robots = [...doc.querySelectorAll('meta[name="robots"]')].map(el => el.content).join("; ");
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(el => {
      try { return JSON.parse(el.textContent); } catch { return { parseError: true }; }
    });
    const links = [...doc.querySelectorAll("a[href]")].map(el => el.getAttribute("href"));
    const ids = [...doc.querySelectorAll("[id]")].map(el => el.id);
    const h1 = [...doc.querySelectorAll("h1")].map(el => el.textContent.replace(/\s+/g, " ").trim());
    const title = doc.title, description = doc.querySelector('meta[name="description"]')?.content || "";
    const canonical = [...doc.querySelectorAll('link[rel="canonical"]')].map(el => el.href);
    doc.querySelectorAll("script,style,svg").forEach(el => el.remove());
    return { title, description, canonical, robots, h1, links, ids, schemas, words: doc.body.textContent.trim().split(/\s+/).length };
  }, html);
  async function audit(route, origin = main, kind = "public") {
    const response = await context.request.get(origin + route, { maxRedirects: 0, timeout: 20000 });
    const data = await parse(await response.text());
    const row = { path: route, kind, status: response.status(), ...data };
    if (origin === main) records.set(route, row);
    rows.push(row);
    return row;
  }
  async function batches(items, callback) {
    for (let i = 0; i < items.length; i += 4) await Promise.all(items.slice(i, i + 4).map(callback));
  }
  try {
    const robotsResponse = await context.request.get(main + "/robots.txt");
    assert.equal(robotsResponse.status(), 200);
    const robots = await robotsResponse.text();
    assert.match(robots, /Sitemap: https:\/\/jktl\.com\.ng\/sitemap\.xml/);
    assert.ok(!/Disallow: \/templates\//.test(robots));
    const sitemapResponse = await context.request.get(main + "/sitemap.xml");
    assert.equal(sitemapResponse.status(), 200);
    const xml = await sitemapResponse.text();
    fs.writeFileSync(path.join(output, "sitemap.xml"), xml);
    const sitemapUrls = await analyser.evaluate(xml => [...new DOMParser().parseFromString(xml, "application/xml").getElementsByTagName("loc")].map(el => el.textContent), xml);
    const sitemapPaths = sitemapUrls.map(url => {
      const value = new URL(url);
      assert.equal(value.origin, publicOrigin);
      assert.equal(value.search + value.hash, "");
      return value.pathname;
    });
    assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);
    const templatePaths = templates.map(item => "/templates/" + item.id);
    await batches([...new Set([...sitemapPaths, ...templatePaths])], route => audit(route));
    for (const route of sitemapPaths) {
      const row = records.get(route);
      assert.equal(row.status, 200, route);
      assert.ok(!/noindex/i.test(row.robots), route);
      assert.deepEqual(row.canonical, [new URL(route, publicOrigin).href], route);
      assert.equal(row.h1.length, 1, route);
      assert.ok(row.title && row.description, route);
      assert.ok(row.schemas.every(item => !item.parseError), route);
    }
    assert.deepEqual(new Set(sitemapPaths.filter(route => route.startsWith("/templates/"))), new Set(originals.map(item => "/templates/" + item.id)));
    for (const route of ["/products/ai-receptionist", "/login", "/signup", "/admin", "/business", "/template-canvas/law-firm"]) assert.ok(!sitemapPaths.includes(route));
    for (const template of templates) {
      const row = records.get("/templates/" + template.id);
      assert.equal(row.status, 200, template.id);
      assert.equal(row.h1.length, 1, template.id);
      assert.ok(row.h1[0].includes(template.name), template.id);
      assert.deepEqual(row.canonical, [publicOrigin + "/templates/" + template.id]);
      assert.equal(!/noindex/.test(row.robots), originals.some(item => item.id === template.id), template.id);
      assert.ok(row.description.length > 80 && row.description.length <= 160, template.id);
      assert.ok(row.links.includes(`https://business.jktl.com.ng/login?template=${template.id}`));
      assert.ok(row.words > 200, template.id + " server-accessible content");
    }
    assert.equal(new Set(templates.map(item => records.get("/templates/" + item.id).title)).size, templates.length);
    const gallery = records.get("/templates"), crawlable = new Set(gallery.links.filter(href => href.startsWith("/templates/")));
    for (const template of originals) {
      const route = "/templates/" + template.id;
      assert.ok(crawlable.has(route), template.id + " missing from initial gallery HTML");
      for (const href of records.get(route).links) if (href.startsWith("/templates/")) crawlable.add(href);
    }
    for (const template of templates.filter(item => item.kind !== "blank")) assert.ok(crawlable.has("/templates/" + template.id), template.id + " unreachable without Show more");
    const internal = new Set();
    for (const row of rows) for (const href of row.links) {
      try { const url = new URL(href, publicOrigin + row.path); if (url.origin === publicOrigin && !/^\/api(?:\/|$)/.test(url.pathname)) internal.add(url.pathname); } catch { /* Invalid hrefs are reported by browser navigation checks. */ }
    }
    await batches([...internal].filter(route => !records.has(route)), route => audit(route));
    for (const route of internal) if (records.get(route).status >= 400 || records.get(route).status < 200) failures.push({ path: route, status: records.get(route).status });
    for (const route of ["/templates/law-firm?device=mobile", "/products/website-builder?utm_source=seo-check"]) {
      const row = await audit(route);
      assert.deepEqual(row.canonical, [publicOrigin + route.split("?")[0]]);
    }
    const raw = await audit("/template-canvas/law-firm", main, "preview");
    assert.equal(raw.status, 200); assert.match(raw.robots, /noindex/);
    const paused = await audit("/products/ai-receptionist"); assert.match(paused.robots, /noindex/);
    for (const route of ["/templates/no-such-template", "/template-canvas/no-such-template", "/demos/payments", "/not-a-real-jktl-page"]) assert.equal((await audit(route, main, "intentional-404")).status, 404, route);
    for (const [from, to] of [["/services/web-development", "/products/custom-websites"], ["/services/software-solutions", "/products/business-tools"]]) {
      for (const host of ["jktl.com.ng", "www.jktl.com.ng"]) {
        const response = await context.request.get(main + from + "?source=seo-check", { maxRedirects: 0, headers: { host } });
        assert.ok([301, 308].includes(response.status()), from + " " + host);
        const target = new URL(response.headers().location);
        assert.equal(target.origin + target.pathname, publicOrigin + to);
        assert.equal(target.searchParams.get("source"), "seo-check");
        redirects.push({ host, from, status: response.status(), destination: target.href });
      }
    }
    for (const route of ["login", "signup"]) await batches(originals.slice(0, 20), async template => {
      const row = await audit(`/${route}?template=${template.id}`, business, "business-auth");
      assert.equal(row.status, 200); assert.equal(row.h1.length, 1); assert.match(row.robots, /noindex/);
      assert.deepEqual(row.canonical, [`https://business.jktl.com.ng/${route}`]);
    });
    for (const route of ["/business", "/business/website", "/business/invoices", "/admin", "/partners/login", "/affiliates/login", "/login", "/signup", "/forgot-password", "/reset-password", "/onboarding", "/pay/seo-test-not-a-real-invoice"]) {
      const response = await context.request.get(business + route, { maxRedirects: 0 });
      assert.match(response.headers()["x-robots-tag"] || "", /noindex/, route + " missing private noindex header");
      assert.ok(response.status() < 500, route);
    }
    const publicPreview = await context.request.get(business + "/template-canvas/law-firm");
    assert.equal(publicPreview.status(), 200);
    assert.ok(!publicPreview.headers()["x-robots-tag"]);
    const page = await context.newPage(), pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ["/", "/templates", "/products/website-builder", "/products/invoicing-payments", "/solutions/online-payments", "/industries", "/templates/law-firm", "/templates/kora-coffee", "/templates/nacre-aesthetics"]) {
        const response = await page.goto(main + route, { waitUntil: "domcontentloaded" }); assert.equal(response.status(), 200, route);
        await page.locator("h1").waitFor(); assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${width}px ${route} overflow`);
        if (route === "/") assert.equal(await page.getByText("Free Websites • Free Invoicing • Online Payments", { exact: true }).count(), 1);
        const entryAction = {
          "/products/website-builder": ["Create my free website", "https://business.jktl.com.ng/signup"],
          "/products/invoicing-payments": ["Create a free invoice", "https://business.jktl.com.ng/signup?next=invoices"],
          "/solutions/online-payments": ["Set up online payments", "https://business.jktl.com.ng/signup?next=payments"],
        }[route];
        if (entryAction) assert.equal(await page.getByRole("link", { name: entryAction[0], exact: true }).getAttribute("href"), entryAction[1]);
        if (route.startsWith("/templates/")) {
          const id = route.split("/").at(-1);
          assert.equal(await page.getByRole("link", { name: "Select Template", exact: false }).getAttribute("href"), `https://business.jktl.com.ng/login?template=${id}`);
          await page.locator("#template-details").scrollIntoViewIfNeeded();
          if (route === "/templates/law-firm" && width !== 320) await page.locator("#template-details").screenshot({ path: path.join(output, `template-details-${width}.png`) });
        }
      }
      await page.goto(main + "/templates");
      const count = await page.locator("[data-template-catalog] article").count();
      assert.equal(count, 24);
      await page.getByRole("button", { name: /Show more templates/ }).click();
      assert.equal(await page.locator("[data-template-catalog] article").count(), 48);
      await page.goto(business + "/login?template=law-firm");
      await page.getByRole("link", { name: "Create account", exact: true }).click();
      await page.waitForURL(/\/signup\?template=law-firm/);
      await page.getByRole("link", { name: "Log in", exact: true }).click();
      await page.waitForURL(/\/login\?template=law-firm/);
      assert.equal(await page.locator("h1").count(), 1);
      console.log(`Passed ${width}px public layouts, template previews, Show more and login/signup template preservation.`);
    }
    assert.deepEqual(pageErrors, []);
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const plain = await noJs.newPage();
    for (const route of ["/templates", "/templates/law-firm", "/industries", "/products/website-builder"]) {
      await plain.goto(main + route, { waitUntil: "domcontentloaded" });
      assert.equal(await plain.locator("h1").count(), 1);
      const visible = await plain.locator("h1").evaluate(element => {
        for (let node = element; node; node = node.parentElement) { const style = getComputedStyle(node); if (Number(style.opacity) === 0 || style.visibility === "hidden" || style.display === "none") return false; } return true;
      });
      assert.equal(visible, true, route + " invisible without JavaScript");
    }
    for (const template of originals) assert.ok(records.get("/templates").links.includes("/templates/" + template.id));
    await noJs.close();
    const summary = { sitemapUrls: sitemapUrls.length, sitemapTemplates: originals.length, templatePages: templates.length, designedTemplatesReachableWithoutShowMore: crawlable.size, authQueryUrls: 40, brokenInternalLinks: failures, redirects, mainPagesChecked: rows.filter(row => row.kind !== "business-auth").length, pageErrors };
    fs.writeFileSync(path.join(output, "summary.json"), JSON.stringify(summary, null, 2));
    fs.writeFileSync(path.join(output, "pages.json"), JSON.stringify(rows, null, 2));
    const csv = value => '"' + String(value).replaceAll('"', '""') + '"';
    fs.writeFileSync(path.join(output, "rendered-pages.csv"), ["path,kind,status,h1_count,title,description_length,robots,canonical,in_sitemap", ...rows.map(row => [row.path, row.kind, row.status, row.h1.length, row.title, row.description.length, row.robots, row.canonical.join("; "), row.kind === "public" && sitemapPaths.includes(row.path)].map(csv).join(","))].join("\n"));
    assert.deepEqual(failures, []);
    console.log(JSON.stringify(summary, null, 2));
    console.log("Passed server HTML, sitemap, internal links, structured JSON, query canonicals, no-JS visibility and safe auth navigation. No forms submitted.");
  } finally { await context.close(); await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

// Run against built Main and Business apps; signup stops before account creation.
const fs = require("fs"),
  assert = require("node:assert/strict"),
  { chromium } = require("playwright");
const path = require("path"),
  ts = require("typescript");
const mod = { exports: {} };
new Function(
  "module",
  "exports",
  ts.transpileModule(
    fs.readFileSync(
      path.join(__dirname, "../lib/website-templates.ts"),
      "utf8",
    ),
    { compilerOptions: { module: ts.ModuleKind.CommonJS } },
  ).outputText,
)(mod, mod.exports);
const seen = new Set(),
  cases = [];
for (const t of mod.exports.websiteTemplates) {
  const source = t.sourceId || t.id;
  if (seen.has(source)) continue;
  seen.add(source);
  cases.push({ id: t.id, name: t.name, category: t.category });
  if (cases.length === 20) break;
}
const main = process.env.H1_MAIN_ORIGIN || "http://localhost:3001",
  business = process.env.H1_BUSINESS_ORIGIN || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext(),
      page = await context.newPage(),
      errors = [],
      rows = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (
        m.type() === "error" &&
        /hydration|did not match|server rendered/i.test(m.text())
      )
        errors.push(m.text());
    });
    for (const route of ["login", "signup"]) {
      for (let i = 0; i < cases.length; i += 5) {
        await Promise.all(
          cases.slice(i, i + 5).map(async (template) => {
            const path = `/${route}?template=${template.id}`,
              response = await context.request.get(business + path);
            assert.equal(response.status(), 200, path);
            const html = await response.text(),
              headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
            assert.equal(headings.length, 1, path);
            assert.ok(
              /noindex/.test(
                (html.match(/<meta name="robots" content="([^"]+)"/) ||
                  [])[1] || "",
              ),
              path,
            );
            const canonical = (html.match(
              /<link rel="canonical" href="([^"]+)"/,
            ) || [])[1];
            assert.equal(
              canonical,
              `https://business.jktl.com.ng/${route}`,
              path,
            );
            rows.push({
              url: `https://business.jktl.com.ng${path}`,
              h1_count: headings.length,
              h1: headings[0][1]
                .replace(/<[^>]*>/g, "")
                .replace(/<!--.*?-->/g, ""),
              canonical,
              result: "PASS",
            });
          }),
        );
      }
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const id of ["law-firm", "hair-salon", "blank-landing"]) {
        await page.goto(main + "/templates/" + id);
        const h1 = page.locator("h1");
        assert.equal(await h1.count(), 1);
        assert.ok(await h1.isVisible());
        assert.ok((await h1.textContent()).includes("Template"));
        assert.ok(await page.locator("iframe").isVisible());
        assert.ok(
          await page
            .getByRole("link", { name: "Select Template", exact: false })
            .isVisible(),
        );
        assert.match(
          await page
            .getByRole("link", { name: "Select Template", exact: false })
            .getAttribute("href"),
          new RegExp("template=" + id + "$"),
        );
        if (width === 1440) {
          await page
            .getByRole("button", { name: "Mobile preview", exact: true })
            .click();
          await page
            .getByRole("button", { name: "Mobile preview", exact: true })
            .getAttribute("aria-pressed")
            .then((v) => assert.equal(v, "true"));
          await page
            .getByRole("button", { name: "Desktop preview", exact: true })
            .click();
        }
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        );
      }
      for (const route of ["login", "signup"]) {
        await page.goto(`${business}/${route}?template=law-firm`);
        assert.equal(await page.locator("h1").count(), 1);
        assert.ok(await page.locator("h1").isVisible());
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        );
        await page
          .getByRole("link", {
            name: route === "login" ? "Create account" : "Log in",
            exact: true,
          })
          .click();
        await page.waitForURL(
          new RegExp(
            (route === "login" ? "/signup" : "/login") + "\\?template=law-firm",
          ),
        );
        assert.equal(await page.locator("h1").count(), 1);
      }
    }
    await page.goto(business + "/signup?template=law-firm");
    await page
      .getByLabel("Your name", { exact: true })
      .fill("SEO Verification");
    await page
      .getByLabel("Business name", { exact: true })
      .fill("Verification only");
    await page
      .getByLabel("Email address", { exact: true })
      .fill("seo-verification@example.test");
    await page
      .getByLabel("Password", { exact: true })
      .fill("Test-only-passphrase-2026");
    await page
      .getByRole("button", { name: "Start for free", exact: true })
      .click();
    await page.waitForURL(/\/onboarding\?template=law-firm/);
    assert.equal(
      await page.evaluate(() =>
        sessionStorage.getItem("jktl.pending-website-template"),
      ),
      "law-firm",
    );
    // Stop before onboarding creates an account. This flow changes only browser memory/session storage.
    await context.close();
    const demo = await browser.newContext(),
      p = await demo.newPage();
    await p.goto(business + "/login?template=law-firm");
    await p
      .getByRole("button", { name: "Open salon demo", exact: true })
      .click();
    await p.waitForURL(/\/business\/website\/template\?template=law-firm/);
    await demo.close();
    const csv = (v) => '"' + String(v).replaceAll('"', '""') + '"';
    fs.writeFileSync(
      process.env.H1_AUDIT_OUTPUT || "/tmp/jktl-auth-h1-rendered-audit.csv",
      [
        "url,h1_count,h1,canonical,result",
        ...rows
          .sort((a, b) => a.url.localeCompare(b.url))
          .map((r) => Object.values(r).map(csv).join(",")),
      ].join("\n"),
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS 40 server-rendered auth query URLs; one visible H1 on desktop/mobile template and auth pages; preview controls and selection links; login/signup navigation, signup-to-onboarding template preservation and demo editor redirect. No accounts created.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

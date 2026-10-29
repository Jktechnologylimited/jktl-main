// Production browser checks. Requires local Main:3001 and Business localhost:3000.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const main = process.env.MAIN_TEST_ORIGIN || "http://127.0.0.1:3001",
  business = process.env.BUSINESS_TEST_ORIGIN || "http://localhost:3000";
(async () => {
  const { websiteTemplates } = await import("../lib/website-templates.ts");
  assert.equal(websiteTemplates.length, 204);
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    const errors = [];
    let metrics = 0;
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (r.url().includes("/api/site-metrics")) metrics++;
    });
    await page.route("https://images.unsplash.com/**", (r) => r.abort());
    await page.goto(main + "/templates");
    await page.getByRole("heading", { name: /Pick a 2026/ }).waitFor();
    assert.equal(await page.locator("article").count(), 24);
    await page.getByRole("button", { name: /Show more templates/ }).click();
    assert.equal(await page.locator("article").count(), 48);
    await page
      .getByRole("combobox", { name: "Filter template type" })
      .selectOption("blank");
    assert.equal(await page.locator("article").count(), 2);
    await page
      .getByRole("combobox", { name: "Filter template type" })
      .selectOption("landing");
    assert.ok(
      await page.getByText("60 templates", { exact: true }).isVisible(),
    );
    await page.getByRole("searchbox").fill("Law Firm");
    assert.equal(await page.locator("article").count(), 3);
    await page
      .getByRole("button", { name: "All templates", exact: true })
      .click();
    let index = 0,
      complete = 0;
    await Promise.all(
      Array.from({ length: 6 }, async () => {
        while (index < websiteTemplates.length) {
          const t = websiteTemplates[index++];
          for (const host of [main, business]) {
            const r = await page.request.get(host + "/templates/" + t.id);
            assert.equal(r.status(), 200, t.id);
            const raw = await page.request.get(host + "/template-canvas/" + t.id);
            assert.equal(raw.status(),200,t.id);
            const html = await raw.text();
            assert.ok(html.includes('id="home"'));
            assert.ok(html.includes('id="contact"'));
            if (!t.document.blank) {
              assert.ok(html.includes("images.unsplash.com"));
              assert.ok(html.includes('id="service-areas"'));
              assert.ok(html.includes('id="reviews"'));
            }
            assert.ok(html.includes("Sign in to JKTL Business"));
          }
          assert.equal(
            (
              await page.request.get(
                main + "/template-previews/" + t.id + ".jpg",
              )
            ).status(),
            200,
          );
          complete++;
          if (complete % 50 === 0)
            console.log("Verified " + complete + "/202 designs on both apps");
        }
      }),
    );
    assert.equal(
      (await page.request.get(main + "/templates/unknown")).status(),
      404,
    );
    await page.screenshot({ path: "/tmp/jktl-2026-gallery.png" });
    await page.goto(main + "/landing-pages");
    await page.getByRole("heading",{name:"One page. A clear next step.",exact:true}).waitFor();
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(
      await page
        .getByRole("link", { name: "Start a blank landing page" })
        .isVisible(),
    );
    const sitemap = await (
      await page.request.get(main + "/sitemap.xml")
    ).text();
    assert.ok(sitemap.includes("/landing-pages"));
    assert.ok(sitemap.includes("/templates"));
    assert.ok(!sitemap.includes("/services/seo"));
    const robots = await (await page.request.get(main + "/robots.txt")).text();
    assert.ok(robots.includes("Sitemap: https://jktl.com.ng/sitemap.xml"));
    assert.ok(robots.includes("/api/"));
    await page.goto(main + "/templates/law-firm-launch");
    await page.frameLocator("iframe").locator("#home h1").waitFor();
    await page.screenshot({ path: "/tmp/jktl-2026-landing-preview.png" });
    await page.goto(business + "/login?template=law-firm-launch");
    await page
      .getByText("Your selected template is ready.", { exact: false })
      .waitFor();
    assert.equal(
      await page
        .getByRole("link", { name: "Create account" })
        .getAttribute("href"),
      "/signup?template=law-firm-launch",
    );
    await page.getByRole("button", { name: "Open salon demo" }).click();
    await page.waitForURL(
      "**/business/website/template?template=law-firm-launch",
    );
    await page
      .getByRole("heading", { name: "Law Firm — Launch · Website editor" })
      .waitFor();
    await page.getByText("Logo, service areas & SEO", { exact: true }).click();
    await page.getByLabel(/Service areas \(/).fill("Lagos\nAbuja");
    const canvas = page.frameLocator(
      'iframe[title="Your website live preview"]',
    );
    await canvas.getByText("Lagos · Abuja", { exact: true }).waitFor();
    await page.getByText("Social icons", { exact: true }).click();
    await page.getByRole("button", { name: "Add social icon" }).click();
    await page
      .getByLabel("Social URL 1", { exact: true })
      .fill("https://instagram.com/example");
    assert.equal(
      await canvas
        .getByRole("link", { name: "instagram", exact: true })
        .getAttribute("href"),
      "https://instagram.com/example",
    );
    await page.getByText("Reviews", { exact: true }).click();
    await page.getByRole("button", { name: "Add genuine review" }).click();
    await page
      .getByLabel("Customer name", { exact: true })
      .fill("Demo customer");
    await page
      .getByLabel("Review", { exact: true })
      .fill("Browser test feedback. Never a live customer review.");
    await canvas
      .getByText("Browser test feedback. Never a live customer review.")
      .waitFor();
    await page.getByRole("button", { name: "Save demo website" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Saved in the demo" })
      .waitFor();
    await page.goto(
      business + "/business/website/template?template=blank-landing",
    );
    await page
      .getByRole("heading", { name: "Blank Landing Page · Website editor" })
      .waitFor();
    assert.equal(
      await page.getByLabel("Main headline", { exact: true }).inputValue(),
      "",
    );
    await page
      .getByLabel("Main headline", { exact: true })
      .fill("My blank page is ready");
    await page
      .frameLocator("iframe")
      .getByRole("heading", { name: "My blank page is ready", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Save demo website" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Saved in the demo" })
      .waitFor();
    await page.goto(business + "/business/website");
    await page
      .getByRole("heading", { name: "Websites & landing pages", exact: true })
      .waitFor();
    assert.ok(
      await page
        .getByRole("link", { name: "View website metrics", exact: false })
        .isVisible(),
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Save changes", exact: true })
        .count(),
      0,
    );
    await page
      .getByRole("link", { name: "View website metrics", exact: false })
      .click();
    await page
      .getByText(
        "Metrics are available for published websites on a real account.",
        { exact: false },
      )
      .waitFor();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(main + "/templates");
    await page.getByRole("heading", { name: /Pick a 2026/ }).waitFor();
    assert.ok(
      await page
        .locator("article")
        .evaluateAll((a) =>
          a.every((n) => n.getBoundingClientRect().right <= innerWidth),
        ),
    );
    await page.screenshot({ path: "/tmp/jktl-2026-mobile-gallery.png" });
    for (const id of [
      "school",
      "music-label-bold",
      "med-spa-campaign",
      "blank-website",
    ]) {
      await page.goto(main + "/templates/" + id);
      await page.getByRole("button", {name:"Mobile preview",exact:true}).click();
      const mobilePreview = page.frameLocator("iframe");
      await mobilePreview.locator("#home h1").waitFor();
      assert.ok(
        await mobilePreview
          .locator("[data-layout]")
          .evaluate((n) => n.scrollWidth <= innerWidth),
        id,
      );
      await mobilePreview.getByRole("button", { name: "Menu", exact: false }).click();
      assert.ok(
        await mobilePreview
          .getByRole("link", { name: "Sign in to JKTL Business" })
          .isVisible(),
      );
    }
    assert.equal(metrics, 0, "Previews/demo must not generate live metrics");
    assert.deepEqual(errors, []);
    console.log(
      "PASS: 404 preview routes, 202 thumbnails, filters/pagination/blanks, landing-page product, robots/sitemap, selected login, rich editor + blank save, fixed editor replacement, metrics demo boundary and mobile layouts.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

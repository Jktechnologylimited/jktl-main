const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const main = process.env.MAIN_TEST_ORIGIN || "http://localhost:3001",
  business = process.env.BUSINESS_TEST_ORIGIN || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const { navigation } = await import("../data/navigation.ts");
    const { translate } = await import("../lib/languages.ts");
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      serviceWorkers: "block",
    });
    await context.addInitScript(() => {try {localStorage.setItem("jktl-pwa-remind-after", String(Date.now()+86400000));} catch {}});
    const page = await context.newPage();
    const errors = [];
    let mutations = 0;
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("request", (r) => {
      if (
        r.method() === "POST" &&
        !r.headers()["next-action"] &&
        !r.url().includes("/api/domains/request")
      )
        mutations++;
    });
    await page.route(/https:\/\/images\.(unsplash|pexels)\.com\//, (r) =>
      r.abort(),
    );
    const language = () =>
      page.getByRole("combobox", {
        name: "Language / Harshe / Asụsụ / Èdè",
        exact: true,
      });
    await page.goto(main);
    await page
      .getByRole("heading", { name: /Build your business online/ })
      .waitFor();
    assert.equal(
      await page.getByRole("heading", { name: "See what’s possible." }).count(),
      0,
    );
    const hero = page.locator("h1").locator("xpath=ancestor::section");
    assert.equal(
      await hero
        .getByRole("link", { name: "Start for free", exact: true })
        .evaluate((el) => getComputedStyle(el).backgroundColor),
      "rgb(6, 14, 42)",
    );
    await page.goto(main + "/pricing");
    await page.getByRole("heading", { name: "See what’s possible." }).waitFor();
    const foundation = await page
        .getByRole("heading", { name: /A strong foundation/ })
        .boundingBox(),
      possibility = await page
        .getByRole("heading", { name: "See what’s possible." })
        .boundingBox();
    assert.ok(possibility.y > foundation.y + foundation.height);
    await page
      .getByRole("heading", { name: "See what’s possible." })
      .scrollIntoViewIfNeeded();
    await page.screenshot({ path: "/tmp/jktl-pricing-navy-showcase.png" });
    const links = Object.values(navigation).flatMap((menu) => [
      ...menu.groups.flatMap((group) => group.items),
      ...menu.aside.items,
    ]);
    for (const item of links) {
      const result = await page.request.get(main + item.href);
      assert.equal(result.status(), 200, item.href);
      assert.ok(
        !(await result.text()).includes("This page could not be found"),
        item.href,
      );
    }
    for (const route of [
      "/products/unknown",
      "/solutions/unknown",
      "/resources/unknown",
    ])
      assert.equal((await page.request.get(main + route)).status(), 404);
    const sitemap = await (
      await page.request.get(main + "/sitemap.xml")
    ).text();
    for (const route of [
      "/products/website-builder",
      "/solutions/team-management",
      "/resources/help-centre",
    ])
      assert.ok(sitemap.includes(route));
    await page.goto(main + "/products/domains");
    await page
      .getByRole("heading", {
        name: "Your name. Your business. Your own domain.",
      })
      .waitFor();
    await page
      .getByRole("textbox", { name: "Your preferred name", exact: true })
      .fill("orbit");
    await page
      .getByRole("button", { name: "Explore domains", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Nigerian domains", exact: true })
      .click();
    const domainRow = page.locator("#domain-results article").filter({
      has: page.getByRole("heading", { name: "orbit.com.ng", exact: true }),
    });
    await domainRow
      .getByRole("button", {
        name: "Request availability & quote",
        exact: true,
      })
      .click();
    await page.locator("#domain-request input[name=name]").fill("Ada Owner");
    await page
      .locator("#domain-request input[name=email]")
      .fill("owner@example.com");
    await language().selectOption("ha");
    await page
      .getByRole("heading", {
        name: "Sunanka. Kasuwancinka. Sunan yanar gizo naka.",
      })
      .waitFor();
    assert.equal(await page.locator("html").getAttribute("lang"), "ha");
    assert.equal(
      await page.locator("#domain-request input[name=name]").inputValue(),
      "Ada Owner",
    );
    await language().selectOption("en");
    let sent;
    await page.route("**/api/domains/request", async (route) => {
      sent = route.request().postDataJSON();
      await route.fulfill({
        status: 503,
        json: { error: "Please try again." },
      });
    });
    await page
      .getByRole("button", { name: "Send domain request", exact: true })
      .click();
    await page
      .getByRole("alert")
      .filter({ hasText: "Please try again." })
      .waitFor();
    assert.equal(
      await page.locator("#domain-request input[name=email]").inputValue(),
      "owner@example.com",
    );
    assert.equal(sent.extension, ".com.ng");
    assert.equal(sent.label, "orbit");
    await page.route("**/api/domains/request", (route) =>
      route.fulfill({
        status: 201,
        json: {
          ok: true,
          status: "requested",
          domain: "orbit.com.ng",
          availability: "unconfirmed",
        },
      }),
    );
    await page
      .getByRole("button", { name: "Send domain request", exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Your domain request is saved." })
      .waitFor();
    await page.screenshot({
      path: "/tmp/jktl-domain-request.png",
      fullPage: true,
    });
    await language().selectOption("ha");
    await page.goto(business + "/signup?template=school");
    await page
      .getByRole("heading", {
        name: translate("ha", "Create your free account"),
      })
      .waitFor();
    await page.locator("#name").fill("Ada Test");
    await page.locator("#businessName").fill("Orbit Media");
    await language().selectOption("yo");
    await page
      .getByRole("heading", {
        name: translate("yo", "Create your free account"),
      })
      .waitFor();
    assert.equal(await page.locator("#name").inputValue(), "Ada Test");
    assert.equal(
      await page.locator("#businessName").inputValue(),
      "Orbit Media",
    );
    assert.equal(
      await page
        .getByRole("link", { name: translate("yo", "Log in"), exact: true })
        .first()
        .getAttribute("href"),
      "/login?template=school",
    );
    await language().selectOption("ig");
    await page
      .getByRole("heading", {
        name: translate("ig", "Create your free account"),
      })
      .waitFor();
    await language().selectOption("en");
    await page.goto(business + "/login?template=law-firm");
    await page
      .getByRole("button", { name: "Open salon demo", exact: true })
      .click();
    await page.waitForURL("**/business/website/template?template=law-firm");
    await page
      .getByRole("button", { name: "Save demo website", exact: true })
      .click();
    await page
      .getByRole("status")
      .filter({ hasText: "Saved in the demo" })
      .waitFor();
    await page
      .getByRole("link", { name: "Choose another template", exact: true })
      .click();
    await page.getByRole("searchbox").fill("School");
    await page
      .locator('a[href="/business/website/template?template=school"]')
      .click();
    await page.waitForURL("**/business/website/template?template=school");
    await page
      .getByLabel("Main headline", { exact: true })
      .fill("Orbit draft stays through an upgrade");
    await page
      .getByRole("link", {
        name: "Website plans — keep this design →",
        exact: true,
      })
      .click();
    await page.waitForURL("**/business/plans");
    await page
      .getByText("Your selected design stays with you:", { exact: false })
      .waitFor();
    const resume = page.getByRole("link", {
      name: /Continue editing your website/,
    });
    assert.ok((await resume.count()) >= 2);
    for (const href of await resume.evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute("href")),
    ))
      assert.ok(href.endsWith("template=school"), href);
    await page
      .getByRole("radio", { name: "Select Business Elite", exact: true })
      .check();
    await language().selectOption("yo");
    assert.equal(await page.locator("input[value=elite]").isChecked(), true);
    await page
      .locator('a[href="/business/website/template?template=school"]')
      .first()
      .click();
    await page.waitForURL("**/business/website/template?template=school");
    assert.equal(
      await page
        .getByLabel(translate("yo", "Main headline"), { exact: true })
        .inputValue(),
      "Orbit draft stays through an upgrade",
    );
    await page.screenshot({ path: "/tmp/jktl-upgrade-keeps-template.png" });
    await language().selectOption("ha");
    await page
      .getByRole("link", { name: translate("ha", "Home"), exact: true })
      .first()
      .click();
    await page.waitForURL("**/business");
    await page
      .getByText(/Barka da/)
      .first()
      .waitFor();
    await language().selectOption("ig");
    await page
      .getByText(translate("ig", "Today's sales"), { exact: true })
      .waitFor();
    await language().selectOption("en");
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(main);
      const signup = page
        .locator("header")
        .getByRole("link", { name: "Start for free", exact: true });
      const box = await signup.boundingBox();
      assert.ok(
        box.x >= 0 && box.x + box.width <= width,
        `Header fits ${width}`,
      );
      await language().selectOption("yo");
      assert.ok(
        await page
          .locator("body")
          .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      await page.goto(main + "/products/domains");
      assert.ok(
        await page
          .locator("body")
          .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      if (width === 390)
        await page.screenshot({
          path: "/tmp/jktl-domain-mobile-yoruba.png",
          fullPage: true,
        });
      await language().selectOption("en");
    }
    assert.deepEqual(errors, []);
    assert.equal(
      mutations,
      0,
      "No real accounts, domain orders or payments submitted",
    );
    console.log(
      "PASS: navy/gold branding; pricing showcase placement; every menu page + sitemap; manual domain request success/failure; Hausa/Igbo/Yoruba persistence and input preservation across apps; selected design + unsaved draft retained through upgrades; 390px/320px layouts.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

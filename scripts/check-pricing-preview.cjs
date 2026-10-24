// Run against production builds: Main :3001, Business localhost:3000.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const main = process.env.MAIN_TEST_ORIGIN || "http://127.0.0.1:3001";
const business = process.env.BUSINESS_TEST_ORIGIN || "http://localhost:3000";
(async () => {
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
    await page.route(/https:\/\/images\.(unsplash|pexels)\.com\//, (r) =>
      r.abort(),
    );
    for (const host of [main, business]) {
      await page.goto(host + "/pricing");
      await page
        .getByRole("heading", { name: /Find the right plan/ })
        .waitFor();
      assert.equal(
        await page
          .getByRole("button", { name: /Yearly/ })
          .getAttribute("aria-pressed"),
        "true",
      );
      assert.equal(await page.locator("article").count(), 8);
      assert.ok(
        await page
          .getByText("₦150,000 billed yearly", { exact: true })
          .isVisible(),
      );
      assert.ok(
        await page
          .getByText("Save ₦118,000 per year", { exact: true })
          .isVisible(),
      );
      await page.getByRole("button", { name: "Monthly", exact: true }).click();
      assert.ok(
        await page
          .getByText("₦15,000 billed monthly", { exact: true })
          .isVisible(),
      );
      assert.equal(
        await page
          .getByRole("link", { name: /Discuss this plan|Get started/i })
          .count(),
        0,
      );
      assert.ok(
        (await page.getByRole("link", { name: /Start for free/i }).count()) >=
          2,
      );
      await page.getByRole("button", { name: "Compare Plan Features" }).click();
      await page.getByRole("table").waitFor();
      await page.getByRole("button", { name: "Hide Plan Features" }).click();
      await page.getByRole("button", { name: /Yearly/ }).click();
      await page.evaluate(() => scrollTo(0, 0));
      if (host === main)
        await page.screenshot({
          path: "/tmp/jktl-pricing-desktop.png",
          fullPage: true,
        });
      await page.goto(host + "/templates/law-firm");
      const frame = page.frameLocator("iframe");
      await frame.locator("#home h1").waitFor();
      assert.equal(await page.locator("iframe").count(), 1);
      assert.ok(await frame.locator("body").evaluate(() => innerWidth >= 1024));
      await page
        .getByRole("button", { name: "Mobile preview", exact: true })
        .click();
      await page.waitForTimeout(150);
      assert.ok(await frame.locator("body").evaluate(() => innerWidth <= 390));
      assert.ok(await frame.getByRole("button", { name: /Menu/ }).isVisible());
      assert.ok(
        await page
          .getByRole("link", { name: "Edit template" })
          .getAttribute("href")
          .then((v) => v.includes("law-firm")),
      );
      if (host === main)
        await page.screenshot({ path: "/tmp/jktl-template-device-mobile.png" });
      await page
        .getByRole("button", { name: "Desktop preview", exact: true })
        .click();
      await page.waitForTimeout(150);
      assert.ok(await frame.locator("body").evaluate(() => innerWidth >= 1024));
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(host + "/pricing");
      await page
        .getByRole("heading", { name: /Find the right plan/ })
        .waitFor();
      assert.ok(
        await page
          .locator("body")
          .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      if (host === main)
        await page.screenshot({
          path: "/tmp/jktl-pricing-mobile.png",
          fullPage: true,
        });
      await page.goto(host + "/templates/school");
      await page
        .getByRole("button", { name: "Mobile preview", exact: true })
        .click();
      await page.frameLocator("iframe").locator("#home h1").waitFor();
      assert.ok(
        await page
          .locator("body")
          .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      );
      await page.setViewportSize({ width: 1440, height: 1000 });
      assert.equal(
        (await page.request.get(host + "/template-canvas/unknown")).status(),
        404,
      );
    }
    for (const id of [
      "domains",
      "business-email",
      "business-tools",
      "add-ons",
      "custom-websites",
    ]) {
      const r = await page.goto(main + "/products/" + id);
      assert.equal(r.status(), 200);
      assert.equal(await page.locator("h1").count(), 1);
    }
    // Save failures must not claim success or lose enquiry data.
    let body;
    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 503, json: { error: "Unavailable" } });
    });
    await page.goto(
      main + "/contact?product=website-plan&plan=growth&billing=yearly#form",
    );
    await page
      .getByRole("textbox", { name: "Full Name *", exact: true })
      .fill("Test Owner");
    await page
      .getByRole("textbox", { name: "Email Address *", exact: true })
      .fill("owner@example.com");
    await page
      .getByRole("textbox", { name: "How can we help you? *", exact: true })
      .fill("Please confirm plan availability.");
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    await page.getByRole("alert").filter({ hasText: "We couldn" }).waitFor();
    assert.equal(body.plan, "growth");
    assert.equal(body.billing, "yearly");
    assert.equal(
      await page
        .getByRole("textbox", { name: "Full Name *", exact: true })
        .inputValue(),
      "Test Owner",
    );
    await page.route("**/api/contact", (route) =>
      route.fulfill({ status: 200, json: { success: true } }),
    );
    await page
      .getByRole("button", { name: "Send Message", exact: true })
      .click();
    await page.getByText("Message received ✓", { exact: true }).waitFor();
    assert.equal(metrics, 0);
    assert.deepEqual(errors, []);
    console.log(
      "PASS: NGN yearly/monthly totals, savings, comparison, product routes, desktop/mobile frame widths, mobile overflow, selected enquiry success/failure, no preview metrics or browser errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

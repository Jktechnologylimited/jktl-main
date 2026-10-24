const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const main = process.env.MAIN_TEST_ORIGIN || "http://127.0.0.1:3001",
  business = process.env.BUSINESS_TEST_ORIGIN || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1100 },
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.route(/https:\/\/images\.(unsplash|pexels)\.com\//, (r) =>
      r.abort(),
    );
    await page.goto(main);
    await page
      .getByRole("heading", {
        name: "Build your business online. Grow beyond limits.",
      })
      .waitFor();
    const image = page.getByRole("img", {
      name: /A smiling African entrepreneur/,
    });
    await image.waitFor();
    await page.waitForFunction(() =>
      [...document.images]
        .filter((i) => i.alt.includes("African entrepreneur"))
        .every((i) => i.complete && i.naturalWidth > 0),
    );
    const hook = await page.locator("h1").boundingBox(),
      visual = await image.boundingBox();
    assert.ok(visual.y > hook.y + hook.height, "Hero image follows the hook");
    assert.equal(
      await page
        .getByRole("link", { name: /Get started|Discuss this plan/i })
        .count(),
      0,
    );
    assert.ok(
      (await page.getByRole("link", { name: /Start for free/i }).count()) >= 3,
    );
    assert.equal(await page.locator("#website-steps article").count(), 4);
    await page.getByRole("heading", { name: "See what’s possible." }).waitFor();
    const pause = page.getByRole("button", { name: "Pause template motion" });
    await pause.scrollIntoViewIfNeeded();
    await page.mouse.move(1, 1);
    const track = page.locator("[class*=track][style]");
    const start = await track.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(250);
    assert.notEqual(
      await track.evaluate((el) => getComputedStyle(el).transform),
      start,
    );
    await pause.click();
    await page.waitForTimeout(100);
    const still = await track.evaluate((el) => getComputedStyle(el).transform);
    await page.waitForTimeout(250);
    assert.equal(
      await track.evaluate((el) => getComputedStyle(el).transform),
      still,
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Play template motion" })
        .getAttribute("aria-pressed"),
      "true",
    );
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    await page.screenshot({
      path: "/tmp/jktl-growth-home-desktop.png",
      fullPage: true,
    });
    for (const host of [main, business]) {
      await page.goto(host + "/pricing");
      await page
        .getByRole("heading", { name: /Find the right plan/ })
        .waitFor();
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
      assert.ok(
        await page
          .getByText(
            /14-day money-back guarantee on your first paid website plan/,
          )
          .first()
          .isVisible(),
      );
      await page.getByRole("button", { name: "Monthly", exact: true }).click();
      assert.ok(
        await page
          .getByText("₦59,000 billed monthly", { exact: true })
          .isVisible(),
      );
    }
    await page.goto(main + "/terms#website-guarantee");
    await page
      .getByRole("heading", {
        name: "14-day money-back guarantee for website plans",
      })
      .waitFor();
    await page.goto(business + "/login");
    await page.getByRole("button", { name: "Open salon demo" }).click();
    await page.waitForURL("**/business");
    await page.goto(business + "/business/plans");
    await page
      .getByText("Demo mode — explore plans here.", { exact: false })
      .waitFor();
    assert.equal(await page.locator('input[name="website-plan"]').count(), 5);
    await page
      .getByRole("radio", { name: "Select Business Elite", exact: true })
      .check();
    await page.getByRole("button", { name: "Monthly", exact: true }).click();
    assert.equal(
      await page
        .getByRole("button", { name: /Continue to secure payment/ })
        .count(),
      0,
    );
    await page.screenshot({
      path: "/tmp/jktl-business-plans-demo.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(main);
    await image.waitFor();
    assert.ok(
      await page
        .locator("body")
        .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    );
    await page.screenshot({
      path: "/tmp/jktl-growth-home-mobile.png",
      fullPage: true,
    });
    await page.goto(main + "/pricing");
    assert.ok(
      await page
        .locator("body")
        .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    );
    const reduced = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1280, height: 900 },
      serviceWorkers: "block",
    });
    const rpage = await reduced.newPage();
    await rpage.route(/https:\/\/images\.(unsplash|pexels)\.com\//, (r) =>
      r.abort(),
    );
    await rpage.goto(main);
    await rpage
      .getByRole("heading", { name: "See what’s possible." })
      .waitFor();
    const rtrack = rpage.locator("[class*=track][style]");
    assert.equal(
      await rtrack.evaluate((el) => getComputedStyle(el).transform),
      "none",
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: hook-first people hero, local image, four website steps, repeated Start for free, no old CTAs, moving/pause/reduced-motion cards, monthly pricing, refund terms, safe demo plan selection, desktop/mobile layout.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

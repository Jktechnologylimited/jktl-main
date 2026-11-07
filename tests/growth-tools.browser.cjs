const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(
        (process.env.BASE_URL || "http://localhost:3196") +
          "/tools/seo-checker",
        { waitUntil: "domcontentloaded" },
      );
      assert.equal(await page.locator("h1").count(), 1);
      await page
        .getByLabel("Your public website address")
        .fill("https://jktl.com.ng/");
      await page
        .getByRole("button", { name: "Check my website free", exact: true })
        .click();
      await page
        .getByRole("heading", { name: /Your next improvements/ })
        .waitFor({ timeout: 25000 });
      assert.ok(
        (
          await page
            .getByRole("link", { name: "Create my free website", exact: false })
            .first()
            .getAttribute("href")
        ).includes("business.jktl.com.ng/signup"),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      await page.screenshot({
        path: "/tmp/jktl-seo-checker-" + width + ".png",
        fullPage: true,
      });
      await page.route("**/api/game-world-feed", (route) =>
        route.fulfill({
          json: {
            date: new Date().toISOString().slice(0, 10),
            checkedAt: new Date().toISOString(),
            coverage: ["Premier League"],
            matchesAvailable: true,
            matches: [],
            headlines: [
              {
                title: "Test news headline",
                publishedAt: new Date().toISOString(),
                volume: "500+",
                url: "https://www.bbc.com/news",
                source: "BBC News",
              },
            ],
          },
        }),
      );
      await page.route("https://business.jktl.com.ng/play/**", (route) =>
        route.fulfill({
          contentType: "text/html",
          body: "<p>Game frame test fixture</p>",
        }),
      );
      await page.goto(
        (process.env.BASE_URL || "http://localhost:3196") + "/games",
        { waitUntil: "domcontentloaded" },
      );

      const updatesToggle = page.getByRole("button", {
        name: "Matches & news",
        exact: true,
      });
      await updatesToggle.focus();
      await updatesToggle.press("Enter");
      await page
        .getByRole("link", { name: "Test news headline", exact: true })
        .waitFor();
      assert.equal(
        (await page
          .getByRole("link", { name: "Create my free website", exact: false })
          .count()) > 0,
        true,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      await page.screenshot({
        path: "/tmp/jktl-games-growth-" + width + ".png",
        fullPage: true,
      });
      await page.goto(
        (process.env.BASE_URL || "http://localhost:3196") +
          "/products/ai-receptionist",
        { waitUntil: "domcontentloaded" },
      );
      await page
        .getByRole("heading", { name: "AI receptionist is paused" })
        .waitFor();
      console.log(
        "PASS SEO URL report, free website CTA, news and paused receptionist at " +
          width +
          "px",
      );
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

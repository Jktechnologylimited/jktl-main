const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const main = process.env.MAIN_TEST_ORIGIN || "http://localhost:3001";
const business = process.env.BUSINESS_TEST_ORIGIN || "http://localhost:3000";

(async () => {
  const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] });
  try {
    const context = await browser.newContext({ serviceWorkers: "block" });
    const page = await context.newPage();
    const errors = [], fantasyRequests = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("request", (request) => {
      if (new URL(request.url()).hostname === "fantasy.jktl.com.ng") fantasyRequests.push(request.url());
    });
    await page.route("**/api/public/features", (route) => route.fulfill({ json: { features: [] } }));
    await page.route("**/api/game-world-feed", (route) => route.fulfill({ json: { date: new Date().toISOString().slice(0, 10), checkedAt: new Date().toISOString(), matches: [], headlines: [], coverage: [], matchesAvailable: false } }));
    for (const [origin, path, target] of [[main, "/games/fantasy", "/games"], [business, "/play/fantasy", "/play"]]) {
      const response = await page.request.get(origin + path, { maxRedirects: 0 });
      assert.equal(response.status(), 307);
      assert.equal(new URL(response.headers().location, origin).pathname, target);
    }
    const sitemap = await page.request.get(main + "/sitemap.xml");
    assert.equal(sitemap.status(), 200);
    assert.doesNotMatch(await sitemap.text(), /\/games\/fantasy/);
    await page.addInitScript(() => {
      localStorage.setItem("jktl-game-favourites", JSON.stringify(["fantasy", "word-hunt"]));
      localStorage.setItem("jktl-game-recent", JSON.stringify(["fantasy", "tycoon"]));
    });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(main + "/games");
      const picker = page.getByRole("combobox", { name: "Choose a game" });
      await picker.waitFor();
      assert.equal(await picker.locator("option").count(), 8);
      assert.doesNotMatch((await picker.innerText()), /fantasy/i);
      await picker.selectOption("word-hunt");
      const frame = page.frameLocator('iframe[title="Play JKTL Word Hunt"]');
      await frame.getByRole("button", { name: "Games", exact: true }).waitFor();
      await frame.getByRole("button", { name: "Games", exact: true }).click();
      const menu = frame.getByRole("navigation", { name: "Switch game" });
      assert.equal(await menu.getByRole("link", { name: /Fantasy/ }).count(), 0);
      assert.equal(await menu.getByRole("link", { name: /Word Hunt/ }).count(), 1);
      await frame.getByRole("button", { name: "Games", exact: true }).click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.goto(business + "/play?game=fantasy");
      await page.getByRole("heading", { name: "Your next little obsession." }).waitFor();
      await page.waitForFunction(() => !new URL(location.href).searchParams.has("game"));
      assert.equal(new URL(page.url()).searchParams.has("game"), false);
      assert.equal(await page.locator("iframe").count(), 0);
      assert.doesNotMatch(await page.locator("body").innerText(), /fantasy/i);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: `/tmp/jktl-games-paused-fantasy-${width}.png`, fullPage: true });
    }
    assert.deepEqual(fantasyRequests, []);
    assert.deepEqual(errors, []);
    console.log("PASS: eight available games, working Word Hunt switcher, retired-page temporary redirects, clean sitemap, old favourites/query handling, no Fantasy requests, desktop/390px/320px layouts.");
    await context.close();
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });

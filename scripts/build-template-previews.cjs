// Generate faithful preview thumbnails. Start Main locally on port 3001 first.
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");
(async () => {
  const { websiteTemplates } = await import("../lib/website-templates.ts");
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const folder = path.resolve(__dirname, "../public/template-previews");
  fs.mkdirSync(folder, { recursive: true });
  let next = 0,
    completed = 0;
  try {
    await Promise.all(
      Array.from({ length: 3 }, async () => {
        const page = await browser.newPage({
          viewport: { width: 1000, height: 800 },
          deviceScaleFactor: 1,
        });
        if (process.env.BUNDLED_ART_ONLY === "1")
          await page.route(/https:\/\/images\.(unsplash|pexels)\.com\//, (r) =>
            r.abort(),
          );
        while (next < websiteTemplates.length) {
          const template = websiteTemplates[next++];
          const result = await page.goto(
            (process.env.MAIN_TEST_ORIGIN || "http://127.0.0.1:3001") +
              "/template-canvas/" +
              template.id,
          );
          if (result.status() !== 200) throw new Error(template.id);
          await page.locator("h1").first().waitFor();
          await page.evaluate(() => document.fonts.ready);
          await page.waitForFunction(() =>
            Array.from(document.images)
              .filter((image) => {
                const rect = image.getBoundingClientRect();
                return (
                  rect.width > 0 &&
                  rect.height > 0 &&
                  rect.top < innerHeight &&
                  rect.bottom > 0
                );
              })
              .every((image) => image.complete && image.naturalWidth > 0),
          );
          const box = await page
            .locator("[data-layout], [data-legal-template]")
            .first()
            .boundingBox();
          await page.screenshot({
            path: path.join(folder, template.id + ".jpg"),
            type: "jpeg",
            quality: 68,
            clip: { x: 0, y: Math.round(box.y), width: 1000, height: 676 },
          });
          completed++;
          if (completed % 25 === 0)
            console.log(
              "Captured " + completed + "/" + websiteTemplates.length,
            );
        }
        await page.close();
      }),
    );
    console.log(
      "Generated " +
        completed +
        " actual website/landing/blank preview screenshots.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

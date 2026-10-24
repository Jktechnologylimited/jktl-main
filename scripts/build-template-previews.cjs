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
          await page.locator("#home h1").waitFor();
          await page.waitForFunction(() =>
            Array.from(document.querySelectorAll("#home img")).every(
              (i) => i.complete && i.naturalWidth > 0,
            ),
          );
          const box = await page.locator("[data-layout]").boundingBox();
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

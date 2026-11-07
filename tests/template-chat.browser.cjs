const { chromium } = require("playwright"),
  assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    for (const width of [1440, 390, 320]) {
      const page = await browser.newPage({
          viewport: { width, height: 900 },
          hasTouch: width < 600,
        }),
        errors = [],
        requests = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.addInitScript(() => {
        sessionStorage.setItem("jktl.chat.nudged", "1");
        localStorage.setItem(
          "jktl-pwa-remind-after",
          String(Date.now() + 86400000),
        );
      });
      await page.route("**/api/public/features", (r) =>
        r.fulfill({ json: { features: [] } }),
      );
      let fails = false;
      await page.route("**/api/contact", async (r) => {
        requests.push(r.request().postDataJSON());
        await r.fulfill({
          status: fails ? 503 : 200,
          json: fails
            ? { error: "test storage unavailable" }
            : { success: true, notified: true },
        });
      });
      const base = process.env.CHAT_TEST_ORIGIN || "http://localhost:3181";
      await page.goto(base + "/templates");
      await page
        .getByRole("button", { name: "Chat with President", exact: true })
        .click();
      const chat = page.getByRole("dialog", { name: "Free template help" });
      await chat
        .getByRole("button", { name: "Are the templates free?", exact: true })
        .click();
      await chat
        .getByText(/You can explore templates without an account/)
        .waitFor();
      await chat
        .getByRole("textbox", { name: "Ask about free templates" })
        .fill("Talk to a human");
      await chat.getByRole("button", { name: "Send", exact: true }).click();
      const form = chat.getByRole("form", {
        name: "Request human template support",
      });
      await form
        .getByLabel("Your name", { exact: true })
        .fill("Example Visitor");
      await form
        .getByLabel("Email address", { exact: true })
        .fill("visitor@example.test");
      await form
        .getByLabel("What do you need help with?", { exact: true })
        .fill("I need help publishing my free template.");
      fails = true;
      await form.getByRole("button", { name: "Send support request" }).click();
      await form
        .getByRole("status")
        .filter({ hasText: "could not be saved" })
        .waitFor();
      fails = false;
      await form.getByRole("button", { name: "Send support request" }).click();
      await form
        .getByRole("status")
        .filter({ hasText: "sent to the JKTL team" })
        .waitFor();
      assert.equal(requests.at(-1).page, "/templates");
      assert.ok(requests.at(-1).chat.length > 0);
      assert.equal(requests.at(-1).type, "template-support");
      assert.ok(
        (
          await chat
            .getByRole("link", { name: "WhatsApp the team" })
            .getAttribute("href")
        ).includes("wa.me/2347036580994"),
      );
      await page
        .getByRole("button", { name: "Close chat", exact: true })
        .click();
      await page.goto(base + "/templates/hair-salon");
      await page
        .getByRole("button", { name: "Chat with President", exact: true })
        .click();
      await page
        .getByRole("dialog", { name: "Free template help" })
        .getByRole("button", { name: "Request a person" })
        .click();
      const previewForm = page.getByRole("form", {
        name: "Request human template support",
      });
      await previewForm
        .getByLabel("Your name", { exact: true })
        .fill("Example Visitor");
      await previewForm
        .getByLabel("Email address", { exact: true })
        .fill("visitor@example.test");
      await previewForm
        .getByLabel("Include the last 10 chat messages for context.")
        .uncheck();
      await previewForm
        .getByRole("button", { name: "Send support request" })
        .click();
      await previewForm
        .getByRole("status")
        .filter({ hasText: "sent to the JKTL team" })
        .waitFor();
      assert.equal(requests.at(-1).page, "/templates/hair-salon");
      assert.deepEqual(requests.at(-1).chat, []);
      await page.frameLocator("iframe").locator("h1").first().waitFor();
      assert.equal(
        await page
          .frameLocator("iframe")
          .getByRole("button", { name: "Chat with President", exact: true })
          .count(),
        0,
      );
      assert.equal(
        await page
          .getByRole("button", { name: "Close chat", exact: true })
          .count(),
        1,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      await page.screenshot({ path: `/tmp/jktl-template-help-${width}.png` });
      assert.deepEqual(errors, []);
      await page.close();
      console.log(
        "PASS free-template guidance, human handoff success/failure/consent, preview context and one widget at " +
          width,
      );
    }
    const page = await browser.newPage();
    await page.route("**/api/public/features", (r) =>
      r.fulfill({ json: { features: [] } }),
    );
    await page.goto(
      (process.env.CHAT_TEST_ORIGIN || "http://localhost:3181") + "/pricing",
    );
    await page
      .getByRole("button", { name: "Chat with President", exact: true })
      .click();
    await page.getByRole("dialog", { name: "JKTL guide chat" }).waitFor();
    console.log("PASS general Main-site guide preserved outside templates");
    await page.close();
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

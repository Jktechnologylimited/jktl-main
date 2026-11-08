// Actual consent UI; all browser requests are intercepted, no live analytics writes.
const fs = require("node:fs"),
  path = require("node:path"),
  os = require("node:os"),
  assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, ".."),
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "jktl-consent-"));
const file = (n, s) => {
  const p = path.join(dir, n);
  fs.writeFileSync(p, s);
  return p;
};
const loader = file(
  "ts.cjs",
  `const ts=require(${JSON.stringify(require.resolve("typescript"))});module.exports=s=>ts.transpileModule(s,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText`,
);
const nav = file("nav.js", `export const usePathname=()=>'/templates';`);
const entry = file(
  "entry.js",
  `import React from 'react';import{createRoot}from'react-dom/client';import{JourneyAnalytics}from ${JSON.stringify(path.join(root, "components/shared/JourneyAnalytics.tsx"))};createRoot(document.getElementById('app')).render(React.createElement(JourneyAnalytics));`,
);
require("next/dist/compiled/webpack/webpack").webpack(
  {
    mode: "development",
    entry,
    output: { path: dir, filename: "bundle.js" },
    devtool: false,
    module: {
      rules: [{ test: /\.tsx?$/, exclude: /node_modules/, use: loader }],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
      modules: [path.join(root, "node_modules")],
      alias: { "next/navigation": nav },
    },
  },
  async (error, stats) => {
    if (error || stats.hasErrors()) {
      console.error(error || stats.toString({ all: false, errors: true }));
      process.exitCode = 1;
      return;
    }
    let browser;
    try {
      browser = await chromium.launch({
        executablePath: "/usr/bin/chromium",
        args: ["--no-sandbox"],
      });
      for (const width of [1440, 390, 320]) {
        const p = await browser.newPage({ viewport: { width, height: 900 } }),
          requests = [],
          errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        await p.route(
          "https://business.jktl.com.ng/api/growth/visit",
          async (route) => {
            requests.push(route.request().postDataJSON());
            await route.fulfill({
              status: 200,
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "https://jktl.com.ng",
                "Access-Control-Allow-Credentials": "true",
              },
              body: '{"ok":true}',
            });
          },
        );
        await p.route("https://jktl.com.ng/**", (route) =>
          route.fulfill({
            contentType: route.request().url().endsWith("/bundle.js")
              ? "text/javascript"
              : "text/html",
            body: route.request().url().endsWith("/bundle.js")
              ? fs.readFileSync(path.join(dir, "bundle.js"))
              : '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><main><div id="app"></div></main><script src="/bundle.js"></script>',
          }),
        );
        await p.goto("https://jktl.com.ng/templates");
        await p.getByText("Privacy & optional journey analytics").click();
        assert.equal(requests.length, 0, "no optional request before consent");
        await p.getByRole("checkbox").check();
        await p.waitForFunction(() =>
          document.cookie.includes("jktl_journey_analytics=yes"),
        );
        await p.waitForTimeout(100);
        assert.ok(
          requests.some((r) => r.consent === true && r.path === "/templates"),
        );
        await p.getByRole("checkbox").uncheck();
        await p.getByRole("status").filter({ hasText: "removed" }).waitFor();
        assert.equal(requests.at(-1).consent, false);
        await p.addInitScript(() =>
          Object.defineProperty(navigator, "doNotTrack", { get: () => "1" }),
        );
        await p.reload();
        await p.getByText("Privacy & optional journey analytics").click();
        const count = requests.length;
        await p.getByRole("checkbox").click();
        await p
          .getByRole("status")
          .filter({ hasText: "privacy preference" })
          .waitFor();
        assert.equal(requests.length, count, "Do Not Track blocks collection");
        assert.equal(await p.getByRole("checkbox").isChecked(), false);
        assert.deepEqual(errors, []);
        assert.equal(
          await p.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
        );
        await p.close();
        console.log(
          `Passed ${width}px: consent, withdrawal, privacy preference and responsive controls.`,
        );
      }
    } catch (e) {
      console.error(e);
      process.exitCode = 1;
    } finally {
      await browser?.close();
      fs.rmSync(dir, { recursive: true, force: true });
    }
  },
);

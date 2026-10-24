// Run with the main site on port 3001. Uses the cloud environment's Playwright/Chromium.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const origin = process.env.MAIN_TEST_ORIGIN || 'http://127.0.0.1:3001';
(async () => {
  const { navigation } = await import('../data/navigation.ts');
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const response = await page.goto(origin);
    assert.equal(response.status(), 200);
    await page.getByRole('button', { name: 'Product', exact: true }).waitFor();
    const signup = page.locator('header').getByRole('link', { name: 'Start for free', exact: true });
    assert.equal(await signup.getAttribute('href'), 'https://business.jktl.com.ng/signup');
    const pages = new Map();
    for (const menu of Object.values(navigation)) {
      const items = [...menu.groups.flatMap(g => g.items), ...menu.aside.items, menu.footer];
      for (const item of items) {
        if (!item.href.startsWith('/')) {
          assert.match(item.href, /^https:\/\/business\.jktl\.com\.ng\/(signup|business\/help)$/);
          continue;
        }
        const [path, anchor] = item.href.split('#');
        if (!pages.has(path)) {
          const result = await page.request.get(origin + path);
          assert.equal(result.status(), 200, `Broken navigation destination ${path}`);
          pages.set(path, await result.text());
        }
        if (anchor) assert.ok(pages.get(path).includes(`id="${anchor}"`), `Missing anchor ${item.href}`);
      }
    }
    for (const label of ['Product', 'Solutions', 'Resources']) {
      const trigger = page.getByRole('button', { name: label, exact: true });
      await trigger.click();
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
      await page.screenshot({ path: `/tmp/jktl-${label.toLowerCase()}-navigation.png` });
      await page.keyboard.press('Escape');
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
      assert.equal(await trigger.evaluate(node => node === document.activeElement), true);
    }
    const product = page.getByRole('button', { name: 'Product', exact: true });
    await product.focus();
    await page.keyboard.press('ArrowDown');
    await page.locator('#desktop-product a').first().waitFor();
    assert.equal(await page.locator('#desktop-product a').first().evaluate(node => node === document.activeElement), true);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Solutions', exact: true }).click();
    await page.getByRole('link', { name: /Know your numbers/ }).click();
    await page.waitForURL('**/how-it-works#analytics');
    assert.equal(await page.getByRole('button', { name: 'Solutions', exact: true }).getAttribute('aria-expanded'), 'false');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(origin);
    await page.getByRole('button', { name: 'Open navigation' }).waitFor();
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('button', { name: 'Product', exact: true }).click();
    assert.equal(await page.locator('#mobile-product').isVisible(), true);
    assert.ok(await page.locator('header a').evaluateAll(nodes => nodes.filter(n => n.getBoundingClientRect().width && n.getBoundingClientRect().height).every(n => n.getBoundingClientRect().right <= window.innerWidth)));
    assert.equal(await page.locator('header').evaluate(node => Math.round(node.getBoundingClientRect().top)), 0);
    await page.screenshot({ path: '/tmp/jktl-mobile-navigation.png' });
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('button', { name: 'Open navigation' }).evaluate(node => node === document.activeElement), true);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('button', { name: 'Resources', exact: true }).click();
    await page.getByRole('link', { name: /Contact the team/ }).click();
    await page.waitForURL('**/contact');
    assert.equal(await page.getByRole('button', { name: 'Open navigation' }).isVisible(), true);
    await page.setViewportSize({ width: 320, height: 740 });
    const bounds = await page.locator('header').getByRole('link', { name: 'Start for free', exact: true }).boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 320);
    assert.deepEqual(errors, []);
    console.log(`PASS: ${pages.size} existing pages and every linked section; Product/Solutions/Resources panels; free signup destination; keyboard open/Escape/focus return; desktop and mobile link dismissal; 390px/320px layouts. No requests submitted.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

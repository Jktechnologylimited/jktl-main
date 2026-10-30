const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const path = require('node:path');
(async () => {
  const origin = process.env.PREVIEW_TEST_ORIGIN || 'http://localhost:3131';
  const browser = await chromium.launch({executablePath:'/usr/bin/chromium', args:['--no-sandbox']});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const width of [1440, 390]) {
      await page.setViewportSize({width, height:900});
      for (const route of ['', '/about', '/practice-areas', '/practice-areas/parenting-arrangements', '/attorneys', '/contact']) {
        const response = await page.goto(origin + '/template-canvas/family-law' + route);
        assert.equal(response.status(), 200);
        await page.locator('[data-legal-variant="family"]').waitFor();
        assert.equal(await page.locator('h1').count(), 1);
        assert.ok(await page.locator('h1').isVisible());
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
        for (const img of await page.locator('main img').all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(img => img.decode());
          assert.ok(await img.evaluate(img => img.naturalWidth > 0));
        }
        assert.match(await page.getByLabel('Sign in to JKTL Business', {exact:true}).getAttribute('href'), /template=family-law/);
        if (route === '/contact') {
          await page.locator('input[name="name"]').fill('Preview Visitor');
          await page.locator('input[name="email"]').fill('visitor@example.test');
          await page.locator('input[name="phone"]').fill('08000000000');
          await page.locator('textarea').fill('A general enquiry');
          await page.getByRole('button', {name:/Send general enquiry/}).click();
          await page.locator('form [role="alert"]').waitFor();
          assert.match(await page.locator('form [role="alert"]').innerText(), /No enquiry was sent/);
        }
      }
    }
    await page.setViewportSize({width:1000,height:800});
    await page.goto(origin + '/template-canvas/family-law');
    await page.locator('#home img').evaluate(img => img.decode());
    await page.screenshot({path:path.join(__dirname,'../public/template-previews/family-law.jpg'), type:'jpeg',quality:80,clip:{x:0,y:0,width:1000,height:676}});
    await page.goto(origin + '/templates/family-law');
    await page.getByRole('heading', {level:1}).waitFor();
    assert.equal(await page.locator('h1').count(), 1);
    assert.match(await page.getByRole('link', {name:/Select Template/i}).getAttribute('href'), /template=family-law/);
    assert.deepEqual(errors, []);
    console.log('PASS: family-law pages, desktop/mobile, photos, preview form, sign-in and selection.');
  } finally { await browser.close(); }
})().catch(e => {console.error(e);process.exitCode=1});

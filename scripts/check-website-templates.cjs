// Run with Main on 3001 and Business on 3000. No live account or external writes are used.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const main=process.env.MAIN_TEST_ORIGIN||'http://127.0.0.1:3001';
const business=process.env.BUSINESS_TEST_ORIGIN||'http://localhost:3000';
(async()=>{
 const {websiteTemplates}=await import('../lib/website-templates.ts');
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try{
  const context=await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route('https://images.pexels.com/**',r=>r.abort());
  assert.equal((await page.goto(main+'/templates')).status(),200);await page.getByRole('heading',{name:/Pick the website template/}).waitFor();
  assert.equal(await page.locator('article').count(),20);
  for(const template of websiteTemplates){
   const card=page.locator('article').filter({has:page.getByRole('heading',{name:template.name,exact:true})});assert.equal(await card.count(),1);
   assert.equal(await card.getByRole('link',{name:'Edit',exact:false}).getAttribute('href'),`https://business.jktl.com.ng/login?template=${template.id}`);
   const thumbnail=await page.request.get(`${main}/template-previews/${template.id}.jpg`);assert.equal(thumbnail.status(),200);
   for(const host of [main,business]){const response=await page.request.get(`${host}/templates/${template.id}`);assert.equal(response.status(),200);const html=await response.text();for(const id of ['home','about','offerings','gallery','approach','questions','contact'])assert.ok(html.includes(`id="${id}"`),`${template.id}: missing ${id}`);}
  }
  assert.equal((await page.request.get(main+'/templates/not-a-template')).status(),404);
  await page.getByRole('searchbox',{name:'Search website templates'}).fill('law');assert.equal(await page.locator('article').count(),1);
  await page.getByRole('searchbox',{name:'Search website templates'}).fill('');await page.getByRole('combobox',{name:'Filter templates by industry'}).selectOption('Faith & Community');assert.equal(await page.locator('article').count(),2);
  await page.getByRole('button',{name:'All templates',exact:true}).click();await page.screenshot({path:'/tmp/jktl-template-gallery.png'});
  const law=page.locator('article').filter({has:page.getByRole('heading',{name:'Law Firm',exact:true})});await law.getByRole('link',{name:'View',exact:true}).click();await page.waitForURL('**/templates/law-firm');assert.equal(await page.getByRole('navigation',{name:'Main navigation'}).count(),0);await page.locator('#home h1').waitFor();await page.waitForFunction(()=>Array.from(document.querySelectorAll('#home img')).every(i=>i.complete&&i.naturalWidth>0));await page.screenshot({path:'/tmp/jktl-law-template-preview.png'});
  assert.equal(await page.getByRole('link',{name:'Edit template',exact:false}).getAttribute('href'),'https://business.jktl.com.ng/login?template=law-firm');
  await page.goto(business+'/login?template=school');await page.getByText('Your selected template is ready.',{exact:false}).waitFor();assert.equal(await page.getByRole('link',{name:'Create account'}).getAttribute('href'),'/signup?template=school');await page.getByRole('link',{name:'Create account'}).click();await page.waitForURL('**/signup?template=school');assert.ok(await page.getByText('Selected template: School & Academy.',{exact:false}).isVisible());assert.equal(await page.getByRole('link',{name:'Sign in',exact:true}).getAttribute('href'),'/login?template=school');
  await page.goto(business+'/business/website/template?template=music-label');await page.waitForURL('**/login?template=music-label');
  await page.getByRole('button',{name:'Open salon demo'}).click();await page.waitForURL('**/business/website/template?template=music-label');await page.getByRole('heading',{name:'Music Label & Artist · Website editor'}).waitFor();
  await page.getByLabel('Main headline',{exact:true}).fill('A sound of our own');const canvas=page.frameLocator('iframe[title="Your website live preview"]');await canvas.getByRole('heading',{name:'A sound of our own',exact:true}).waitFor();await page.getByRole('button',{name:'Save demo website'}).click();await page.getByRole('status').filter({hasText:'Saved in the demo'}).waitFor();
  await page.goto(business+'/business/templates');await page.getByRole('heading',{name:/Pick the website template/}).waitFor();assert.equal(await page.locator('article').count(),20);
  for(const id of ['law-firm','church','school','music-label','med-spa']){await page.goto(`${business}/business/website/template?template=${id}`);await page.getByRole('heading',{name:`${websiteTemplates.find(t=>t.id===id).name} · Website editor`}).waitFor();const headline=await page.getByLabel('Main headline',{exact:true}).inputValue();assert.equal(headline,websiteTemplates.find(t=>t.id===id).document.headline);}
  await page.screenshot({path:'/tmp/jktl-template-business-editor.png'});
  await page.setViewportSize({width:390,height:844});await page.goto(main+'/templates');await page.getByRole('heading',{name:/Pick the website template/}).waitFor();assert.ok(await page.locator('article').evaluateAll(a=>a.every(n=>n.getBoundingClientRect().right<=window.innerWidth)));await page.screenshot({path:'/tmp/jktl-template-gallery-mobile.png'});
  for(const id of ['law-firm','church','school','music-label','med-spa']){await page.goto(main+'/templates/'+id);await page.locator('#home h1').waitFor();assert.ok(await page.locator('[data-layout]').evaluate(n=>n.scrollWidth<=window.innerWidth),`Mobile overflow: ${id}`);await page.getByRole('button',{name:'Menu',exact:false}).click();assert.ok(await page.getByRole('link',{name:'Questions',exact:true}).isVisible());}
  assert.deepEqual(errors,[]);console.log('PASS: 20 Main and 20 Business live previews, 20 thumbnails, gallery filters, View/Edit destinations, sign-in/signup/anonymous redirect selection, Business gallery, demo editor save + iframe live updates, five required industry editors, five mobile layouts and no browser errors. No real account, booking, email or production website was changed.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});

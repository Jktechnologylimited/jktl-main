// Start JKTL Main on port 3001 before running. Uses the cloud's Playwright/Chromium.
const { chromium }=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const {websiteTemplates}=await import('../lib/website-templates.ts');
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const folder=path.resolve(__dirname,'../public/template-previews');fs.mkdirSync(folder,{recursive:true});
 try{
  const page=await browser.newPage({viewport:{width:1000,height:800},deviceScaleFactor:1});
  if(process.env.BUNDLED_ART_ONLY==='1')await page.route('https://images.pexels.com/**',route=>route.abort());
  for(const template of websiteTemplates){
   const response=await page.goto((process.env.MAIN_TEST_ORIGIN||'http://127.0.0.1:3001')+`/templates/${template.id}`);
   if(response.status()!==200)throw new Error(`Preview failed: ${template.id}`);
   await page.locator('#home h1').waitFor();await page.waitForFunction(()=>Array.from(document.querySelectorAll('#home img')).every(img=>img.complete&&img.naturalWidth>0));
   const box=await page.locator('[data-layout]').boundingBox();
   await page.screenshot({path:path.join(folder,`${template.id}.jpg`),type:'jpeg',quality:76,clip:{x:0,y:Math.round(box.y),width:1000,height:676}});
  }
  console.log(`Generated ${websiteTemplates.length} screenshots of actual template previews${process.env.BUNDLED_ART_ONLY==='1'?' using bundled fallback artwork':''}.`);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});

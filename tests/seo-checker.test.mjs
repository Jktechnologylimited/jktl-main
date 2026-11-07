import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { EventEmitter } from "node:events";
import ts from "typescript";
import { analyzePage } from "../lib/seo-tool/analyze.ts";
import { publicIpv4, publicPageUrl } from "../lib/seo-tool/fetch-page.ts";
const require = createRequire(import.meta.url);
const html = `<html><head><title>Example Business in Nigeria</title><meta name="description" content="${"Useful business information. ".repeat(5)}"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="canonical" href="https://example.com/"><script type="application/ld+json">{"@type":"LocalBusiness"}</script></head><body><h1>Our business services</h1><p>${"Helpful business information ".repeat(65)}</p><img src="photo.jpg" alt="Our team"><script>const fake="<h1>not content</h1>";</script></body></html>`;
test("SEO report checks real HTML signals and makes no ranking guarantees", () => {
  const report = analyzePage(html, "https://example.com/");
  assert.equal(report.score, 100);
  assert.equal(report.checks.find((c) => c.id === "h1").passed, true);
  assert.equal(report.checks.find((c) => c.id === "schema").passed, true);
  assert.equal(
    analyzePage(html, "https://example.com/", 200, "noindex").checks.find(
      (c) => c.id === "indexing",
    ).passed,
    false,
  );
  assert.equal(
    analyzePage(
      html.replace("</body>", "<h1>Duplicate</h1></body>"),
      "https://example.com/",
    ).checks.find((c) => c.id === "h1").passed,
    false,
  );
  assert.equal(
    analyzePage(html, "https://example.com/", 0).checks.find(
      (c) => c.id === "status",
    ).passed,
    false,
  );
  for (const ip of [
    "127.0.0.1",
    "10.0.0.1",
    "169.254.169.254",
    "172.16.1.1",
    "192.168.1.1",
    "100.64.0.1",
    "0.0.0.0",
    "224.0.0.1",
    "198.18.0.1",
  ])
    assert.equal(publicIpv4(ip), false, ip);
  assert.equal(publicIpv4("93.184.216.34"), true);
  for (const url of [
    "http://example.com",
    "https://127.0.0.1",
    "https://2130706433",
    "https://user:pass@example.com",
    "https://example.com:8443",
    "https://host.local",
    "file:///etc/passwd",
  ])
    assert.throws(() => publicPageUrl(url), url);
});
function load(deps) {
  const m = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    ts.transpileModule(readFileSync("lib/seo-tool/fetch-page.ts", "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
  )((n) => (n in deps ? deps[n] : require(n)), m, m.exports);
  return m.exports;
}
test("public fetch pins DNS, rejects private destinations and revalidates redirects before connecting", async () => {
  let calls = 0;
  let addresses = [{ address: "93.184.216.34", family: 4 }];
  let location = "";
  const api = load({
    "node:dns/promises": { lookup: async () => addresses },
    "node:https": {
      request: (url, options, callback) => {
        calls++;
        options.lookup(url.hostname, {}, (error, address, family) => {
          assert.equal(address, "93.184.216.34");
          assert.equal(family, 4);
        });
        const req = new EventEmitter();
        req.end = () => {
          const res = new EventEmitter();
          res.statusCode = location ? 302 : 200;
          res.headers = {
            "content-type": "text/html",
            ...(location ? { location } : {}),
          };
          res.resume = () => {};
          callback(res);
          queueMicrotask(() => {
            res.emit("data", Buffer.from(html));
            res.emit("end");
          });
        };
        return req;
      },
    },
  });
  assert.equal((await api.fetchPublicPage("https://example.com")).status, 200);
  assert.equal(calls, 1);
  addresses = [{ address: "127.0.0.1", family: 4 }];
  await assert.rejects(
    () => api.fetchPublicPage("https://example.com"),
    /public IPv4/,
  );
  assert.equal(calls, 1);
  addresses = [
    { address: "93.184.216.34", family: 4 },
    { address: "10.0.0.1", family: 4 },
  ];
  await assert.rejects(
    () => api.fetchPublicPage("https://example.com"),
    /public IPv4/,
  );
  assert.equal(calls, 1);
  addresses = [{ address: "93.184.216.34", family: 4 }];
  location = "https://127.0.0.1/private";
  await assert.rejects(
    () => api.fetchPublicPage("https://example.com"),
    /public HTTPS/,
  );
  assert.equal(calls, 2);
  location = "https://example.com/loop";
  await assert.rejects(
    () => api.fetchPublicPage("https://example.com"),
    /Too many redirects/,
  );
  assert.equal(calls, 6);
});
test('SEO API bounds requests, rejects foreign origins and throttles repeated checks',async()=>{
 const m={exports:{}};new Function('require','module','exports',ts.transpileModule(readFileSync('app/api/seo-check/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(n=>n==='@/lib/seo-tool/analyze'?{analyzePage}:n==='@/lib/seo-tool/fetch-page'?{publicPageUrl,fetchPublicPage:async()=>({html,url:'https://example.com/',status:200,xRobots:''})}:require(n),m,m.exports);
 const req=(body,ip='test-user',origin='https://jktl.com.ng')=>new Request('https://jktl.com.ng/api/seo-check',{method:'POST',headers:{'content-type':'application/json','x-forwarded-for':ip,origin},body});
 assert.equal((await m.exports.POST(req(JSON.stringify({url:'https://example.com'}),'foreign','https://evil.example'))).status,403);
 assert.equal((await m.exports.POST(req('x'.repeat(4097),'large'))).status,413);
 const good=JSON.stringify({url:'https://example.com'});for(let i=0;i<5;i++)assert.equal((await m.exports.POST(req(good))).status,200);
 assert.equal((await m.exports.POST(req(good))).status,429);
 assert.equal((await m.exports.POST(req(JSON.stringify({url:'http://localhost'}),'bad'))).status,422);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
const require = createRequire(import.meta.url);
function load(file, deps = {}) {
  const mod = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
  )((n) => (n in deps ? deps[n] : require(n)), mod, mod.exports);
  return mod.exports;
}
const route = load("../app/api/domains/search/route.ts", {
  "next/server": { NextResponse: { json: (b, o) => Response.json(b, o) } },
});
const request = (data, origin = "https://jktl.com.ng") =>
  new Request("https://jktl.com.ng/api/domains/search", {
    method: "POST",
    headers: {
      origin,
      "Content-Type": "application/json",
      "x-forwarded-for": "192.0.2.15",
    },
    body: JSON.stringify(data),
  });
const result = {
  domain: "mybrand.com.ng",
  extension: ".com.ng",
  status: "AVAILABLE",
  registrationKobo: 500000,
  renewalKobo: 650000,
  currency: "NGN",
  periodYears: 1,
};
test("Main proxies public searches exclusively to Business, strips private fields and handles unavailable results safely", async () => {
  const original = globalThis.fetch;
  try {
    let calls = 0;
    globalThis.fetch = async (url, o) => {
      calls++;
      assert.equal(new URL(url).hostname, "business.jktl.com.ng");
      assert.equal(new URL(url).pathname, "/api/public/domain-search");
      assert.equal(o.cache, "no-store");
      assert.equal(o.headers.Authorization, undefined);
      assert.deepEqual(JSON.parse(o.body), {
        name: "mybrand",
        extension: ".com.ng",
      });
      return Response.json({
        results: [
          {
            ...result,
            supplierCost: 300000,
            apiKey: "not-public",
            organization_id: "private",
          },
        ],
        purchasesEnabled: false,
      });
    };
    let r = await route.POST(
      request({ name: "mybrand", extension: ".com.ng" }),
    );
    assert.equal(r.status, 200);
    const data = await r.json();
    assert.equal(data.results[0].domain, "mybrand.com.ng");
    assert.doesNotMatch(
      JSON.stringify(data),
      /supplierCost|not-public|organization_id/,
    );
    assert.equal(r.headers.get("cache-control"), "no-store");
    assert.equal(
      (await route.POST(request({ name: "mybrand" }, "https://evil.test")))
        .status,
      403,
    );
    assert.equal(calls, 1);
    globalThis.fetch = async () => new Response("{}", { status: 429 });
    assert.equal((await route.POST(request({ name: "mybrand" }))).status, 429);
    globalThis.fetch = async () => {
      throw Error("secret provider error");
    };
    r = await route.POST(request({ name: "mybrand" }));
    assert.equal(r.status, 503);
    assert.doesNotMatch(JSON.stringify(await r.json()), /secret/);
    for (const status of ["UNAVAILABLE", "UNKNOWN"]) {
      globalThis.fetch = async () =>
        Response.json({ results: [{ ...result, status }] });
      r = await route.POST(request({ name: "mybrand" }));
      assert.equal((await r.json()).results[0].status, status);
    }
  } finally {
    globalThis.fetch = original;
  }
});
test("Main prices come from current Business configuration, including newly enabled extensions, without an environment price fallback", async () => {
  const original = globalThis.fetch;
  try {
    const catalogue = load("../lib/domain-catalogue.ts");
    let price = 500000;
    globalThis.fetch = async (url, o) => {
      assert.equal(new URL(url).pathname, "/api/public/domain-prices");
      assert.equal(o.cache, "no-store");
      return Response.json({
        prices: [
          {
            extension: ".com.ng",
            registration_price: price,
            renewal_price: 650000,
            currency: "NGN",
          },
          {
            extension: ".xyz",
            registration_price: 700000,
            renewal_price: 800000,
            currency: "NGN",
          },
          {
            extension: "bad/extension",
            registration_price: 5,
            renewal_price: 5,
            currency: "NGN",
          },
        ],
      });
    };
    assert.deepEqual(await catalogue.getLiveRetailDomainPrices(), {
      ".com.ng": {
        registrationKobo: 500000,
        renewalKobo: 650000,
        currency: "NGN",
      },
      ".xyz": {
        registrationKobo: 700000,
        renewalKobo: 800000,
        currency: "NGN",
      },
    });
    price = 550000;
    assert.equal(
      (await catalogue.getLiveRetailDomainPrices())[".com.ng"].registrationKobo,
      550000,
    );
    globalThis.fetch = async () => {
      throw Error("offline");
    };
    assert.deepEqual(await catalogue.getLiveRetailDomainPrices(), {});
  } finally {
    globalThis.fetch = original;
  }
});

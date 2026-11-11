import test from "node:test";
import assert from "node:assert/strict";
import { publicLookup } from "../lib/performance/public-lookup.mjs";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { unstable_doesMiddlewareMatch } from "next/experimental/testing/server.js";
test("proxy skips assets and static SEO files but retains navigation redirects", () => {
  const source = readFileSync(new URL("../proxy.ts", import.meta.url), "utf8");
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(
      source.slice(source.lastIndexOf("export const config")),
      {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
      },
    ).outputText,
    { exports },
  );
  const matches = (url) =>
    unstable_doesMiddlewareMatch({
      config: exports.config,
      nextConfig: {},
      url,
    });
  for (const url of [
    "/logo.png",
    "/fonts/body.woff2",
    "/video.mp4",
    "/robots.txt",
    "/sitemap.xml",
    "/api/reviews",
  ])
    assert.equal(matches(url), false, url);
  for (const url of [
    "/",
    "/pricing",
    "/services/web-development",
    "/affiliate/login",
    "/blog/a-public-story",
  ])
    assert.equal(matches(url), true, url);
});
test("public redirect lookups coalesce concurrent misses, including negative results, and expire", async () => {
  let now = 0,
    calls = 0,
    resolve;
  const lookup = publicLookup(
    async (key) => {
      calls++;
      if (key === "wait" && calls === 1)
        return new Promise((r) => (resolve = r));
      return [];
    },
    { ttl: 30, max: 2, now: () => now },
  );
  const a = lookup("wait"),
    b = lookup("wait");
  await Promise.resolve();
  assert.equal(calls, 1);
  resolve([]);
  await Promise.all([a, b]);
  await lookup("missing");
  await lookup("missing");
  assert.equal(calls, 2);
  now = 31;
  await lookup("missing");
  assert.equal(calls, 3);
  await lookup("third");
  await lookup("wait");
  await Promise.resolve();
  assert.equal(calls, 5);
  resolve([]);
});
test("a database failure is never stored as a negative redirect", async () => {
  let calls = 0;
  const lookup = publicLookup(async () => {
    calls++;
    if (calls === 1) throw Error("db unavailable");
    return [];
  });
  await assert.rejects(lookup("/old"));
  await lookup("/old");
  assert.equal(calls, 2);
});

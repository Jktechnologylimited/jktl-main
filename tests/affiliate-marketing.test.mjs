import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
const require = createRequire(import.meta.url);
function load(file, deps = {}) {
  const fixture = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
  )((n) => (n in deps ? deps[n] : require(n)), fixture, fixture.exports);
  return fixture.exports;
}
const offers = load("../lib/affiliate-offers.ts");
const page = load("../app/affiliates/page.tsx", {
  "@/lib/affiliate-offers": offers,
  "@/components/shared/PeopleStory":{PeopleStory:()=>null},
  "@/components/shared/Reveal": {
    Reveal: ({ children, ...props }) =>
      React.createElement("div", props, children),
  },
  "next/link": {
    __esModule: true,
    default: ({ href, children, ...props }) =>
      React.createElement("a", { href, ...props }, children),
  },
  "next/image": {
    __esModule: true,
    default: (props) => React.createElement("img", props),
  },
  "./page.module.css": {
    __esModule: true,
    default: new Proxy({}, { get: (_, p) => String(p) }),
  },
});
const html = renderToStaticMarkup(React.createElement(page.default));
test("public Affiliate page presents proposal status separately from accepted agreements and does not promise legacy earnings", () => {
  assert.equal(offers.AFFILIATE_PROGRAM.proposedPolicy.status, "DRAFT");
  assert.match(html, /PROPOSED POLICY · AWAITING APPROVAL/);
  assert.match(html, /15%/);
  assert.match(html, /12 paid subscription months/);
  assert.match(html, /not an automatically active offer/);
  assert.match(
    html,
    /Existing Affiliates keep their applicable accepted terms/,
  );
  assert.match(html, /₦50,000/);
  assert.match(html, /28th/);
  assert.match(html, /These defaults do not replace your accepted terms/);
  assert.doesNotMatch(
    html,
    /102,000|20,000|40,000|3,500|no cap, no cutoff|Every click on your referral link is tracked|Get approved in 24/,
  );
  for (const section of [
    "Overview",
    "Referrals &amp; Earnings",
    "Marketing Materials",
    "Support",
    "Settings",
  ])
    assert.ok(html.includes(section));
  assert.equal(
    page.metadata.alternates.canonical,
    "https://jktl.com.ng/affiliates",
  );
  const faq = JSON.parse(
    html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
  );
  assert.equal(faq["@type"], "FAQPage");
  assert.equal(faq.mainEntity.length, offers.AFFILIATE_FAQS.length);
});
test("application and account links keep Business programme intent; existing programme sign-in remains explicit", () => {
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) =>
    m[1].replaceAll("&amp;", "&"),
  );
  assert.ok(
    links.includes(
      "https://business.jktl.com.ng/login?next=programs&program=affiliate",
    ),
  );
  assert.ok(
    links.includes("https://business.jktl.com.ng/login?next=distribution"),
  );
  assert.ok(links.includes("https://business.jktl.com.ng/affiliates/login"));
  for (const path of [
    "/templates",
    "/products/domains",
    "/products/business-email",
    "/products/custom-websites",
    "/partners",
  ])
    assert.ok(links.includes(path));
  for (const file of [
    "../app/page.tsx",
    "../components/shared/BizChat.tsx",
    "../data/index.ts",
  ])
    assert.doesNotMatch(
      readFileSync(new URL(file, import.meta.url), "utf8"),
      /affiliateTerms|102,000|102000/,
    );
  const proxy = readFileSync(new URL("../proxy.ts", import.meta.url), "utf8");
  assert.ok(proxy.includes('if (pathname === "/affiliates") return null'));
});
test("Affiliate guide answers explain current approval and payout boundaries instead of the old fixed bonus offer", () => {
  const knowledge = load("../lib/support-knowledge.ts");
  const reply = knowledge.guideReply("How much can I earn as an affiliate?");
  assert.equal(reply.guides[0].id, "affiliates");
  assert.match(reply.reply, /draft awaiting formal approval/);
  assert.match(reply.reply, /₦50,000/);
  assert.match(reply.reply, /28th/);
  assert.doesNotMatch(reply.reply, /102,000|no cutoff/);
});

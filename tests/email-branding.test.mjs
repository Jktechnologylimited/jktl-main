import test from "node:test";
import assert from "node:assert/strict";
import ts from "typescript";
import { readFileSync } from "node:fs";
import * as layout from "../lib/mail-layout.ts";
function load(file, deps) {
  const m = { exports: {} };
  new Function(
    "require",
    "module",
    "exports",
    ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
  )(
    (n) => {
      if (!(n in deps)) throw Error(n);
      return deps[n];
    },
    m,
    m.exports,
  );
  return m.exports;
}
test("Main keeps its existing sender and recipients while using public company branding and a plain-text action", async () => {
  const oldFetch = globalThis.fetch,
    oldKey = process.env.RESEND_API_KEY;
  const requests = [];
  process.env.RESEND_API_KEY = "mock-only";
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    if (String(url).includes("/api/public/email-branding"))
      return Response.json({
        branding: { companyName: "JKTL configured company" },
      });
    return Response.json({ id: "mock-delivery" });
  };
  try {
    const branding = load("../lib/mail-branding.ts", {
      "./mail-layout": layout,
    });
    const mail = load("../lib/mail.ts", { "./mail-branding": branding });
    await mail.sendMainMail({
      from: "JKTL Existing Sender <noreply@example.test>",
      to: ["owner@example.test"],
      subject: "Service update",
      html: '<p>Actual service update.</p><p><a href="https://jktl.com.ng/contact?source=mail&amp;flow=help">Contact support</a></p>',
      category: "internal",
      key: "existing-event-reference",
    });
    assert.equal(requests.length, 2);
    assert.equal(
      requests[0].url,
      "https://business.jktl.com.ng/api/public/email-branding",
    );
    assert.equal(requests[0].options.body, undefined);
    const p = JSON.parse(requests[1].options.body);
    assert.equal(p.from, "JKTL Existing Sender <noreply@example.test>");
    assert.deepEqual(p.to, ["owner@example.test"]);
    assert.equal(
      requests[1].options.headers["Idempotency-Key"],
      "existing-event-reference",
    );
    assert.ok(p.html.includes("JKTL configured company"));
    assert.ok(p.html.includes('alt="JKTL logo"'));
    assert.ok(
      p.text.includes("https://jktl.com.ng/contact?source=mail&flow=help"),
    );
    assert.ok(!p.html.includes("More ways to grow"));
    const source = readFileSync(
      new URL(
        "../app/api/onboarding/paystack-webhook/route.ts",
        import.meta.url,
      ),
      "utf8",
    );
    assert.ok(!source.includes("process.env.ADMIN_PASSWORD"));
    assert.ok(!source.includes("${provision?.tempPassword}"));
    assert.ok(!source.includes("Temporary password:"));
  } finally {
    globalThis.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
  }
});

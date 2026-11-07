import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const m = { exports: {} };
new Function(
  "require",
  "module",
  "exports",
  ts.transpileModule(readFileSync("lib/mail.ts", "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText,
)(
  () => ({
    brandConnectedEmail: async (subject, html, text) => ({ html, text }),
  }),
  m,
  m.exports,
);
test("Main sends use the JKTL mail domain, real Reply-To and existing provider payload", async () => {
  const previous = {
    key: process.env.RESEND_API_KEY,
    from: process.env.RESEND_FROM_EMAIL,
    fetch: global.fetch,
  };
  const captured = [];
  try {
    process.env.RESEND_API_KEY = "TEST-FIXTURE-NOT-A-KEY";
    process.env.RESEND_FROM_EMAIL = "JKTL System <noreply@mail.ibiz.name.ng>";
    global.fetch = async (url, options) => {
      captured.push({ url, options, body: JSON.parse(options.body) });
      return new Response("{}", { status: 200 });
    };
    await m.exports.sendMainMail({
      to: ["fixture@example.test"],
      subject: "Test",
      html: '<p>Test <a href="https://jktl.com.ng">link</a></p>',
      key: "fixture-only",
    });
    assert.equal(
      captured[0].body.from,
      "JKTL Business <notifications@mail.jktl.com.ng>",
    );
    assert.equal(captured[0].body.reply_to, "info@jktl.com.ng");
    assert.equal(
      captured[0].options.headers["Idempotency-Key"],
      "fixture-only",
    );
    assert.match(captured[0].body.text, /https:\/\/jktl.com.ng/);
    process.env.RESEND_FROM_EMAIL = "John <jktl-business@mail.jktl.com.ng>";
    assert.equal(
      m.exports.mainMailSender(),
      "JKTL Business <notifications@mail.jktl.com.ng>",
    );
    delete process.env.RESEND_FROM_EMAIL;
    assert.equal(
      m.exports.mainMailSender(),
      "JKTL Business <notifications@mail.jktl.com.ng>",
    );
    delete process.env.RESEND_API_KEY;
    await m.exports.sendMainMail({
      to: ["fixture@example.test"],
      subject: "Test",
      html: "Test",
    });
    assert.equal(captured.length, 1);
  } finally {
    global.fetch = previous.fetch;
    if (previous.key === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous.key;
    if (previous.from === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = previous.from;
  }
});

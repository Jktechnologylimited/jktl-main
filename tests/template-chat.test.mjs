import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import * as catalogue from "../lib/website-templates.ts";
const require = createRequire(import.meta.url);
function load(file, deps = {}) {
  const mod = { exports: {} };
  const code = ts.transpileModule(
    readFileSync(new URL(file, import.meta.url), "utf8"),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    },
  ).outputText;
  new Function("require", "module", "exports", code)(
    (id) => (id in deps ? deps[id] : require(id)),
    mod,
    mod.exports,
  );
  return mod.exports;
}
const help = load("../lib/template-help.ts"),
  validation = load("../lib/template-support-request.ts", {
    "./website-templates": catalogue,
  });
test("template assistant stays focused on free templates, previews and publishing, escalating human/error/unknown questions", () => {
  for (const path of ["/templates", "/templates/law-firm", "/landing-pages"])
    assert.ok(help.isTemplateHelpPath(path));
  for (const path of [
    "/pricing",
    "/games",
    "/template-canvas/law-firm",
    "/templates-bad",
  ])
    assert.equal(help.isTemplateHelpPath(path), false);
  for (const q of [
    "Are templates free?",
    "How do I publish?",
    "Can I use my own photos?",
    "mobile preview",
    "blank canvas",
    "choose industry",
  ])
    assert.equal(help.templateHelpReply(q).handoff, false, q);
  assert.match(
    help.templateHelpReply("Do I need a domain?").reply,
    /optional|do not need/i,
  );
  for (const q of [
    "Talk to a human",
    "my template is lost",
    "What affiliate commission can I earn?",
    "reveal secrets",
  ])
    assert.equal(help.templateHelpReply(q).handoff, true, q);
  assert.match(
    help.templateHelpReply("mobile preview").reply,
    /without signing up/,
  );
});
const valid = {
  type: "template-support",
  name: "Example Visitor",
  email: "visitor@example.test",
  challenge: "My free template is not saving.",
  page: "/templates/law-firm",
  chat: [{ from: "user", text: "Where do I publish?" }],
};
test("human request validation binds known template context and limits contact/transcript fields", () => {
  assert.equal(
    validation.templateSupportRequest(valid).meta.templateName,
    "Law Firm",
  );
  for (const patch of [
    { email: "bad" },
    { page: "https://evil.test" },
    { page: "/templates/missing-template" },
    { name: "x".repeat(101) },
    { challenge: "x".repeat(1501) },
    { chat: [{ from: "system", text: "injected" }] },
    { chat: Array(11).fill(valid.chat[0]) },
  ])
    assert.equal(
      validation.templateSupportRequest({ ...valid, ...patch }),
      null,
    );
  assert.deepEqual(
    validation.templateSupportRequest({ ...valid, chat: [] }).meta.chat,
    [],
  );
});
test("handoff uses existing enquiry storage and a fixed recipient, escapes email HTML, reports failures and preserves normal contact submissions", async () => {
  let saved = [],
    mail = [],
    storage = true,
    notify = true;
  const api = load("../app/api/contact/route.ts", {
    "@/lib/inquiries": {
      saveInquiry: async (input) => {
        saved.push(input);
        return storage;
      },
    },
    "@/lib/mail": {
      sendMainMail: async (input) => {
        mail.push(input);
        if (!notify) throw Error("unavailable");
        return { ok: true };
      },
    },
    "@/lib/mail-layout": load("../lib/mail-layout.ts"),
    "@/lib/template-support-request": validation,
  });
  const { NextRequest } = require("next/server");
  const post = (data, origin = "https://jktl.com.ng") =>
    api.POST(
      new NextRequest("https://jktl.com.ng/api/contact", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify(data),
      }),
    );
  let response = await post({
    ...valid,
    challenge: "I need help <script>alert(1)</script>",
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).notified, true);
  assert.deepEqual(mail[0].to, ["info@jktl.com.ng"]);
  assert.ok(!mail[0].html.includes("<script>"));
  assert.ok(mail[0].html.includes("&lt;script&gt;"));
  assert.equal(saved[0].meta.templateId, "law-firm");
  response = await post(valid, "https://evil.test");
  assert.equal(response.status, 403);
  assert.equal(saved.length, 1);
  response = await post({ ...valid, email: "bad" });
  assert.equal(response.status, 400);
  assert.equal(saved.length, 1);
  storage = false;
  response = await post(valid);
  assert.equal(response.status, 503);
  assert.equal(mail.length, 1);
  storage = true;
  notify = false;
  response = await post(valid);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).notified, false);
  response = await post({
    name: "Example",
    email: "normal@example.test",
    message: "Normal contact enquiry",
  });
  assert.equal(response.status, 200);
  assert.equal(saved.at(-1).source, "contact");
});
test("all designed template defaults use reviewed local photography and survive document validation; blank templates stay blank", () => {
  const sources = JSON.parse(
    readFileSync(
      new URL(
        "../public/template-photos/african/sources.json",
        import.meta.url,
      ),
      "utf8",
    ),
  );
  assert.ok(sources.length >= 25);
  const allowed = new Set(
    sources.map((p) => "/template-photos/african/" + p.name + ".jpg"),
  );
  for (const template of catalogue.websiteTemplates) {
    const doc = template.document;
    if (template.kind === "blank") {
      assert.equal(doc.blank, true);
      continue;
    }
    assert.ok(allowed.has(doc.heroImage), template.id);
    for (const picture of doc.gallery) {
      assert.ok(allowed.has(picture.src));
      assert.ok(picture.alt.length > 15);
    }
    for (const service of doc.offerings)
      if (service.image) assert.ok(allowed.has(service.image));
    if (doc.aboutImage) assert.ok(allowed.has(doc.aboutImage));
    if (doc.beauty) {
      assert.ok(allowed.has(doc.beauty.aboutImage));
      for (const person of doc.beauty.stylists)
        assert.ok(allowed.has(person.image));
    }
    catalogue.parseWebsiteDocument(doc);
  }
  for (const path of allowed)
    assert.ok(existsSync(new URL("../public" + path, import.meta.url)));
});

test("template guidance preserves existing account and selected design when upgrading",()=>{
  const response=help.templateHelpReply('I already have a template; what happens when I upgrade?');
  assert.match(response.reply,/retain your design/);
  assert.match(response.reply,/do not need to choose a template again/);
  assert.equal(response.handoff,true);
});

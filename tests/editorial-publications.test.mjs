import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
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
const source = load("../lib/publications.ts", { react: { cache: (fn) => fn } });
const story = {
  id: "a",
  slug: "a-fresh-perspective",
  kind: "column",
  title: "A fresh perspective",
  excerpt: "Ideas and inspiration.",
  body: "A useful story.",
  author: "Ada",
  publishedAt: "2026-01-01T09:00:00Z",
  updatedAt: "2026-01-01T09:00:00Z",
  coverImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
};
test("public reader fetches separate destinations without caching and rejects drafts, future publications and cross-destination records", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(options.cache, "no-store");
      assert.equal(new URL(url).pathname, "/api/publications");
      assert.equal(new URL(url).searchParams.get("kind"), "column");
      return Response.json({
        articles: [
          story,
          { ...story, slug: "private-draft", status: "draft" },
          {
            ...story,
            slug: "scheduled-story",
            publishedAt: "2099-01-01T00:00:00Z",
          },
          { ...story, slug: "other-section", kind: "blog" },
        ],
      });
    };
    const result = await source.readPublications("column");
    assert.deepEqual(
      result.articles.map((p) => p.slug),
      [story.slug],
    );
    assert.equal(result.unavailable, false);
    assert.deepEqual(await source.readPublications("column", "../secret"), {
      articles: [],
      unavailable: false,
    });
    assert.equal(calls, 1);
    assert.equal(source.publicationPath.release, "releases");
    assert.equal(source.publicationPath.update, "updates");
  } finally {
    globalThis.fetch = original;
  }
});
test("withdrawn public stories and unavailable services have distinct results", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response("{}", { status: 404 });
    assert.deepEqual(await source.readPublications("blog", "withdrawn"), {
      articles: [],
      unavailable: false,
    });
    globalThis.fetch = async () => {
      throw Error("private connection details");
    };
    assert.deepEqual(await source.readPublications("blog"), {
      articles: [],
      unavailable: true,
    });
  } finally {
    globalThis.fetch = original;
  }
});
test("author profiles use the existing Business HTTP backend and do not expose private account fields", async () => {
  const original = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(new URL(url).pathname, "/api/editorial-authors/ada");
      assert.equal(options.cache, "no-store");
      return Response.json({
        profile: {
          slug: "ada",
          display_name: "Ada",
          bio: "A JKTL writer.",
          avatar_url: "javascript:alert(1)",
          email: "private@example.test",
          user_id: "private-id",
        },
      });
    };
    const result = await source.readAuthor("ada");
    assert.deepEqual(result, {
      profile: { slug: "ada", name: "Ada", bio: "A JKTL writer.", avatar: "" },
      unavailable: false,
    });
    assert.deepEqual(await source.readAuthor("../private"), {
      profile: null,
      unavailable: false,
    });
    assert.equal(calls, 1);
  } finally {
    globalThis.fetch = original;
  }
});

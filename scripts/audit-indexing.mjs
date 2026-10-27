/** Read-only rendered HTML audit. Never follows a redirect to another host or submits a form. */
import { writeFile } from "node:fs/promises";
import { request as httpRequest } from "node:http";
const args = process.argv.slice(2),
  option = (name, fallback) => {
    const i = args.indexOf(name);
    return i < 0 ? fallback : args[i + 1];
  };
const base = new URL(option("--base", "https://jktl.com.ng")),
  host = option("--host", base.host),
  output = option("--output", "/tmp/jktl-indexing-audit.json");
const preferred = "https://jktl.com.ng";
const decode = (s) =>
  s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
const attrs = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map((m) => [
      m[1].toLowerCase(),
      decode(m[2] ?? m[3]),
    ]),
  );
const normalize = (url) => {
  const u = new URL(url, preferred);
  return u.origin + u.pathname.replace(/\/$/, "");
};
async function get(path, customHost = host) {
  const u = new URL(path, base);
  const local = ["127.0.0.1", "localhost", "[::1]"].includes(base.hostname);
  if (local)
    return new Promise((resolve) => {
      const request = httpRequest(
        u,
        {
          headers: {
            host: customHost,
            "user-agent": "JKTL-Indexing-Audit/1.0",
          },
        },
        (response) => {
          let html = "";
          response.setEncoding("utf8");
          response.on("data", (chunk) => (html += chunk));
          response.on("end", () =>
            resolve({
              status: response.statusCode,
              location: response.headers.location || null,
              xRobots: response.headers["x-robots-tag"] || "",
              html,
            }),
          );
        },
      );
      request.setTimeout(25000, () =>
        request.destroy(new Error("Request timed out")),
      );
      request.on("error", (e) =>
        resolve({ status: 0, error: e.message, html: "" }),
      );
      request.end();
    });
  // Native fetch owns the Host header. For a live www check, request the actual www URL.
  u.host = customHost;
  try {
    const r = await fetch(u, {
      redirect: "manual",
      headers: { "user-agent": "JKTL-Indexing-Audit/1.0" },
      signal: AbortSignal.timeout(25000),
    });
    return {
      status: r.status,
      location: r.headers.get("location"),
      xRobots: r.headers.get("x-robots-tag") || "",
      html: await r.text(),
    };
  } catch (e) {
    return { status: 0, error: e.message, html: "" };
  }
}

const sm = await get("/sitemap.xml"),
  robots = await get("/robots.txt");
const urls = [
  ...new Set(
    [...sm.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1])),
  ),
];
const report = {
  base: base.origin,
  host,
  checkedAt: new Date().toISOString(),
  sitemapStatus: sm.status,
  robotsStatus: robots.status,
  sitemapUrls: urls.length,
  pages: [],
  redirects: [],
  brokenInternalLinks: [],
  issues: [],
};
if (sm.status !== 200 || !urls.length)
  report.issues.push("Sitemap is unavailable or empty.");
const links = new Set(),
  anchors = new Map();
for (const url of urls) {
  const path = new URL(url).pathname,
    r = await get(path);
  const metas = [...r.html.matchAll(/<meta\b[^>]*>/gi)].map((m) => attrs(m[0]));
  const canonicalTags = [...r.html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => attrs(m[0]))
    .filter((a) => a.rel === "canonical");
  const title = decode(r.html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description =
    metas.find((a) => a.name === "description")?.content || "";
  const canonical = canonicalTags[0]?.href || "";
  const directives =
    metas
      .filter((a) => a.name === "robots" || a.name === "googlebot")
      .map((a) => a.content)
      .join(",") + r.xRobots;
  const h1 = [...r.html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1]
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
  const issues = [];
  if (r.status !== 200) issues.push("Not HTTP 200");
  if (!title) issues.push("Missing title");
  if (!description) issues.push("Missing description");
  if (
    canonicalTags.length !== 1 ||
    !canonical ||
    normalize(canonical) !== normalize(url)
  )
    issues.push("Missing, duplicate or non-preferred canonical");
  if (/\bnoindex\b/i.test(directives)) issues.push("Noindex URL in sitemap");
  if (!h1.length) issues.push("No server-rendered H1");
  for (const tag of r.html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attrs(tag[0]).href;
    if (!href) continue;
    try {
      const u = new URL(href, url);
      if (u.origin === preferred || u.hostname === "www.jktl.com.ng") {
        if (!/^\/(?:api|_next)\//.test(u.pathname)) {
          links.add(u.pathname);
          if (u.hash) {
            if (!anchors.has(u.pathname)) anchors.set(u.pathname, new Set());
            anchors.get(u.pathname).add(u.hash.slice(1));
          }
        }
      }
    } catch {}
  }
  report.pages.push({
    url,
    status: r.status,
    title,
    description,
    canonical,
    robots: directives,
    h1,
    issues,
  });
  if (issues.length) report.issues.push({ url, issues });
}
const targets = [
  ["/services/web-development", "/products/custom-websites"],
  ["/services/software-solutions", "/products/business-tools"],
];
for (const [legacy, destination] of targets)
  for (const h of ["jktl.com.ng", "www.jktl.com.ng"]) {
    const r = await get(legacy + "?utm_source=legacy-audit&ref=seo", h);
    const expected =
      preferred + destination + "?utm_source=legacy-audit&ref=seo";
    const valid = [301, 308].includes(r.status) && r.location === expected;
    report.redirects.push({
      host: h,
      path: legacy,
      status: r.status,
      location: r.location,
      valid,
    });
    if (!valid)
      report.issues.push({
        legacy,
        host: h,
        error:
          "Legacy redirect is not permanent or lost its destination/query.",
      });
  }
const www = await get("/pricing?utm_source=www-audit", "www.jktl.com.ng");
report.redirects.push({
  host: "www.jktl.com.ng",
  path: "/pricing",
  status: www.status,
  location: www.location,
  valid:
    [301, 308].includes(www.status) &&
    www.location === preferred + "/pricing?utm_source=www-audit",
});
if (!report.redirects.at(-1).valid)
  report.issues.push({
    error: "www does not permanently normalize to apex with its query intact.",
  });
const paths = new Set(report.pages.map((p) => new URL(p.url).pathname));
for (const path of links) {
  if (paths.has(path)) continue;
  const r = await get(path);
  if (r.status >= 400 || r.status === 0)
    report.brokenInternalLinks.push({ path, status: r.status, error: r.error });
}
report.healthChecks = [];
for (const path of [
  "/__jktl_indexing_audit_missing__",
  "/authors/missing-jktl-indexing-audit-author",
]) {
  const r = await get(path);
  report.healthChecks.push({ path, status: r.status, expected: 404 });
  if (r.status !== 404)
    report.issues.push({
      path,
      error: "Missing page did not return HTTP 404.",
    });
}
const domainAlias = await get("/products/domains?utm_source=alias-audit");
report.healthChecks.push({
  path: "/products/domains",
  status: domainAlias.status,
  location: domainAlias.location,
});
if (
  ![301, 308].includes(domainAlias.status) ||
  domainAlias.location !== preferred + "/domains?utm_source=alias-audit"
)
  report.issues.push({
    path: "/products/domains",
    error: "Domain alias did not return a permanent HTTP redirect.",
  });
const release = urls.find((u) => new URL(u).pathname.startsWith("/releases/"));
if (release) {
  const target = new URL(release).pathname,
    legacy = target.replace("/releases/", "/updates/");
  if (!urls.some((u) => new URL(u).pathname === legacy)) {
    const r = await get(legacy + "?utm_source=release-audit");
    report.healthChecks.push({
      path: legacy,
      status: r.status,
      location: r.location,
    });
    if (
      ![301, 308].includes(r.status) ||
      !r.location ||
      new URL(r.location, preferred).toString() !==
        preferred + target + "?utm_source=release-audit"
    )
      report.issues.push({
        path: legacy,
        error: "Legacy release URL did not return a permanent HTTP redirect.",
      });
  }
}
const duplicates = new Map();
for (const p of report.pages) {
  const existing = duplicates.get(p.title);
  if (existing)
    report.issues.push({
      error: "Duplicate title",
      urls: [existing, p.url],
      title: p.title,
    });
  else duplicates.set(p.title, p.url);
}
if (report.brokenInternalLinks.length)
  report.issues.push({
    error: "Broken rendered internal links",
    count: report.brokenInternalLinks.length,
  });
await writeFile(output, JSON.stringify(report, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      output,
      sitemapUrls: urls.length,
      renderedInternalPaths: links.size,
      issues: report.issues,
      redirects: report.redirects,
      healthChecks: report.healthChecks,
    },
    null,
    2,
  ),
);
process.exitCode = report.issues.length ? 1 : 0;

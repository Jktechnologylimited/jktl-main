export type SeoCheck = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  fix: string;
};
export function attributes(tag: string) {
  const values: Record<string, string> = {};
  for (const m of tag.matchAll(
    /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g,
  ))
    values[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  return values;
}
const plain = (html: string) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(?:nbsp|amp|quot|lt|gt|#\d+);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
export function analyzePage(
  html: string,
  url: string,
  status = 200,
  xRobots = "",
) {
  const source = html;
  html = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ");
  const head = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html)?.[1] || html;
  const title = plain(
    /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(head)?.[1] || "",
  );
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) =>
    attributes(m[0]),
  );
  const meta = (name: string) =>
    metas.find((m) => (m.name || "").toLowerCase() === name)?.content || "";
  const description = meta("description"),
    h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
      plain(m[1]),
    );
  const canonical =
    [...head.matchAll(/<link\b[^>]*>/gi)]
      .map((m) => attributes(m[0]))
      .find((m) =>
        (m.rel || "").toLowerCase().split(/\s+/).includes("canonical"),
      )?.href || "";
  let canonicalValid = false;
  try {
    const c = new URL(canonical);
    canonicalValid = c.protocol === "https:" && !c.username && !c.password;
  } catch {}
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) =>
    attributes(m[0]),
  );
  const missingAlt = images.filter((m) => !Object.hasOwn(m, "alt")).length;
  const body = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html)?.[1] || html,
    words = plain(body).split(/\s+/).filter(Boolean).length;
  const robots = meta("robots") + " " + meta("googlebot") + " " + xRobots;
  const jsonLd = [
    ...source.matchAll(
      /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].some((m) => {
    try {
      return typeof JSON.parse(m[1]) === "object" && JSON.parse(m[1]) !== null;
    } catch {
      return false;
    }
  });
  const checks: SeoCheck[] = [];
  const add = (
    id: string,
    label: string,
    passed: boolean,
    detail: string,
    fix: string,
  ) => checks.push({ id, label, passed, detail, fix });
  add(
    "status",
    "Public page response",
    status === 200,
    status ? `HTTP ${status}` : "Not verified in pasted HTML",
    "Make the preferred public page return HTTP 200.",
  );
  add(
    "title",
    "Descriptive page title",
    title.length >= 20 && title.length <= 65,
    title ? `${title.length} characters: ${title}` : "No title found",
    "Write a unique title describing your main service and business. Around 20–65 characters is a useful guideline.",
  );
  add(
    "description",
    "Useful search description",
    description.length >= 110 && description.length <= 170,
    description
      ? `${description.length} characters`
      : "No meta description found",
    "Describe who you help and what makes the page useful. Aim around 110–170 characters; this is a writing guideline, not a Google rule.",
  );
  add(
    "h1",
    "One clear primary heading",
    h1.length === 1 && h1[0].length >= 3,
    `${h1.length} H1 heading(s) found`,
    "Use one meaningful H1 that explains the page.",
  );
  add(
    "viewport",
    "Mobile viewport",
    /width\s*=\s*device-width/i.test(meta("viewport")),
    meta("viewport") || "No mobile viewport found",
    "Add a viewport using width=device-width, initial-scale=1.",
  );
  add(
    "canonical",
    "Preferred page URL",
    canonicalValid,
    canonical || "No absolute HTTPS canonical found",
    "Use an absolute HTTPS canonical URL for the preferred version of this page.",
  );
  add(
    "indexing",
    "No explicit indexing block",
    !/(?:^|[\s,;:])(?:noindex|none)(?:$|[\s,;])/i.test(robots),
    robots.trim() || "No noindex directive detected in the fetched response",
    "Remove noindex only if this is a public page that should appear in search. Private and authentication pages should remain noindex.",
  );
  add(
    "images",
    "Image alternative text",
    missingAlt === 0,
    `${missingAlt} of ${images.length} image(s) missing an alt attribute`,
    'Describe informative images with alt text. Use alt="" for decorative images.',
  );
  add(
    "content",
    "Useful server-visible content",
    words >= 150,
    `${words} words found in the returned HTML`,
    "Add useful original service, location and contact information. Do not add filler just to reach a word count.",
  );
  add(
    "schema",
    "Structured data present",
    jsonLd,
    jsonLd
      ? "JSON-LD detected (not fully validated)"
      : "No valid JSON-LD block detected",
    "Consider appropriate Organization, LocalBusiness or other relevant structured data; use a rich-results validator before publishing.",
  );
  return {
    url,
    checkedAt: new Date().toISOString(),
    score: Math.round(
      (checks.filter((c) => c.passed).length / checks.length) * 100,
    ),
    checks,
    title,
    description,
    canonical,
  };
}
export type SeoReport = ReturnType<typeof analyzePage>;

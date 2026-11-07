import { analyzePage } from "@/lib/seo-tool/analyze";
import { fetchPublicPage, publicPageUrl } from "@/lib/seo-tool/fetch-page";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 20;
const attempts = new Map<string, { count: number; until: number }>();
let active = 0;
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (
    origin &&
    origin !== new URL(req.url).origin &&
    origin !== new URL(req.url).protocol + "//" + req.headers.get("host") &&
    !["https://jktl.com.ng", "https://www.jktl.com.ng"].includes(origin)
  )
    return Response.json(
      { error: "Use the JKTL SEO checker." },
      { status: 403 },
    );
  const key = (req.headers.get("x-forwarded-for") || "unknown")
      .split(",")[0]
      .slice(0, 80),
    now = Date.now();
  let limit = attempts.get(key);
  if (!limit || limit.until < now) {
    if (attempts.size >= 2000) attempts.clear();
    limit = { count: 0, until: now + 600000 };
    attempts.set(key, limit);
  }
  if (limit.count >= 5 || active >= 4)
    return Response.json(
      { error: "Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  limit.count++;
  active++;
  try {
    if (Number(req.headers.get("content-length") || 0) > 4096)
      return Response.json({ error: "Request too large." }, { status: 413 });
    const reader = req.body?.getReader();
    if (!reader)
      return Response.json(
        { error: "Enter a website address." },
        { status: 400 },
      );
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        if (bytes > 4096)
          return Response.json(
            { error: "Request too large." },
            { status: 413 },
          );
        chunks.push(value);
      }
    } finally {
      await reader.cancel();
    }
    const text = Buffer.concat(chunks).toString("utf8");
    const body = JSON.parse(text);
    publicPageUrl(body.url);
    const page = await fetchPublicPage(body.url);
    return Response.json(
      analyzePage(page.html, page.url, page.status, page.xRobots),
      { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
    );
  } catch {
    return Response.json(
      {
        error:
          "We could not read that public HTTPS page. Check the final address, try again later, or use the HTML check below. The site may block automated readers.",
      },
      { status: 422 },
    );
  } finally {
    active--;
  }
}

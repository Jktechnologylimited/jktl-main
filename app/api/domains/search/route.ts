import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
/** Main has no registrar credentials or checkout logic. Business owns the read-only search. */
export async function POST(req: NextRequest) {
  const headers = { "Cache-Control": "no-store" };
  const origin = req.headers.get("origin");
  let allowed = true;
  if (origin) {
    try {
      const target = new URL(req.url),
        host = req.headers.get("host");
      allowed =
        origin === target.origin ||
        (!!host &&
          new URL(origin).origin ===
            new URL(target.protocol + "//" + host).origin);
    } catch {
      allowed = false;
    }
  }
  if (!allowed)
    return NextResponse.json(
      { error: "Search from the JKTL website." },
      { status: 403, headers },
    );
  try {
    const text = await req.text();
    if (text.length > 1024)
      return NextResponse.json(
        { error: "Search is too large." },
        { status: 413, headers },
      );
    const input = JSON.parse(text);
    if (
      !input ||
      typeof input.name !== "string" ||
      input.name.length > 253 ||
      (input.extension !== undefined &&
        (typeof input.extension !== "string" ||
          !/^\.[a-z]{2,}(\.[a-z]{2,})?$/.test(input.extension)))
    )
      return NextResponse.json(
        { error: "Enter a domain name and supported extension." },
        { status: 400, headers },
      );
    const ip = (
      req.headers.get("x-vercel-forwarded-for") ||
      req.headers.get("x-forwarded-for") ||
      "unknown"
    )
      .split(",")[0]
      .trim()
      .slice(0, 100);
    const url = new URL(
      "/api/public/domain-search",
      process.env.JKTL_DOMAINS_ORIGIN || "https://business.jktl.com.ng",
    );
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ name: input.name, extension: input.extension }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
      redirect: "error",
    });
    const data = await result.json();
    if (!result.ok)
      return NextResponse.json(
        {
          error:
            result.status === 429
              ? "Too many searches. Try again shortly."
              : result.status === 400
                ? "Check the domain name and supported extension."
                : "Availability could not be confirmed. Please try again shortly.",
        },
        {
          status:
            result.status === 429 ? 429 : result.status === 400 ? 400 : 503,
          headers,
        },
      );
    if (!Array.isArray(data.results) || data.results.length > 3)
      throw Error("Invalid search response");
    const valid = data.results.every(
      (r: Record<string, unknown>) =>
        r &&
        typeof r.domain === "string" &&
        r.domain.length <= 253 &&
        /^(?:[a-z0-9-]+\.)+[a-z]{2,}$/.test(r.domain) &&
        typeof r.extension === "string" &&
        r.domain.endsWith(r.extension) &&
        ["AVAILABLE", "UNAVAILABLE", "UNKNOWN"].includes(String(r.status)) &&
        r.currency === "NGN" &&
        Number.isSafeInteger(r.registrationKobo) &&
        Number(r.registrationKobo) > 0 &&
        Number.isSafeInteger(r.renewalKobo) &&
        Number(r.renewalKobo) > 0,
    );
    if (!valid) throw Error("Invalid search response");
    return NextResponse.json(
      {
        results: data.results.map((r: Record<string, unknown>) => ({
          domain: r.domain,
          extension: r.extension,
          status: r.status,
          registrationKobo: r.registrationKobo,
          renewalKobo: r.renewalKobo,
          periodYears: 1,
          currency: "NGN",
        })),
        purchasesEnabled: data.purchasesEnabled === true,
      },
      { headers },
    );
  } catch {
    return NextResponse.json(
      {
        error: "Availability could not be confirmed. Please try again shortly.",
      },
      { status: 503, headers },
    );
  }
}

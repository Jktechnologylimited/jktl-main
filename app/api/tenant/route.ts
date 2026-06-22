import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

const ROOT = "jktl.com.ng";

// CORS so the product apps (*.jktl.com.ng) can call this directly if needed.
function withCors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Cache-Control", "public, max-age=30");
  return res;
}

export function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}

// GET /api/tenant?host=grace.jktl.com.ng  (or ?subdomain=grace, or ?domain=graceschool.com)
// Returns the public boot config for a tenant so a product app can render as that
// customer. Returns only non-sensitive branding/config — not owner contact details.
export async function GET(req: NextRequest) {
  if (!sql) return withCors(NextResponse.json({ error: "No database" }, { status: 503 }));

  const params = req.nextUrl.searchParams;
  let host = (params.get("host") || params.get("domain") || "").toLowerCase().trim().replace(/^www\./, "");
  let subdomain = (params.get("subdomain") || "").toLowerCase().trim();

  // Derive a subdomain candidate from the host if needed
  if (!subdomain && host) {
    if (host.endsWith("." + ROOT)) subdomain = host.slice(0, host.length - ROOT.length - 1).split(".")[0];
  }

  if (!host && !subdomain) {
    return withCors(NextResponse.json({ error: "Provide host, domain or subdomain" }, { status: 400 }));
  }

  try {
    let rows: Record<string, unknown>[] = [];
    // 1) exact custom domain match (when a real host was passed and it isn't *.jktl.com.ng)
    if (host && !host.endsWith("." + ROOT) && host !== ROOT) {
      rows = await sql`
        SELECT id, product, plan, org_name, subdomain, custom_domain, logo_url, brand_color, status, features
        FROM organisations WHERE lower(custom_domain) = ${host} LIMIT 1`;
    }
    // 2) fall back to subdomain match
    if (rows.length === 0 && subdomain) {
      rows = await sql`
        SELECT id, product, plan, org_name, subdomain, custom_domain, logo_url, brand_color, status, features
        FROM organisations WHERE subdomain = ${subdomain} LIMIT 1`;
    }

    if (rows.length === 0) {
      return withCors(NextResponse.json({ found: false }, { status: 404 }));
    }

    const o = rows[0];
    return withCors(NextResponse.json({
      found: true,
      active: o.status === "active",
      tenant: {
        id: o.id,
        product: o.product,
        plan: o.plan,
        orgName: o.org_name,
        subdomain: o.subdomain,
        customDomain: o.custom_domain,
        logoUrl: o.logo_url,
        brandColor: o.brand_color,
        status: o.status,
        features: o.features || {},
      },
    }));
  } catch (err) {
    return withCors(NextResponse.json({ error: String(err) }, { status: 500 }));
  }
}

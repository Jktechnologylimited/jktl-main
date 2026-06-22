import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { services, deskProducts, productPricing } from "@/data/index";

export const dynamic = "force-dynamic";

// GET /api/content/seed
// One-time: copies the bundled agency services and desk products into the DB
// so the admin has editable content matching the live site. Skips rows that
// already exist (by slug / product_key), so it is safe to run more than once.
export async function GET() {
  if (!sql) return NextResponse.json({ error: "DATABASE_URL not set" }, { status: 503 });

  const result = { services: 0, products: 0, errors: [] as string[] };

  try {
    for (let i = 0; i < services.length; i++) {
      const s = services[i] as Record<string, unknown>;
      const exists = await sql`SELECT id FROM agency_services WHERE slug = ${s.slug as string} LIMIT 1`;
      if (exists.length > 0) continue;
      await sql`
        INSERT INTO agency_services
          (slug, label, short_label, number, icon, tier, tagline, description, demo_slug,
           price_from, price_to, price_alt, price_monthly, delivery_note, highlight,
           features, best_for, status, sort_order)
        VALUES
          (${s.slug as string}, ${s.label as string}, ${(s.shortLabel as string) || ""},
           ${(s.number as string) || ""}, ${(s.icon as string) || ""}, ${(s.tier as string) || ""},
           ${(s.tagline as string) || ""}, ${(s.description as string) || ""}, ${(s.demoSlug as string) || ""},
           ${(s.priceFrom as string) || ""}, ${(s.priceTo as string) || ""}, ${(s.priceAlt as string) || ""},
           ${(s.priceMonthly as string) || ""}, ${(s.deliveryNote as string) || ""}, ${Boolean(s.highlight)},
           ${JSON.stringify(s.features || [])}, ${JSON.stringify(s.bestFor || [])}, 'published', ${i})
      `;
      result.services++;
    }
  } catch (err) { result.errors.push(`services: ${String(err)}`); }

  try {
    for (let i = 0; i < deskProducts.length; i++) {
      const p = deskProducts[i] as Record<string, unknown>;
      const exists = await sql`SELECT id FROM desk_products WHERE product_key = ${p.id as string} LIMIT 1`;
      if (exists.length > 0) continue;
      const pr = (productPricing as Record<string, { setup: number | null; monthly: number | null; waitlistNote?: string }>)[p.id as string] || { setup: null, monthly: null };
      await sql`
        INSERT INTO desk_products
          (product_key, name, tagline, description, status, color, slug, href, get_started_href,
           icon, features, domains, use_cases, setup_price, monthly_price, price_note, sort_order)
        VALUES
          (${p.id as string}, ${p.name as string}, ${(p.tagline as string) || ""},
           ${(p.description as string) || ""}, ${(p.status as string) || "live"}, ${(p.color as string) || "#8B5CF6"},
           ${p.slug as string}, ${(p.href as string) || ""}, ${(p.getStartedHref as string) || ""},
           ${(p.icon as string) || ""}, ${JSON.stringify(p.features || [])}, ${JSON.stringify(p.domains || [])},
           ${JSON.stringify(p.useCases || [])}, ${pr.setup}, ${pr.monthly}, ${pr.waitlistNote || ""}, ${i})
      `;
      result.products++;
    }
  } catch (err) { result.errors.push(`products: ${String(err)}`); }

  return NextResponse.json({ ok: result.errors.length === 0, ...result });
}

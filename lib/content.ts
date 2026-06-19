import { sql } from "@/lib/db";
import { services as staticServices, deskProducts as staticDeskProducts } from "@/data/index";

// These accessors prefer the database (managed in the admin) and fall back to
// the bundled static arrays when the tables are empty or unavailable — so the
// public site always renders, and matches the shape the pages already expect.

export type AgencyService = (typeof staticServices)[number];
export type DeskProduct = (typeof staticDeskProducts)[number];

export async function getAgencyServices(): Promise<AgencyService[]> {
  if (!sql) return staticServices;
  try {
    const rows = await sql`
      SELECT * FROM agency_services WHERE status = 'published'
      ORDER BY sort_order ASC, number ASC, created_at ASC
    `;
    if (!rows || rows.length === 0) return staticServices;
    return rows.map((r: Record<string, unknown>) => ({
      slug: r.slug, demoSlug: r.demo_slug, number: r.number, icon: r.icon,
      label: r.label, shortLabel: r.short_label, tier: r.tier, tagline: r.tagline,
      description: r.description, priceFrom: r.price_from, priceTo: r.price_to,
      priceAlt: r.price_alt, priceMonthly: r.price_monthly, deliveryNote: r.delivery_note,
      highlight: r.highlight, features: r.features || [], bestFor: r.best_for || [],
    })) as unknown as AgencyService[];
  } catch {
    return staticServices;
  }
}

export async function getDeskProducts(): Promise<DeskProduct[]> {
  if (!sql) return staticDeskProducts;
  try {
    const rows = await sql`
      SELECT * FROM desk_products ORDER BY sort_order ASC, created_at ASC
    `;
    if (!rows || rows.length === 0) return staticDeskProducts;
    return rows.map((r: Record<string, unknown>) => ({
      id: r.product_key, name: r.name, tagline: r.tagline, description: r.description,
      status: r.status, color: r.color, slug: r.slug, href: r.href,
      getStartedHref: r.get_started_href, icon: r.icon,
      features: r.features || [], domains: r.domains || [], useCases: r.use_cases || [],
    })) as unknown as DeskProduct[];
  } catch {
    return staticDeskProducts;
  }
}

"use client";
import { useState, useEffect } from "react";
import { productPricing } from "@/data/index";

export type ProductPrice = { setup: number | null; monthly: number | null; note: string };

// Returns pricing for a desk product, DB-first with static fallback.
// Renders the bundled price immediately, then swaps in the DB value on load.
export function useProductPricing(key: string): ProductPrice {
  const fallback = (productPricing as Record<string, { setup: number | null; monthly: number | null; waitlistNote?: string }>)[key] || { setup: null, monthly: null };
  const [price, setPrice] = useState<ProductPrice>({ setup: fallback.setup, monthly: fallback.monthly, note: fallback.waitlistNote || "" });

  useEffect(() => {
    let active = true;
    fetch("/api/desk-products")
      .then((r) => r.json())
      .then((d) => {
        if (!active || !Array.isArray(d.products)) return;
        const p = d.products.find((x: { id?: string }) => x.id === key);
        if (p && (p.setupPrice != null || p.monthlyPrice != null)) {
          setPrice({
            setup: p.setupPrice ?? fallback.setup,
            monthly: p.monthlyPrice ?? fallback.monthly,
            note: p.priceNote || fallback.waitlistNote || "",
          });
        }
      })
      .catch(() => {});
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return price;
}

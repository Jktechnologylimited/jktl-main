"use client";
import { useState, useEffect } from "react";
import { deskProducts as staticDeskProducts } from "@/data/index";

export type DeskProductItem = (typeof staticDeskProducts)[number];

// Client hook: renders the bundled products immediately (SSR + first paint),
// then swaps in the DB-managed list once it loads. Keeps nav/footer/home in
// sync with the admin without making these client components async.
export function useDeskProducts(): DeskProductItem[] {
  const [products, setProducts] = useState<DeskProductItem[]>(staticDeskProducts);
  useEffect(() => {
    let active = true;
    fetch("/api/desk-products")
      .then((r) => r.json())
      .then((d) => { if (active && Array.isArray(d.products) && d.products.length) setProducts(d.products); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return products;
}

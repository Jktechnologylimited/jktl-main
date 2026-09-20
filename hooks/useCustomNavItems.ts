"use client";
import { useState, useEffect } from "react";

export type CustomNavItem = { title: string; slug: string };

// Real, published CMS pages (Batch 14) that opted into "Show in Navigation"
// or "Show in Footer" when created in the command center. Additive to the
// existing hand-coded nav links -- does not replace them.
export function useCustomNavItems(): { nav: CustomNavItem[]; footer: CustomNavItem[] } {
  const [items, setItems] = useState<{ nav: CustomNavItem[]; footer: CustomNavItem[] }>({ nav: [], footer: [] });
  useEffect(() => {
    let active = true;
    fetch("/api/pages/nav-items")
      .then(r => r.json())
      .then(d => { if (active) setItems({ nav: d.nav || [], footer: d.footer || [] }); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  return items;
}

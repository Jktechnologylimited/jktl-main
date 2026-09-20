"use client";
import { useState, useEffect } from "react";

interface Promotion { id: string; name: string; type: string; discount_value: string; valid_to: string; }

function fmtDiscount(type: string, val: string) { return type === "percentage" ? `${val}% off` : `\u20a6${Number(val).toLocaleString("en-NG")} off`; }

function timeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

// Real countdown to a real offering_promotions.valid_to date. Renders
// nothing when there's no active promotion -- never fabricates urgency.
export default function PromotionBanner() {
  const [promo, setPromo] = useState<Promotion | null>(null);
  const [left, setLeft] = useState<ReturnType<typeof timeLeft>>(null);

  useEffect(() => {
    fetch("/api/offers/promotion").then(r => r.json()).then(d => setPromo(d.promotion || null)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!promo) return;
    setLeft(timeLeft(promo.valid_to));
    const t = setInterval(() => setLeft(timeLeft(promo.valid_to)), 1000);
    return () => clearInterval(t);
  }, [promo]);

  if (!promo || !left) return null;

  return (
    <div style={{ background: "linear-gradient(90deg,#C9A84C,#E4C567)", padding: "14px 20px" }}>
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-3 text-center">
        <span className="font-bold text-[0.85rem] text-navy-950">{promo.name} &mdash; {fmtDiscount(promo.type, promo.discount_value)}</span>
        <span className="font-mono text-[0.8rem] font-bold text-navy-950" style={{ background: "rgba(6,14,42,0.12)", padding: "3px 12px", borderRadius: 4 }}>
          {left.days}d {String(left.hours).padStart(2, "0")}h {String(left.minutes).padStart(2, "0")}m {String(left.seconds).padStart(2, "0")}s left
        </span>
      </div>
    </div>
  );
}

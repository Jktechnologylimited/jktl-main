"use client";
import { useEffect, useState } from "react";
type Review = {
  id: string;
  quote: string;
  rating: number;
  display_name: string;
  company: string;
  milestone: string;
};
export function CustomerReviews({
  milestone,
}: {
  milestone?: "website" | "domain";
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/reviews", { cache: "no-store" });
        if (!response.ok) throw Error();
        const data = await response.json();
        if (active) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch {
        if (active) setReviews([]);
      }
    }
    void load();
    const timer = setInterval(() => void load(), 60000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);
  const selected = reviews.filter(
    (r) => !milestone || r.milestone === milestone,
  );
  if (!selected.length) return null;
  return (
    <section
      className="bg-white px-6 py-16"
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="text-xs uppercase tracking-widest text-[#80621c]">
          In our customers’ words
        </p>
        <h2 className="mt-4 text-4xl text-navy-900">
          Selected customer reviews
        </h2>
        <p className="mt-4 text-sm text-black/60">
          Shared with permission by JKTL customers. These are selected
          experiences, not an overall customer rating.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {selected.map((r) => (
            <article key={r.id} className="card-light rounded-2xl p-6">
              <p
                className="text-sm text-[#80621c]"
                aria-label={`${r.rating} out of 5 stars`}
              >
                {"★".repeat(r.rating)}
              </p>
              <blockquote className="my-5 text-base leading-8 text-navy-900">
                “{r.quote}”
              </blockquote>
              <p className="font-semibold text-navy-900">{r.display_name}</p>
              <p className="mt-2 text-xs text-black/60">{r.company}</p>
              <p className="mt-3 text-xs text-black/60">
                {r.milestone === "domain"
                  ? "Domain customer"
                  : r.milestone === "website"
                    ? "Website customer"
                    : "JKTL customer"}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

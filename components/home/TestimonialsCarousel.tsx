"use client";
import { useState } from "react";
import type { Testimonial } from "@/hooks/useSiteContent";

// One testimonial at a time -- photo on the left, stars/quote/author on the
// right, dot pagination below. Matches the wireframe's Reviews/Testimonials layout.
export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  if (!t) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-8 items-center bg-white border border-cream-300 rounded p-6 sm:p-10">
        {/* Photo */}
        <div className="rounded overflow-hidden bg-navy-900 flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
          {t.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.avatar_url} alt={t.author_name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-[1.6rem] font-bold text-gold-400">{t.author_name.slice(0, 2).toUpperCase()}</span>
          )}
        </div>

        {/* Quote */}
        <div>
          <div className="text-gold-400 mb-4 text-xl" style={{ letterSpacing: 3 }}>{"\u2605".repeat(Math.max(1, Math.min(5, t.rating || 5)))}</div>
          <blockquote className="text-[1.1rem] sm:text-[1.25rem] text-navy-900 leading-relaxed font-medium mb-6">&ldquo;{t.quote}&rdquo;</blockquote>
          <p className="font-bold text-[0.95rem] text-navy-900">{t.author_name}{t.author_role || t.company ? ", " : ""}
            <span className="font-normal text-black/50">{[t.author_role, t.company].filter(Boolean).join(", ")}</span>
          </p>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-7">
          {testimonials.map((_, idx) => (
            <button key={idx} aria-label={`Show testimonial ${idx + 1}`} onClick={() => setI(idx)}
              className="rounded-full transition-all"
              style={{ width: idx === i ? 22 : 8, height: 8, background: idx === i ? "#C9A84C" : "rgba(6,14,42,0.15)" }} />
          ))}
        </div>
      )}
    </div>
  );
}

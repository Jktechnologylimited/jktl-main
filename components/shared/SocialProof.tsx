import { Star } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";

// Real customer reviews go here once shared (e.g. from WhatsApp screenshots)
// -- quote, who said it, and their business/industry. Renders nothing until
// this array has entries, rather than showing invented quotes: a marketing
// page shouldn't put words in a real customer's mouth, labelled or not.
const REVIEWS: { quote: string; name: string; business: string; rating?: number }[] = [];

export default function SocialProof() {
  if (REVIEWS.length === 0) return null;
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-y border-cream-300">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center mb-12">
          <span className="gold-rule mx-auto mb-4" />
          <h2 className="display-lg text-navy-900">Loved By Businesses Across Nigeria</h2>
        </Reveal>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((t, i) => (
            <StaggerItem key={i}>
              <div className="card-light p-6 h-full flex flex-col">
                {t.rating && (
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={14} fill="var(--gold-400)" style={{ color: "var(--gold-400)" }} />
                    ))}
                  </div>
                )}
                <p className="body-md text-black/70 mb-5 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{t.name}</p>
                  <p className="text-xs text-black/40">{t.business}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

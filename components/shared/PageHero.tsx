import Link from "next/link";

export interface PageHeroProps {
  eyebrow: string;
  heading: string;
  subhead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  imageNode?: React.ReactNode;
}

// Shared hero pattern used across About, Services, Industries, Work, Blog, Contact --
// small eyebrow label, big heading, subtext, two buttons, image on the right.
export default function PageHero({ eyebrow, heading, subhead, primaryLabel, primaryHref, secondaryLabel, secondaryHref, imageNode }: PageHeroProps) {
  return (
    <section className="bg-white" style={{ paddingTop: "clamp(96px,12vw,128px)", paddingBottom: "56px" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ width: 24, height: 2, background: "#C9A84C" }} />
              <p className="font-mono text-[0.68rem] font-bold text-black/40 uppercase tracking-[0.15em]">{eyebrow}</p>
            </div>
            <h1 className="display-lg text-navy-900 mb-5 leading-[1.1]" style={{ fontSize: "clamp(1.9rem,4vw,2.5rem)" }}>{heading}</h1>
            <p className="body-md text-black/55 mb-8" style={{ maxWidth: 460 }}>{subhead}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={primaryHref} className="btn-primary px-7 py-3.5 text-sm uppercase tracking-wide">{primaryLabel}</Link>
              <Link href={secondaryHref} className="btn-outline-navy px-7 py-3.5 text-sm uppercase tracking-wide">{secondaryLabel}</Link>
            </div>
          </div>
          <div className="rounded overflow-hidden border border-cream-300" style={{ aspectRatio: "4/3", background: "#0B1640" }}>
            {imageNode}
          </div>
        </div>
      </div>
    </section>
  );
}

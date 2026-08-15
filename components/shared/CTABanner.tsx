import Link from "next/link";

export interface CTABannerProps {
  heading: string;
  subhead: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

// Shared closing banner used across inner pages -- small icon block, heading +
// subtext, two buttons. Matches the wireframes' repeated "Ready to..." banner.
export default function CTABanner({ heading, subhead, primaryLabel = "Get Started", primaryHref = "/get-started", secondaryLabel = "Talk to Us", secondaryHref = "/contact" }: CTABannerProps) {
  return (
    <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <div className="w-14 h-14 rounded bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" /></svg>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="display-lg text-cream-50 mb-1.5" style={{ fontSize: "clamp(1.3rem,2.6vw,1.7rem)" }}>{heading}</h2>
          <p className="body-sm text-white/50">{subhead}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link href={primaryHref} className="btn-gold px-7 py-3.5 whitespace-nowrap text-sm uppercase tracking-wide">{primaryLabel}</Link>
          <Link href={secondaryHref} className="btn-ghost px-7 py-3.5 whitespace-nowrap text-sm uppercase tracking-wide">{secondaryLabel}</Link>
        </div>
      </div>
    </section>
  );
}

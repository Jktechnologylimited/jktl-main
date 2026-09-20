import Link from "next/link";

// One shared CTA for every desk product page's primary "get started"
// button. When an admin has entered the real platform URL, this links
// straight to the live product. Until then, it falls back to whatever that
// specific page's existing CTA was (waitlist form, onboarding flow, etc.) --
// callers pass their own fallback rather than this component guessing a
// product's readiness state.
export default function PlatformCTA({
  platformUrl, fallbackHref, className, style, children,
}: {
  platformUrl?: string; fallbackHref: string; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  if (platformUrl) {
    return (
      <a href={platformUrl} target="_blank" rel="noopener noreferrer" className={className} style={style}>
        {children}
      </a>
    );
  }
  const isAnchor = fallbackHref.startsWith("#");
  return isAnchor
    ? <a href={fallbackHref} className={className} style={style}>{children}</a>
    : <Link href={fallbackHref} className={className} style={style}>{children}</Link>;
}

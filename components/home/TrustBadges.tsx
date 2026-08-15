// Client / partner logo strip. No real logos on file yet -- shown as clean
// placeholder marks so the section renders correctly; swap in real client
// logos via this component once available.
const COUNT = 6;

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {Array.from({ length: COUNT }).map((_, i) => (
        <div key={i} className="h-16 rounded border border-cream-300 bg-cream-50 flex items-center justify-center">
          <span className="font-mono text-[0.6rem] text-black/20 tracking-widest">LOGO</span>
        </div>
      ))}
    </div>
  );
}

const LOCATIONS = [
  { city: "Lagos",         note: "Nigeria" },
  { city: "Abuja",         note: "Nigeria" },
  { city: "Port Harcourt", note: "Nigeria" },
  { city: "Online",        note: "Worldwide" },
];

const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

// Plain info display, matching the wireframe. Full detail lives on /service-areas.
export default function ServiceLocations() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {LOCATIONS.map(l => (
        <div key={l.city} className="flex items-center gap-3 p-4 rounded border border-cream-300 bg-white">
          <span className="text-gold-400 shrink-0"><PinIcon /></span>
          <div>
            <p className="font-bold text-[0.85rem] text-navy-900 uppercase leading-tight">{l.city}</p>
            <p className="text-[0.72rem] text-black/40">{l.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

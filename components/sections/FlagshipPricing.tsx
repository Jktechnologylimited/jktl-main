type Props = {
  platformName: string;
  tagline: string;
  buildPrice: string;
  buildItems: string[];
  managementPrice: string;
  managementItems: string[];
  addons: string[];
  ctaHref: string;
};

const Check = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" className="shrink-0 mt-1">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function FlagshipPricing({
  platformName, tagline, buildPrice, buildItems, managementPrice, managementItems, addons, ctaHref,
}: Props) {
  return (
    <section id="investment" className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[940px] mx-auto">
        <div className="mb-10 text-center">
          <span className="gold-rule mb-4" style={{ display: "block", margin: "0 auto" }} />
          <h2 className="display-lg text-navy-900 mb-2">Your Investment</h2>
          <p className="body-sm text-black/50">{tagline}</p>
        </div>

        <div className="bg-navy-950 rounded-sm border border-gold-400/30 p-8 sm:p-12">
          <p className="label-xs text-gold-400 mb-6">{platformName}</p>

          {/* Two-part investment: build once, managed ongoing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-9 pb-9" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <p className="font-display font-light text-white leading-none" style={{ fontSize: "clamp(2rem,5vw,2.8rem)" }}>{buildPrice}</p>
              <p className="text-white/35 text-[0.78rem] mt-2 font-mono">To launch · one-time, billed once</p>
            </div>
            <div className="sm:border-l sm:pl-6" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="font-display font-light text-white leading-none" style={{ fontSize: "clamp(2rem,5vw,2.8rem)" }}>{managementPrice}</p>
              <p className="text-white/35 text-[0.78rem] mt-2 font-mono">To keep it running · billed annually</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9 mb-9">
            <div>
              <p className="label-xs text-white/40 mb-4">Included to Launch</p>
              <div className="grid gap-2.5">
                {buildItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[0.86rem] text-white/75">
                    <Check />{item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="label-xs text-white/40 mb-4">Included in Platform Management</p>
              <div className="grid gap-2.5">
                {managementItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-[0.86rem] text-white/75">
                    <Check />{item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-7" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex-1">
              <p className="label-xs text-white/40 mb-4">Optional Add-Ons</p>
              <div className="flex flex-wrap gap-2">
                {addons.map((item) => (
                  <span key={item} className="text-[0.76rem] text-white/50 border border-white/15 rounded-full px-3.5 py-1.5">{item}</span>
                ))}
              </div>
            </div>
            <a href={ctaHref} className="btn-gold px-7 py-3.5 text-center shrink-0">Book a Strategy Call</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const REASONS = [
  { icon: "BF", title: "Business Focused",   desc: "Every solution is designed to solve real business problems and drive growth." },
  { icon: "CB", title: "Custom Built",       desc: "We build around your processes, not the other way around." },
  { icon: "SS", title: "Scalable Solutions", desc: "Our platforms grow with your business from small to enterprise." },
  { icon: "SR", title: "Secure & Reliable",  desc: "Built with modern technologies and enterprise-grade security." },
  { icon: "ES", title: "End-to-End Support", desc: "From strategy and design to deployment and ongoing support." },
];

export default function WhyChooseJktl() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {REASONS.map(r => (
        <div key={r.title} className="text-center">
          <div className="w-12 h-12 rounded-sm bg-navy-900 flex items-center justify-center mx-auto mb-4">
            <span className="font-mono text-[0.68rem] font-bold text-gold-400">{r.icon}</span>
          </div>
          <p className="font-bold text-[0.92rem] text-navy-900 mb-2">{r.title}</p>
          <p className="text-[0.78rem] text-black/50 leading-relaxed">{r.desc}</p>
        </div>
      ))}
    </div>
  );
}

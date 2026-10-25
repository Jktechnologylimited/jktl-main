import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JKTL Business Tycoon | Play the Nigerian business game",
  description:
    "Build a fictional Nigerian business neighbourhood. Play free as a guest or continue with your existing JKTL Business session.",
  alternates: { canonical: "https://jktl.com.ng/games/business-tycoon" },
};
export default function Page() {
  return (
    <main className="bg-navy-950 text-white min-h-screen px-6 pt-36 pb-20">
      <div className="max-w-5xl mx-auto">
        <p className="text-gold-400 text-xs tracking-widest">
          NIGERIA · 2026 EDITION
        </p>
        <h1 className="text-5xl md:text-7xl mt-7 max-w-3xl">
          Big ambition.
          <br />
          Your own neighbourhood.
        </h1>
        <p className="mt-7 text-white/70 max-w-xl leading-relaxed">
          Open a suya spot. Build a beauty studio. Launch a digital agency. Grow
          a Nigerian business neighbourhood, one smart decision at a time.
        </p>
        <a
          href="https://business.jktl.com.ng/play/tycoon"
          className="btn-gold inline-block mt-8 px-8 py-4"
        >
          Play JKTL Business Tycoon →
        </a>
        <p className="text-xs text-white/60 mt-4">
          Free guest trial. Already signed in to JKTL Business? Your existing
          session connects automatically.
        </p>
        <div className="grid sm:grid-cols-3 gap-5 mt-16">
          {[
            [
              "🍢",
              "Start with ₦500,000",
              "Open your first venture using play money.",
            ],
            [
              "🏙️",
              "Build your neighbourhood",
              "12 plots, six venture types, six Nigerian cities.",
            ],
            [
              "☀️",
              "Make the big calls",
              "Balance expansion, loans, digital discovery and solar resilience.",
            ],
          ].map(([icon, title, text]) => (
            <article
              key={title}
              className="bg-white/5 border border-gold-400/20 rounded-2xl p-7"
            >
              <span className="text-4xl">{icon}</span>
              <h2 className="text-xl mt-5">{title}</h2>
              <p className="text-sm text-white/65 leading-relaxed mt-3">
                {text}
              </p>
            </article>
          ))}
        </div>
        <p className="text-xs text-white/50 mt-10 max-w-2xl leading-relaxed">
          A fictional single-player simulation. No real securities, investment
          returns, prizes or withdrawals. Market stories are simulated and do
          not confirm real IPOs. Guest saves stay in the current browser;
          signed-in players can save privately to their account.
        </p>
      </div>
    </main>
  );
}

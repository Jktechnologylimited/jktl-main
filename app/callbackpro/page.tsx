export default function HomePage() {
  return (
    <main className="bg-[#0A0A0A] text-[#E8E8E0] overflow-x-hidden">
      {/* NAV */}
      <nav className="relative z-10 flex items-center justify-between px-[6%] py-7 border-b border-[rgba(255,92,0,0.15)]">
        <div className="text-3xl tracking-wide text-[#FAFAF5] font-black uppercase">
          Call<span className="text-[#FF5C00]">Back</span>Pro
        </div>
        <a
          href="#get-started"
          className="bg-[#FF5C00] hover:bg-[#FF8C42] transition-colors text-white px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-wider"
        >
          Get Started Today
        </a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden grid grid-rows-[auto_1fr_auto]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(255,92,0,0.12)_0%,transparent_60%),radial-gradient(ellipse_40%_40%_at_10%_80%,rgba(255,92,0,0.06)_0%,transparent_50%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,92,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,92,0,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />

        <div className="relative z-10 flex flex-col justify-center px-[6%] py-20 max-w-5xl">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-[#FF5C00] mb-7">
            <div className="w-8 h-[2px] bg-[#FF5C00]" />
            For Plumbers · HVAC · Electricians · Roofers
          </div>

          <h1 className="text-[clamp(3.5rem,9vw,7rem)] leading-[0.95] tracking-wide font-black uppercase text-[#FAFAF5] mb-8">
            Every Missed Call
            <span className="block text-[#FF5C00]">Is Money Walking</span>
            Out The Door.
          </h1>

          <p className="text-[clamp(1.1rem,2vw,1.35rem)] text-[#888880] leading-8 max-w-3xl mb-12">
            You&apos;re on a job site. Your phone rings. You can&apos;t answer.
            <strong className="text-[#E8E8E0]"> That customer books your competitor in the next 5 minutes.</strong>
            {' '}We fix that — automatically.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#get-started"
              className="bg-[#FF5C00] border-2 border-[#FF5C00] hover:bg-transparent hover:text-[#FF5C00] transition-all text-white px-10 py-5 rounded-sm font-bold uppercase tracking-wide"
            >
              Stop Losing Jobs Now
            </a>

            <a
              href="#how-it-works"
              className="text-[#888880] hover:text-[#E8E8E0] transition-colors font-semibold flex items-center gap-2"
            >
              See How It Works ↓
            </a>
          </div>
        </div>

        <div className="relative z-10 grid md:grid-cols-3 border-t border-white/10">
          {[
            {
              num: '78%',
              label: 'of customers go with the first business that responds',
            },
            {
              num: '5 MIN',
              label: 'is all you have before a lead goes cold and books someone else',
            },
            {
              num: '$1,200+',
              label: 'average value of a single lost home service job',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="px-[6%] py-8 border-r border-white/10 last:border-r-0"
            >
              <div className="text-5xl text-[#FF5C00] font-black mb-2">
                {item.num}
              </div>
              <div className="text-sm text-[#888880]">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PAIN */}
      <section className="bg-[#111111] px-[6%] py-28 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#FF5C00] to-transparent" />

        <div className="uppercase tracking-[0.2em] text-xs font-bold text-[#FF5C00] mb-5">
          Sound Familiar?
        </div>

        <h2 className="uppercase text-[clamp(2.2rem,5vw,3.8rem)] leading-tight font-black text-[#FAFAF5] mb-8">
          You&apos;re Working Hard.
          <br />
          <span className="text-[#FF5C00]">And Still Losing.</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          <ul className="space-y-5">
            {[
              "You're elbow-deep in a job when your phone rings — you can't answer",
              'By the time you call back, they’ve already booked someone else',
              'You’re spending money on ads and getting calls you can’t catch',
              'Your voicemail is full of leads you never followed up on',
              'Competitors with worse reviews are stealing your customers',
              'You have no idea how much revenue you’ve actually lost this month',
            ].map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-white/10 pb-5 text-lg"
              >
                <span className="text-[#FF5C00] font-bold">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-[#1A1A1A] border border-[#FF5C0033] rounded p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF5C00]" />

            <div className="text-8xl text-[#FF5C00] font-black mb-4">62%</div>
            <p className="text-xl leading-8">
              of home service leads who don’t get a response within 5 minutes will never call back.
              They book whoever responds first — and that’s rarely you when you’re in the middle of a job.
            </p>
            <div className="mt-6 text-sm tracking-wide text-[#888880]">
              — Harvard Business Review, Lead Response Study
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#0A0A0A] px-[6%] py-28">
        <div className="grid lg:grid-cols-2 gap-16 mb-20 items-end">
          <div>
            <div className="uppercase tracking-[0.2em] text-xs font-bold text-[#FF5C00] mb-5">
              The Fix
            </div>
            <h2 className="uppercase text-[clamp(2.2rem,5vw,3.8rem)] leading-tight font-black text-[#FAFAF5]">
              Live In
              <br />
              <span className="text-[#FF5C00]">24 Hours.</span>
              <br />
              Works While
              <br />
              You Work.
            </h2>
          </div>

          <p className="text-[#888880] text-lg leading-8">
            We set up an automated missed call recovery system for your business.
            The moment you miss a call, your new customer gets a personal-sounding text within 60 seconds —
            starting a conversation that books the job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-[2px] bg-white/10">
          {[
            {
              num: '01',
              title: 'Call Comes In',
              body: 'A potential customer calls your number while you’re on a job. You can’t answer. Normally, that’s a lost lead.',
            },
            {
              num: '02',
              title: 'Auto Text Fires',
              body: 'Within 60 seconds, they get a personalized text from “you” — friendly, professional, and specific to your trade.',
            },
            {
              num: '03',
              title: 'Job Gets Booked',
              body: 'The system handles the back-and-forth, qualifies the lead, and gets them on your calendar.',
            },
          ].map((step) => (
            <div key={step.num} className="bg-[#111111] p-10 hover:bg-[#1A1A1A] transition-colors">
              <div className="text-7xl text-[#FF5C0033] font-black mb-5">{step.num}</div>
              <div className="uppercase text-2xl font-black text-[#FAFAF5] mb-4">
                {step.title}
              </div>
              <p className="text-[#888880] leading-7">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="get-started" className="bg-[#111111] px-[6%] py-36 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[18vw] text-[#FF5C0008] font-black uppercase pointer-events-none">
          STOP LOSING MONEY
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="uppercase text-[clamp(2.5rem,6vw,5rem)] leading-tight font-black text-[#FAFAF5] mb-8">
            Your Next Job
            <br />
            <span className="text-[#FF5C00]">Is Already Calling.</span>
          </h2>

          <p className="text-[#888880] text-xl max-w-2xl mx-auto mb-12">
            The only question is whether you&apos;re going to answer it — or let it go to your competitor.
          </p>

          <div className="flex flex-col items-center gap-4">
            <a
              href="#"
              className="bg-[#FF5C00] hover:bg-[#FF8C42] transition-colors text-white px-14 py-6 rounded-sm text-lg font-bold uppercase tracking-wide"
            >
              Get Set Up Today — $497
            </a>

            <div className="text-sm text-[#888880] tracking-wide">
              30-day money-back guarantee · Live in 24 hours · No contracts
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 px-[6%] py-8 flex flex-wrap justify-between items-center gap-4">
        <div className="text-2xl tracking-wide text-[#FAFAF5] font-black uppercase">
          Call<span className="text-[#FF5C00]">Back</span>Pro
        </div>

        <ul className="flex gap-6 text-sm text-[#888880]">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </main>
  )
}

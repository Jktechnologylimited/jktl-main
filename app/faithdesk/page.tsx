"use client";
import { useState } from "react";
import { useWatchVideos } from "@/hooks/useWatchVideos";
import { WATCH_VIDEOS_DEFAULTS } from "@/data/watch-videos-defaults";
import Link from "next/link";
import { deskPlans, siteConfig, companyDetails } from "@/data/index";
import { useProductPricing } from "@/hooks/useProductPricing";


function fmtN(n: number) { return "N" + n.toLocaleString("en-NG"); }

const FEATURES = [
  { icon: "MB", title: "Member CRM", desc: "Every member profile, contact, family unit, attendance history in one searchable database." },
  { icon: "TH", title: "Tithes & Offerings", desc: "Collect tithes online via Paystack. Automatic receipts. Full transaction history per member." },
  { icon: "PT", title: "Ministry Portal", desc: "Members log in, see their giving history, update contact details, access church announcements." },
  { icon: "AN", title: "Analytics & Reports", desc: "Monthly giving trends, attendance charts, department breakdowns -- all exportable." },
  { icon: "DM", title: "Department Management", desc: "Create ministries, assign members, track participation. Choir, ushers, workers -- all organised." },
  { icon: "SM", title: "SMS & Announcements", desc: "Broadcast to all members or specific groups. Automated birthday messages. Never lose touch." },
];

const PROOF_STATS = [
  { value: "100%", label: "Nigerian-built" },
  { value: "Paystack", label: "Integrated payments" },
  { value: "24hr", label: "Setup time" },
  { value: "30 days", label: "Money-back guarantee" },
];


function VideoCard({ video, color }: { video:{ id:string; title:string; desc:string; duration:string; youtubeId:string; comingSoon:boolean }; color:string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:10, overflow:"hidden" }}>
      {/* Thumbnail */}
      <div style={{ position:"relative", aspectRatio:"16/9", background:"#0B1640", cursor: video.youtubeId ? "pointer" : "default" }}
        onClick={() => video.youtubeId && setPlaying(true)}>
        {playing && video.youtubeId ? (
          <iframe style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
            background:`linear-gradient(135deg, ${color}18 0%, #080F25 100%)` }}>
            {video.comingSoon ? (
              <div style={{ textAlign:"center" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <p style={{ fontFamily:"monospace", fontSize:"0.55rem", color:"rgba(226,232,240,0.2)", letterSpacing:"0.1em" }}>COMING SOON</p>
              </div>
            ) : (
              <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.12)", border:`2px solid ${color}60`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            )}
          </div>
        )}
        {!video.comingSoon && !playing && (
          <div style={{ position:"absolute", bottom:8, right:8, background:"rgba(0,0,0,0.75)", padding:"2px 8px", borderRadius:4, fontFamily:"monospace", fontSize:"0.62rem", color:"#fff" }}>
            {video.duration}
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding:"13px 14px" }}>
        <p style={{ fontWeight:700, fontSize:"0.85rem", color: video.comingSoon ? "rgba(226,232,240,0.4)" : "#fff", marginBottom:4, lineHeight:1.3 }}>{video.title}</p>
        <p style={{ fontSize:"0.73rem", color:"rgba(226,232,240,0.38)", lineHeight:1.5 }}>{video.desc}</p>
      </div>
    </div>
  );
}


export default function FaithDeskPage() {
  const videos = useWatchVideos("faithdesk", WATCH_VIDEOS_DEFAULTS.faithdesk);
  const pricing = useProductPricing("faithdesk");
  return (
    <div className="bg-cream-50">

      {/* HERO -- SALES LETTER STRUCTURE */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop:"clamp(88px,12vw,120px)", paddingBottom:"clamp(48px,8vw,80px)" }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B5CF6]" />

        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 rounded-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0 animate-pulse" />
            <span className="font-mono text-[0.6rem] tracking-widest text-[#A78BFA] uppercase">FaithDesk -- Ministry Management Software -- Live Now</span>
          </div>

          {/* GIANT PROMISE HEADLINE */}
          <h1 className="font-display font-light text-white leading-[1.05] mb-6"
            style={{ fontSize:"clamp(1.8rem,5vw,3.2rem)" }}>
            Your Church Deserves Software That<br />
            <span style={{ color:"#A78BFA" }}>Actually Works in Nigeria.</span><br />
            <span className="text-white/50 italic" style={{ fontSize:"clamp(1.2rem,3vw,1.8rem)" }}>Not Another WhatsApp Group.</span>
          </h1>

          {/* FEAR HOOK */}
          <div className="border-l-4 pl-5 mb-8" style={{ borderColor:"#8B5CF6" }}>
            <p className="text-white/65 leading-[1.8]" style={{ fontSize:"clamp(0.9rem,2vw,1.05rem)", maxWidth:620 }}>
              Every Sunday, Nigerian churches lose offering money to manual counting errors, forgotten pledges, and unrecorded tithes.
              Most pastors know it is happening. Most have no way to stop it.
              FaithDesk was built to close that gap -- by a registered Nigerian software company, for Nigerian churches, using Paystack.
            </p>
          </div>

          {/* CRAZY OFFER FRAMING */}
          <div className="rounded border border-[#8B5CF6]/30 bg-[#8B5CF6]/08 p-5 sm:p-6 mb-8">
            <p className="font-mono text-[0.62rem] tracking-widest text-[#A78BFA] uppercase mb-3">The FaithDesk Offer</p>
            <p className="text-white font-bold text-lg mb-2">Pay {fmtN(pricing.setup!)} setup fee. Get all of this free:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                "Full member CRM and database",
                "Tithes and offerings dashboard",
                "Online payment portal for members",
                "Ministry analytics and reports",
                "Free data migration from spreadsheets",
                "30 days of free hands-on support",
                "Custom subdomain (yourchurch.jktl.com.ng)",
                "Lifetime access -- no hidden fees",
              ].map(f => (
                <div key={f} className="flex items-start gap-2 text-[0.82rem] text-white/70">
                  <span style={{ color:"#A78BFA" }} className="shrink-0 mt-0.5">&#10003;</span>{f}
                </div>
              ))}
            </div>
            <p className="text-[0.78rem] text-white/40 italic">
              The {fmtN(pricing.setup!)} covers the software setup. The member portal, migration support, and 30-day support -- those are our gift.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/get-started/faithdesk"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline"
              style={{ background:"#8B5CF6", color:"#fff" }}>
              Get Started -- {fmtN(pricing.setup!)} Setup
            </Link>
            <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-[0.72rem] uppercase tracking-wide rounded-sm no-underline"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(249,247,240,0.7)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.188-1.357l-.371-.214-3.861 1.007 1.028-3.752-.233-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* GUARANTEE BAR */}
      <div className="bg-[#8B5CF6] px-4 py-3">
        <div className="max-w-[900px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {[
            "30-day money-back guarantee",
            "Free data migration",
            "CAC Registered: " + companyDetails.cac,
            "Nigerian-built -- Paystack integrated",
          ].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-[0.72rem] font-bold text-white uppercase tracking-wide">
              <span>&#10003;</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* CREDIBILITY / PROOF */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PROOF_STATS.map(s => (
              <div key={s.label} className="text-center p-5 rounded border border-cream-300">
                <p className="font-bold text-[1.5rem] text-navy-900 mb-1">{s.value}</p>
                <p className="text-[0.72rem] uppercase tracking-wide text-black/40 font-bold">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Credibility line */}
          <div className="mt-6 p-5 rounded bg-cream-100 border border-cream-300 flex flex-col sm:flex-row gap-4 items-start">
            <div className="shrink-0 w-10 h-10 rounded-sm bg-navy-900 flex items-center justify-center">
              <span className="font-mono text-[0.65rem] font-bold text-gold-400">JK</span>
            </div>
            <p className="text-[0.85rem] text-black/60 leading-[1.7]">
              FaithDesk is built by <strong className="text-navy-900">JK Technology Limited</strong> (CAC Registration: {companyDetails.cac}),
              a registered Nigerian software company founded in 2019. We built FaithDesk specifically for Nigerian churches --
              with Paystack payments, Naira denomination, Nigerian phone number login, and support from someone who picks up the phone.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10">
            <span className="block w-10 h-px bg-gold-400 mb-4" />
            <h2 className="font-display font-light text-navy-900 mb-2" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)" }}>
              Everything your church needs. Nothing it doesn not.
            </h2>
            <p className="text-black/50 text-[0.9rem]">Every feature built specifically for how Nigerian churches operate.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map(f => (
              <div key={f.icon} className="bg-white border border-cream-300 rounded p-5 border-t-2" style={{ borderTopColor:"#8B5CF6" }}>
                <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-3 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                  <span className="font-mono text-[0.62rem] font-bold text-[#8B5CF6]">{f.icon}</span>
                </div>
                <p className="font-bold text-[0.9rem] text-navy-900 mb-1.5">{f.title}</p>
                <p className="text-[0.8rem] text-black/55 leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEAR SECTION */}
      <section className="bg-navy-900 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-8">
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize:"clamp(1.4rem,4vw,2rem)" }}>
              How much is your church losing right now?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: "15-30%", label: "Of offerings lost", desc: "Average loss to manual recording errors and untracked pledges in Nigerian churches without a system." },
              { stat: "3x", label: "More pledges fulfilled", desc: "Churches with automated reminders collect 3x more on pledges than those relying on manual follow-up." },
              { stat: "0 hrs", label: "Spent on data entry", desc: "FaithDesk eliminates manual spreadsheet work. Every transaction is recorded automatically." },
            ].map(s => (
              <div key={s.stat} className="rounded p-5" style={{ background:"rgba(139,92,246,0.1)", border:"1px solid rgba(139,92,246,0.25)" }}>
                <p className="font-display font-light mb-1" style={{ fontSize:"2.5rem", color:"#A78BFA", lineHeight:1 }}>{s.stat}</p>
                <p className="font-bold text-[0.78rem] text-white mb-2 uppercase tracking-wide">{s.label}</p>
                <p className="text-[0.8rem] text-white/45 leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[700px] mx-auto text-center">
          <span className="block w-10 h-px bg-gold-400 mb-4 mx-auto" />
          <h2 className="font-display font-light text-navy-900 mb-2" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)" }}>Simple pricing.</h2>
          <p className="text-black/50 text-[0.9rem] mb-8">One setup fee. One monthly fee. No surprises.</p>

          <div className="bg-white border-2 rounded p-8 text-left relative" style={{ borderColor:"#8B5CF6" }}>
            <div className="absolute -top-3 left-6 bg-[#8B5CF6] text-white font-mono text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
              FaithDesk Standard
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
              <div>
                <p className="font-display font-light text-[3rem] text-navy-900 leading-none">{fmtN(pricing.setup!)}</p>
                <p className="text-black/40 text-[0.72rem]">one-time setup fee</p>
              </div>
              <div className="sm:ml-4 sm:pb-1">
                <p className="font-bold text-[1.2rem] text-navy-900">+ {fmtN(pricing.monthly!)}<span className="text-[0.85rem] font-normal text-black/40">/month</span></p>
                <p className="text-black/40 text-[0.72rem]">cancel anytime</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {[
                "Full member CRM",
                "Tithes and offerings system",
                "Member portal",
                "Analytics dashboard",
                "Paystack payments",
                "Free data migration",
                "30-day support included",
                "Custom subdomain",
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-[0.82rem] text-black/65">
                  <span style={{ color:"#8B5CF6" }}>&#10003;</span>{f}
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className="rounded p-4 mb-6 flex items-start gap-3" style={{ background:"rgba(139,92,246,0.06)", border:"1px solid rgba(139,92,246,0.2)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <p className="font-bold text-[0.85rem] text-navy-900 mb-0.5">30-Day Money-Back Guarantee</p>
                <p className="text-[0.78rem] text-black/55">
                  If FaithDesk doesn't work for your church in 30 days -- full setup fee refunded. No questions asked. We stake our reputation on this.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/get-started/faithdesk"
                className="flex-1 py-4 text-center font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline"
                style={{ background:"#8B5CF6", color:"#fff" }}>
                Get Started Today
              </Link>
              <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 font-bold text-[0.72rem] uppercase tracking-wide rounded-sm no-underline"
                style={{ background:"transparent", border:"1px solid #8B5CF6", color:"#8B5CF6" }}>
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* WATCH & LEARN */}
      <section className="px-4 sm:px-6 lg:px-8 py-16" style={{ background:"#080F25" }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-10">
            <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase mb-3" style={{ color:"#8B5CF6" }}>Watch & Learn</p>
            <h2 className="font-bold text-white mb-3" style={{ fontSize:"clamp(1.3rem,3vw,1.8rem)" }}>
              See FaithDesk in action
            </h2>
            <p className="text-[0.9rem]" style={{ color:"rgba(226,232,240,0.45)", maxWidth:480, lineHeight:1.7 }}>
              Step-by-step video guides. Watch before you sign up, or after -- use them to train your team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map(v => (
              <VideoCard key={v.id} video={v} color="#8B5CF6" />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="max-w-[560px] mx-auto">
          <h2 className="font-display font-light text-white mb-3" style={{ fontSize:"clamp(1.4rem,4vw,2rem)" }}>
            Your church is ready for a real system.
          </h2>
          <p className="text-white/45 text-[0.9rem] mb-6">
            Setup takes less than 10 minutes. You go live the same day.
            No developer needed. No IT consultant. Just you and FaithDesk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started/faithdesk"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline"
              style={{ background:"#8B5CF6", color:"#fff" }}>
              Get FaithDesk -- {fmtN(pricing.setup!)}
            </Link>
            <a href={"mailto:" + siteConfig.email}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 font-bold text-[0.72rem] uppercase tracking-wide rounded-sm no-underline"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(249,247,240,0.6)" }}>
              Email Us First
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import { useState } from "react";
import { useWatchVideos } from "@/hooks/useWatchVideos";
import { WATCH_VIDEOS_DEFAULTS } from "@/data/watch-videos-defaults";
import Link from "next/link";
import { siteConfig, companyDetails } from "@/data/index";
import { useProductPricing } from "@/hooks/useProductPricing";

function fmtN(n: number) { return "N" + n.toLocaleString("en-NG"); }

const FEATURES = [
  { icon: "ST", title: "Online Store & Booking", desc: "Customers book and pay online 24/7. No calls, no WhatsApp back-and-forth. Jobs go straight into your queue." },
  { icon: "JB", title: "Job Assignment", desc: "Assign jobs to workers with one tap. Workers see their queue, mark jobs in progress, mark complete." },
  { icon: "RL", title: "Role-Based Access", desc: "Owner sees everything. Manager assigns jobs and views reports. Workers see only their assigned jobs." },
  { icon: "PY", title: "Payments & Invoicing", desc: "Paystack integration. Automatic receipts. Payment confirmation before job starts. Cash tracking too." },
  { icon: "CR", title: "Customer CRM", desc: "Full history per customer -- every job, every payment, every car. Repeat customers tracked automatically." },
  { icon: "AN", title: "Analytics Dashboard", desc: "Revenue by day/week/month. Best-selling services. Worker performance. Know your numbers." },
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

export default function DetailDeskPage() {
  const videos = useWatchVideos("detaildesk", WATCH_VIDEOS_DEFAULTS.detaildesk);
  const pricing = useProductPricing("detaildesk");
  return (
    <div className="bg-cream-50">

      {/* HERO */}
      <section className="bg-navy-950 relative overflow-hidden" style={{ paddingTop:"clamp(88px,12vw,120px)", paddingBottom:"clamp(48px,8vw,80px)" }}>
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(245,158,11,1) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,1) 1px,transparent 1px)", backgroundSize:"64px 64px" }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 rounded-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
            <span className="font-mono text-[0.6rem] tracking-widest text-amber-400 uppercase">DetailDesk -- Auto Detailing Business Software -- Live Now</span>
          </div>

          {/* GIANT PROMISE */}
          <h1 className="font-display font-light text-white leading-[1.05] mb-6"
            style={{ fontSize:"clamp(1.8rem,5vw,3.2rem)" }}>
            Your Detailing Shop Will Take Bookings,<br />
            <span className="text-amber-400">Assign Jobs, and Collect Payment</span><br />
            <span className="text-white/50 italic" style={{ fontSize:"clamp(1.2rem,3vw,1.8rem)" }}>While You Sleep.</span>
          </h1>

          {/* FEAR HOOK */}
          <div className="border-l-4 pl-5 mb-8 border-amber-500">
            <p className="text-white/65 leading-[1.8]" style={{ fontSize:"clamp(0.9rem,2vw,1.05rem)", maxWidth:620 }}>
              Every missed call is a lost booking. Every WhatsApp message you don't see in time is a customer your competitor gets.
              If your shop has no booking system, the shop down the road with one is taking your customers right now.
              DetailDesk gives you the operating system your business needs -- and your competitors don't have yet.
            </p>
          </div>

          {/* CRAZY OFFER */}
          <div className="rounded border border-amber-500/30 bg-amber-500/08 p-5 sm:p-6 mb-8">
            <p className="font-mono text-[0.62rem] tracking-widest text-amber-400 uppercase mb-3">The DetailDesk Offer</p>
            <p className="text-white font-bold text-lg mb-2">Pay {fmtN(pricing.setup!)} setup fee. Get all of this free:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                "Online booking system for your shop",
                "Job assignment dashboard",
                "Owner, Manager, Worker access levels",
                "Paystack payment integration",
                "Customer history CRM",
                "Revenue analytics dashboard",
                "Free public website for your shop",
                "30 days of free hands-on support",
              ].map(f => (
                <div key={f} className="flex items-start gap-2 text-[0.82rem] text-white/70">
                  <span className="text-amber-400 shrink-0 mt-0.5">&#10003;</span>{f}
                </div>
              ))}
            </div>
            <p className="text-[0.78rem] text-white/40 italic">
              A separate website alone costs N50,000--N150,000. With DetailDesk, it comes free.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/get-started/detaildesk"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline bg-amber-500 text-navy-900">
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
      <div className="px-4 py-3 bg-amber-500">
        <div className="max-w-[900px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {["30-day money-back guarantee","Free public website included","CAC Registered: "+companyDetails.cac,"Paystack + job tracking"].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-[0.72rem] font-bold text-navy-900 uppercase tracking-wide">
              <span>&#10003;</span> {item}
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section className="bg-cream-50 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[900px] mx-auto">
          <div className="mb-10">
            <span className="block w-10 h-px bg-gold-400 mb-4" />
            <h2 className="font-display font-light text-navy-900 mb-2" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)" }}>
              You run the shop. DetailDesk runs the system.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map(f => (
              <div key={f.icon} className="bg-white border border-cream-300 rounded p-5 border-t-2 border-t-amber-500">
                <div className="w-9 h-9 rounded-sm flex items-center justify-center mb-3 bg-amber-500/10 border border-amber-500/20">
                  <span className="font-mono text-[0.62rem] font-bold text-amber-600">{f.icon}</span>
                </div>
                <p className="font-bold text-[0.9rem] text-navy-900 mb-1.5">{f.title}</p>
                <p className="text-[0.8rem] text-black/55 leading-[1.6]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-cream-100 px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="font-display font-light text-navy-900 mb-8" style={{ fontSize:"clamp(1.5rem,4vw,2.2rem)" }}>Pricing</h2>
          <div className="bg-white border-2 border-amber-500 rounded p-8 text-left relative">
            <div className="absolute -top-3 left-6 bg-amber-500 text-navy-900 font-mono text-[0.6rem] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
              DetailDesk Standard
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
              <div>
                <p className="font-display font-light text-[3rem] text-navy-900 leading-none">{fmtN(pricing.setup!)}</p>
                <p className="text-black/40 text-[0.72rem]">one-time setup fee</p>
              </div>
              <div className="sm:ml-4 sm:pb-1">
                <p className="font-bold text-[1.2rem] text-navy-900">+ {fmtN(pricing.monthly!)}<span className="text-[0.85rem] font-normal text-black/40">/month</span></p>
              </div>
            </div>
            <div className="rounded p-4 mb-6 flex items-start gap-3 bg-amber-500/06 border border-amber-500/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" className="shrink-0 mt-0.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div>
                <p className="font-bold text-[0.85rem] text-navy-900 mb-0.5">30-Day Money-Back Guarantee</p>
                <p className="text-[0.78rem] text-black/55">
                  If DetailDesk doesn't transform your shop operations in 30 days -- full setup fee refunded. No questions asked.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/get-started/detaildesk"
                className="flex-1 py-4 text-center font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline bg-amber-500 text-navy-900">
                Get Started Today
              </Link>
              <a href={companyDetails.whatsappLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 font-bold text-[0.72rem] uppercase tracking-wide rounded-sm no-underline border border-amber-500 text-amber-600">
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
            <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase mb-3" style={{ color:"#F59E0B" }}>Watch & Learn</p>
            <h2 className="font-bold text-white mb-3" style={{ fontSize:"clamp(1.3rem,3vw,1.8rem)" }}>
              See DetailDesk in action
            </h2>
            <p className="text-[0.9rem]" style={{ color:"rgba(226,232,240,0.45)", maxWidth:480, lineHeight:1.7 }}>
              Step-by-step video guides. Watch before you sign up, or use them to train your team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos.map(v => (
              <VideoCard key={v.id} video={v} color="#F59E0B" />
            ))}
          </div>
        </div>
      </section>

{/* FINAL CTA */}
      <section className="bg-navy-950 px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="max-w-[560px] mx-auto">
          <h2 className="font-display font-light text-white mb-3" style={{ fontSize:"clamp(1.4rem,4vw,2rem)" }}>
            Your competitors are getting this system. Will you?
          </h2>
          <p className="text-white/45 text-[0.9rem] mb-6">
            Go live in 10 minutes. No developer. No IT consultant. Just DetailDesk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/get-started/detaildesk"
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-[0.78rem] uppercase tracking-widest rounded-sm no-underline bg-amber-500 text-navy-900">
              Get DetailDesk -- {fmtN(pricing.setup!)}
            </Link>
            <a href={"mailto:"+siteConfig.email}
              className="inline-flex items-center justify-center px-6 py-4 font-bold text-[0.72rem] uppercase tracking-wide rounded-sm no-underline"
              style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(249,247,240,0.6)" }}>
              Email Us First
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

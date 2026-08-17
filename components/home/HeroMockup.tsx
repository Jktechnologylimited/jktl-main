"use client";
import { useState, useEffect } from "react";

// Three laptop "screens" the mockup cycles through, each with a cursor target
// position (percent-based) so the cursor visibly moves to what's changing.
const SCREENS = [
  { id: "dashboard", cursor: { x: 78, y: 38 } }, // near the chart peak
  { id: "list",       cursor: { x: 85, y: 30 } }, // near the top list row
  { id: "cards",      cursor: { x: 25, y: 65 } }, // near a stat card
] as const;

const SCREEN_MS = 3600;
const PHONE_SCREENS = 2;
const PHONE_MS = 4200;

export default function HeroMockup() {
  const [screen, setScreen] = useState(0);
  const [clicking, setClicking] = useState(false);
  const [phoneScreen, setPhoneScreen] = useState(0);

  // Loop the laptop screen
  useEffect(() => {
    const id = setInterval(() => {
      setScreen(s => (s + 1) % SCREENS.length);
      setClicking(true);
      setTimeout(() => setClicking(false), 420);
    }, SCREEN_MS);
    return () => clearInterval(id);
  }, []);

  // Loop the phone screen on an offset cadence for visual variety
  useEffect(() => {
    const id = setInterval(() => setPhoneScreen(s => (s + 1) % PHONE_SCREENS), PHONE_MS);
    return () => clearInterval(id);
  }, []);

  const cursor = SCREENS[screen].cursor;

  return (
    <div className="relative w-full select-none" style={{ maxWidth: 460 }}>
      {/* Laptop frame */}
      <div className="rounded-t-lg overflow-hidden border border-white/10" style={{ background: "#0B1640" }}>
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5">
            <span className="relative flex items-center justify-center">
              <span className="absolute w-1.5 h-1.5 rounded-full bg-gold-400 hero-pulse-ring" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            </span>
            <span className="font-mono text-[0.55rem] text-white/30 tracking-widest">LIVE</span>
          </div>
        </div>

        {/* Screen area -- fixed height, content cross-fades */}
        <div className="p-4 relative" style={{ height: 176 }}>
          {screen === 0 && (
            <div key="dashboard" className="hero-fade-in">
              <div className="grid gap-1.5 mb-3">
                <div className="h-2 rounded-full bg-white/10" style={{ width: "55%" }} />
                <div className="h-2 rounded-full bg-white/[0.06]" style={{ width: "35%" }} />
              </div>
              <div className="rounded bg-white/[0.04] border border-white/10 p-3 mb-3">
                <svg viewBox="0 0 280 90" className="w-full h-auto" preserveAspectRatio="none">
                  <polyline key={screen + "-line"} className="hero-draw-line"
                    points="0,70 35,55 70,60 105,35 140,42 175,18 210,28 245,10 280,20"
                    fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="0,70 35,55 70,60 105,35 140,42 175,18 210,28 245,10 280,20 280,90 0,90"
                    fill="url(#heroGrad)" stroke="none" opacity="0.5" />
                  <defs>
                    <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(i => (
                  <div key={i} className="rounded bg-white/[0.04] border border-white/10 p-2.5">
                    <div className="h-1.5 rounded-full bg-white/15 mb-1.5" style={{ width: "70%" }} />
                    <div className="h-1.5 rounded-full bg-white/[0.08]" style={{ width: "45%" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 1 && (
            <div key="list" className="hero-fade-in">
              <div className="grid gap-1.5 mb-3">
                <div className="h-2 rounded-full bg-white/10" style={{ width: "45%" }} />
              </div>
              <div className="flex flex-col gap-2">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-2.5 rounded bg-white/[0.04] border border-white/10 p-2.5">
                    <div className="w-6 h-6 rounded shrink-0" style={{ background: i === 0 ? "#C9A84C40" : "rgba(255,255,255,0.06)" }} />
                    <div className="flex-1 grid gap-1">
                      <div className="h-1.5 rounded-full bg-white/12" style={{ width: `${60 - i * 8}%` }} />
                      <div className="h-1.5 rounded-full bg-white/[0.06]" style={{ width: `${40 - i * 4}%` }} />
                    </div>
                    <div className="h-1.5 w-6 rounded-full bg-gold-400/40 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {screen === 2 && (
            <div key="cards" className="hero-fade-in">
              <div className="grid gap-1.5 mb-3">
                <div className="h-2 rounded-full bg-white/10" style={{ width: "50%" }} />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="rounded bg-white/[0.04] border border-white/10 p-3">
                    <div className="w-5 h-5 rounded-sm mb-2" style={{ background: i === 0 ? "#C9A84C40" : "rgba(255,255,255,0.08)" }} />
                    <div className="h-1.5 rounded-full bg-white/15 mb-1.5" style={{ width: "80%" }} />
                    <div className="h-1.5 rounded-full bg-white/[0.06]" style={{ width: "50%" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Animated cursor */}
          <div
            className="absolute pointer-events-none z-10"
            style={{ left: `${cursor.x}%`, top: `${cursor.y}%`, transition: "left 0.9s cubic-bezier(0.65,0,0.35,1), top 0.9s cubic-bezier(0.65,0,0.35,1)" }}
          >
            <div className={`relative ${clicking ? "hero-cursor-click" : ""}`}>
              {clicking && <span className="absolute inset-0 rounded-full bg-gold-400/40 hero-pulse-ring" style={{ width: 16, height: 16, left: -4, top: -4 }} />}
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <path d="M1 1l4.5 13 2-5.5L13 6.5 1 1z" fill="white" stroke="#0B1640" strokeWidth="1" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* Laptop base */}
      <div className="h-2.5 rounded-b-lg" style={{ background: "linear-gradient(180deg,#1a2650,#0B1640)" }} />

      {/* Phone overlay */}
      <div className="absolute rounded-xl border border-white/15 overflow-hidden shadow-2xl"
        style={{ right: "-8%", bottom: "-14%", width: "34%", background: "#0B1640", aspectRatio: "9/18" }}>
        <div className="p-2.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="w-4 h-4 rounded-full bg-gold-400/30" />
            <div className="flex gap-1">
              <span className="w-3.5 h-1 rounded-full bg-white/10" />
              <span className="w-3.5 h-1 rounded-full bg-white/10" />
            </div>
          </div>
          {phoneScreen === 0 ? (
            <div key="phone-a" className="grid gap-1.5 hero-fade-in">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="h-3.5 rounded bg-white/[0.06]" />
              ))}
            </div>
          ) : (
            <div key="phone-b" className="hero-fade-in">
              <div className="rounded bg-white/[0.05] border border-white/10 p-2 mb-1.5">
                <svg viewBox="0 0 120 40" className="w-full h-auto" preserveAspectRatio="none">
                  <polyline points="0,32 15,26 30,28 45,16 60,20 75,8 90,14 105,4 120,10"
                    fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-6 rounded bg-white/[0.05] border border-white/10" />
                <div className="h-6 rounded bg-white/[0.05] border border-white/10" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

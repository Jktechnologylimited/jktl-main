"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Crown } from "lucide-react";
import PixelFace from "@/components/shared/PixelFace";
import { pricing, industries, features, affiliateTerms, appSignupUrl, siteConfig } from "@/data/index";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_REPLIES = [
  "What does JKTL Business do?",
  "How much does it cost?",
  "Is it free?",
  "What industries do you support?",
  "How much can I earn as an affiliate?",
  "Talk to a human",
];

/**
 * How long a visitor stays before they are spoken to.
 *
 * Not instant. A popup that appears before somebody has read a single line reads
 * as an advert and gets closed on reflex, which is worse than staying quiet —
 * they have now trained themselves to dismiss the thing that was supposed to help
 * them. Five seconds is long enough to have started reading and short enough that
 * they have not yet decided to leave.
 */
const NUDGE_DELAY_MS = 5_000;
/** One nudge per browser session. A visitor who dismissed it does not want it
 * again on the next page, and nagging is how a helpful assistant becomes an
 * annoyance. */
const NUDGE_KEY = "jktl.chat.nudged";

/**
 * What to say, by where they are.
 *
 * A generic "Hi, can I help?" is ignorable. A question about the page they are
 * actually reading is not: somebody on the pricing page has a pricing question,
 * and naming it is what makes the difference between a click and a dismissal.
 * Falls back to the generic greeting on pages with no obvious intent.
 */
function nudgeFor(pathname: string): string {
  if (pathname.startsWith("/pricing")) return "Want me to break the pricing down for your type of business?";
  if (pathname.startsWith("/industr")) return "Tell me your industry and I'll show you exactly what fits.";
  if (pathname.startsWith("/how-it-works")) return "Want to see this working on your own business? It takes two minutes.";
  if (pathname.startsWith("/about")) return "Questions about who we are? I can answer those.";
  if (pathname.startsWith("/contact")) return "Tell me what you need and I'll point you the right way — or bring in a human.";
  if (pathname.startsWith("/affiliate")) return "The partner programme pays ₦102,000 in the first year per referral. Interested?";
  return "Hi — I'm President. Ask me anything about JKTL Business, pricing, or the partner programme.";
}

/** The follow-up question the assistant opens with once the visitor engages from
 * a nudge, so the conversation starts relevant rather than at the greeting. */
function openerFor(pathname: string): string | null {
  if (pathname.startsWith("/pricing")) return "Which plan were you looking at?";
  if (pathname.startsWith("/industr")) return "What kind of business do you run?";
  if (pathname.startsWith("/how-it-works")) return "What would you like to see working first?";
  return null;
}

function answer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("plan") || q.includes("how much")) {
    return `It is ${pricing.monthly.headline} a month for the first six months — that is the ${pricing.upfront.headline} launch package split six ways, and together they come to exactly ${pricing.upfront.headline}. From month 7 it drops to ${pricing.monthly.ongoing}. You can also pay the ${pricing.upfront.headline} in full up front if you prefer. Either way you get ${pricing.shared.freeCredit} of communication credit included, and you can cancel any time from month one.`;
  }
  if (q.includes("free") && !q.includes("free credit")) {
    return `You can get started free with customer records, bookings, invoices, inventory and a basic business website. The AI receptionist is a separate paid package, with: ${pricing.shared.freeCredit} of communication credit to start, and a monthly option so you do not need the full ${pricing.upfront.headline} today.`;
  }
  if (q.includes("industr") || q.includes("business type") || q.includes("salon") || q.includes("gym") || q.includes("restaurant") || q.includes("shop")) {
    return `JKTL Business fits ${industries.length} broad groups of businesses -- ${industries.slice(0, 5).map(i => i.title).join(", ")}, and more. Visit our Industries page to see your type of business and what fits.`;
  }
  if (q.includes("affiliate") || q.includes("referral") || q.includes("commission") || q.includes("earn") || q.includes("partner")) {
    return `The partner programme pays ₦${affiliateTerms.signupBonus.toLocaleString()} when a business you referred creates an account, ₦${affiliateTerms.subscriptionBonus.toLocaleString()} more when they subscribe, then ₦${affiliateTerms.recurringMonthly.toLocaleString()} every month for as long as they stay subscribed. That is ₦${affiliateTerms.firstYearValue.toLocaleString()} from one referral in the first year. A referral is worth more than a sale here — you can read the whole thing and apply at jktl.com.ng/affiliates.`;
  }
  if (q.includes("what") && (q.includes("do") || q.includes("jktl") || q.includes("business"))) {
    return `JKTL Business gives your business an AI receptionist that answers every call, day or night, books the appointment, and texts back anyone it missed. Alongside it you get ${features.slice(0, 4).map(f => f.title.toLowerCase()).join(", ")}, and your own website built from your photographs and reviews. Want to see how it works?`;
  }
  if (q.includes("human") || q.includes("talk") || q.includes("support") || q.includes("contact")) {
    return `Happy to connect you with the team -- reach us at ${siteConfig.email} or WhatsApp ${siteConfig.phone}, or visit our Contact page.`;
  }
  if (q.includes("website") || q.includes("domain")) {
    return `Every business on JKTL Business gets a free published website on a jktl.com.ng subdomain -- your customers can find you and book or buy online. A custom domain is available on the paid plan.`;
  }
  if (q.includes("pay") || q.includes("invoice") || q.includes("paystack")) {
    return `You can invoice any customer and collect payment online right on the invoice, powered by Paystack -- no chasing bank transfers.`;
  }
  return `Good question -- I might not have that one scripted yet. For anything specific, reach the team at ${siteConfig.email} or visit our Contact page, and they'll help directly.`;
}

export default function BizChat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi, I'm President — JKTL Business's assistant. Ask me about pricing, features, industries, or the affiliate program." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  /**
   * The proactive part: a visitor who has been reading for a few seconds is told
   * the assistant is there, rather than being left to notice a small circle in
   * the corner. A badge appears on the launcher and a short bubble names the page
   * they are on.
   */
  const [teaser, setTeaser] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  /** What to ask first if they open from the nudge. */
  const [opener, setOpener] = useState<string | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  useEffect(() => {
    if (pathname?.startsWith("/affiliates/dashboard")) return;
    // One nudge per session: a visitor who dismissed it on the homepage does not
    // want it again on the next page.
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch {
      // Private browsing can throw on storage access; nudging is not worth
      // failing a render over.
    }

    const timer = setTimeout(() => {
      setTeaser(nudgeFor(pathname ?? "/"));
      setUnread(1);
      setOpener(openerFor(pathname ?? "/"));
      try {
        sessionStorage.setItem(NUDGE_KEY, "1");
      } catch {
        // As above.
      }
    }, NUDGE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [pathname]);

  // The marketing domain never runs the partner dashboard; the business app owns
  // it, and the proxy hands these paths over before this component ever mounts.
  if (pathname?.startsWith("/affiliates/dashboard") || pathname?.startsWith("/affiliate/dashboard")) return null;

  function openFromTeaser() {
    setTeaser(null);
    setUnread(0);
    setOpen(true);
    // Ask the relevant question straight away, so the visitor is not left staring
    // at a greeting they have already read.
    if (opener) {
      const question = opener;
      setOpener(null);
      setTimeout(() => send(question), 250);
    }
  }

  function send(text: string) {
    const question = text.trim();
    if (!question) return;
    setMessages(m => [...m, { from: "user", text: question }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(m => [...m, { from: "bot", text: answer(question) }]);
      setTyping(false);
    }, 500 + Math.random() * 400);
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => {
          setOpen(o => !o);
          setUnread(0);
          setTeaser(null);
        }}
        aria-label={open ? "Close chat" : "Chat with President"}
        className="fixed z-[200] flex items-center justify-center rounded-full shadow-lg"
        style={{ bottom: 24, right: 24, width: 58, height: 58, background: "var(--gold-400)", color: "var(--navy-950)", border: "none", cursor: "pointer" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Unread badge — the thing that makes a visitor notice the assistant
            exists. Suppressed once the panel is open, because at that point they
            are already looking at it. */}
        {!open && unread > 0 ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            aria-hidden="true"
            className="absolute flex items-center justify-center rounded-full text-[0.65rem] font-bold"
            style={{ top: -4, right: -4, minWidth: 20, height: 20, padding: "0 5px", background: "var(--navy-950)", color: "var(--gold-400)", border: "2px solid var(--gold-400)" }}
          >
            {unread}
          </motion.span>
        ) : null}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center"
          >
            {open ? <X size={24} /> : <PixelFace size={26} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Teaser bubble — announced politely, and dismissible, so it is an offer
          rather than an interruption. */}
      <AnimatePresence>
        {teaser && !open ? (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed z-[199] flex items-start gap-2"
            style={{ bottom: 92, right: 24, width: "min(300px, calc(100vw - 40px))" }}
          >
            <button
              onClick={openFromTeaser}
              className="flex-1 text-left cursor-pointer"
              style={{ background: "var(--site-surface)", border: "1px solid var(--cream-300)", borderRadius: "14px 14px 2px 14px", padding: "12px 14px", boxShadow: "0 12px 32px rgba(6,14,42,0.18)", font: "inherit" }}
            >
              <span className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                <span className="relative flex items-center justify-center rounded-full shrink-0" style={{ width: 22, height: 22, background: "var(--navy-950)", color: "var(--gold-400)" }}>
                  <PixelFace size={12} />
                </span>
                <span className="text-[0.7rem] font-semibold" style={{ color: "var(--site-text)" }}>
                  President
                </span>
                <span className="text-[0.62rem]" style={{ color: "var(--site-muted)" }}>
                  just now
                </span>
              </span>
              <span className="block text-[0.8rem] leading-snug" style={{ color: "var(--site-text)" }}>
                {teaser}
              </span>
            </button>
            <button
              onClick={() => { setTeaser(null); setUnread(0); }}
              aria-label="Dismiss message"
              className="shrink-0 flex items-center justify-center rounded-full cursor-pointer"
              style={{ width: 24, height: 24, background: "rgba(6,14,42,0.55)", color: "#fff", border: "none", marginTop: 2 }}
            >
              <X size={13} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[199] flex flex-col overflow-hidden"
            style={{
              bottom: 92, right: 24, width: "min(380px, calc(100vw - 32px))", height: "min(560px, calc(100vh - 140px))",
              background: "var(--site-surface)", borderRadius: 16, boxShadow: "0 24px 64px rgba(6,14,42,0.35)", border: "1px solid var(--cream-300)",
              transformOrigin: "bottom right",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4" style={{ background: "var(--navy-950)" }}>
            <div className="relative rounded-full flex items-center justify-center shrink-0" style={{ width: 38, height: 38, background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", color: "var(--gold-400)" }}>
              <PixelFace size={19} />
              <span className="absolute rounded-full flex items-center justify-center" style={{ top: -6, right: -6, width: 16, height: 16, background: "var(--gold-400)", border: "2px solid var(--navy-950)" }}>
                <Crown size={9} style={{ color: "var(--navy-950)" }} />
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[0.9rem]" style={{ color: "#fff" }}>President</p>
              <p className="text-[0.68rem] flex items-center gap-1.5" style={{ color: "rgba(249,247,240,0.45)" }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#34D399" }} />
                JKTL Business Assistant
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: "var(--site-paper)" }}>
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`max-w-[85%] px-3.5 py-2.5 text-[0.83rem] leading-relaxed ${m.from === "user" ? "self-end" : "self-start"}`}
                  style={{
                    background: m.from === "user" ? "var(--navy-900)" : "var(--site-surface)",
                    color: m.from === "user" ? "#fff" : "var(--site-text)",
                    border: m.from === "bot" ? "1px solid var(--cream-300)" : "none",
                    borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  }}>
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="self-start flex gap-1 px-3.5 py-3 rounded-xl" style={{ background: "var(--site-surface)", border: "1px solid var(--cream-300)", borderRadius: "12px 12px 12px 2px" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} className="rounded-full" style={{ width: 5, height: 5, background: "var(--site-muted)", animation: `heroPulseRing 1s ease-in-out ${i * 0.15}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          {messages.length < 3 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-2">
              {QUICK_REPLIES.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="text-[0.72rem] px-3 py-1.5 rounded-full cursor-pointer"
                  style={{ background: "var(--site-tint)", border: "1px solid var(--cream-300)", color: "var(--site-text)" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-cream-300" style={{ background: "var(--site-surface)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask President a question..."
              className="flex-1 text-[0.85rem] px-3.5 py-2.5 rounded-full outline-none"
              style={{ background: "var(--site-tint)", border: "1px solid var(--cream-300)" }}
            />
            <button onClick={() => send(input)} aria-label="Send"
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 38, height: 38, background: "var(--gold-400)", color: "var(--navy-950)", border: "none", cursor: "pointer" }}>
              <Send size={16} />
            </button>
          </div>
          <a href={appSignupUrl()} className="text-center text-[0.7rem] py-2" style={{ color: "var(--site-accent)", background: "var(--site-tint)", textDecoration: "none" }}>
            Ready to start? Get JKTL Business free {"->"}
          </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

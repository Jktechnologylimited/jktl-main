"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Crown } from "lucide-react";
import PixelFace from "@/components/shared/PixelFace";
import { pricing, industries, features, affiliateTerms, appSignupUrl, siteConfig } from "@/data/index";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_REPLIES = ["What does JKTL Business do?", "How much does it cost?", "Is it free?", "What industries do you support?", "How do I become an affiliate?", "Talk to a human"];

function answer(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("cost") || q.includes("price") || q.includes("pricing") || q.includes("plan")) {
    return `${pricing.free.name} is ${pricing.free.price} -- ${pricing.free.tagline} The ${pricing.paid.name} is ${pricing.paid.priceMonthly}/mo or ${pricing.paid.priceYearly}/yr (${pricing.paid.savingsNote.toLowerCase()}) and unlocks extra staff seats, more storage, and a custom domain. Want the full breakdown? Check out our Pricing page.`;
  }
  if (q.includes("free")) {
    return `Yes -- the core of JKTL Business is completely free: customer records, bookings/sales tracking, invoicing with online payment, inventory tracking, expense tracking, and a free business website. No card required to start.`;
  }
  if (q.includes("industr") || q.includes("business type") || q.includes("salon") || q.includes("gym") || q.includes("restaurant") || q.includes("shop")) {
    return `JKTL Business fits ${industries.length} broad groups of businesses -- ${industries.slice(0, 5).map(i => i.title).join(", ")}, and more. Visit our Industries page to see your type of business and what fits.`;
  }
  if (q.includes("affiliate") || q.includes("referral") || q.includes("commission") || q.includes("earn")) {
    return `Our affiliate program pays ${affiliateTerms.recurringRate}% recurring commission on every business you refer that subscribes to a paid plan -- for as long as they stay subscribed -- plus a ₦${affiliateTerms.welcomeBonus.toLocaleString()} welcome bonus on your first upgrade. Check out our Affiliates page to join free.`;
  }
  if (q.includes("what") && (q.includes("do") || q.includes("jktl") || q.includes("business"))) {
    return `JKTL Business is a free, mobile-first app for Nigerian businesses -- it covers ${features.slice(0, 4).map(f => f.title.toLowerCase()).join(", ")}, and more, plus a free business website. Want to see how it works?`;
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

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  if (pathname?.startsWith("/affiliates/dashboard")) return null;

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
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Chat with President"}
        className="fixed z-[200] flex items-center justify-center rounded-full shadow-lg"
        style={{ bottom: 24, right: 24, width: 58, height: 58, background: "var(--gold-400)", color: "var(--navy-950)", border: "none", cursor: "pointer" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
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

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed z-[199] flex flex-col overflow-hidden"
            style={{
              bottom: 92, right: 24, width: "min(380px, calc(100vw - 32px))", height: "min(560px, calc(100vh - 140px))",
              background: "#fff", borderRadius: 16, boxShadow: "0 24px 64px rgba(6,14,42,0.35)", border: "1px solid var(--cream-300)",
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
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ background: "var(--cream-50)" }}>
            <AnimatePresence initial={false}>
              {messages.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`max-w-[85%] px-3.5 py-2.5 text-[0.83rem] leading-relaxed ${m.from === "user" ? "self-end" : "self-start"}`}
                  style={{
                    background: m.from === "user" ? "var(--navy-900)" : "#fff",
                    color: m.from === "user" ? "#fff" : "rgba(28,28,30,0.8)",
                    border: m.from === "bot" ? "1px solid var(--cream-300)" : "none",
                    borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  }}>
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="self-start flex gap-1 px-3.5 py-3 rounded-xl" style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: "12px 12px 12px 2px" }}>
                {[0, 1, 2].map(i => (
                  <span key={i} className="rounded-full" style={{ width: 5, height: 5, background: "rgba(28,28,30,0.3)", animation: `heroPulseRing 1s ease-in-out ${i * 0.15}s infinite` }} />
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
                  style={{ background: "var(--cream-100)", border: "1px solid var(--cream-300)", color: "var(--navy-800)" }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-cream-300" style={{ background: "#fff" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Ask President a question..."
              className="flex-1 text-[0.85rem] px-3.5 py-2.5 rounded-full outline-none"
              style={{ background: "var(--cream-100)", border: "1px solid var(--cream-300)" }}
            />
            <button onClick={() => send(input)} aria-label="Send"
              className="flex items-center justify-center rounded-full shrink-0"
              style={{ width: 38, height: 38, background: "var(--gold-400)", color: "var(--navy-950)", border: "none", cursor: "pointer" }}>
              <Send size={16} />
            </button>
          </div>
          <a href={appSignupUrl()} className="text-center text-[0.7rem] py-2" style={{ color: "var(--navy-700)", background: "var(--cream-100)", textDecoration: "none" }}>
            Ready to start? Get JKTL Business free {"->"}
          </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

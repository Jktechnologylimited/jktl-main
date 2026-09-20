"use client";
import { useState } from "react";

export type ModalOffer = { type: "service" | "package" | "addon"; id: string; name: string };

// Extracted from app/offers/page.tsx so the new /offers/[slug] detail pages
// can reuse the exact same checkout/book/quote flow rather than a second
// copy of this logic. Real deposit choice: for standardized offers, the
// customer picks 40/60/100% -- only that portion is actually charged via
// Paystack, and the webhook creates one real invoice for the full price
// with the deposit applied as a payment against it.
export default function OfferModal({ offer, mode, onClose }: { offer: ModalOffer; mode: "pay" | "book" | "quote"; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [depositPercent, setDepositPercent] = useState(100);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setError("Name and email are required"); return; }
    setSubmitting(true); setError("");
    try {
      if (mode === "pay") {
        const res = await fetch("/api/offers/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ offerType: offer.type, offerId: offer.id, name, email, phone, depositPercent }) });
        const d = await res.json();
        if (!res.ok) { setError(d.error || "Something went wrong"); setSubmitting(false); return; }
        window.location.href = d.paymentUrl;
      } else if (mode === "quote") {
        const res = await fetch("/api/offers/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, offerName: offer.name, details }) });
        const d = await res.json();
        if (!res.ok) { setError(d.error || "Something went wrong"); setSubmitting(false); return; }
        setDone(true); setSubmitting(false);
      } else {
        const res = await fetch("/api/offers/book", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, offerName: offer.name }) });
        const d = await res.json();
        if (!res.ok) { setError(d.error || "Something went wrong"); setSubmitting(false); return; }
        setDone(true); setSubmitting(false);
      }
    } catch { setError("Something went wrong. Please try again."); setSubmitting(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(6,14,42,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 8, padding: 28, maxWidth: 420, width: "100%" }} onClick={e => e.stopPropagation()}>
        {done ? (
          <>
            <p className="font-bold text-[1.1rem] text-navy-900 mb-2">{mode === "quote" ? "Quote request received" : "Request received"}</p>
            <p className="text-[0.85rem] text-black/55 mb-5">
              {mode === "quote"
                ? <>We&apos;ll review your project and get back to you with a scoped quote for &ldquo;{offer.name}&rdquo; shortly.</>
                : <>We&apos;ll be in touch about &ldquo;{offer.name}&rdquo; shortly.</>}
            </p>
            <button onClick={onClose} className="btn-outline-navy w-full py-2.5 text-[0.78rem] uppercase tracking-wide">Close</button>
          </>
        ) : (
          <form onSubmit={submit}>
            <p className="font-bold text-[1.1rem] text-navy-900 mb-1">{mode === "pay" ? "Checkout" : mode === "quote" ? "Get a Quote" : "Book a Call"}</p>
            <p className="text-[0.82rem] text-black/50 mb-5">{offer.name}</p>

            {mode === "pay" && (
              <div className="mb-4">
                <label className="block text-[0.72rem] font-semibold text-black/50 uppercase tracking-wide mb-2">How much would you like to pay now?</label>
                <div className="flex gap-2">
                  {[40, 60, 100].map(p => (
                    <button key={p} type="button" onClick={() => setDepositPercent(p)}
                      className="flex-1 py-2.5 rounded-sm text-[0.8rem] font-bold border"
                      style={{ background: depositPercent === p ? "var(--navy-900, #060E2A)" : "transparent", color: depositPercent === p ? "#fff" : "rgba(6,14,42,0.5)", borderColor: depositPercent === p ? "var(--navy-900, #060E2A)" : "#E5E0D5" }}>
                      {p === 100 ? "Pay in Full" : `${p}% Deposit`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 mb-4">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="px-3 py-2.5 rounded-sm border border-cream-300 text-[0.85rem] outline-none" />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email address" className="px-3 py-2.5 rounded-sm border border-cream-300 text-[0.85rem] outline-none" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (optional)" className="px-3 py-2.5 rounded-sm border border-cream-300 text-[0.85rem] outline-none" />
              {mode === "quote" && (
                <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Tell us a bit about what you need (optional, but helps us scope faster)" rows={3} className="px-3 py-2.5 rounded-sm border border-cream-300 text-[0.85rem] outline-none resize-y" />
              )}
            </div>
            {error && <p className="text-red-600 text-[0.8rem] mb-3">{error}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="btn-outline-navy flex-1 py-2.5 text-[0.76rem] uppercase tracking-wide">Cancel</button>
              <button type="submit" disabled={submitting} className="btn-gold flex-1 py-2.5 text-[0.76rem] uppercase tracking-wide">{submitting ? "..." : mode === "pay" ? "Continue to Payment" : mode === "quote" ? "Request Quote" : "Request Call"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import Link from "next/link";
export function PartnerApplication() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setStatus("");
        const form = e.currentTarget;
        const data = Object.fromEntries(new FormData(form));
        try {
          const r = await fetch("/api/partners", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!r.ok) throw Error();
          setDone(true);
          setStatus(
            "Application received. JKTL will review your business and discuss a partner agreement before activation.",
          );
        } catch {
          setStatus(
            "Your application could not be saved. Please retry; your entries are still here.",
          );
        } finally {
          setBusy(false);
        }
      }}
      className="grid gap-5"
      aria-label="JKTL Partner application"
    >
      {!done && (
        <>
          <label className="grid gap-2 text-sm">
            Full name
            <input
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Work email
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Business or agency name
            <input
              name="company"
              required
              maxLength={180}
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Your specialism
            <select
              name="specialism"
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            >
              {[
                "Website developer",
                "Digital marketing agency",
                "Business consultant",
                "CAC registration agent",
                "Other business professional",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Clients you support each month
            <input
              name="clients"
              type="number"
              min="1"
              max="10000"
              required
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            />
          </label>
          <label className="grid gap-2 text-sm">
            Tell us about your clients and how you would work with JKTL
            <textarea
              name="message"
              required
              maxLength={2000}
              rows={4}
              className="border border-gold-400/30 rounded-lg p-3 bg-white"
            />
          </label>
          <label className="flex gap-3 text-xs leading-relaxed">
            <input name="consent" type="checkbox" value="yes" required />I agree
            to be contacted about this application and acknowledge the Privacy
            Policy. Commission rates, eligible purchases and payout terms
            require a written partner agreement.
          </label>
          <Link href="/privacy" className="text-xs underline">
            Read the Privacy Policy
          </Link>
          <button disabled={busy} className="btn-gold px-7 py-4 text-sm">
            {busy ? "Submitting…" : "Apply to become a partner"}
          </button>
        </>
      )}
      <p role="status" className="text-sm">
        {status}
      </p>
    </form>
  );
}

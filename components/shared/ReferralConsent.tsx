"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const endpoint = "https://business.jktl.com.ng/api/referrals/capture";
export function ReferralPreferences() {
  const [message, setMessage] = useState("");
  return (
    <div>
      <button
        type="button"
        className="btn-outline-navy"
        onClick={async () => {
          try {
            const r = await fetch(endpoint, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ decline: true }),
            });
            if (!r.ok) throw Error();
            setMessage(
              "Referral cookie removed. Existing accounting records are retained where required.",
            );
          } catch {
            setMessage(
              "Could not change the referral cookie. You can also remove JKTL cookies in your browser settings.",
            );
          }
        }}
      >
        Disable referral tracking
      </button>
      {message && <p role="status">{message}</p>}
    </div>
  );
}
export function ReferralConsent() {
  const params = useSearchParams(),
    code = params.get("ref") || "";
  const [done, setDone] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  if (done || !/^[a-zA-Z0-9_-]{3,64}$/.test(code)) return null;
  async function decide(consent: boolean) {
    setBusy(true);
    try {
      const r = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          consent ? { code, consent: true } : { decline: true },
        ),
      });
      if (!r.ok) throw Error();
      setDone(true);
    } catch {
      setError("Tracking is unavailable. You can continue without it.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <aside
      aria-label="Referral tracking choice"
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 80,
        maxWidth: 460,
        width: "calc(100% - 40px)",
        background: "var(--site-paper, #fff)",
        color: "var(--site-ink,#060e2a)",
        border: "1px solid #c9a84c",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 10px 40px #0002",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image src="/logo.png" width={32} height={32} alt="JKTL" />
        <strong>Someone introduced you to JKTL.</strong>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.7, margin: "12px 0" }}>
        Allow a 30-day referral cookie to credit their introduction if you
        become an eligible customer. Your price does not change, and you can
        continue without tracking.{" "}
        <Link href="/privacy" style={{ textDecoration: "underline" }}>
          Privacy policy
        </Link>
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(true)}
          style={{
            padding: "10px 14px",
            border: "1px solid #c9a84c",
            borderRadius: 8,
          }}
        >
          Allow referral credit
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => decide(false)}
          style={{ padding: "10px", textDecoration: "underline" }}
        >
          Continue without tracking
        </button>
      </div>
      {error && <p role="status">{error}</p>}
    </aside>
  );
}

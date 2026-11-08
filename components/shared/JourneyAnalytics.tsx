"use client";
import { useEffect, useSyncExternalStore, useState } from "react";
import { usePathname } from "next/navigation";
const cookie = "jktl_journey_analytics";
const endpoint = "https://business.jktl.com.ng/api/growth/visit";
function snapshot() {
  return typeof document === "undefined"
    ? false
    : document.cookie.split("; ").includes(cookie + "=yes");
}
function subscribe(fn: () => void) {
  window.addEventListener("jktl-analytics-consent", fn);
  return () => window.removeEventListener("jktl-analytics-consent", fn);
}
export function JourneyAnalytics() {
  const pathname = usePathname();
  const allowed = useSyncExternalStore(subscribe, snapshot, () => false);
  const [message, setMessage] = useState("");
  const privacy = () =>
    navigator.doNotTrack === "1" ||
    Boolean(
      (navigator as Navigator & { globalPrivacyControl?: boolean })
        .globalPrivacyControl,
    );
  useEffect(() => {
    if (!allowed || privacy()) return;
    void fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consent: true, path: pathname }),
      keepalive: true,
    }).catch(() => {});
  }, [allowed, pathname]);
  async function change(value: boolean) {
    if (value && privacy()) {
      setMessage(
        "Your browser privacy preference prevents optional journey analytics.",
      );
      return;
    }
    document.cookie = `${cookie}=${value ? "yes" : "no"}; Path=/; Max-Age=2592000; SameSite=Lax; Domain=.jktl.com.ng; Secure`;
    window.dispatchEvent(new Event("jktl-analytics-consent"));
    if (!value) {
      try {
        const r = await fetch(endpoint, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ consent: false }),
        });
        if (!r.ok) throw Error();
        setMessage(
          "Optional journey analytics disabled and browser journey removed.",
        );
      } catch {
        setMessage(
          "Tracking is off. The server could not remove the previous journey yet; please retry. Stored journeys expire after 30 days.",
        );
      }
    } else setMessage("Optional journey analytics enabled for 30 days.");
  }
  return (
    <details style={{ padding: "12px 24px", fontSize: 12 }}>
      <summary>Privacy &amp; optional journey analytics</summary>
      <p>
        With your permission, JKTL can connect visits on its main site to
        website signup and activation. This uses a 30-day browser identifier,
        without storing your IP address or page query strings. Counts cover
        consenting browsers, not all visitors.
      </p>
      <label
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          padding: "8px 0",
        }}
      >
        <input
          type="checkbox"
          checked={allowed}
          onChange={(e) => void change(e.target.checked)}
        />
        Allow optional journey analytics
      </label>
      <button type="button" onClick={() => void change(false)}>
        Turn off and remove my journey
      </button>
      <p role="status">{message}</p>
    </details>
  );
}

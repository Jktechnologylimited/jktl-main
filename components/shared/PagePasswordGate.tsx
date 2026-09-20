"use client";
import { useState } from "react";

export default function PagePasswordGate({ pageId, title }: { pageId: string; title: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true); setError("");
    const res = await fetch("/api/pages/unlock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pageId, password }) });
    if (res.ok) { window.location.reload(); return; }
    const d = await res.json();
    setError(d.error || "Incorrect password");
    setChecking(false);
  }

  return (
    <section style={{ background: "var(--navy-950)", minHeight: "70vh", display: "flex", alignItems: "center", paddingTop: "120px", paddingBottom: "64px" }}>
      <div className="max-w-md mx-auto px-8 w-full">
        <h1 className="display-lg mb-3" style={{ color: "var(--cream-50)" }}>{title}</h1>
        <p style={{ color: "rgba(249,247,240,0.5)", marginBottom: 24, fontSize: "0.9rem" }}>This page is password protected.</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password"
            style={{ padding: "12px 16px", borderRadius: 6, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.9rem", outline: "none" }} />
          {error && <p style={{ color: "#F87171", fontSize: "0.82rem" }}>{error}</p>}
          <button type="submit" disabled={checking} className="btn-gold py-3 text-sm uppercase tracking-wide">{checking ? "Checking..." : "Unlock"}</button>
        </form>
      </div>
    </section>
  );
}

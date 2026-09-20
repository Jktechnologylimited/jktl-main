"use client";
import { useState, useEffect } from "react";

export default function MaterialsPage() {
  const [code, setCode] = useState("LOADING");
  const [copied, setCopied] = useState<string | null>(null);
  const mainSite = "https://jktl.com.ng";

  useEffect(() => {
    fetch("/api/affiliates/me").then(r => r.json()).then(d => {
      if (d.referralCode) setCode(d.referralCode);
    });
  }, []);

  const refLink = `${mainSite}?ref=${code}`;

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const materials = [
    {
      category: "WhatsApp Messages",
      items: [
        {
          key: "wa1", label: "General introduction",
          text: `Hi [Name], I wanted to share something that could help your business. JKTL Business is a free app for managing customers, bookings/sales, invoicing, and stock -- it also gives you a free website so customers can find and book you online. No cost to start: ${refLink}`,
        },
        {
          key: "wa2", label: "For salons, spas & beauty businesses",
          text: `Hi [Name], are you still tracking bookings and clients in a notebook or your DMs? JKTL Business is a free app built for salons and beauty businesses -- bookings, client history, invoicing with online payment, and a free website customers can book from. Worth a look: ${refLink}`,
        },
        {
          key: "wa3", label: "For shops & retailers",
          text: `Hi [Name], JKTL Business is a free app that tracks your inventory, alerts you before you run low on stock, and lets you invoice customers with online payment via Paystack. It's free to start -- check it out: ${refLink}`,
        },
      ],
    },
    {
      category: "Email Templates",
      items: [
        {
          key: "em1", label: "Introduction email -- general",
          text: `Subject: A free tool that might help [Business Name]

Hi [Name],

I wanted to share JKTL Business -- a free, mobile-first app built for Nigerian small businesses.

It covers customer records, bookings or sales tracking, invoicing with online payment (Paystack), inventory with low-stock alerts, expense tracking, and a free published website on jktl.com.ng. All from your phone.

Core features are completely free. A paid plan (₦5,000/month) unlocks extra staff seats, more storage, and a custom domain -- but you don't need it to get started.

Worth a look: ${refLink}

Best,
[Your Name]`,
        },
        {
          key: "em2", label: "Follow-up email",
          text: `Subject: Re: JKTL Business for [Business Name]

Hi [Name],

Just following up on my earlier note about JKTL Business.

It's free to sign up and set up -- no card required. You get a working business website and can start tracking customers, bookings/sales, and invoices the same day.

Try it here: ${refLink}

Happy to walk you through it if useful.

Best,
[Your Name]`,
        },
      ],
    },
    {
      category: "Social Media Captions",
      items: [
        {
          key: "sm1", label: "LinkedIn -- professional",
          text: `If you're running a small or medium business in Nigeria and still tracking customers, bookings, and invoices by hand, there's a free tool worth knowing about.

JKTL Business gives you customer records, bookings/sales tracking, invoicing with online payment, inventory tracking, and a free business website -- all from your phone. Free to start, no card required.

See it here: ${refLink}`,
        },
        {
          key: "sm2", label: "Instagram / Facebook",
          text: `Running your business from WhatsApp and a notebook? There's a better way.

JKTL Business is a FREE app for Nigerian businesses -- track customers, take bookings, send invoices customers can pay online, manage stock, and get a free website. All from your phone.

Check it out (free): ${refLink}`,
        },
      ],
    },
    {
      category: "Key Talking Points",
      items: [
        {
          key: "tp1", label: "For beauty, fitness & wellness businesses",
          text: `- Bookings that don't double-book, plus a searchable history of every client.
- Invoice a client and let them pay online via Paystack, right on the invoice.
- Every business gets a free published website customers can book from directly.
- Core plan is completely free. Paid plan is ₦5,000/mo for extra staff seats and a custom domain.`,
        },
        {
          key: "tp2", label: "For retail, food & trade businesses",
          text: `- Track stock and get alerted before anything runs low.
- Sales tracking instead of appointments -- built for how retail actually works.
- Expense tracking so the owner always knows real numbers, not guesses.
- Free to start. No setup fee, no contract.`,
        },
        {
          key: "tp3", label: "Why it's cheaper than the alternatives",
          text: `- Free core plan; paid plan is ₦5,000/month or ₦50,000/year (about 17% cheaper paying yearly).
- Undercuts Nigerian tools like Bumpa and Catlog, and costs a fraction of international tools like GlossGenius, Square, Vagaro, Booksy or Fresha.
- No long-term contract -- cancel anytime.`,
        },
      ],
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: 4 }}>Marketing Materials</h1>
        <p className="body-sm" style={{ color: "rgba(28,28,30,0.45)" }}>Ready-made copy with your referral link already embedded. Click to copy and use anywhere.</p>
      </div>

      <div className="page-body">
        {materials.map(cat => (
          <div key={cat.category} style={{ marginBottom: 32 }}>
            <h2 style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--navy-900)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "2px solid var(--cream-300)" }}>
              {cat.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {cat.items.map(item => (
                <div key={item.key} style={{ background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 4 }}>
                  <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--cream-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--navy-900)" }}>{item.label}</p>
                    <button onClick={() => copy(item.text, item.key)} className="btn-outline-navy btn-sm">
                      {copied === item.key ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <div style={{ padding: "14px 18px" }}>
                    <pre style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.82rem", color: "rgba(28,28,30,0.65)", lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
                      {item.text.replace(/LOADING/g, code)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

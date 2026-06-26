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
          text: `Hi [Name], I wanted to share something that could help your business. I've been working with JK Technology -- they build complete digital systems for businesses in Nigeria. Website, SEO, CRM, AI chatbot, payment systems -- all integrated. They've delivered 50+ projects. You can try their demos for free here: ${refLink}`,
        },
        {
          key: "wa2", label: "For law firms",
          text: `Hi [Name], are you looking to get more corporate clients finding your law firm online? JK Technology builds complete digital systems for law firms -- website, SEO rankings on Google, lead capture. They built the system for K.K. Ubani & Co. in Port Harcourt. Check it out here: ${refLink}`,
        },
        {
          key: "wa3", label: "For clinics",
          text: `Hi [Name], I know managing appointments and patient follow-ups manually is exhausting. JK Technology builds clinic management systems -- booking, patient CRM, WhatsApp reminders, payments. Clinics using it have cut no-shows by 70%. See it here: ${refLink}`,
        },
      ],
    },
    {
      category: "Email Templates",
      items: [
        {
          key: "em1", label: "Cold email -- general",
          text: `Subject: A digital system your business might need

Hi [Name],

I'm reaching out because I recently started working with JK Technology Limited and I think their services could genuinely help [Business Name].

They build complete digital business systems -- not just websites, but integrated platforms covering website, SEO, CRM, email automation, payment infrastructure, and AI chatbots. Everything your business needs to attract clients, convert leads, and run efficiently.

They've delivered systems for law firms, clinics, service businesses, and retailers across Nigeria.

Worth a look: ${refLink}

Best,
[Your Name]`,
        },
        {
          key: "em2", label: "Follow-up email",
          text: `Subject: Re: Digital systems for [Business Name]

Hi [Name],

Just following up on my earlier message about JK Technology.

I know it can be hard to commit to any digital investment without seeing results first -- which is why JKTL has built live, interactive demos for every service they offer. You can try the CRM, invoice generator, AI chatbot, and more before spending a single naira.

Try here: ${refLink}/demos

If you want to discuss how they'd approach your specific situation, they respond within 24 hours.

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
          text: `If your business is still relying on word-of-mouth and WhatsApp to get clients, you are leaving significant revenue on the table.

JK Technology Limited builds complete digital business systems -- website, SEO, CRM, automation, AI chatbot, payment infrastructure -- all integrated and working together.

They've delivered 50+ systems for businesses across Nigeria in law, healthcare, auto, consulting, retail, and more.

See what your business could look like with the right digital infrastructure: ${refLink}`,
        },
        {
          key: "sm2", label: "Instagram / Facebook",
          text: `Does your business have a website that actually gets clients? Not just a pretty page -- a SYSTEM that attracts, captures, and converts leads automatically while you focus on your work.

JK Technology builds digital systems for Nigerian businesses. Website + SEO + CRM + AI + Payments. All connected.

Try their free demos -- no login needed: ${refLink}`,
        },
      ],
    },
    {
      category: "Key Talking Points",
      items: [
        {
          key: "tp1", label: "For service businesses (plumbers, electricians, etc.)",
          text: `- Most clients search Google when they need a plumber or electrician urgently. If you are not on page 1, you miss those jobs.
- JKTL builds the website, sets up the SEO, and adds WhatsApp automation so every missed call gets a follow-up message.
- Businesses on our system average 10-20 new inbound leads per month from Google alone.
- Cost: from ₦150,000 setup. First new client from Google usually pays for it within 30 days.`,
        },
        {
          key: "tp2", label: "For clinics and health practices",
          text: `- Manual appointment booking and WhatsApp scheduling leads to double-bookings and high no-show rates.
- Our clinic system adds automated booking, patient reminders, and a CRM that tracks every patient.
- Clinics using it have reduced no-shows by over 60% within 60 days.
- Cost: from ₦300,000 setup + ₦30,000/month. ROI is typically within 3-4 months.`,
        },
        {
          key: "tp3", label: "For consultants and agencies",
          text: `- Consultants lose clients because they look unprofessional online or have no system for following up with leads.
- JKTL builds a website that positions you as an authority, a landing page for your flagship offer, and email automation that nurtures every prospect.
- You close more deals because the system pre-qualifies clients before they even contact you.
- Growth package from ₦500,000 -- typically 2x ROI within 6 months.`,
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
                    <button onClick={() => copy(item.text, item.key)} className="btn btn-outline btn-sm">
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

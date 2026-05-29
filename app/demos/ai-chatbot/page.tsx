"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

interface Message { role: "bot" | "user"; text: string; }

const botReplies: Record<string, string> = {
  "services": "We offer 8 core systems: Website & Landing Pages, Lead Generation, Email Automation, CRM, Payments, SEO, AI Automation, and the Full Business System Package. Which one interests you most?",
  "price": "Our pricing starts at ₦150,000 for a basic website and goes up to ₦5,000,000+ for a full enterprise business system. Would you like a personalised quote for your specific business?",
  "pricing": "Pricing starts at ₦150,000. For a personalised quote, can you tell me: what type of business do you run, and what's the main challenge you want to solve?",
  "website": "Our Website & Landing Page System includes a professional business website, SEO setup, contact forms, WhatsApp integration, and Google Maps integration. Starting from ₦150,000. Want to see a demo?",
  "crm": "Our CRM system tracks every lead, manages your sales pipeline, monitors staff, and gives you full analytics. Perfect for businesses managing 10+ clients. Pricing from ₦300,000. Want to try the live CRM demo?",
  "seo": "Our SEO system covers Google Business Profile, keyword targeting, local rankings, and monthly reporting. Starting at ₦150,000 setup + ₦50,000/month. Want me to do a quick audit of your current online presence?",
  "demo": "You can try all 8 of our interactive demos right here! Try the CRM, invoice generator, email automation — all live. Which one would you like to start with?",
  "contact": `You can reach us directly: Email ${siteConfig.email} or call ${siteConfig.phone}. We respond within 24 hours. Would you like me to help you draft your enquiry?`,
  "invoice": "Yes! We have a free Invoice Generator at invoice.jktl.com.ng — unlimited invoices, custom branding, PDF download. Completely free forever.",
  "free": "We offer 4 free tools: Invoice Generator, Receipt Generator, Profit Calculator, and Pricing Calculator — all free forever at their own subdomains. Would you like the links?",
  "hello": "Hello! I'm JKTL's AI assistant. I can help you understand our services, get pricing, or point you to the right demo. What does your business need help with?",
  "hi": "Hi there! How can I help you today? You can ask me about our services, pricing, demos, or free tools.",
  "default": "That's a great question. For the most accurate answer, I'd recommend emailing us at info@jktl.com.ng or calling +234 703 658 0994 — our team responds within 24 hours. Is there anything else I can help clarify?",
};

const getBotReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(botReplies)) {
    if (lower.includes(key)) return reply;
  }
  return botReplies.default;
};

const quickReplies = ["What are your services?", "How much does it cost?", "Do you have free tools?", "Show me the CRM demo", "How do I contact you?"];

export default function AIChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role:"bot", text:"Hello! I'm the JK Technology AI assistant. I'm available 24/7 to answer your questions about our digital systems. How can I help your business today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role:"user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(prev => [...prev, { role:"bot", text:reply }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: AI Chatbot & Automation</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Live AI assistant — ask about services, pricing, demos, or free tools</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Add AI to My Site</a>
        </div>
      </div>

      <div style={{ maxWidth:"720px", margin:"32px auto", padding:"0 24px" }}>
        <div style={{ background:"#fff", borderRadius:"12px", overflow:"hidden", boxShadow:"0 4px 24px rgba(0,0,0,0.1)", display:"flex", flexDirection:"column", height:"600px" }}>
          {/* Chat header */}
          <div style={{ background:"#0b1f3a", padding:"16px 20px", display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:40, height:40, background:"#C9A84C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", fontWeight:700, color:"#0b1f3a" }}>AI</span>
            </div>
            <div>
              <p style={{ fontWeight:700, fontSize:"0.9rem", color:"#fff" }}>JKTL AI Assistant</p>
              <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#34D399", display:"inline-block" }} />
                <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.6)" }}>Online — responds instantly</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", display:"flex", flexDirection:"column", gap:"12px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display:"flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "bot" && (
                  <div style={{ width:28, height:28, background:"#C9A84C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginRight:"8px", marginTop:"2px" }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.55rem", fontWeight:700, color:"#0b1f3a" }}>AI</span>
                  </div>
                )}
                <div style={{ maxWidth:"75%", padding:"12px 16px", background: msg.role === "user" ? "#0b1f3a" : "#f5f5f5", color: msg.role === "user" ? "#fff" : "#222", borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize:"0.875rem", lineHeight:1.6 }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:28, height:28, background:"#C9A84C", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.55rem", fontWeight:700, color:"#0b1f3a" }}>AI</span>
                </div>
                <div style={{ background:"#f5f5f5", padding:"10px 16px", borderRadius:"16px 16px 16px 4px", display:"flex", gap:"4px", alignItems:"center" }}>
                  {[0,1,2].map(d => (
                    <div key={d} style={{ width:6, height:6, borderRadius:"50%", background:"#aaa", animation:`bounce${d} 1.2s infinite`, animationDelay:`${d*0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding:"8px 16px", borderTop:"1px solid #f0f0f0", display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {quickReplies.map(qr => (
              <button key={qr} onClick={() => send(qr)}
                style={{ padding:"5px 12px", background:"transparent", border:"1px solid #e0e0e0", borderRadius:"99px", fontSize:"0.72rem", cursor:"pointer", color:"#555", whiteSpace:"nowrap" }}>
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding:"12px 16px", borderTop:"1px solid #f0f0f0", display:"flex", gap:"8px" }}>
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Type a message..." style={{ flex:1, padding:"10px 14px", border:"1px solid #e0e0e0", borderRadius:"24px", fontSize:"0.875rem", outline:"none" }} />
            <button onClick={() => send(input)}
              style={{ width:40, height:40, background:"#0b1f3a", color:"#fff", border:"none", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </button>
          </div>
        </div>

        <div style={{ marginTop:"14px", padding:"14px 16px", background:"rgba(28,28,30,0.04)", border:"1px solid rgba(28,28,30,0.1)", borderRadius:"4px" }}>
          <p style={{ fontSize:"0.78rem", color:"rgba(28,28,30,0.6)", fontWeight:600, marginBottom:"3px" }}>About This Demo</p>
          <p style={{ fontSize:"0.75rem", color:"rgba(28,28,30,0.5)", lineHeight:1.5 }}>
            This AI is trained with knowledge about JKTL services. Your business chatbot would be trained on your specific services, FAQs, pricing, and booking flow — available 24/7 to qualify leads and answer questions.
          </p>
        </div>

        <style>{`
          @keyframes bounce0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes bounce1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes bounce2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        `}</style>

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Add AI Chatbot to My Business</a>
          <Link href="/demos/business-tools" className="btn-outline-navy">Next Demo: Free Business Tools</Link>
        </div>
      </div>
    </div>
  );
}

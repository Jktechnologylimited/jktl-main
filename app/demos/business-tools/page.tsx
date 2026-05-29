"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

type Tool = "invoice" | "profit" | "pricing";

export default function BusinessToolsDemo() {
  const [tool, setTool] = useState<Tool>("invoice");

  // Invoice state
  const [bizName, setBizName] = useState("Your Business Name");
  const [clientName, setClientName] = useState("Client Name");
  const [items, setItems] = useState([{ desc:"Service 1", qty:1, rate:100000 }]);
  const total = items.reduce((s,i) => s + i.qty * i.rate, 0);

  // Profit calculator state
  const [revenue, setRevenue] = useState(500000);
  const [cogs, setCogs] = useState(150000);
  const [overhead, setOverhead] = useState(80000);
  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - overhead;
  const grossMargin = revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : "0";
  const netMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : "0";

  // Pricing calculator state
  const [costOfService, setCostOfService] = useState(80000);
  const [targetMargin, setTargetMargin] = useState(60);
  const [competitorPrice, setCompetitorPrice] = useState(200000);
  const recommendedPrice = Math.round(costOfService / (1 - targetMargin / 100));
  const priceVsComp = ((recommendedPrice - competitorPrice) / competitorPrice * 100).toFixed(0);

  const tabs: {id:Tool; label:string}[] = [
    { id:"invoice",  label:"Invoice Generator" },
    { id:"profit",   label:"Profit Calculator" },
    { id:"pricing",  label:"Pricing Calculator" },
  ];

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: Free Business Tools</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Invoice Generator · Profit Calculator · Pricing Calculator — all live and working</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Get Full System</a>
        </div>
      </div>

      <div style={{ maxWidth:"860px", margin:"32px auto", padding:"0 24px" }}>
        {/* Tool tabs */}
        <div style={{ display:"flex", gap:"4px", marginBottom:"20px", background:"#e8e0d0", padding:"4px", borderRadius:"4px", width:"fit-content" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)}
              style={{ padding:"9px 20px", background: tool === t.id ? "#fff" : "transparent", border:"none", borderRadius:"2px", fontSize:"0.78rem", fontWeight:700, cursor:"pointer", color: tool === t.id ? "var(--navy-900)" : "#888", transition:"all 0.15s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* INVOICE GENERATOR */}
        {tool === "invoice" && (
          <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
              <div>
                <label style={{ display:"block", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"5px" }}>Your Business</label>
                <input value={bizName} onChange={e => setBizName(e.target.value)} style={{ padding:"8px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem", minWidth:"220px" }} />
              </div>
              <div style={{ textAlign:"right" }}>
                <label style={{ display:"block", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"5px" }}>Bill To</label>
                <input value={clientName} onChange={e => setClientName(e.target.value)} style={{ padding:"8px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem", minWidth:"180px", textAlign:"right" }} />
              </div>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem", marginBottom:"12px" }}>
              <thead><tr style={{ background:"#f5f5f5" }}>
                <th style={{ padding:"8px 12px", textAlign:"left", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Description</th>
                <th style={{ padding:"8px 12px", textAlign:"center", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:60 }}>Qty</th>
                <th style={{ padding:"8px 12px", textAlign:"right", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:120 }}>Rate ₦</th>
                <th style={{ padding:"8px 12px", textAlign:"right", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:120 }}>Total</th>
              </tr></thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid #f5f5f5" }}>
                    <td style={{ padding:"8px 12px" }}>
                      <input value={item.desc} onChange={e => setItems(prev => prev.map((it,idx) => idx===i?{...it,desc:e.target.value}:it))}
                        style={{ border:"none", outline:"none", fontSize:"0.82rem", width:"100%" }} placeholder="Description..." />
                    </td>
                    <td style={{ padding:"8px 12px", textAlign:"center" }}>
                      <input type="number" value={item.qty} min={1} onChange={e => setItems(prev => prev.map((it,idx) => idx===i?{...it,qty:Number(e.target.value)}:it))}
                        style={{ border:"none", outline:"none", fontSize:"0.82rem", textAlign:"center", width:40 }} />
                    </td>
                    <td style={{ padding:"8px 12px", textAlign:"right" }}>
                      <input type="number" value={item.rate} onChange={e => setItems(prev => prev.map((it,idx) => idx===i?{...it,rate:Number(e.target.value)}:it))}
                        style={{ border:"none", outline:"none", fontSize:"0.82rem", textAlign:"right", width:100 }} />
                    </td>
                    <td style={{ padding:"8px 12px", textAlign:"right", fontWeight:600 }}>₦{(item.qty*item.rate).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot><tr style={{ borderTop:"2px solid #0b1f3a" }}>
                <td colSpan={3} style={{ padding:"10px 12px", textAlign:"right", fontWeight:700 }}>TOTAL</td>
                <td style={{ padding:"10px 12px", textAlign:"right", fontWeight:800, fontSize:"1.1rem", color:"#0b1f3a" }}>₦{total.toLocaleString()}</td>
              </tfoot></table>
            <div style={{ display:"flex", gap:"10px" }}>
              <button onClick={() => setItems(prev => [...prev, {desc:"",qty:1,rate:0}])}
                style={{ padding:"8px 14px", background:"transparent", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.75rem", cursor:"pointer", color:"#666" }}>+ Add Item</button>
              <button style={{ padding:"8px 18px", background:"#C9A84C", color:"#0b1f3a", border:"none", borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer" }}>Download PDF</button>
              <button style={{ padding:"8px 18px", background:"#0b1f3a", color:"#fff", border:"none", borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer" }}>Send by Email</button>
            </div>
            <p style={{ marginTop:"12px", fontSize:"0.72rem", color:"#888", fontStyle:"italic" }}>
              The full version at invoice.jktl.com.ng saves your invoice history, client database, and lets you send directly from the platform.
            </p>
          </div>
        )}

        {/* PROFIT CALCULATOR */}
        {tool === "profit" && (
          <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"6px", color:"var(--navy-900)" }}>Profit Calculator</h3>
            <p style={{ fontSize:"0.82rem", color:"#888", marginBottom:"24px" }}>Enter your numbers to see your real profit margin.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"24px" }}>
              {[
                { label:"Total Revenue (₦)", val:revenue, set:setRevenue, color:"#059669" },
                { label:"Cost of Goods / Services (₦)", val:cogs, set:setCogs, color:"#DC2626" },
                { label:"Operating Overhead (₦)", val:overhead, set:setOverhead, color:"#D97706" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display:"block", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"5px" }}>{f.label}</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:"0.875rem", color:f.color, fontWeight:700 }}>₦</span>
                    <input type="number" value={f.val} onChange={e => f.set(Number(e.target.value))}
                      style={{ width:"100%", padding:"10px 12px 10px 28px", border:`1.5px solid ${f.color}30`, borderRadius:"2px", fontSize:"0.875rem", outline:"none" }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px" }}>
              {[
                { label:"Gross Profit", val:`₦${grossProfit.toLocaleString()}`, sub:`${grossMargin}% margin`, color: grossProfit > 0 ? "#059669" : "#DC2626" },
                { label:"Net Profit",   val:`₦${netProfit.toLocaleString()}`,   sub:`${netMargin}% margin`,  color: netProfit > 0 ? "#059669" : "#DC2626" },
                { label:"Break-even Revenue", val:`₦${(overhead + cogs).toLocaleString()}`, sub:"Minimum to not lose money", color:"#D97706" },
              ].map(r => (
                <div key={r.label} style={{ padding:"16px", background:"#f9f9f9", border:`1px solid ${r.color}30`, borderRadius:"4px", textAlign:"center" }}>
                  <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"8px" }}>{r.label}</p>
                  <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.1rem", color:r.color, lineHeight:1, marginBottom:"4px" }}>{r.val}</p>
                  <p style={{ fontSize:"0.7rem", color:"#888" }}>{r.sub}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING CALCULATOR */}
        {tool === "pricing" && (
          <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"6px", color:"var(--navy-900)" }}>Pricing Calculator</h3>
            <p style={{ fontSize:"0.82rem", color:"#888", marginBottom:"24px" }}>Find the right price for your product or service.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"18px", marginBottom:"24px" }}>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Cost of Service (₦)</label>
                  <span style={{ fontWeight:700, color:"var(--navy-900)" }}>₦{costOfService.toLocaleString()}</span>
                </div>
                <input type="range" min={10000} max={2000000} step={10000} value={costOfService} onChange={e => setCostOfService(Number(e.target.value))}
                  style={{ width:"100%", accentColor:"#1A4A8A" }} />
              </div>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Target Profit Margin</label>
                  <span style={{ fontWeight:700, color:"#059669" }}>{targetMargin}%</span>
                </div>
                <input type="range" min={10} max={90} step={5} value={targetMargin} onChange={e => setTargetMargin(Number(e.target.value))}
                  style={{ width:"100%", accentColor:"#059669" }} />
              </div>
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Competitor Price (₦)</label>
                  <span style={{ fontWeight:700, color:"#D97706" }}>₦{competitorPrice.toLocaleString()}</span>
                </div>
                <input type="range" min={50000} max={5000000} step={25000} value={competitorPrice} onChange={e => setCompetitorPrice(Number(e.target.value))}
                  style={{ width:"100%", accentColor:"#D97706" }} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
              <div style={{ padding:"20px 16px", background:"#0b1f3a", borderRadius:"4px", textAlign:"center" }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:"8px" }}>Recommended Price</p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#C9A84C", lineHeight:1 }}>₦{recommendedPrice.toLocaleString()}</p>
              </div>
              <div style={{ padding:"20px 16px", background: parseFloat(priceVsComp) > 0 ? "#dcfce7" : "#fee2e2", borderRadius:"4px", textAlign:"center" }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"8px" }}>vs Competitor</p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.2rem", color: parseFloat(priceVsComp) > 0 ? "#166534" : "#DC2626", lineHeight:1 }}>
                  {parseFloat(priceVsComp) > 0 ? "+" : ""}{priceVsComp}%
                </p>
              </div>
              <div style={{ padding:"20px 16px", background:"#f5f5f5", borderRadius:"4px", textAlign:"center" }}>
                <p style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"8px" }}>Profit per Sale</p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#059669", lineHeight:1 }}>
                  ₦{(recommendedPrice - costOfService).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Get the Full Business System</a>
          <Link href="/demos" className="btn-outline-navy">Back to All Demos</Link>
        </div>
      </div>
    </div>
  );
}

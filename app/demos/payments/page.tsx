"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

interface LineItem { description: string; qty: number; rate: number; }

export default function PaymentsDemo() {
  const [tab, setTab] = useState<"invoice"|"payment-link"|"receipt">("invoice");
  const [biz, setBiz] = useState("JK Technology Limited");
  const [client, setClient] = useState("Adebayo Okafor");
  const [items, setItems] = useState<LineItem[]>([
    { description: "Website Design & Development", qty: 1, rate: 350000 },
    { description: "SEO Setup", qty: 1, rate: 80000 },
  ]);
  const [generated, setGenerated] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("150000");
  const [linkGenerated, setLinkGenerated] = useState(false);

  const total = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const invoiceNum = `JKTL-${Date.now().toString().slice(-5)}`;

  const addItem = () => setItems(prev => [...prev, { description:"", qty:1, rate:0 }]);
  const updateItem = (i: number, field: keyof LineItem, val: string) => {
    setItems(prev => prev.map((item, idx) => idx === i ? {...item, [field]: field === "description" ? val : Number(val)} : item));
  };

  return (
    <div style={{ background:"var(--cream-50)", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: Payment & Billing System</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Create invoices and payment links — try it live</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Set Up Payments</a>
        </div>
      </div>

      <div style={{ maxWidth:"820px", margin:"32px auto", padding:"0 24px" }}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:"4px", marginBottom:"20px", background:"#e8e0d0", padding:"4px", borderRadius:"4px", width:"fit-content" }}>
          {(["invoice","payment-link","receipt"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:"8px 18px", background: tab === t ? "#fff" : "transparent", border:"none", borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer", color: tab === t ? "var(--navy-900)" : "#888", textTransform:"capitalize" }}>
              {t === "payment-link" ? "Payment Link" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Invoice builder */}
        {tab === "invoice" && (
          <div>
            {!generated ? (
              <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"20px", color:"var(--navy-900)" }}>Invoice Builder</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"20px" }}>
                  <div>
                    <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", display:"block", marginBottom:"5px" }}>Your Business</label>
                    <input value={biz} onChange={e => setBiz(e.target.value)} style={{ width:"100%", padding:"10px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }} />
                  </div>
                  <div>
                    <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", display:"block", marginBottom:"5px" }}>Client Name</label>
                    <input value={client} onChange={e => setClient(e.target.value)} style={{ width:"100%", padding:"10px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }} />
                  </div>
                </div>
                <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:"14px", fontSize:"0.82rem" }}>
                  <thead>
                    <tr style={{ background:"#f5f5f5" }}>
                      <th style={{ padding:"8px 12px", textAlign:"left", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888" }}>Description</th>
                      <th style={{ padding:"8px 12px", textAlign:"center", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:"60px" }}>Qty</th>
                      <th style={{ padding:"8px 12px", textAlign:"right", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:"120px" }}>Rate (₦)</th>
                      <th style={{ padding:"8px 12px", textAlign:"right", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", width:"120px" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} style={{ borderBottom:"1px solid #f0f0f0" }}>
                        <td style={{ padding:"8px 12px" }}>
                          <input value={item.description} onChange={e => updateItem(i,"description",e.target.value)}
                            style={{ width:"100%", border:"none", outline:"none", fontSize:"0.82rem" }} placeholder="Service description..." />
                        </td>
                        <td style={{ padding:"8px 12px", textAlign:"center" }}>
                          <input type="number" value={item.qty} onChange={e => updateItem(i,"qty",e.target.value)} min={1}
                            style={{ width:"48px", textAlign:"center", border:"none", outline:"none", fontSize:"0.82rem" }} />
                        </td>
                        <td style={{ padding:"8px 12px", textAlign:"right" }}>
                          <input type="number" value={item.rate} onChange={e => updateItem(i,"rate",e.target.value)}
                            style={{ width:"100px", textAlign:"right", border:"none", outline:"none", fontSize:"0.82rem" }} />
                        </td>
                        <td style={{ padding:"8px 12px", textAlign:"right", fontWeight:600 }}>
                          ₦{(item.qty * item.rate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop:"2px solid #0b1f3a" }}>
                      <td colSpan={3} style={{ padding:"10px 12px", textAlign:"right", fontWeight:700, fontSize:"0.85rem" }}>Total</td>
                      <td style={{ padding:"10px 12px", textAlign:"right", fontWeight:800, fontSize:"1rem", color:"var(--navy-900)" }}>₦{total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
                <div style={{ display:"flex", gap:"10px" }}>
                  <button onClick={addItem} style={{ padding:"8px 16px", background:"transparent", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.75rem", cursor:"pointer", color:"#666" }}>+ Add Line Item</button>
                  <button onClick={() => setGenerated(true)} style={{ padding:"8px 20px", background:"var(--navy-900)", color:"#fff", border:"none", borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer" }}>Generate Invoice</button>
                </div>
              </div>
            ) : (
              <div style={{ background:"#fff", borderRadius:"4px", boxShadow:"0 4px 24px rgba(0,0,0,0.12)", overflow:"hidden" }}>
                {/* Invoice header */}
                <div style={{ background:"#0b1f3a", padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"#fff" }}>{biz}</p>
                    <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.5)" }}>{siteConfig.email} · {siteConfig.phone}</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"1.1rem", fontWeight:700, color:"#C9A84C" }}>{invoiceNum}</p>
                    <p style={{ fontSize:"0.72rem", color:"rgba(255,255,255,0.5)" }}>Date: {new Date().toLocaleDateString("en-NG")}</p>
                  </div>
                </div>
                <div style={{ padding:"24px 32px" }}>
                  <p style={{ fontSize:"0.72rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"4px" }}>Bill To</p>
                  <p style={{ fontWeight:700, color:"#222", marginBottom:"20px" }}>{client}</p>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem", marginBottom:"20px" }}>
                    <thead><tr style={{ background:"#f5f5f5" }}>
                      <th style={{ padding:"8px 12px", textAlign:"left", color:"#888", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>Description</th>
                      <th style={{ padding:"8px 12px", textAlign:"right", color:"#888", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>Amount</th>
                    </tr></thead>
                    <tbody>{items.map((item,i) => (
                      <tr key={i} style={{ borderBottom:"1px solid #f0f0f0" }}>
                        <td style={{ padding:"8px 12px" }}>{item.description}</td>
                        <td style={{ padding:"8px 12px", textAlign:"right" }}>₦{(item.qty*item.rate).toLocaleString()}</td>
                      </tr>
                    ))}</tbody>
                    <tfoot><tr style={{ borderTop:"2px solid #0b1f3a" }}>
                      <td style={{ padding:"10px 12px", fontWeight:700 }}>Total Due</td>
                      <td style={{ padding:"10px 12px", textAlign:"right", fontWeight:800, fontSize:"1.1rem", color:"#0b1f3a" }}>₦{total.toLocaleString()}</td>
                    </tr></tfoot>
                  </table>
                  <div style={{ display:"flex", gap:"10px" }}>
                    <button style={{ padding:"10px 20px", background:"#C9A84C", color:"#0b1f3a", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.78rem", cursor:"pointer" }}>Download PDF</button>
                    <button style={{ padding:"10px 20px", background:"transparent", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.78rem", cursor:"pointer", color:"#666" }}>Send via Email</button>
                    <button onClick={() => setGenerated(false)} style={{ padding:"10px 20px", background:"transparent", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.78rem", cursor:"pointer", color:"#666" }}>Edit</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payment link */}
        {tab === "payment-link" && (
          <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, marginBottom:"6px", color:"var(--navy-900)" }}>Create a Payment Link</h3>
            <p style={{ fontSize:"0.82rem", color:"#888", marginBottom:"20px" }}>Share this link via WhatsApp, email, or SMS — clients pay instantly online.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px", maxWidth:"400px", marginBottom:"20px" }}>
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", display:"block", marginBottom:"5px" }}>Amount (₦)</label>
                <input type="number" value={paymentAmount} onChange={e => setPaymentAmount(e.target.value)}
                  style={{ width:"100%", padding:"10px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"1rem", fontWeight:600 }} />
              </div>
              <div>
                <label style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", display:"block", marginBottom:"5px" }}>Description</label>
                <input defaultValue="Website Design Payment" style={{ width:"100%", padding:"10px 12px", border:"1px solid #e0e0e0", borderRadius:"2px", fontSize:"0.875rem" }} />
              </div>
              <button onClick={() => setLinkGenerated(true)} style={{ padding:"12px", background:"#0b1f3a", color:"#fff", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.875rem", cursor:"pointer" }}>
                Generate Payment Link
              </button>
            </div>
            {linkGenerated && (
              <div style={{ padding:"16px", background:"#f0fdf4", border:"1px solid #86efac", borderRadius:"4px" }}>
                <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#166534", marginBottom:"6px" }}>Payment link created!</p>
                <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                  <code style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.78rem", color:"#166534", background:"#dcfce7", padding:"6px 12px", borderRadius:"2px", flex:1 }}>
                    pay.jktl.com.ng/p/{invoiceNum.toLowerCase()}
                  </code>
                  <button style={{ padding:"6px 12px", background:"#166534", color:"#fff", border:"none", borderRadius:"2px", fontSize:"0.72rem", fontWeight:700, cursor:"pointer" }}>Copy</button>
                </div>
                <p style={{ fontSize:"0.72rem", color:"#555", marginTop:"8px" }}>
                  Share via WhatsApp, email, or add to your website. Client pays ₦{parseInt(paymentAmount).toLocaleString()} online. You get notified instantly.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Receipt */}
        {tab === "receipt" && (
          <div style={{ background:"#fff", borderRadius:"4px", padding:"28px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", maxWidth:"400px" }}>
            <div style={{ borderBottom:"2px dashed #e0e0e0", paddingBottom:"16px", marginBottom:"16px", textAlign:"center" }}>
              <p style={{ fontWeight:800, fontSize:"1rem", color:"#0b1f3a" }}>{biz}</p>
              <p style={{ fontSize:"0.72rem", color:"#888" }}>{siteConfig.phone}</p>
            </div>
            <div style={{ marginBottom:"16px" }}>
              <p style={{ fontSize:"0.72rem", color:"#888", marginBottom:"4px" }}>Receipt No: {invoiceNum}</p>
              <p style={{ fontSize:"0.72rem", color:"#888" }}>Date: {new Date().toLocaleDateString("en-NG")} {new Date().toLocaleTimeString("en-NG")}</p>
            </div>
            <div style={{ borderTop:"1px solid #e0e0e0", paddingTop:"12px", marginBottom:"12px" }}>
              {items.map((item,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px", fontSize:"0.82rem" }}>
                  <span>{item.description}</span>
                  <span style={{ fontWeight:600 }}>₦{(item.qty*item.rate).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop:"2px solid #0b1f3a", paddingTop:"10px", display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontWeight:800 }}>TOTAL PAID</span>
              <span style={{ fontWeight:800, color:"#0b1f3a" }}>₦{total.toLocaleString()}</span>
            </div>
            <div style={{ textAlign:"center", marginTop:"16px", paddingTop:"16px", borderTop:"2px dashed #e0e0e0" }}>
              <p style={{ fontSize:"0.72rem", color:"#888" }}>Thank you for your business!</p>
              <p style={{ fontSize:"0.65rem", color:"#bbb", marginTop:"4px" }}>Powered by JK Technology Limited</p>
            </div>
            <button style={{ marginTop:"16px", width:"100%", padding:"10px", background:"#0b1f3a", color:"#fff", border:"none", borderRadius:"2px", fontWeight:700, fontSize:"0.78rem", cursor:"pointer" }}>
              Print / Download Receipt
            </button>
          </div>
        )}

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Set Up My Payment System</a>
          <Link href="/demos/seo" className="btn-outline-navy">Next Demo: SEO Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

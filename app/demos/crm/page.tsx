"use client";
import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/index";

type Stage = "New Lead" | "Contacted" | "Proposal Sent" | "Won" | "Lost";

interface Lead {
  id: number;
  name: string;
  business: string;
  value: string;
  date: string;
  source: string;
  stage: Stage;
}

const initialLeads: Lead[] = [
  { id:1, name:"Adebayo Okafor",   business:"Okafor Clinic",        value:"₦450,000",  date:"Today 9:02am",  source:"Website Form",   stage:"New Lead" },
  { id:2, name:"Ngozi Eze",        business:"Ngozi Beauty Studio",  value:"₦180,000",  date:"Today 10:15am", source:"Referral",       stage:"New Lead" },
  { id:3, name:"Emeka Nwosu",      business:"Nwosu Logistics",      value:"₦800,000",  date:"Yesterday",     source:"Google Search",  stage:"Contacted" },
  { id:4, name:"Fatima Abdullahi", business:"Fatima Fashion House",  value:"₦220,000",  date:"2 days ago",    source:"Instagram Ad",   stage:"Contacted" },
  { id:5, name:"Tunde Bakare",     business:"Bakare Motors",        value:"₦650,000",  date:"3 days ago",    source:"Website Form",   stage:"Proposal Sent" },
  { id:6, name:"Amaka Obi",        business:"Obi Supermarket",      value:"₦1,200,000",date:"4 days ago",    source:"Referral",       stage:"Won" },
];

const stages: Stage[] = ["New Lead", "Contacted", "Proposal Sent", "Won", "Lost"];
const stageColors: Record<Stage, string> = {
  "New Lead": "#1A4A8A", "Contacted": "#7C3AED", "Proposal Sent": "#D97706", "Won": "#059669", "Lost": "#DC2626",
};

export default function CRMDemo() {
  const [leads, setLeads] = useState(initialLeads);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [view, setView] = useState<"pipeline"|"table">("pipeline");

  const moveStage = (id: number, stage: Stage) => {
    setLeads(prev => prev.map(l => l.id === id ? {...l, stage} : l));
    setSelected(prev => prev ? {...prev, stage} : null);
  };

  const totalValue = leads.filter(l => l.stage === "Won").reduce((sum, l) => sum + parseInt(l.value.replace(/[₦,]/g,"")), 0);
  const pipelineValue = leads.filter(l => !["Won","Lost"].includes(l.stage)).reduce((sum, l) => sum + parseInt(l.value.replace(/[₦,]/g,"")), 0);

  return (
    <div style={{ background:"#f0f2f5", minHeight:"100vh", paddingTop:"80px" }}>
      <div style={{ background:"var(--navy-900)", padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"0.85rem", color:"var(--cream-50)" }}>Demo: CRM & Business Operations Dashboard</p>
          <p style={{ fontSize:"0.72rem", color:"rgba(249,247,240,0.45)" }}>Drag leads through pipeline stages — click any lead for details</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <Link href="/demos" style={{ padding:"8px 16px", background:"rgba(249,247,240,0.08)", color:"rgba(249,247,240,0.7)", fontSize:"0.72rem", fontWeight:600, textDecoration:"none", borderRadius:"2px" }}>All Demos</Link>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold" style={{ padding:"8px 16px", fontSize:"0.72rem" }}>Get My CRM</a>
        </div>
      </div>

      <div style={{ maxWidth:"1100px", margin:"24px auto", padding:"0 24px" }}>
        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"12px", marginBottom:"20px" }}>
          {[
            { label:"Total Leads", value:String(leads.length), color:"#1A4A8A" },
            { label:"New Today",   value:String(leads.filter(l=>l.date.includes("Today")).length), color:"#7C3AED" },
            { label:"In Pipeline", value:`₦${(pipelineValue/1000).toFixed(0)}k`, color:"#D97706" },
            { label:"Won",         value:`₦${(totalValue/1000).toFixed(0)}k`, color:"#059669" },
          ].map(s => (
            <div key={s.label} style={{ background:"#fff", borderRadius:"4px", padding:"16px 18px", borderTop:`3px solid ${s.color}`, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#888", marginBottom:"4px" }}>{s.label}</p>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.4rem", color:s.color, lineHeight:1 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* View toggle */}
        <div style={{ display:"flex", gap:"8px", marginBottom:"16px" }}>
          {(["pipeline","table"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              style={{ padding:"7px 18px", background: view === v ? "var(--navy-900)" : "#fff", color: view === v ? "#fff" : "#333", border:"1px solid #ddd", borderRadius:"2px", fontSize:"0.75rem", fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}>
              {v === "pipeline" ? "Pipeline View" : "Table View"}
            </button>
          ))}
        </div>

        {view === "pipeline" && (
          <div style={{ display:"grid", gridTemplateColumns:`repeat(${stages.length},1fr)`, gap:"10px", overflowX:"auto" }}>
            {stages.map(stage => {
              const stageLeads = leads.filter(l => l.stage === stage);
              return (
                <div key={stage} style={{ minWidth:"160px" }}>
                  <div style={{ padding:"8px 12px", background: stageColors[stage], borderRadius:"2px 2px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:"0.7rem", fontWeight:700, color:"#fff", letterSpacing:"0.06em" }}>{stage.toUpperCase()}</span>
                    <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", fontSize:"0.7rem", fontWeight:700, padding:"2px 7px", borderRadius:"99px" }}>{stageLeads.length}</span>
                  </div>
                  <div style={{ minHeight:"200px", background:"rgba(0,0,0,0.03)", borderRadius:"0 0 2px 2px", padding:"8px", display:"flex", flexDirection:"column", gap:"6px" }}>
                    {stageLeads.map(lead => (
                      <div key={lead.id} onClick={() => setSelected(lead)}
                        style={{ background:"#fff", borderRadius:"2px", padding:"12px", boxShadow:"0 1px 3px rgba(0,0,0,0.08)", cursor:"pointer", border: selected?.id === lead.id ? `2px solid ${stageColors[stage]}` : "2px solid transparent" }}>
                        <p style={{ fontSize:"0.78rem", fontWeight:700, color:"#222", marginBottom:"2px" }}>{lead.name}</p>
                        <p style={{ fontSize:"0.7rem", color:"#888", marginBottom:"4px" }}>{lead.business}</p>
                        <p style={{ fontSize:"0.78rem", fontWeight:700, color: stageColors[stage] }}>{lead.value}</p>
                        <p style={{ fontSize:"0.65rem", color:"#bbb", marginTop:"4px" }}>{lead.source}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "table" && (
          <div style={{ background:"#fff", borderRadius:"4px", overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"0.82rem" }}>
              <thead>
                <tr style={{ background:"#f5f5f5" }}>
                  {["Name","Business","Value","Source","Date","Stage"].map(h => (
                    <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#666", borderBottom:"1px solid #e0e0e0" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, i) => (
                  <tr key={lead.id} onClick={() => setSelected(lead)} style={{ borderBottom:"1px solid #f0f0f0", cursor:"pointer", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding:"10px 14px", fontWeight:600, color:"#222" }}>{lead.name}</td>
                    <td style={{ padding:"10px 14px", color:"#666" }}>{lead.business}</td>
                    <td style={{ padding:"10px 14px", fontWeight:700, color: stageColors[lead.stage] }}>{lead.value}</td>
                    <td style={{ padding:"10px 14px", color:"#888" }}>{lead.source}</td>
                    <td style={{ padding:"10px 14px", color:"#aaa", fontSize:"0.75rem" }}>{lead.date}</td>
                    <td style={{ padding:"10px 14px" }}>
                      <span style={{ fontSize:"0.7rem", fontWeight:700, background: stageColors[lead.stage] + "20", color: stageColors[lead.stage], padding:"3px 10px", borderRadius:"2px" }}>{lead.stage}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Lead detail panel */}
        {selected && (
          <div style={{ marginTop:"16px", background:"#fff", borderRadius:"4px", padding:"24px", boxShadow:"0 1px 4px rgba(0,0,0,0.08)", border:`2px solid ${stageColors[selected.stage]}30` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px", flexWrap:"wrap", gap:"12px" }}>
              <div>
                <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"1rem", color:"#222", marginBottom:"2px" }}>{selected.name}</h3>
                <p style={{ fontSize:"0.82rem", color:"#888" }}>{selected.business} · {selected.source}</p>
              </div>
              <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:800, fontSize:"1.3rem", color: stageColors[selected.stage] }}>{selected.value}</p>
            </div>
            <p style={{ fontSize:"0.75rem", fontWeight:700, color:"#888", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"10px" }}>Move to Stage:</p>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {stages.map(stage => (
                <button key={stage} onClick={() => moveStage(selected.id, stage)}
                  style={{ padding:"7px 14px", background: selected.stage === stage ? stageColors[stage] : "transparent", color: selected.stage === stage ? "#fff" : stageColors[stage], border:`1px solid ${stageColors[stage]}`, borderRadius:"2px", fontSize:"0.75rem", fontWeight:700, cursor:"pointer" }}>
                  {stage}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop:"16px", display:"flex", gap:"10px", flexWrap:"wrap" }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">Get My CRM System</a>
          <Link href="/demos/payments" className="btn-outline-navy">Next Demo: Payments</Link>
        </div>
      </div>
    </div>
  );
}

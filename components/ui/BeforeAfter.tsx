"use client";
import { useState, useRef, useCallback } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  height?: number;
}

export default function BeforeAfter({
  beforeSrc, afterSrc, beforeAlt, afterAlt,
  beforeLabel = "Before", afterLabel = "After",
  height = 400,
}: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="ba-container"
      style={{ height, borderRadius:"4px", overflow:"hidden", border:"1px solid var(--cream-300)", position:"relative", userSelect:"none" }}
      onMouseMove={(e) => { if (dragging.current) update(e.clientX); }}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
    >
      {/* Before (full width underneath) */}
      <div style={{ position:"absolute", inset:0, background:"var(--cream-200)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {beforeSrc.startsWith("/placeholder") ? (
          <BeforePlaceholder label={beforeLabel} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={beforeSrc} alt={beforeAlt} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        )}
      </div>

      {/* After (clipped by pos%) */}
      <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${pos}%`, overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, width:`${(100/pos)*100}%`, height:"100%", background:"var(--navy-900)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {afterSrc.startsWith("/placeholder") ? (
            <AfterPlaceholder label={afterLabel} />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={afterSrc} alt={afterAlt} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ position:"absolute", top:0, bottom:0, left:`${pos}%`, transform:"translateX(-50%)", width:"2px", background:"var(--gold-400)", zIndex:10, pointerEvents:"none" }}>
        {/* Handle */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"44px", height:"44px", background:"var(--gold-400)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.4)", cursor:"ew-resize", pointerEvents:"all" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2.5">
            <path d="M8 4l-4 8 4 8M16 4l4 8-4 8"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div style={{ position:"absolute", top:"12px", right:"12px", pointerEvents:"none", zIndex:5 }}>
        <span style={{ background:"rgba(6,14,42,0.85)", color:"var(--cream-100)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 10px", borderRadius:"2px" }}>
          {beforeLabel}
        </span>
      </div>
      <div style={{ position:"absolute", top:"12px", left:"12px", pointerEvents:"none", zIndex:5 }}>
        <span style={{ background:"var(--gold-400)", color:"var(--navy-900)", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 10px", borderRadius:"2px" }}>
          {afterLabel}
        </span>
      </div>

      {/* Drag hint */}
      <div style={{ position:"absolute", bottom:"12px", left:"50%", transform:"translateX(-50%)", pointerEvents:"none", zIndex:5 }}>
        <span style={{ background:"rgba(0,0,0,0.6)", color:"rgba(255,255,255,0.7)", fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 12px", borderRadius:"99px" }}>
          ← Drag to compare →
        </span>
      </div>
    </div>
  );
}

function BeforePlaceholder({ label }: { label: string }) {
  return (
    <div style={{ width:"100%", height:"100%", background:"var(--cream-200)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
      <div style={{ opacity:0.25 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="1">
          <rect x="3" y="3" width="18" height="14" rx="1"/><path d="M8 21h8M12 17v4"/>
        </svg>
      </div>
      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(28,28,30,0.35)" }}>
        {label} — Replace with screenshot
      </p>
      <p style={{ fontSize:"0.65rem", color:"rgba(28,28,30,0.25)", textAlign:"center", maxWidth:"180px" }}>
        Add image to /public/work/ and update src in data/index.ts
      </p>
    </div>
  );
}

function AfterPlaceholder({ label }: { label: string }) {
  return (
    <div style={{ width:"100%", height:"100%", background:"var(--navy-800)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
      <div style={{ opacity:0.25 }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold-400)" strokeWidth="1">
          <rect x="3" y="3" width="18" height="14" rx="1"/><path d="M8 21h8M12 17v4"/>
        </svg>
      </div>
      <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(249,247,240,0.3)" }}>
        {label} — Replace with screenshot
      </p>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ background:"var(--navy-950)", minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"80px 24px", textAlign:"center" }}>
      <div>
        <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"4rem", fontWeight:400, color:"var(--gold-400)", lineHeight:1, marginBottom:"16px" }}>404</p>
        <h1 className="display-lg mb-3" style={{ color:"var(--cream-50)" }}>Page not found.</h1>
        <p className="body-md" style={{ color:"rgba(249,247,240,0.45)", marginBottom:"32px", maxWidth:"380px" }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" className="btn-gold">Go to Homepage</Link>
          <Link href="/contact" className="btn-outline-cream">Book a Free Audit</Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/index";

export const metadata: Metadata = {
  title: "Terms of Service | JK Technology Limited",
  description: "Terms and conditions governing JK Technology Limited's web design and SEO services.",
};

export default function TermsPage() {
  const sections = [
    { title:"1. Services", body:"JK Technology Limited provides website design, landing page development, SEO retainer services, and related digital services. The scope, deliverables, timeline, and pricing for each project are defined in a written proposal provided before work begins. No work commences without an accepted proposal and required deposit." },
    { title:"2. Payment Terms", body:"Projects under $2,000: 50% upfront and 50% on delivery. Projects above $2,000 may use a 40/40/20 structure. SEO retainers are billed monthly. All prices are in USD. We accept bank transfer, Stripe, and Wise. Work will not begin until the first payment clears." },
    { title:"3. Revisions & Scope", body:"Every project includes two rounds of revisions at no additional cost. A revision means reasonable modifications to existing design or content. Adding pages, changing design direction, or adding features outside the original scope are quoted separately. Revision requests must be submitted within 7 days of receiving a preview." },
    { title:"4. Client Responsibilities", body:"You agree to provide required content, images, and branding materials in a timely manner; ensure all content you provide is lawful; provide clear and timely feedback during the design process; and ensure access to any third-party accounts needed for the project." },
    { title:"5. Intellectual Property", body:"Upon receipt of full payment, you own the final website design and content created specifically for your project. JKTL retains the right to display the completed project in our portfolio unless you request otherwise in writing before the project begins." },
    { title:"6. Cancellation & Refunds", body:"Cancellation before work begins: 50% of the deposit is refunded. Cancellation after work has begun: deposit is non-refundable. Cancellation by JKTL: all payments for undelivered work are refunded. Completed and launched projects are non-refundable." },
    { title:"7. SEO Retainers", body:"SEO retainers require a minimum 3-month commitment. After 3 months, the retainer may be cancelled with 30 days written notice. We do not guarantee specific ranking positions -- search engine algorithms are controlled by third parties. We guarantee the work outlined in your plan is performed and reported monthly." },
    { title:"8. Post-Launch Support", body:"30 days of post-launch support is included for all website projects, covering bugs and technical issues arising from our work. After 30 days, support requires a maintenance retainer or is billed separately." },
    { title:"9. Limitation of Liability", body:"Our total liability for any claim shall not exceed the total fees paid for the specific project. We are not liable for indirect, incidental, or consequential damages including lost profits or business interruption." },
    { title:"10. Governing Law", body:`These Terms are governed by applicable law. Disputes will first be addressed amicably. For any questions, contact us at ${siteConfig.email}.` },
  ];

  return (
    <>
      <section style={{ background:"var(--navy-950)", paddingTop:"120px", paddingBottom:"64px" }}>
        <div className="max-w-4xl mx-auto px-8">
          <span className="gold-rule mb-5" style={{ display:"block" }} />
          <h1 className="display-xl mb-2" style={{ color:"var(--cream-50)" }}>Terms of Service</h1>
          <p className="label-xs" style={{ color:"rgba(249,247,240,0.35)" }}>Last updated: March 2026</p>
        </div>
      </section>
      <section className="section-pad" style={{ background:"var(--cream-50)" }}>
        <div className="max-w-4xl mx-auto px-8">
          <div style={{ background:"var(--cream-100)", border:"1px solid var(--cream-300)", borderRadius:"4px", padding:"20px 24px", marginBottom:"36px" }}>
            <p className="body-md" style={{ color:"rgba(28,28,30,0.65)" }}>
              By engaging JK Technology Limited&apos;s services or using jktl.com.ng, you agree to the following terms. Please read them carefully.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {sections.map(s => (
              <div key={s.title}>
                <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700, fontSize:"1rem", color:"var(--navy-900)", marginBottom:"8px", paddingBottom:"8px", borderBottom:"1px solid rgba(201,168,76,0.2)" }}>{s.title}</h2>
                <p className="body-md" style={{ color:"rgba(28,28,30,0.62)" }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"40px", paddingTop:"24px", borderTop:"1px solid var(--cream-300)", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
            <p className="body-sm" style={{ color:"rgba(28,28,30,0.35)" }}>Last updated March 2026</p>
            <div style={{ display:"flex", gap:"16px" }}>
              <Link href="/privacy" style={{ color:"var(--navy-600)", fontSize:"0.85rem", textDecoration:"underline", textUnderlineOffset:"3px" }}>Privacy Policy</Link>
              <Link href="/contact" style={{ color:"var(--navy-600)", fontSize:"0.85rem", textDecoration:"underline", textUnderlineOffset:"3px" }}>Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

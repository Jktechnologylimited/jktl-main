"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface LineItem { name: string; unitPrice: number; qty: number; discountPct: number; total: number; }
interface Deliverable { label: string; checked: boolean; }
interface Proposal {
  proposal_number: string; customer_name: string; contact_name?: string; name: string; currency: string;
  valid_until?: string; line_items: LineItem[]; client_note?: string; subtotal: number; discount_total: number;
  tax_pct: number; total: number; deliverables: Deliverable[]; start_date?: string; duration_weeks?: number;
  end_date?: string; payment_terms?: string; maintenance_terms?: string; status: string; sent_at?: string;
  request_acceptance: boolean; expiry_date?: string; accepted_at?: string; accepted_by_name?: string;
  declined_at?: string; created_at: string;
}

function fmt(n: number) { return "\u20a6" + Number(n || 0).toLocaleString("en-NG"); }
function fmtDate(d?: string) { return d ? new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }) : "\u2014"; }

export default function PublicProposalPage() {
  const { token } = useParams<{ token: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAccept, setShowAccept] = useState(false);
  const [showDecline, setShowDecline] = useState(false);
  const [acceptName, setAcceptName] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function load() {
    fetch(`/api/proposals/public/${token}`).then(r => r.json()).then(d => {
      if (d.error) { setError(d.error); } else { setProposal(d.proposal); }
      setLoading(false);
    }).catch(() => { setError("Something went wrong loading this proposal."); setLoading(false); });
  }
  useEffect(() => { load(); }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  async function accept() {
    if (!acceptName.trim()) return;
    setSubmitting(true);
    await fetch(`/api/proposals/public/${token}/accept`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ acceptedByName: acceptName }) });
    setSubmitting(false); setShowAccept(false); load();
  }
  async function decline() {
    setSubmitting(true);
    await fetch(`/api/proposals/public/${token}/decline`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reason: declineReason }) });
    setSubmitting(false); setShowDecline(false); load();
  }

  if (loading) return <div className="min-h-screen bg-cream-50 flex items-center justify-center"><p className="text-black/40 text-sm">Loading proposal...</p></div>;
  if (error || !proposal) return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <p className="text-navy-900 font-bold text-lg mb-2">Proposal unavailable</p>
        <p className="text-black/50 text-sm">{error || "This link may be invalid or expired."}</p>
      </div>
    </div>
  );

  const isSent = proposal.status === "sent";
  const isExpired = proposal.expiry_date ? new Date(proposal.expiry_date) < new Date() : false;

  return (
    <div className="min-h-screen bg-cream-50 py-10 px-4 print:py-0 print:px-0">
      <div className="max-w-[820px] mx-auto">

        {/* Status banner */}
        {proposal.status === "accepted" && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-center print:hidden">
            <p className="text-green-700 font-bold text-sm">Accepted by {proposal.accepted_by_name} on {fmtDate(proposal.accepted_at)}</p>
          </div>
        )}
        {proposal.status === "declined" && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-center print:hidden">
            <p className="text-red-700 font-bold text-sm">This proposal was declined on {fmtDate(proposal.declined_at)}</p>
          </div>
        )}
        {isSent && isExpired && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200 text-center print:hidden">
            <p className="text-amber-700 font-bold text-sm">This proposal expired on {fmtDate(proposal.expiry_date)}</p>
          </div>
        )}

        {/* Document */}
        <div className="bg-white border border-cream-300 rounded-xl overflow-hidden shadow-sm">
          {/* Cover */}
          <div className="bg-navy-950 px-8 py-12 sm:px-12 sm:py-16 text-center">
            <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.2em] uppercase mb-4">JK Technology Limited</p>
            <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">{proposal.name}</h1>
            <p className="text-white/50 text-sm">Prepared for: {proposal.customer_name}</p>
            <p className="text-white/30 text-xs font-mono mt-2">{proposal.proposal_number} &middot; {fmtDate(proposal.sent_at || proposal.created_at)}</p>
          </div>

          <div className="p-8 sm:p-12">
            {/* Scope of work */}
            <section className="mb-10">
              <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.15em] uppercase mb-3">Scope of Work</p>
              <div className="grid gap-2">
                {proposal.line_items.map((li, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-cream-200 text-sm">
                    <span className="text-navy-900">{li.name} {li.qty > 1 && <span className="text-black/40">&times;{li.qty}</span>}</span>
                    <span className="text-navy-900 font-mono">{fmt(li.total)}</span>
                  </div>
                ))}
              </div>
              {proposal.client_note && <p className="text-black/55 text-sm mt-4 leading-relaxed">{proposal.client_note}</p>}
            </section>

            {/* Deliverables */}
            {proposal.deliverables?.length > 0 && (
              <section className="mb-10">
                <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.15em] uppercase mb-3">Deliverables</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {proposal.deliverables.filter(d => d.checked).map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-navy-900"><span className="text-green-600">&#10003;</span>{d.label}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Timeline */}
            <section className="mb-10">
              <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.15em] uppercase mb-3">Timeline</p>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><p className="text-black/40 text-xs mb-1">Start</p><p className="text-navy-900 font-semibold">{fmtDate(proposal.start_date)}</p></div>
                <div><p className="text-black/40 text-xs mb-1">Duration</p><p className="text-navy-900 font-semibold">{proposal.duration_weeks ? `${proposal.duration_weeks} weeks` : "\u2014"}</p></div>
                <div><p className="text-black/40 text-xs mb-1">End</p><p className="text-navy-900 font-semibold">{fmtDate(proposal.end_date)}</p></div>
              </div>
            </section>

            {/* Investment */}
            <section className="mb-10">
              <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.15em] uppercase mb-3">Investment</p>
              <div className="bg-cream-50 rounded-lg p-5">
                <div className="flex justify-between text-sm mb-1.5"><span className="text-black/50">Subtotal</span><span className="text-navy-900 font-mono">{fmt(proposal.subtotal)}</span></div>
                {proposal.discount_total > 0 && <div className="flex justify-between text-sm mb-1.5"><span className="text-black/50">Discount</span><span className="text-navy-900 font-mono">-{fmt(proposal.discount_total)}</span></div>}
                {proposal.tax_pct > 0 && <div className="flex justify-between text-sm mb-1.5"><span className="text-black/50">Tax ({proposal.tax_pct}%)</span><span className="text-navy-900 font-mono">{fmt(proposal.total - proposal.subtotal + proposal.discount_total)}</span></div>}
                <div className="flex justify-between text-base font-bold pt-2 mt-2 border-t border-cream-300"><span className="text-navy-900">Total</span><span className="text-navy-900 font-mono">{fmt(proposal.total)}</span></div>
              </div>
            </section>

            {/* Terms */}
            <section className="mb-2">
              <p className="font-mono text-[0.65rem] text-gold-400 tracking-[0.15em] uppercase mb-3">Terms &amp; Conditions</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {proposal.payment_terms && <div><p className="text-black/40 text-xs mb-1">Payment Terms</p><p className="text-navy-900">{proposal.payment_terms}</p></div>}
                {proposal.maintenance_terms && <div><p className="text-black/40 text-xs mb-1">Maintenance / Support</p><p className="text-navy-900">{proposal.maintenance_terms}</p></div>}
                {proposal.valid_until && <div><p className="text-black/40 text-xs mb-1">Valid Until</p><p className="text-navy-900">{fmtDate(proposal.valid_until)}</p></div>}
              </div>
            </section>
          </div>
        </div>

        {/* Actions */}
        {isSent && !isExpired && proposal.request_acceptance && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center print:hidden">
            <button onClick={() => setShowAccept(true)} className="px-8 py-3.5 rounded-lg bg-navy-900 text-white font-bold text-sm">Accept Proposal</button>
            <button onClick={() => setShowDecline(true)} className="px-8 py-3.5 rounded-lg border border-cream-300 text-black/60 font-bold text-sm">Decline</button>
            <button onClick={() => window.print()} className="px-8 py-3.5 rounded-lg border border-cream-300 text-black/60 font-bold text-sm">Download PDF</button>
          </div>
        )}
        {(!isSent || isExpired) && (
          <div className="mt-6 flex justify-center print:hidden">
            <button onClick={() => window.print()} className="px-8 py-3.5 rounded-lg border border-cream-300 text-black/60 font-bold text-sm">Download PDF</button>
          </div>
        )}
      </div>

      {/* Accept modal */}
      {showAccept && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <p className="font-bold text-navy-900 mb-1">Accept this proposal</p>
            <p className="text-black/50 text-sm mb-4">Enter your name to confirm acceptance.</p>
            <input value={acceptName} onChange={e => setAcceptName(e.target.value)} placeholder="Your full name" className="w-full px-3 py-2.5 rounded-lg border border-cream-300 text-sm mb-4 outline-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAccept(false)} className="px-4 py-2 text-sm text-black/50">Cancel</button>
              <button onClick={accept} disabled={submitting || !acceptName.trim()} className="px-5 py-2 rounded-lg bg-navy-900 text-white text-sm font-bold disabled:opacity-50">{submitting ? "Confirming..." : "Confirm Acceptance"}</button>
            </div>
          </div>
        </div>
      )}
      {/* Decline modal */}
      {showDecline && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 print:hidden">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <p className="font-bold text-navy-900 mb-1">Decline this proposal</p>
            <p className="text-black/50 text-sm mb-4">Let us know why (optional).</p>
            <textarea value={declineReason} onChange={e => setDeclineReason(e.target.value)} rows={3} placeholder="Reason (optional)" className="w-full px-3 py-2.5 rounded-lg border border-cream-300 text-sm mb-4 outline-none resize-none" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowDecline(false)} className="px-4 py-2 text-sm text-black/50">Cancel</button>
              <button onClick={decline} disabled={submitting} className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-bold disabled:opacity-50">{submitting ? "Submitting..." : "Confirm Decline"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

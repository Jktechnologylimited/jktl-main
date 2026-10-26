import Link from "next/link";
export function PartnerApplication() {
  return (
    <div className="rounded-3xl border border-[#c9a84c]/30 bg-white p-7">
      <h3 className="text-2xl font-semibold">Create your partner account.</h3>
      <p className="my-5 text-sm leading-relaxed text-black/65">
        Apply through your existing JKTL Business account with your company
        details. No second password is required. Your application appears in the
        JKTL review queue. Access opens after approval and an agreed commission
        arrangement.
      </p>
      <div className="flex flex-wrap gap-4">
        <a
          className="btn-primary"
          href="https://business.jktl.com.ng/login?next=programs&program=partner"
        >
          Apply to JKTL Partners →
        </a>
        <a
          className="btn-outline-navy"
          href="https://business.jktl.com.ng/partners/login"
        >
          Partner sign in
        </a>
      </div>
      <p className="mt-6 text-xs leading-relaxed text-black/55">
        Previously sent an enquiry? Create your portal account using the same
        email so the team can review your application. No customer business
        account is created without the business owner’s permission.
      </p>
      <p className="mt-4 text-xs">
        <Link href="/privacy">Privacy policy</Link> ·{" "}
        <Link href="/contact">Contact the team</Link>
      </p>
    </div>
  );
}

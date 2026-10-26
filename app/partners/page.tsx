import type { Metadata } from "next";
import Link from "next/link";
import { PartnerApplication } from "@/components/partners/PartnerApplication";
export const metadata: Metadata = {
  title: "JKTL Partners | Help your clients grow online",
  description:
    "A partner programme for website developers, marketing agencies, business consultants and CAC registration agents serving Nigerian businesses.",
  alternates: { canonical: "https://jktl.com.ng/partners" },
};
export default function Page() {
  return (
    <div className="bg-cream-50 text-navy-950">
      <section className="bg-navy-950 text-white px-6 pt-36 pb-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-gold-400 text-xs tracking-widest">JKTL PARTNERS</p>
          <h1 className="text-5xl md:text-7xl max-w-3xl mt-6 leading-tight">
            You know their business.
            <br />
            <span className="text-gold-400">We power what’s next.</span>
          </h1>
          <p className="max-w-2xl mt-7 text-white/75 leading-relaxed">
            Your clients already trust you. Help them launch websites, connect
            domains and email, and adopt AI automation with JKTL providing the
            underlying infrastructure.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://business.jktl.com.ng/login?next=programs&program=partner"
              className="btn-gold px-7 py-4 text-sm"
            >
              Become a partner
            </a>
            <a
              href="https://business.jktl.com.ng/partners/login"
              className="btn-outline-cream px-7 py-4 text-sm"
            >
              Partner sign in
            </a>
            <Link
              href="/affiliates"
              className="btn-outline-cream px-7 py-4 text-sm"
            >
              Looking for JKTL Affiliates?
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs text-gold-600 tracking-widest">BUILT ON TRUST</p>
        <h2 className="text-4xl mt-4 mb-8">
          For the people business owners turn to.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            [
              "Website developers",
              "Create and maintain professional client websites.",
            ],
            [
              "Marketing agencies",
              "Connect campaign traffic to websites and business tools.",
            ],
            [
              "Business consultants",
              "Guide new and established businesses through their next stage.",
            ],
            [
              "CAC registration agents",
              "Help newly registered businesses take their first steps online.",
            ],
          ].map(([title, text]) => (
            <article
              key={title}
              className="bg-white border border-gold-400/20 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm leading-relaxed mt-3 text-black/60">
                {text}
              </p>
            </article>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-3xl">
              Keep the relationship.
              <br />
              Expand what you can offer.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-black/65">
              For example, a consultant registering 20 businesses a month can
              introduce each client to JKTL for websites, domains, email and
              suitable AI tools. JKTL supplies the infrastructure while the
              consultant supports their client and earns an agreed commission on
              qualifying purchases.
            </p>
            <p className="mt-4 text-xs text-black/55">
              This is an example, not a promised income or sales result. Product
              availability and each client’s requirements still apply.
            </p>
          </div>
          <div className="bg-navy-950 text-white rounded-2xl p-8">
            <h3 className="text-xl text-gold-400">
              Two ways to grow with JKTL
            </h3>
            <p className="mt-5 text-sm leading-relaxed">
              <strong>JKTL Affiliates:</strong> Creators, influencers and
              business educators share JKTL with their audiences and earn when
              referred customers make qualifying purchases.
            </p>
            <p className="mt-5 text-sm leading-relaxed">
              <strong>JKTL Partners:</strong> Professionals help clients adopt
              JKTL through a direct relationship, with an agreed commission and
              a written scope.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl mb-9">A simple working relationship</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              [
                "01",
                "Apply with your expertise",
                "Tell us who you serve, how many clients you support and the services you provide.",
              ],
              [
                "02",
                "Agree the terms",
                "JKTL reviews your application and agrees qualifying products, commissions, responsibilities and payout conditions before activation.",
              ],
              [
                "03",
                "Introduce and support clients",
                "With each client’s consent, guide them to create their own JKTL account. JKTL provides the infrastructure; you remain their trusted adviser.",
              ],
            ].map(([n, title, text]) => (
              <article key={n}>
                <span className="text-gold-600 text-sm">{n}</span>
                <h3 className="text-xl mt-3">{title}</h3>
                <p className="text-sm leading-relaxed text-black/60 mt-3">
                  {text}
                </p>
              </article>
            ))}
          </div>
          <p className="text-xs text-black/55 mt-9">
            Client accounts belong to clients. Never share passwords or create
            accounts without consent. A partner application does not activate
            commissions or grant access to client data.
          </p>
        </div>
      </section>
      <section
        id="apply"
        className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 scroll-mt-24"
      >
        <div>
          <p className="text-gold-600 text-xs tracking-widest">
            LET’S WORK TOGETHER
          </p>
          <h2 className="text-4xl mt-5">Trusted relationships come first.</h2>
          <p className="text-sm text-black/60 mt-6 leading-relaxed">
            We prioritise professionals with established relationships with
            business owners. Tell us how JKTL could help the clients who already
            rely on you.
          </p>
          <p className="text-xs text-black/55 mt-5">
            Applications are reviewed individually. Partner terms are agreed
            separately from the standard affiliate programme.
          </p>
        </div>
        <PartnerApplication />
      </section>
    </div>
  );
}

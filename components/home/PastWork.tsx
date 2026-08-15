import Link from "next/link";
import type { CaseStudyItem } from "@/hooks/useCaseStudies";

export default function PastWork({ caseStudies }: { caseStudies: CaseStudyItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {caseStudies.slice(0, 4).map(cs => (
        <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="block no-underline group">
          <div className="rounded overflow-hidden border border-cream-300 mb-3" style={{ aspectRatio: "4/3" }}>
            {cs.cover_image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cs.cover_image} alt={cs.client_name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
            ) : (
              <div className="w-full h-full bg-white flex items-center justify-center">
                <span className="font-mono text-[0.62rem] text-black/25">{(cs.product || "PROJECT").toUpperCase()}</span>
              </div>
            )}
          </div>
          <p className="font-bold text-[0.88rem] text-navy-900">{cs.client_name}</p>
        </Link>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import { sql } from "@/lib/db";
import Markdown from "@/components/Markdown";
import ApplyForm from "./ApplyForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers | JK Technology Limited",
  description: "Join JK Technology Limited. We build websites, automation and growth systems for businesses across Nigeria and beyond. See our open roles and apply.",
  alternates: { canonical: "https://jktl.com.ng/careers" },
};

type Job = {
  id: string; title: string; department: string | null; location: string | null;
  type: string | null; description: string | null;
};

export default async function CareersPage() {
  let jobs: Job[] = [];
  if (sql) {
    try {
      jobs = (await sql`
        SELECT id, title, department, location, type, description
        FROM jobs WHERE status = 'open' ORDER BY created_at DESC
      `) as Job[];
    } catch { jobs = []; }
  }

  return (
    <>
      <section style={{ background: "var(--navy-950)", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="max-w-7xl mx-auto px-8">
          <span className="gold-rule mb-6" style={{ display: "block" }} />
          <h1 className="display-hero mb-4" style={{ color: "var(--cream-50)", maxWidth: "700px" }}>
            Build with<br /><em className="not-italic gold-text">us.</em>
          </h1>
          <p className="body-lg" style={{ color: "rgba(249,247,240,0.55)", maxWidth: "520px" }}>
            We&apos;re a small team doing serious work for ambitious businesses. If you want ownership and real impact, we want to hear from you.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: "var(--cream-50)" }}>
        <div className="max-w-4xl mx-auto px-8">
          {jobs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.8rem", color: "var(--navy-900)", marginBottom: "12px" }}>
                No open roles right now.
              </h2>
              <p className="body-sm" style={{ color: "rgba(28,28,30,0.55)" }}>
                We&apos;re always glad to meet talented people. Send your CV to <a href="mailto:careers@jktl.com.ng" style={{ color: "var(--navy-600)", textDecoration: "underline" }}>careers@jktl.com.ng</a>.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {jobs.map((job) => (
                <div key={job.id} className="card-light" style={{ padding: "32px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                    {[job.department, job.location, job.type].filter(Boolean).map((t) => (
                      <span key={t as string} className="label-xs" style={{ color: "var(--navy-600)", background: "rgba(6,14,42,0.05)", padding: "4px 10px", borderRadius: "3px" }}>{t}</span>
                    ))}
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 400, fontSize: "1.6rem", color: "var(--navy-900)", marginBottom: "14px" }}>
                    {job.title}
                  </h2>
                  {job.description && (
                    <div style={{ marginBottom: "20px" }}>
                      <Markdown>{job.description}</Markdown>
                    </div>
                  )}
                  <ApplyForm jobId={job.id} jobTitle={job.title} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

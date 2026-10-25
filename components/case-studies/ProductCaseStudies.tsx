import { CaseStudyCard } from "./CaseStudyCard";
import { getCaseStudy } from "@/data/case-studies";
import styles from "./CaseStudies.module.css";
export function ProductCaseStudies({ domain = false }: { domain?: boolean }) {
  const projects = (
    domain
      ? ["kk-ubani-and-co", "refinish-phc"]
      : ["nej", "cecilia-learning-academy"]
  )
    .map(getCaseStudy)
    .filter((p) => p !== undefined);
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>JKTL / Selected work</p>
            <h2>
              {domain
                ? "A name of your own. A website worth finding."
                : "See the businesses behind the websites."}
            </h2>
            <p>
              {domain
                ? "Explore real websites from our client portfolio as you plan the home for your business online."
                : "From commerce to education, see examples of the websites and platforms JKTL has built."}
            </p>
          </div>
        </div>
        <div className={styles.zigzag}>
          {projects.map((study, index) => (
            <CaseStudyCard
              key={study.slug}
              study={study}
              index={index}
              zigzag
            />
          ))}
        </div>
      </div>
    </section>
  );
}

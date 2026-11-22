import Link from "next/link";
import { indexableTemplates } from "@/lib/seo/template-page";
import styles from "./TemplateDirectory.module.css";

/** Crawlable links supplement Show more without loading every preview image or adding query pages. */
export function TemplateDirectory({ landingOnly = false }: { landingOnly?: boolean }) {
  const templates = indexableTemplates.filter(item => !landingOnly || item.kind === "landing");
  const categories = [...new Set(templates.map(item => item.category))];
  return <nav className={styles.directory} aria-labelledby="template-directory-heading">
    <div className={styles.inner}>
      <h2 id="template-directory-heading">Browse templates by industry</h2>
      <p>Explore the original designs below. Open a template to compare its design editions and see the complete preview.</p>
      <div className={styles.grid}>{categories.map(category => <details key={category} open><summary>{category}</summary><ul>{templates.filter(item => item.category === category).map(item => <li key={item.id}><Link prefetch={false} href={`/templates/${item.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${item.name} template (opens in a new tab)`}>{item.name}</Link></li>)}</ul></details>)}</div>
    </div>
  </nav>;
}

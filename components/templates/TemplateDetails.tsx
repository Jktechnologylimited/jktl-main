import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { templateLoginPath, type WebsiteTemplate } from "@/lib/website-templates";
import { relatedTemplates, templateDetails, templateEditions } from "@/lib/seo/template-page";
import styles from "./TemplateDetails.module.css";

/** Real page content stays outside the interactive demo iframe and renders on the server. */
export function TemplateDetails({ template }: { template: WebsiteTemplate }) {
  const details = templateDetails(template), editions = templateEditions(template), related = relatedTemplates(template);
  return <section className={styles.details} id="template-details" aria-labelledby="template-details-title">
    <div className={styles.inner}>
      <div className={styles.columns}>
        <div>
          <p className={styles.eyebrow}>{template.category}</p>
          <h2 id="template-details-title">Make {template.name} your own.</h2>
          <p>This editable {details.kind} gives your business a starting point for its online presence. {details.pageCount > 1 ? `Explore ${details.pageCount} pages in the preview, including the homepage and supporting business pages.` : "Explore the content and contact sections on one page in the preview."} Switch between desktop and mobile views before choosing your design.</p>
          <h3>Content you can customise</h3>
          <p>The sample content includes {details.examples.join(", ") || "space for your business information"}. Replace the example business name, descriptions, photographs and contact details with your own. Sample names, reviews and service information describe a demonstration, not a real customer business.</p>
          <ul>{details.sections.map(section => <li key={section}>{section}</li>)}</ul>
        </div>
        <div>
          <h3>From preview to your free website</h3>
          <ol><li>Explore this design without signing up.</li><li>Select the template and sign in or create your JKTL Business account. Your selected design stays with you.</li><li>Edit your business content, preview the result and publish on your available JKTL subdomain.</li></ol>
          <p>Your free website includes JKTL hosting. A custom domain, professional business email and optional paid services are separate. Check the current plans before upgrading; no purchase is made by opening a preview.</p>
          <a className={styles.select} href={`https://business.jktl.com.ng${templateLoginPath(template.id)}`}>Use this template <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className={styles.links}><Link href="/products/website-builder">How free websites work</Link><Link href="/pricing">Compare website plans</Link><Link href="/products/invoicing-payments">Free invoicing</Link><Link href="/solutions/online-payments">Online invoice payments</Link></p>
        </div>
      </div>
      {!!editions.length && <details className={styles.editions}><summary>Compare design editions ({editions.length})</summary><ul>{editions.map(item => <li key={item.id}><Link prefetch={false} href={`/templates/${item.id}`} target="_blank" rel="noopener noreferrer">{item.name}</Link></li>)}</ul></details>}
      {!!related.length && <nav className={styles.related} aria-label="Related templates"><h3>More {template.category.toLowerCase()} designs</h3><ul>{related.map(item => <li key={item.id}><Link prefetch={false} href={`/templates/${item.id}`} target="_blank" rel="noopener noreferrer">{item.name} <ArrowUpRight size={15} aria-hidden="true" /></Link></li>)}</ul></nav>}
      <Link href="/templates" className={styles.browse}>Browse all website templates</Link>
    </div>
  </section>;
}

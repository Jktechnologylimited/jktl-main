import ContactContent from "@/components/contact/ContactContent";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata = pageMetadata("/contact", {
  title: "Contact JKTL",
  description:
    "Talk to JK Technology Limited about your business website, domains, business email or custom software. Contact our team in Lagos, Nigeria.",
});
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const text = (key: string, max: number) =>
    typeof params[key] === "string"
      ? (params[key] as string).slice(0, max)
      : "";
  return (
    <ContactContent
      context={{
        product: text("product", 80),
        plan: text("plan", 30),
        billing: params.billing === "monthly" ? "monthly" : "yearly",
      }}
    />
  );
}

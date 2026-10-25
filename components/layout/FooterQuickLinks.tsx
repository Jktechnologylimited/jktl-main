"use client";
import Link from "next/link";
import { navLinks } from "@/data/index";
import { useCustomNavItems } from "@/hooks/useCustomNavItems";

export default function FooterQuickLinks({
  asListItems = false,
  excludeHrefs = [],
}: { asListItems?: boolean; excludeHrefs?: string[] } = {}) {
  const links = [
    { href: "/", label: "Home" },
    ...navLinks,
    { href: "/case-studies", label: "Case studies" },
  ];
  const { footer: customFooter } = useCustomNavItems();
  const all = [
    ...links.filter((link) => !excludeHrefs.includes(link.href)),
    ...customFooter.map((item) => ({
      href: `/${item.slug}`,
      label: item.title,
    })),
  ];
  return (
    <>
      {all.map((link) =>
        asListItems ? (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: "0.8rem",
              color: "rgba(249,247,240,0.4)",
              textDecoration: "none",
            }}
          >
            {link.label}
          </Link>
        ),
      )}
    </>
  );
}

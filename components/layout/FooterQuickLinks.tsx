"use client";
import Link from "next/link";
import { navLinks } from "@/data/index";
import { useCustomNavItems } from "@/hooks/useCustomNavItems";

export default function FooterQuickLinks() {
  const links = [
    { href: "/", label: "Home" },
    ...navLinks,
    { href: "/case-studies", label: "Case studies" },
  ];
  const { footer: customFooter } = useCustomNavItems();
  return (
    <>
      {links.map((link) => (
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
      ))}
      {customFooter.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          style={{
            fontSize: "0.8rem",
            color: "rgba(249,247,240,0.4)",
            textDecoration: "none",
          }}
        >
          {item.title}
        </Link>
      ))}
    </>
  );
}

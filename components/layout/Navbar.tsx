"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, LogIn } from "lucide-react";
import { appLoginUrl, appSignupUrl } from "@/data/index";
import {
  navigation,
  type NavigationKey,
  type NavigationItem,
} from "@/data/navigation";
import { useCustomNavItems } from "@/hooks/useCustomNavItems";

const menuKeys = Object.keys(navigation) as NavigationKey[];

function MenuItem({
  item,
  close,
}: {
  item: NavigationItem;
  close: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={close}
      className="group block rounded-lg p-3 -m-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#80621c] hover:bg-[#f5f3ed]"
    >
      <span className="block text-base font-semibold text-[#060E2A] group-hover:text-[#80621c]">
        {item.title}
      </span>
      <span className="block mt-2 text-sm leading-relaxed text-[#62636a]">
        {item.description}
      </span>
      {item.note && (
        <span className="block mt-2 text-xs text-[#80621c]">{item.note}</span>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<NavigationKey | null>(null);
  const root = useRef<HTMLElement>(null);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const triggers = useRef<
    Partial<Record<NavigationKey, HTMLButtonElement | null>>
  >({});
  const pathname = usePathname();
  const { nav: customNav } = useCustomNavItems();
  const close = () => {
    setActive(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const reset = () => {
      setActive(null);
      setMobileOpen(false);
    };
    media.addEventListener("change", reset);
    return () => media.removeEventListener("change", reset);
  }, []);
  useEffect(() => {
    if (!active && !mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mobileOpen) mobileToggle.current?.focus();
        else if (active) triggers.current[active]?.focus();
        setActive(null);
        setMobileOpen(false);
      }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", outside);
    };
  }, [active, mobileOpen]);

  const renderMenu = (key: NavigationKey, mobile = false) => {
    const menu = navigation[key];
    return (
      <div
        id={`${mobile ? "mobile" : "desktop"}-${key}`}
        aria-label={`${menu.label} navigation`}
      >
        <div className="grid xl:grid-cols-[1fr_1.5fr_1fr]">
          {menu.groups.map((group, i) => (
            <section key={group.title} className="p-6 xl:p-9">
              <h2 className="text-xs uppercase tracking-widest text-[#72747d] border-b border-[#dcdde3] pb-4 mb-7">
                {group.title}
              </h2>
              <div
                className={`grid gap-x-8 gap-y-8 ${!mobile && i === 1 && key !== "resources" ? "sm:grid-cols-2" : ""}`}
              >
                {group.items.map((item) => (
                  <MenuItem key={item.title} item={item} close={close} />
                ))}
                {key === "resources" &&
                  i === 0 &&
                  customNav.map((item) => (
                    <MenuItem
                      key={item.slug}
                      item={{
                        title: item.title,
                        description: "Explore more from JKTL.",
                        href: `/${item.slug}`,
                      }}
                      close={close}
                    />
                  ))}
              </div>
            </section>
          ))}
          <section className="bg-[#f4f4f9] p-6 xl:p-9">
            <h2 className="text-xs uppercase tracking-widest text-[#72747d] border-b border-[#dcdde3] pb-4 mb-7">
              {menu.aside.title}
            </h2>
            <div className="grid gap-8">
              {menu.aside.items.map((item) => (
                <MenuItem key={item.title} item={item} close={close} />
              ))}
            </div>
          </section>
        </div>
        <Link
          href={menu.footer.href}
          onClick={close}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 bg-[#e9e6d9] px-6 py-5 xl:px-9 text-[#060E2A] hover:bg-[#e1dcc9]"
        >
          <span className="flex items-center gap-3 font-semibold">
            {menu.footer.title}
            <ArrowRight size={18} />
          </span>
          <span className="text-sm text-[#62636a]">
            {menu.footer.description}
          </span>
        </Link>
      </div>
    );
  };

  return (
    <header
      ref={root}
      className="fixed inset-x-0 top-0 z-[300]"
      onBlurCapture={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          close();
      }}
    >
      <nav
        aria-label="Main navigation"
        className="relative z-10 flex h-[68px] items-center border-b border-[#e7e7eb] bg-white"
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-8">
          <Link
            href="/"
            onClick={close}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="JKTL Business home"
          >
            <Image
              src="/logo.png"
              alt=""
              width={38}
              height={38}
              className="object-contain"
            />
            <span className="hidden sm:block text-base font-extrabold text-[#060E2A]">
              JKTL <span className="text-[#80621c]">Business</span>
            </span>
          </Link>
          <div className="hidden xl:flex items-center gap-1">
            {menuKeys.map((key) => (
              <button
                key={key}
                ref={(node) => {
                  triggers.current[key] = node;
                }}
                type="button"
                aria-expanded={active === key}
                aria-controls={`desktop-${key}`}
                onClick={() => setActive(active === key ? null : key)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActive(key);
                    requestAnimationFrame(() =>
                      root.current
                        ?.querySelector<HTMLAnchorElement>(`#desktop-${key} a`)
                        ?.focus(),
                    );
                  }
                }}
                className={`flex h-[68px] items-center gap-2 border-b-[3px] px-4 pt-[3px] text-sm text-[#060E2A] transition-colors hover:text-[#80621c] ${active === key ? "border-[#C9A84C] font-semibold" : "border-transparent"}`}
              >
                {navigation[key].label}
                <ChevronDown
                  size={15}
                  className={`transition-transform ${active === key ? "rotate-180" : ""}`}
                />
              </button>
            ))}
            <Link
              href="/products/domains"
              onClick={close}
              className="px-4 py-5 text-sm text-[#060E2A] hover:text-[#80621c]"
            >
              Domains
            </Link>
            <Link
              href="/pricing"
              onClick={close}
              className="px-4 py-5 text-sm text-[#060E2A] hover:text-[#80621c]"
            >
              Pricing
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <a
              href={appLoginUrl()}
              className="hidden sm:inline-flex items-center gap-2 text-sm text-[#060E2A] underline underline-offset-4"
            >
              <LogIn size={16} aria-hidden="true"/> Log in
            </a>
            <a
              href={appSignupUrl()}
              className="rounded-full bg-[#C9A84C] px-4 py-3 text-xs font-semibold text-[#060E2A] hover:bg-[#D4B96A] sm:px-6 sm:text-sm"
            >
              Get started free
            </a>
            <button
              ref={mobileToggle}
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setActive(null);
              }}
              className="flex size-10 items-center justify-center text-[#060E2A] xl:hidden"
            >
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </nav>
      {active && !mobileOpen && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close navigation panel"
            onClick={close}
            className="fixed inset-x-0 bottom-0 top-[68px] hidden bg-black/25 xl:block"
          />
          <div className="relative hidden max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-[#dedee5] bg-white shadow-xl xl:block">
            {renderMenu(active)}
          </div>
        </>
      )}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[68px] overflow-y-auto bg-white pb-8 xl:hidden"
        >
          {menuKeys.map((key) => (
            <section key={key} className="border-b border-[#e7e7eb]">
              <button
                type="button"
                aria-expanded={active === key}
                aria-controls={`mobile-${key}`}
                onClick={() => setActive(active === key ? null : key)}
                className="flex w-full items-center justify-between px-6 py-5 text-lg font-semibold text-[#060E2A]"
              >
                {navigation[key].label}
                <ChevronDown
                  size={18}
                  className={active === key ? "rotate-180" : ""}
                />
              </button>
              {active === key && renderMenu(key, true)}
            </section>
          ))}
          <Link
            href="/products/domains"
            onClick={close}
            className="block px-6 py-4 text-[#060E2A]"
          >
            Domains
          </Link>
          <Link
            href="/pricing"
            onClick={close}
            className="block px-6 py-4 text-[#060E2A]"
          >
            Pricing
          </Link>
          <a
            href={appLoginUrl()}
            className="block px-6 py-4 text-[#060E2A] underline"
          >
            Log in
          </a>
          <a
            href={appSignupUrl()}
            className="mx-6 mt-3 block rounded-full bg-[#C9A84C] p-4 text-center font-semibold text-[#060E2A]"
          >
            Get started free
          </a>
        </div>
      )}
    </header>
  );
}

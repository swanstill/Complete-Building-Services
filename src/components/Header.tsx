"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/SiteConfig";
import { navigation, website } from "@/config/website";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links =
          menu.current?.querySelectorAll<HTMLAnchorElement>("a[href]");
        const first = toggle.current;
        const last = links?.[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const close = () => setOpen(false);
  const quoteHref = pathname.startsWith("/thank-you")
    ? "/contact/#quote-form"
    : "#quote-form";
  return (
    <header className="site-header" data-menu-open={open}>
      <div className="utility-bar">
        <div className="shell">
          <span>Local roofers. Straightforward advice. Quality work.</span>
          <a href={website.phoneHref} data-placement="top-bar">
            24/7 emergency roofing · {website.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="shell header-main">
        <Link
          href="/"
          onClick={close}
          className="brand-logo"
          aria-label={siteConfig.companyName + " home"}
        >
          <Image
            src={siteConfig.logoImage}
            alt={siteConfig.logoAltText}
            width={310}
            height={120}
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={
                pathname === link.href || pathname === link.href.slice(0, -1)
                  ? "page"
                  : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a href={quoteHref} className="button button-primary header-quote">
          Get a free quote <span aria-hidden="true">↗</span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div
        className={open ? "mobile-menu is-open" : "mobile-menu"}
        id="mobile-menu"
        ref={menu}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={
                pathname === link.href || pathname === link.href.slice(0, -1)
                  ? "page"
                  : undefined
              }
            >
              <span className="menu-number">0{i + 1}</span>
              {link.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
        <p>Swindon & Royal Wootton Bassett</p>
        <a
          href={website.phoneHref}
          className="menu-phone"
          data-placement="mobile-menu"
        >
          {website.phoneDisplay}
        </a>
        <a href={quoteHref} onClick={close} className="button button-primary">
          Get my free quote <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}

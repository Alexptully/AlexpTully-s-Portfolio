"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import type { NavLink } from "@/content/types";
import { MenuOverlay } from "@/components/motion/MenuOverlay";
import { LocalClock } from "@/components/layout/LocalClock";
import { Wordmark } from "@/components/layout/Wordmark";

const MENU_ID = "site-menu";

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

/**
 * Which nav item the current route belongs to. Hash targets on home (`/#work`, `/#contact`)
 * are sections, not pages, so they are never "current" on home itself; case studies
 * (`/work/*`) belong to Work.
 */
function isCurrent(item: NavLink, pathname: string) {
  const [path, hash] = item.href.split("#");
  if (hash === "work") return pathname.startsWith("/work/");
  if (hash) return false;
  return pathname === path || pathname.startsWith(`${path}/`);
}

/** On home, `/#work` becomes `#work` so the link scrolls instead of navigating. */
function hrefOn(item: NavLink, pathname: string) {
  return pathname === "/" && item.href.startsWith("/#") ? item.href.slice(1) : item.href;
}

/**
 * Site header (redesign-spec §1–2): wordmark left, "LOS ANGELES, CA / live time" centre,
 * uppercase nav and a pink email pill right. Below 1024 px the nav moves into a full-screen
 * menu. The current section gets an accent dot and `aria-current="page"`.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const links = site.nav.filter((item) => isInternal(item.href));
  const mailto = `mailto:${site.email}`;

  return (
    <header id="top" className="site-header sticky top-0 z-50 bg-bg/90 backdrop-blur-md supports-[backdrop-filter]:bg-bg/75">
      <div className="container-site grid h-16 grid-cols-[1fr_auto] items-center gap-6 lg:h-[4.5rem] lg:grid-cols-3">
        <Link href="/" aria-label={`${site.name}, home`} className="inline-flex h-11 items-center justify-self-start">
          <Wordmark className="text-[1.375rem] lg:text-[1.625rem]" />
        </Link>

        <p className="type-label hidden justify-self-center text-ink md:block">
          Los Angeles, CA <span className="text-quiet">/</span> <LocalClock />
        </p>

        <div className="flex items-center justify-self-end gap-8">
          <nav aria-label="Site" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={hrefOn(item, pathname)}
                    aria-label={item.ariaLabel}
                    aria-current={isCurrent(item, pathname) ? "page" : undefined}
                    className="type-nav nav-link inline-flex h-11 items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={mailto} className="pill hidden lg:inline-flex">
            Email me
          </a>
          <button
            type="button"
            className="type-nav nav-link inline-flex h-11 items-center lg:hidden"
            aria-expanded={open}
            aria-controls={MENU_ID}
            onClick={() => setOpen(true)}
          >
            Menu
          </button>
        </div>
      </div>

      <MenuOverlay
        id={MENU_ID}
        open={open}
        onOpenChange={setOpen}
        label="Site menu"
        links={[
          { href: "/", label: "Home", current: pathname === "/" },
          ...links.map((item) => ({
            href: hrefOn(item, pathname),
            label: item.label,
            current: isCurrent(item, pathname),
          })),
        ]}
      >
        <div className="menu-overlay__foot">
          <a href={mailto} className="pill" onClick={() => setOpen(false)}>
            Email me
          </a>
          <a href={site.website.href} rel="noopener" className="type-nav nav-link inline-flex h-11 items-center">
            {site.website.label}
          </a>
        </div>
      </MenuOverlay>
    </header>
  );
}

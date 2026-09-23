"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import type { NavLink } from "@/content/types";
import { Container } from "@/components/layout/Container";

const itemClass = "type-nav nav-link inline-flex h-11 items-center";

function isInternal(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

/** Path part of an internal href (`/#work` → `/`, `/about` → `/about`). */
function pathOf(href: string) {
  return href.split("#")[0] || "/";
}

/**
 * Whether a nav item describes the current route. Case studies (`/work/*`) belong to
 * "Work", whose own target is the lineup on home.
 */
function isCurrent(item: NavLink, pathname: string) {
  if (!isInternal(item.href)) return false;
  const path = pathOf(item.href);
  if (path === "/") return pathname === "/" || pathname.startsWith("/work/");
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavItem({ item, pathname }: { item: NavLink; pathname: string }) {
  if (!isInternal(item.href)) {
    return (
      <a
        href={item.href}
        rel={item.external ? "noopener" : undefined}
        aria-label={item.ariaLabel}
        className={itemClass}
      >
        {item.label}
      </a>
    );
  }
  // On home the Work link is a same-page anchor, so it jumps instead of navigating.
  const href = pathname === "/" && item.href.startsWith("/#") ? item.href.slice(1) : item.href;
  return (
    <Link
      href={href}
      aria-label={item.ariaLabel}
      aria-current={isCurrent(item, pathname) ? "page" : undefined}
      className={itemClass}
    >
      {item.label}
    </Link>
  );
}

/**
 * Site masthead: one 56 px row on every route, sticky with a blurred ground so the lit
 * emitter beside the wordmark stays in view.
 * Wordmark left; the `site.nav` items right (Work, About, Email; tullytech.com at ≥ 1024).
 * The current route gets a static 2 px accent underline plus `aria-current="page"`.
 */
export function Masthead() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/75 backdrop-blur-md supports-[backdrop-filter]:bg-bg/60">
      <Container className="flex h-14 items-center justify-between">
        {/* The wordmark never takes aria-current: "Work" marks home, so one pink underline per viewport. */}
        <Link href="/" className="group inline-flex h-11 items-center gap-3">
          <span aria-hidden="true" className="led led-pulse" />
          <span className="type-nav">{site.name}</span>
          <span aria-hidden="true" className="type-label hidden border-l border-border pl-3 md:inline">
            {site.website.label}
          </span>
        </Link>

        <nav aria-label="Site">
          <ul className="flex items-center gap-5 lg:gap-8">
            {site.nav.map((item) => (
              <li key={item.href} className={item.desktopOnly ? "hidden lg:block" : undefined}>
                <NavItem item={item} pathname={pathname} />
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

"use client";

import { useEffect, useEffectEvent, useRef, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { getLenis } from "./lenis-store";
import { TransitionLink } from "./TransitionLink";
import { useIsClient } from "./useMediaQuery";

export type MenuLink = {
  href: string;
  label: ReactNode;
  /** Optional view-transition type(s) for this link; default none (crossfade). */
  transition?: string | readonly string[];
  /** Marks the current page (`aria-current="page"`). */
  current?: boolean;
};

type MenuOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly MenuLink[];
  /** Put the same id in the trigger's `aria-controls`. */
  id?: string;
  /** Accessible name for the dialog and its nav. */
  label?: string;
  /** Text of the close button inside the overlay. */
  closeLabel?: ReactNode;
  className?: string;
  /** Extra content under the links (contact line, socials). */
  children?: ReactNode;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function focusableIn(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0,
  );
}

/**
 * Full-screen menu, rendered into <body> through a portal. While open it:
 * - is a modal dialog (`role="dialog"`, `aria-modal`), with every other <body> child `inert`;
 * - moves focus to its first control and keeps Tab / Shift+Tab inside;
 * - closes on Escape, on the close button and on any link;
 * - stops Lenis and the page scroll.
 * On close, focus returns to whatever had it before (the trigger). The trigger itself is yours:
 * a button with `aria-expanded={open}` and `aria-controls={id}`.
 *
 * Closed, it stays mounted but `display: none` and `inert` (motion.css); the fade runs both ways
 * where the browser supports `allow-discrete` transitions. Never rendered on the server or
 * without JS.
 */
export function MenuOverlay({
  open,
  onOpenChange,
  links,
  id = "menu-overlay",
  label = "Menu",
  closeLabel = "Close",
  className,
  children,
}: MenuOverlayProps) {
  const isClient = useIsClient();
  const overlayRef = useRef<HTMLDivElement>(null);
  const close = useEffectEvent(() => onOpenChange(false));

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!open || !overlay) return;
    const returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const inerted: HTMLElement[] = [];
    for (const child of Array.from(document.body.children)) {
      if (!(child instanceof HTMLElement) || child.contains(overlay) || child.inert) continue;
      child.inert = true;
      inerted.push(child);
    }
    const html = document.documentElement;
    html.setAttribute("data-menu-open", "");
    getLenis()?.stop();

    (focusableIn(overlay)[0] ?? overlay).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusableIn(overlay);
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !overlay.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !overlay.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      inerted.forEach((el) => {
        el.inert = false;
      });
      html.removeAttribute("data-menu-open");
      getLenis()?.start();
      if (returnTo?.isConnected) returnTo.focus({ preventScroll: true });
    };
  }, [open]);

  if (!isClient) return null;

  return createPortal(
    <div
      ref={overlayRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className={cn("menu-overlay", className)}
      data-open={open ? "" : undefined}
      data-lenis-prevent=""
      inert={!open}
    >
      <button type="button" className="menu-overlay__close" onClick={() => onOpenChange(false)}>
        {closeLabel}
      </button>
      <nav aria-label={label} className="menu-overlay__nav">
        <ul className="menu-overlay__list">
          {links.map((link, i) => (
            <li key={`${i}:${link.href}`} className="menu-overlay__item" style={{ "--i": i } as CSSProperties}>
              <TransitionLink
                href={link.href}
                transition={link.transition ?? false}
                aria-current={link.current ? "page" : undefined}
                className="menu-overlay__link"
                onClick={() => onOpenChange(false)}
              >
                {link.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>,
    document.body,
  );
}

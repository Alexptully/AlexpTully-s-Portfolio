"use client";

import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export type RevealVariant = "up" | "fade" | "mask";

type RevealProps = {
  /** Element to render. Default `div`. */
  as?: ElementType;
  /** Hidden state, defined in motion.css: `up` (fade + rise), `fade`, `mask` (clip wipe). */
  variant?: RevealVariant;
  /** Reveal each direct child separately (with `stagger`) instead of the wrapper as one. */
  each?: boolean;
  /** Seconds between children when `each` is on. */
  stagger?: number;
  /** Seconds before the (first) reveal starts. */
  delay?: number;
  /** IntersectionObserver rootMargin; the default reveals a little before the element is fully in. */
  rootMargin?: string;
  threshold?: number;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  // Zero-size (display: none, empty) elements are never worth hiding.
  if (rect.width === 0 && rect.height === 0) return true;
  return rect.top < window.innerHeight && rect.bottom > 0;
}

/**
 * Scroll reveal. Marks its element (or, with `each`, every direct child) `data-reveal` and adds
 * `data-in` once, the first time it scrolls into view. Elements already on screen at mount get
 * `data-in` before first paint, so nothing above the fold ever blinks.
 *
 * It never hides anything itself: motion.css hides `[data-reveal]:not([data-in])` only under
 * `html.motion.motion-ready`, on screen media, without reduced motion. Without JS, with reduced
 * motion and in print the content is simply there.
 */
export function Reveal({
  as,
  variant = "up",
  each = false,
  stagger = 0.08,
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0,
  style,
  children,
  ...rest
}: RevealProps) {
  // Typed as "div" for JSX checking; any intrinsic tag (or component forwarding ref) works at runtime.
  const Tag = (as ?? "div") as "div";
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = each
      ? Array.from(root.children).filter((c): c is HTMLElement => c instanceof HTMLElement)
      : [root];
    if (each) {
      targets.forEach((el, i) => {
        el.setAttribute("data-reveal", variant);
        el.style.setProperty("--reveal-delay", `${delay + i * stagger}s`);
      });
    }

    const pending = targets.filter((el) => {
      if (el.hasAttribute("data-in")) return false;
      if (isInViewport(el)) {
        el.setAttribute("data-in", "");
        return false;
      }
      return true;
    });
    if (!pending.length) return;

    if (typeof IntersectionObserver === "undefined") {
      pending.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin, threshold },
    );
    pending.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [each, variant, stagger, delay, rootMargin, threshold]);

  const wrapperStyle =
    !each && delay ? ({ ...style, "--reveal-delay": `${delay}s` } as CSSProperties) : style;

  return (
    <Tag ref={ref} data-reveal={each ? undefined : variant} style={wrapperStyle} {...rest}>
      {children}
    </Tag>
  );
}

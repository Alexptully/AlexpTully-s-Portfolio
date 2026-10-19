"use client";

import {
  useRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, useGSAP } from "./gsap";
import { PARALLAX_QUERY } from "./motion-config";

type ParallaxProps = {
  as?: ElementType;
  /** Pixels of travel either side of rest: the element moves from -amount to +amount. */
  amount?: number;
  /** Media query that must match for the effect to run. Default: desktop fine pointer, no reduced motion. */
  query?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/**
 * Scroll-scrubbed vertical drift, transform only. The trigger is the parent element (put this
 * inside an overflow-clipped frame and give it some bleed). Runs only while `query` matches,
 * via `gsap.matchMedia`, so resizing to mobile, switching to touch or turning on reduced motion
 * reverts it to rest. Print shows it at rest (motion.css).
 */
export function Parallax({
  as,
  amount = 60,
  query = PARALLAX_QUERY,
  children,
  ...rest
}: ParallaxProps) {
  // Typed as "div" for JSX checking; any intrinsic tag (or component forwarding ref) works at runtime.
  const Tag = (as ?? "div") as "div";
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(query, () => {
        gsap.fromTo(
          el,
          { y: -amount },
          {
            y: amount,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [amount, query], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} data-parallax="" {...rest}>
      {children}
    </Tag>
  );
}

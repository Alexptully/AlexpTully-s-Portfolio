"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, SplitText, useGSAP } from "./gsap";
import { REDUCED_MOTION_QUERY } from "./motion-config";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type SplitBy = "lines" | "words" | "chars";

export type SplitRevealProps = {
  /** Heading level. SplitText labels the heading with its full text and hides the pieces. */
  as?: HeadingTag;
  /** Plain text only: no markup, links or footnote markers. */
  text: string;
  /** Unit that slides up out of its own mask. Default `lines`. */
  by?: SplitBy;
  /** Seconds between units. Default 0.08 (lines, words) or 0.02 (chars). */
  stagger?: number;
  /** Seconds per unit. */
  duration?: number;
  /** Seconds before the first unit moves. */
  delay?: number;
  /** Any GSAP ease string. */
  ease?: string;
  /** `inview` (default) plays once when `start` is crossed; `mount` plays straight away. */
  trigger?: "inview" | "mount";
  /** ScrollTrigger start for `trigger="inview"`. */
  start?: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

/**
 * Masked line / word / character reveal for a plain-text heading, using SplitText with
 * `autoSplit` (re-splits when fonts load or the width changes, keeping the animation's place)
 * and `mask`. The split is reverted on unmount and whenever a prop changes.
 *
 * Static by default: the server renders the plain heading; nothing is split without JS or under
 * reduced motion. The element is keyed by `text`, so a text change remounts it instead of letting
 * SplitText's revert overwrite React's update.
 */
export function SplitReveal({
  as: Tag = "h2",
  text,
  by = "lines",
  stagger,
  duration = 0.9,
  delay = 0,
  ease = "power3.out",
  trigger = "inview",
  start = "top 85%",
  className,
  id,
  style,
}: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const gap = stagger ?? (by === "chars" ? 0.02 : 0.08);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
      const split = SplitText.create(el, {
        type: by === "chars" ? "words,chars" : by,
        mask: by,
        autoSplit: by === "lines",
        aria: "auto",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        onSplit(self: SplitText) {
          return gsap.from(self[by], {
            yPercent: 115,
            duration,
            ease,
            stagger: gap,
            delay,
            scrollTrigger: trigger === "inview" ? { trigger: el, start, once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    {
      scope: ref,
      dependencies: [text, by, gap, duration, delay, ease, trigger, start],
      revertOnUpdate: true,
    },
  );

  return (
    <Tag key={text} ref={ref} id={id} className={className} style={style} data-split-reveal={by}>
      {text}
    </Tag>
  );
}

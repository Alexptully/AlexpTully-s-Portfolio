import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  direction?: "left" | "right";
  /** Copies per half. Raise it when one copy is narrower than the viewport. */
  repeat?: number;
  /** Pause while hovered or while something inside has focus. */
  pauseOnHover?: boolean;
  /** Space between copies (any CSS length); also the space between items via `--marquee-gap`. */
  gap?: string;
  className?: string;
  /** Accessible name for the strip, if it is more than decoration. */
  label?: string;
};

/**
 * Infinite horizontal loop, CSS only (no JS shipped). The track holds `2 × repeat` copies and
 * slides by half its width. Only the first copy is exposed; the rest are `aria-hidden` and
 * `inert`, so links inside are never announced or focused twice.
 *
 * Under reduced motion and in print the strip stops, the copies disappear, and the first copy
 * wraps onto as many lines as it needs, so nothing is cut off.
 */
export function Marquee({
  children,
  duration = 30,
  direction = "left",
  repeat = 1,
  pauseOnHover = true,
  gap,
  className,
  label,
}: MarqueeProps) {
  const copies = Math.max(1, Math.floor(repeat)) * 2;
  const style = {
    "--marquee-dur": `${duration}s`,
    ...(gap ? { "--marquee-gap": gap } : null),
  } as CSSProperties;

  return (
    <div
      className={cn("marquee", className)}
      style={style}
      data-direction={direction}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
      role={label ? "region" : undefined}
      aria-label={label}
    >
      <div className="marquee__track">
        {Array.from({ length: copies }, (_, i) =>
          i === 0 ? (
            <div key={i} className="marquee__copy">
              {children}
            </div>
          ) : (
            <div key={i} className="marquee__copy" data-marquee-copy="" aria-hidden="true" inert>
              {children}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

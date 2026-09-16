"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide motion settings. `reducedMotion="user"` makes every `motion.*` element
 * honour `prefers-reduced-motion` on its own: transform and layout animations are
 * skipped while opacity and colour still animate.
 *
 * Mount it once, high in the tree (root layout when the real site lands; the lab page
 * for now). Server Components pass straight through as `children`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

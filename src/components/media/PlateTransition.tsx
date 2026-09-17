"use client";

import { ViewTransition, type ReactNode } from "react";

type PlateTransitionProps = {
  /** Shared-element name, `plate-${slug}`; the same name on the case-study hero pairs them. */
  name: string;
  children: ReactNode;
};

/**
 * Route continuity for a plate image (design-spec §4.2, §11.5): the image morphs from a home
 * row to the case-study hero. `default="none"` keeps it from animating during any unrelated
 * transition; `share="plate"` keeps the pair morphing under that setting (Next's guide:
 * with `default="none"` and no `share`, the pair stops morphing). Reduced motion zeroes the
 * animation in CSS. `ViewTransition` only exists in the React canary Next vendors, so the
 * import lives in this client file and nowhere else.
 */
export function PlateTransition({ name, children }: PlateTransitionProps) {
  return (
    <ViewTransition name={name} share="plate" default="none">
      {children}
    </ViewTransition>
  );
}

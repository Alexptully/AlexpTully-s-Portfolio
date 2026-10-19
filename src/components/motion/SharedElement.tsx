"use client";

import { ViewTransition, type ReactNode } from "react";

type SharedElementProps = {
  /**
   * Shared-element name, unique on the page (e.g. `cover-${slug}`). The same name on the
   * destination page pairs the two, and the element morphs between them.
   */
  name: string;
  /** View-transition class for the morph; motion.css styles `.shared` with `--vt-shared-dur`. */
  share?: string;
  children: ReactNode;
};

/**
 * Route continuity for one element (ported from media/PlateTransition): it morphs from its
 * place on one page to its place on the next. `default="none"` keeps it from animating during
 * unrelated transitions; the explicit `share` keeps the pair morphing under that setting (Next's
 * guide: with `default="none"` and no `share`, the pair silently stops morphing). Reduced
 * motion zeroes the animation in CSS. `ViewTransition` ships in the React canary Next vendors,
 * so the import stays in this client file.
 */
export function SharedElement({ name, share = "shared", children }: SharedElementProps) {
  return (
    <ViewTransition name={name} share={share} default="none">
      {children}
    </ViewTransition>
  );
}

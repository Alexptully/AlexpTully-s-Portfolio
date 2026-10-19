"use client";

import { ViewTransition, type ReactNode, type ViewTransitionClassPerType } from "react";

/**
 * Transition type → view-transition class. The classes are styled in motion.css
 * (`::view-transition-old/new(.nav-forward)` and so on), with timings in `--vt-dur` / `--vt-ease`.
 * Untyped navigations (plain links, browser back/forward) get the default crossfade, `vt-fade`.
 */
export const PAGE_TRANSITION_CLASSES: ViewTransitionClassPerType = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  curtain: "curtain",
  default: "vt-fade",
};

type PageTransitionProps = {
  children: ReactNode;
  /** Override the type → class map (it must keep a `default` key; use "none" to disable). */
  classes?: ViewTransitionClassPerType;
};

/**
 * Page-level enter/exit animation. Wrap each page's content in it, inside `page.tsx`, never in a
 * layout (layouts persist, so enter/exit never fire there), and do not add a layout-level
 * `<ViewTransition>` around `{children}` (it would swallow the page's own enter/exit).
 * It must be the first thing the page renders, before any DOM element.
 *
 * Shared elements inside (`<SharedElement>`) still morph; React runs them in the same transition.
 */
export function PageTransition({ children, classes = PAGE_TRANSITION_CLASSES }: PageTransitionProps) {
  return (
    <ViewTransition enter={classes} exit={classes} default="none">
      {children}
    </ViewTransition>
  );
}

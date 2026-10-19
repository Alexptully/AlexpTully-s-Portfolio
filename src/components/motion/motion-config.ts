/**
 * Shared names for the motion layer. The inline head script (MotionInitScript), the CSS in
 * `src/app/motion.css` and the client primitives all read these, so a rename happens here once.
 *
 * Contract (see motion.css): content is hidden only while `<html>` carries BOTH
 * `MOTION_CLASS` (added before first paint by the head script, never under reduced motion)
 * and `MOTION_READY_CLASS` (added by MotionRoot after hydration). No JS, a JS failure,
 * reduced motion and print therefore always show everything.
 */
export const MOTION_CLASS = "motion";
export const MOTION_READY_CLASS = "motion-ready";
/** Set by the head script on the first visit of a session; shows the Preloader overlay. */
export const MOTION_PRELOAD_CLASS = "motion-preload";
/** sessionStorage key that marks "the preloader already ran in this tab". */
export const PRELOADER_STORAGE_KEY = "motion:preloaded";
/** Hard cap for the preloader overlay, in ms (performance budget: 1.2 s or less). */
export const PRELOADER_MAX_MS = 1200;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
/** A mouse or trackpad: cursor-following effects only run here. */
export const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
/** Parallax default: desktop-width fine pointers that have not asked for reduced motion. */
export const PARALLAX_QUERY =
  "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** View-transition types. Pass them through `TransitionLink` / `router.push({ transitionTypes })`. */
export const TRANSITION_TYPES = ["nav-forward", "nav-back", "curtain"] as const;
export type TransitionType = (typeof TRANSITION_TYPES)[number];

/** What the head script decided, so MotionRoot can re-apply it (React's dev remount resets <html>). */
export type MotionInitState = { reduced: boolean; preload: boolean };

declare global {
  interface Window {
    __motionInit?: MotionInitState;
  }
}

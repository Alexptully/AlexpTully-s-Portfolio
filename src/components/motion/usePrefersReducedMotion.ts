"use client";

import { useSyncExternalStore } from "react";
import { REDUCED_MOTION_QUERY } from "./motion-config";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  // Server render and hydration both see "no preference", so markup never mismatches.
  // The real value is read on the client right after hydration.
  return false;
}

/**
 * Live `prefers-reduced-motion` flag.
 *
 * Why not motion's `useReducedMotion()`: it reads the media query once into `useState`
 * and never updates, returns `null` on the server, and logs a dev warning when the
 * preference is on. This hook is hydration-safe, reacts to OS setting changes, and
 * avoids setState-in-effect, which eslint-plugin-react-hooks v7 reports as an error.
 *
 * Effects that must decide before paint (MotionRoot, SplitReveal) read
 * `window.matchMedia(REDUCED_MOTION_QUERY)` directly, because during hydration this hook
 * still returns the server value.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
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
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import type Lenis from "lenis";
import { useSyncExternalStore } from "react";

/**
 * The live Lenis instance, held outside React so any component can read it without a provider
 * re-render and without setState-in-effect. MotionRoot writes it; `useLenis()` reads it.
 * It is `null` on the server, before MotionRoot mounts, and under reduced motion (native scroll).
 */
let instance: Lenis | null = null;
const listeners = new Set<() => void>();

export function setLenis(next: Lenis | null) {
  instance = next;
  listeners.forEach((listener) => listener());
}

/** Imperative read, for event handlers and effects. */
export function getLenis(): Lenis | null {
  return instance;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getServerSnapshot() {
  return null;
}

/** The Lenis instance, or null when smooth scroll is off (reduced motion, server, not mounted). */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, getLenis, getServerSnapshot);
}

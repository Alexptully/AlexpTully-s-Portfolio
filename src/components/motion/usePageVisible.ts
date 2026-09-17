"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function getSnapshot() {
  return document.visibilityState !== "hidden";
}

function getServerSnapshot() {
  // The server and the hydrating client both assume a visible tab, so markup never mismatches.
  return true;
}

/**
 * Whether the tab is visible (`document.visibilityState`). Any autonomous loop stops when it
 * is not (design-spec §11.7). Built on `useSyncExternalStore` so it is hydration-safe and needs
 * no `motion/react` on the launch routes (§11.8).
 */
export function usePageVisible(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

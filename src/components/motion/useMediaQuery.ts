"use client";

import { useCallback, useSyncExternalStore } from "react";
import { FINE_POINTER_QUERY } from "./motion-config";

/**
 * Live `matchMedia` flag. Hydration-safe: the server render and hydration both see
 * `serverValue`, and the real value arrives right after hydration. No setState-in-effect.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => serverValue, [serverValue]);
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True on a mouse or trackpad (`(hover: hover) and (pointer: fine)`); false on touch and on the server. */
export function useFinePointer(): boolean {
  return useMediaQuery(FINE_POINTER_QUERY);
}

function noopSubscribe() {
  return () => {};
}

/** False during SSR and hydration, true afterwards. For portals and client-only layers. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

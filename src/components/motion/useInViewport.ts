"use client";

import { useCallback, useState, useSyncExternalStore, type RefObject } from "react";

type Store = { visible: boolean };

function getServerSnapshot() {
  // Assume on screen until the observer says otherwise, so the first client render matches SSR.
  return true;
}

/**
 * Whether `ref`'s element is within `margin` of the viewport, from one `IntersectionObserver`.
 * Used to stop the hero canvas's drift loop 160 px off screen (design-spec §10.1, §11.7).
 * `useSyncExternalStore`-based so it is hydration-safe, avoids setState-in-effect, and keeps
 * `motion/react` off the launch routes (§11.8). Without `IntersectionObserver` it reports
 * visible.
 */
export function useInViewport(ref: RefObject<Element | null>, margin = "160px 0px"): boolean {
  // One mutable cell per hook instance; the observer writes it, the snapshot reads it.
  const [store] = useState<Store>(() => ({ visible: true }));

  const subscribe = useCallback(
    (onChange: () => void) => {
      // Effect phase: the ref is populated and reading it here is allowed.
      const el = ref.current;
      if (!el || typeof IntersectionObserver === "undefined") return () => {};
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          if (!entry) return;
          store.visible = entry.isIntersecting;
          onChange();
        },
        { rootMargin: margin },
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        store.visible = true;
      };
    },
    [ref, margin, store],
  );

  const getSnapshot = useCallback(() => store.visible, [store]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

"use client";

import { MOTION_PRELOAD_CLASS, PRELOADER_MAX_MS, PRELOADER_STORAGE_KEY } from "@/components/motion/motion-config";

/** Replays the first-visit overlay (dev only), and offers to clear the session flag. */
export function PreloaderReplay() {
  const replay = () => {
    const html = document.documentElement;
    html.classList.remove(MOTION_PRELOAD_CLASS);
    // Force a style flush so the CSS animation restarts when the class comes back.
    void html.offsetWidth;
    html.classList.add(MOTION_PRELOAD_CLASS);
    window.setTimeout(() => html.classList.remove(MOTION_PRELOAD_CLASS), PRELOADER_MAX_MS);
  };
  const reset = () => {
    try {
      window.sessionStorage.removeItem(PRELOADER_STORAGE_KEY);
    } catch {
      // storage blocked: nothing to clear
    }
  };
  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" className="inline-flex h-11 items-center rounded-control border border-border px-4" onClick={replay}>
        Replay preloader
      </button>
      <button type="button" className="inline-flex h-11 items-center rounded-control border border-border px-4" onClick={reset}>
        Clear session flag (shows on next load)
      </button>
    </div>
  );
}

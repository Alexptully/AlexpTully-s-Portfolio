"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MOTION_PRELOAD_CLASS, PRELOADER_MAX_MS } from "./motion-config";

type PreloaderProps = {
  /** Small mark or name. Keep it small: it is an overlay, never the page's largest paint. */
  children?: ReactNode;
  className?: string;
  /** Exit style, defined in motion.css. */
  variant?: "fade" | "wipe";
};

/**
 * First-visit overlay. The markup is always in the HTML but `display: none` unless the head
 * script put `motion-preload` on <html> (first page of a tab session, JS on, no reduced motion).
 * The exit is a CSS animation (`--preloader-dur`, default 1.1 s), so it finishes even if
 * hydration is slow; this component only removes the class afterwards, with a hard cap of
 * 1.2 s. It is click-through and `aria-hidden`, and the page renders underneath from the first
 * byte, so it never delays the content (or its LCP).
 *
 * Needs `<MotionInitScript />` (with `preloader` on) in the root <head>.
 */
export function Preloader({ children, className, variant = "fade" }: PreloaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    if (!el || !html.classList.contains(MOTION_PRELOAD_CLASS)) return;
    const done = () => html.classList.remove(MOTION_PRELOAD_CLASS);
    const onEnd = (event: AnimationEvent) => {
      if (event.target === el) done();
    };
    el.addEventListener("animationend", onEnd);
    const timer = window.setTimeout(done, PRELOADER_MAX_MS);
    return () => {
      el.removeEventListener("animationend", onEnd);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={ref} className={cn("preloader", className)} data-variant={variant} aria-hidden="true">
      {children}
    </div>
  );
}

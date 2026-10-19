"use client";

import {
  MOTION_CLASS,
  MOTION_PRELOAD_CLASS,
  PRELOADER_STORAGE_KEY,
  REDUCED_MOTION_QUERY,
} from "./motion-config";

/**
 * The inline script body. It runs synchronously while the browser parses <head>, before first
 * paint, and:
 * - adds `motion` to <html> unless the visitor prefers reduced motion (no JS: never added, so
 *   nothing is ever hidden);
 * - on the first page of a tab session (and only when `preloader` is on), adds
 *   `motion-preload`, which is the only thing that shows the Preloader overlay;
 * - records its decision on `window.__motionInit` so MotionRoot can re-apply it after React's
 *   development remount, which resets <html> attributes.
 * Every storage access is wrapped in try/catch (private windows and blocked storage throw).
 */
export function motionInitScript({ preloader = true }: { preloader?: boolean } = {}): string {
  const q = JSON.stringify(REDUCED_MOTION_QUERY);
  const motion = JSON.stringify(MOTION_CLASS);
  const preload = JSON.stringify(MOTION_PRELOAD_CLASS);
  const key = JSON.stringify(PRELOADER_STORAGE_KEY);
  const preloadPart = preloader
    ? `try{var ss=w.sessionStorage;if(!ss.getItem(${key})){ss.setItem(${key},"1");s.preload=true;d.classList.add(${preload})}}catch(e){}`
    : "";
  return (
    `(function(){try{var d=document.documentElement,w=window,` +
    `r=!!(w.matchMedia&&w.matchMedia(${q}).matches),s={reduced:r,preload:false};` +
    `if(!r){d.classList.add(${motion});${preloadPart}}w.__motionInit=s}catch(e){}})();`
  );
}

type MotionInitScriptProps = {
  /** Turn off when the site has no <Preloader>; then no session flag is written. */
  preloader?: boolean;
  /** Pass through a CSP nonce if the site ever adds a strict Content-Security-Policy. */
  nonce?: string;
};

/**
 * Render inside <head> in the root layout, and add `suppressHydrationWarning` to <html>
 * (the script changes its class list before React hydrates).
 *
 * A client component on purpose (Next's "preventing flash before hydration" guide): on the
 * server it renders an executable `text/javascript` script; on the client it renders
 * `text/plain`, so a client-side render never creates a live script tag (React warns about
 * those) and the type mismatch is suppressed.
 */
export function MotionInitScript({ preloader = true, nonce }: MotionInitScriptProps) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: motionInitScript({ preloader }) }}
    />
  );
}

"use client";

import Lenis, { type LenisOptions } from "lenis";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger } from "./gsap";
import { getLenis, setLenis } from "./lenis-store";
import { MOTION_CLASS, MOTION_READY_CLASS, REDUCED_MOTION_QUERY } from "./motion-config";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export { useLenis, getLenis } from "./lenis-store";

type MotionRootProps = {
  children: ReactNode;
  /**
   * Lenis options, read once on mount and merged over `{ anchors: true }`. `false` keeps native
   * scrolling (ScrollTrigger and the other primitives still work). Under reduced motion Lenis
   * is never created.
   */
  lenis?: LenisOptions | false;
  /** Jump to the top on a pathname change (skipped for hash links and back/forward). */
  resetScrollOnNavigate?: boolean;
};

/** True inside a MotionRoot, so a nested one (e.g. the lab's) becomes a pass-through. */
const MotionPresence = createContext(false);

/**
 * Mount once, high in the tree (root layout, inside <body>). It:
 * - adds `motion-ready` to <html> after hydration (and re-applies `motion`, which React's dev
 *   remount clears), toggling `motion` live when the reduced-motion setting changes;
 * - runs Lenis smooth scroll on the gsap ticker and feeds ScrollTrigger from it;
 * - registers ScrollTrigger and SplitText (via ./gsap);
 * - refreshes ScrollTrigger after web fonts load and after each navigation;
 * - jumps to the top on navigation so Lenis's inertia never carries across pages.
 * It renders no DOM of its own.
 */
export function MotionRoot(props: MotionRootProps) {
  const nested = useContext(MotionPresence);
  if (nested) return <>{props.children}</>;
  return <MotionRootImpl {...props} />;
}

function MotionRootImpl({ children, lenis = {}, resetScrollOnNavigate = true }: MotionRootProps) {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();
  // Options are read once; later prop changes are ignored (Lenis is not reconfigurable live).
  const [lenisOptions] = useState(lenis);
  const lastPathname = useRef(pathname);
  const poppedState = useRef(false);

  // Classes on <html>. Layout effect: runs before paint, and after every child's layout effect,
  // so Reveal has already marked in-view elements `data-in` by the time `motion-ready` lands.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => html.classList.toggle(MOTION_CLASS, !mq.matches);
    sync();
    html.classList.add(MOTION_READY_CLASS);
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      html.classList.remove(MOTION_READY_CLASS);
    };
  }, []);

  // Lenis on the gsap ticker. Re-runs when the reduced-motion setting flips.
  useEffect(() => {
    if (lenisOptions === false || window.matchMedia(REDUCED_MOTION_QUERY).matches) return;
    const instance = new Lenis({ anchors: true, ...lenisOptions, autoRaf: false });
    const offScroll = instance.on("scroll", () => ScrollTrigger.update());
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      offScroll();
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      if (getLenis() === instance) setLenis(null);
    };
  }, [lenisOptions, reduced]);

  // Back/forward keeps the browser's restored position.
  useEffect(() => {
    const onPop = () => {
      poppedState.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Navigation: reset scroll, then re-measure every ScrollTrigger against the new page.
  useEffect(() => {
    if (lastPathname.current === pathname) return; // first mount
    lastPathname.current = pathname;
    const popped = poppedState.current;
    poppedState.current = false;
    if (resetScrollOnNavigate && !popped && !window.location.hash) {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
    }
    getLenis()?.resize();
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname, resetScrollOnNavigate]);

  // Web fonts change line breaks and heights; measure again once they are in.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return <MotionPresence.Provider value>{children}</MotionPresence.Provider>;
}

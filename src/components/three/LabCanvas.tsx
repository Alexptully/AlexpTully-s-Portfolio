"use client";

import dynamic from "next/dynamic";
import { Component, useRef, useState, type ReactNode } from "react";
import { useInView, usePageInView } from "motion/react";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// `ssr: false` is only allowed inside a Client Component since Next 15. This file is one,
// so the page (a Server Component) can import LabCanvas directly. three.js, R3F and drei
// end up in their own chunk that only loads in the browser.
const LabScene = dynamic(() => import("./LabScene"), {
  ssr: false,
  loading: () => <span className="sr-only">Loading 3D scene</span>,
});

/**
 * CSS-only stand-in with the same dark plate and IR-pink glow. It is what the server
 * renders, what shows while the three.js chunk downloads, what remains if WebGL fails,
 * and the backdrop behind the transparent canvas once it is up.
 */
function Poster() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(255,59,111,0.35),transparent_70%)]"
    />
  );
}

/** WebGL context creation throws inside R3F; keep the poster instead of crashing the page. */
class SceneErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export type LabCanvasProps = { className?: string };

export default function LabCanvas({ className }: LabCanvasProps) {
  const reduceMotion = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  // IntersectionObserver: stop rendering when the scene is well off-screen.
  const inView = useInView(box, { margin: "160px 0px", initial: true });
  // document.visibilityState: stop rendering in a background tab.
  const tabVisible = usePageInView();
  const [userPaused, setUserPaused] = useState(false);

  const paused = reduceMotion || userPaused || !inView || !tabVisible;

  return (
    <div
      ref={box}
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b0b10] sm:aspect-video",
        className,
      )}
    >
      <Poster />
      <SceneErrorBoundary fallback={null}>
        <LabScene paused={paused} parallax={!reduceMotion} className="absolute inset-0" />
      </SceneErrorBoundary>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 text-xs text-neutral-300">
        <p role="status">
          {reduceMotion
            ? "Reduced motion is on: animation and parallax are off"
            : paused
              ? "Paused"
              : "Animating; move the pointer for parallax"}
        </p>
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          className="rounded-full border border-white/15 px-3 py-1 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B6F]"
        >
          {userPaused ? "Play" : "Pause"}
        </button>
      </div>
    </div>
  );
}

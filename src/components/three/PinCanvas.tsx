"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { homeHero } from "@/content/projects";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { useInViewport } from "@/components/motion/useInViewport";
import { usePageVisible } from "@/components/motion/usePageVisible";
import { SceneErrorBoundary } from "@/components/three/SceneErrorBoundary";
import { cn } from "@/lib/utils";

// `ssr: false` is only allowed inside a Client Component, so this file owns the dynamic
// import. three.js, R3F and the scene land in one lazy chunk that is referenced by no HTML
// and downloads after hydration, only where `PinCanvas` is rendered (home, canvas mode).
const PinScene = dynamic(() => import("@/components/three/PinScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Pointer state shared with the scene. The wrapper's handlers write it through the methods
 * below, `useFrame` reads the fields; nothing goes through React state, so a pointer move
 * costs no render. A class, so the React Compiler rules see method calls rather than
 * mutations of a hook value.
 */
export class PinInput {
  /** Current pointer in normalised device coordinates (−1…1), valid while `hover`. */
  x = 0;
  y = 0;
  /** A mouse is over the box, or a finger is down on it. */
  hover = false;
  /** The virtual camera point set by the arrow keys or left behind by a touch drag. */
  vx = 0;
  vy = 0;
  source: "none" | "virtual" = "none";
  /** `performance.now()` of the last real input; drift takes over 3 s later. Negative at
   * start: the model has never seen input, so it drifts from the first frame. */
  lastInputAt = -Infinity;
  private listener: (() => void) | null = null;

  /** The scene registers how to wake its demand frameloop. */
  setListener(listener: (() => void) | null) {
    this.listener = listener;
  }

  /** A mouse move over the box, or a finger down or dragging on it. */
  move(x: number, y: number, touch: boolean) {
    this.x = x;
    this.y = y;
    this.hover = true;
    this.lastInputAt = performance.now();
    if (touch) {
      // A drag leaves the camera where the finger let go; drift resumes after 3 s.
      this.vx = x;
      this.vy = y;
      this.source = "virtual";
    } else {
      this.source = "none";
    }
    this.listener?.();
  }

  /** The mouse left the box, or a finger lifted or was taken by a vertical scroll. */
  end() {
    if (!this.hover) return;
    this.hover = false;
    this.lastInputAt = performance.now();
    this.listener?.();
  }

  /** One arrow-key step of the virtual camera point. */
  step(dx: number, dy: number) {
    this.vx = Math.max(-1, Math.min(1, this.vx + dx));
    this.vy = Math.max(-1, Math.min(1, this.vy + dy));
    this.source = "virtual";
    this.hover = false;
    this.lastInputAt = performance.now();
    this.listener?.();
  }
}

/*
 * Low-end guard memory (§10.1, graft 13): once the first three frames each take over 24 ms
 * the poster stays for the rest of the session, including after client-side navigation
 * back to home. Read through `useSyncExternalStore` so it never touches storage in render
 * before hydration.
 */
const SLOW_KEY = "pin-canvas:slow";
const slowListeners = new Set<() => void>();
let slowInMemory = false;

function readSlow(): boolean {
  if (slowInMemory) return true;
  try {
    return window.sessionStorage.getItem(SLOW_KEY) === "1";
  } catch {
    return false;
  }
}

function markSlow() {
  slowInMemory = true;
  try {
    window.sessionStorage.setItem(SLOW_KEY, "1");
  } catch {
    // Storage blocked: the in-memory flag still covers this page view.
  }
  for (const listener of slowListeners) listener();
}

function subscribeSlow(onChange: () => void) {
  slowListeners.add(onChange);
  return () => {
    slowListeners.delete(onChange);
  };
}

function getSlowServerSnapshot() {
  return false;
}

const KEY_STEP = 0.1;
const ARROWS: Record<string, [dx: number, dy: number]> = {
  ArrowLeft: [-KEY_STEP, 0],
  ArrowRight: [KEY_STEP, 0],
  ArrowUp: [0, KEY_STEP],
  ArrowDown: [0, -KEY_STEP],
};

export type PinCanvasProps = {
  /** The SVG poster shown under the canvas, and alone when WebGL is unavailable. */
  poster: ReactNode;
  className?: string;
};

/**
 * Home hero canvas wrapper (design-spec §10.1). Owns the box, the poster underneath, the
 * lazy scene, the pause / in-view / tab-visibility gating, the frame-time guard, the
 * keyboard control and the status line. The `<canvas>` layer is `aria-hidden`; the caption
 * next to the figure carries the meaning.
 */
export default function PinCanvas({ poster, className }: PinCanvasProps) {
  const canvasCopy = homeHero.canvas;
  const { pauseLabel, playLabel } = canvasCopy;
  const box = useRef<HTMLDivElement>(null);
  const [input] = useState(() => new PinInput());

  const reduceMotion = usePrefersReducedMotion();
  const inView = useInViewport(box);
  const tabVisible = usePageVisible();
  const guardTripped = useSyncExternalStore(subscribeSlow, readSlow, getSlowServerSnapshot);

  const [userPaused, setUserPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const showScene = !guardTripped && !failed;
  const paused = userPaused || !inView || !tabVisible;

  const onReady = useCallback(() => setReady(true), []);
  const onSlow = useCallback(() => markSlow(), []);
  const onError = useCallback(() => setFailed(true), []);

  /** Pointer position → normalised device coordinates within the box. */
  const writePointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    input.move(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1),
      event.pointerType === "touch",
    );
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && !input.hover) return; // a scroll passing through
    writePointer(event);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") writePointer(event);
  };

  const onPointerEnd = () => input.end();

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = ARROWS[event.key];
    if (!step) return;
    event.preventDefault();
    input.step(step[0], step[1]);
  };

  const status = !showScene
    ? canvasCopy.statusPoster
    : reduceMotion
      ? canvasCopy.statusReducedMotion
      : userPaused
        ? canvasCopy.statusPaused
        : canvasCopy.statusDrifting;

  return (
    <div
      ref={box}
      className={cn("relative", className)}
      // Vertical scroll passes through a touch; a horizontal drag moves the camera.
      style={{ touchAction: "pan-y" }}
      onPointerMove={showScene ? onPointerMove : undefined}
      onPointerDown={showScene ? onPointerDown : undefined}
      onPointerLeave={showScene ? onPointerEnd : undefined}
      onPointerUp={showScene ? onPointerEnd : undefined}
      onPointerCancel={showScene ? onPointerEnd : undefined}
    >
      {/* The poster: the SSR output, the loading state, the WebGL-failure state and the
          print state. It stays mounted under the canvas. */}
      <div aria-hidden className="absolute inset-0" data-print="show">
        {poster}
      </div>

      {showScene ? (
        <div
          aria-hidden
          data-print="hide"
          // Opaque `--bg` behind the transparent canvas, so the fade-in is a cross-fade from
          // the poster to the model (§11.4: the one allowed fade, once, 300 ms).
          className={cn(
            "absolute inset-0 bg-bg transition-opacity duration-300 ease-[var(--ease-out)]",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <SceneErrorBoundary fallback={null} onError={onError}>
            <PinScene
              input={input}
              paused={paused}
              reduceMotion={reduceMotion}
              onReady={onReady}
              onSlow={onSlow}
              onError={onError}
              className="h-full w-full"
            />
          </SceneErrorBoundary>
        </div>
      ) : null}

      {showScene ? (
        <>
          {/* Visually hidden until focused: arrow keys step the virtual camera point. */}
          <button
            type="button"
            onKeyDown={onKeyDown}
            className="type-button pointer-events-none absolute top-3 left-3 min-h-11 rounded-control bg-surface px-4 opacity-0 ring-1 ring-border-strong ring-inset focus-visible:pointer-events-auto focus-visible:opacity-100"
          >
            {canvasCopy.keyboardLabel}
          </button>
          <button
            type="button"
            aria-pressed={userPaused}
            onClick={() => setUserPaused((p) => !p)}
            className="type-button absolute right-3 bottom-3 min-h-11 rounded-control bg-surface px-4 ring-1 ring-border-strong ring-inset transition-[background-color,box-shadow] duration-[120ms] ease-[var(--ease-out)] hover:ring-ink aria-pressed:ring-ink"
          >
            {userPaused ? playLabel : pauseLabel}
          </button>
        </>
      ) : null}

      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  );
}

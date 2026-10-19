"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentPropsWithoutRef,
  type ElementType,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "./gsap";
import { useFinePointer } from "./useMediaQuery";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Point = { x: number; y: number };

/** `id` and `node` stay on the last preview while it fades out; `active` says whether it shows. */
type PreviewState = { id: string | null; node: ReactNode; active: boolean };

const IDLE: PreviewState = { id: null, node: null, active: false };

/**
 * Mutable store shared by the provider, the layer and every target. It lives outside React
 * state (methods only, so render stays pure); the layer subscribes with useSyncExternalStore.
 */
class PreviewStore {
  private state: PreviewState = IDLE;
  private enabled = false;
  private listeners = new Set<() => void>();
  private mover: ((point: Point, jump: boolean) => void) | null = null;

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.state;

  private emit(next: PreviewState) {
    this.state = next;
    this.listeners.forEach((listener) => listener());
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) this.emit(IDLE);
  }

  /** Installed by the layer once GSAP is ready; `jump` skips the easing (first show). */
  setMover(mover: ((point: Point, jump: boolean) => void) | null) {
    this.mover = mover;
  }

  isActive() {
    return this.state.active;
  }

  move(point: Point) {
    if (this.state.active) this.mover?.(point, false);
  }

  show(id: string, node: ReactNode, at: Point) {
    if (!this.enabled) return;
    const jump = !this.state.active;
    this.emit({ id, node, active: true });
    this.mover?.(at, jump);
  }

  hide(id: string) {
    if (this.state.id !== id || !this.state.active) return;
    this.emit({ ...this.state, active: false });
  }
}

type PreviewApi = Pick<PreviewStore, "show" | "hide">;

const PreviewContext = createContext<PreviewApi | null>(null);

type HoverPreviewProviderProps = {
  children: ReactNode;
  /** Class for the fixed layer (`.hover-preview`); size and offsets are CSS variables. */
  className?: string;
  /** Follow lag in seconds for `gsap.quickTo`. */
  duration?: number;
  ease?: string;
};

/**
 * One fixed preview layer for the whole page. It follows the cursor with `gsap.quickTo` on fine
 * pointers only; on touch, coarse pointers and under reduced motion it renders nothing, and the
 * callers' inline thumbnails (mark them `data-hover-inline`) stay visible — motion.css hides
 * those only under `html.motion` on fine pointers.
 *
 * The layer is `aria-hidden` and `inert`: it never takes focus and never traps it. Keyboard focus
 * on a target shows the preview too, placed beside the focused row.
 */
export function HoverPreviewProvider({
  children,
  className,
  duration = 0.5,
  ease = "power3",
}: HoverPreviewProviderProps) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;
  const [store] = useState(() => new PreviewStore());

  useEffect(() => {
    store.setEnabled(enabled);
  }, [enabled, store]);

  return (
    <PreviewContext.Provider value={store}>
      {children}
      {enabled ? (
        <PreviewLayer store={store} className={className} duration={duration} ease={ease} />
      ) : null}
    </PreviewContext.Provider>
  );
}

function PreviewLayer({
  store,
  className,
  duration,
  ease,
}: {
  store: PreviewStore;
  className?: string;
  duration: number;
  ease: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  useGSAP(
    () => {
      const layer = layerRef.current;
      if (!layer) return;
      const xTo = gsap.quickTo(layer, "x", { duration, ease });
      const yTo = gsap.quickTo(layer, "y", { duration, ease });
      store.setMover(({ x, y }, jump) => {
        if (jump) {
          xTo(x, x);
          yTo(y, y);
        } else {
          xTo(x);
          yTo(y);
        }
      });
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        store.move({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        store.setMover(null);
      };
    },
    { scope: layerRef, dependencies: [duration, ease, store] },
  );

  return (
    <div
      ref={layerRef}
      className={cn("hover-preview", className)}
      data-active={state.active ? "" : undefined}
      aria-hidden="true"
      inert
    >
      <div className="hover-preview__inner" key={state.id ?? "idle"}>
        {state.node}
      </div>
    </div>
  );
}

type TargetHandlers = {
  onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
  onFocus: (event: FocusEvent<HTMLElement>) => void;
  onBlur: () => void;
};

/**
 * Handlers that make an element a preview target. Spread them on the row (it can be a non-focusable
 * wrapper: focus events bubble from the link inside). Outside a provider they are no-ops.
 */
export function usePreviewTarget(preview: ReactNode): TargetHandlers {
  const api = useContext(PreviewContext);
  const id = useId();

  // A target that unmounts while shown (navigation) takes its preview with it.
  useEffect(() => {
    return () => api?.hide(id);
  }, [api, id]);

  return {
    onPointerEnter(event) {
      if (!api || event.pointerType === "touch") return;
      api.show(id, preview, { x: event.clientX, y: event.clientY });
    },
    onPointerLeave() {
      api?.hide(id);
    },
    onFocus(event) {
      if (!api) return;
      // Only keyboard focus moves the preview; a mouse click keeps it under the cursor.
      const focused = event.target as HTMLElement;
      if (!focused.matches(":focus-visible")) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = Math.min(rect.left + rect.width * 0.72, window.innerWidth - 24);
      const y = Math.min(Math.max(rect.top + rect.height / 2, 24), window.innerHeight - 24);
      api.show(id, preview, { x, y });
    },
    onBlur() {
      api?.hide(id);
    },
  };
}

type PreviewTargetProps = {
  /** What the floating layer shows: usually a `next/image` with its own alt text. */
  preview: ReactNode;
  as?: ElementType;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/** Wrapper form of `usePreviewTarget`. Your own pointer/focus handlers still run. */
export function PreviewTarget({ preview, as, children, ...rest }: PreviewTargetProps) {
  // Typed as "div" for JSX checking; any intrinsic tag works at runtime.
  const Tag = (as ?? "div") as "div";
  const handlers = usePreviewTarget(preview);
  const { onPointerEnter, onPointerLeave, onFocus, onBlur, ...others } = rest;
  return (
    <Tag
      {...others}
      onPointerEnter={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(event);
        handlers.onPointerEnter(event);
      }}
      onPointerLeave={(event: ReactPointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(event);
        handlers.onPointerLeave();
      }}
      onFocus={(event: FocusEvent<HTMLDivElement>) => {
        onFocus?.(event);
        handlers.onFocus(event);
      }}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        onBlur?.(event);
        handlers.onBlur();
      }}
    >
      {children}
    </Tag>
  );
}

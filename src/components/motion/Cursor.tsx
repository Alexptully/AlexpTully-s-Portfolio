"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "./gsap";
import { useFinePointer } from "./useMediaQuery";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type CursorProps = {
  className?: string;
  /** Follow lag in seconds. */
  duration?: number;
  ease?: string;
};

/**
 * Optional follower dot for fine pointers. The native cursor stays; this only adds a dot that
 * trails it and grows into a label over any element with `data-cursor="Label"` (an empty value
 * means "no label"). Not rendered on touch, on coarse pointers or under reduced motion; always
 * `aria-hidden` and click-through. Mount once, next to MotionRoot.
 */
export function Cursor({ className, duration = 0.35, ease = "power3" }: CursorProps) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const label = labelRef.current;
      if (!root || !label) return;
      const xTo = gsap.quickTo(root, "x", { duration, ease });
      const yTo = gsap.quickTo(root, "y", { duration, ease });
      let seen = false;

      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        if (!seen) {
          seen = true;
          xTo(event.clientX, event.clientX);
          yTo(event.clientY, event.clientY);
          root.setAttribute("data-visible", "");
          return;
        }
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const onOver = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target : null;
        const text = target?.closest("[data-cursor]")?.getAttribute("data-cursor")?.trim() ?? "";
        label.textContent = text;
        root.toggleAttribute("data-label", text.length > 0);
      };
      const onOut = (event: PointerEvent) => {
        if (event.relatedTarget) return; // still inside the page
        seen = false;
        root.removeAttribute("data-visible");
      };
      const onDown = () => root.setAttribute("data-pressed", "");
      const onUp = () => root.removeAttribute("data-pressed");

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.addEventListener("pointerout", onOut, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      return () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
      };
    },
    { scope: rootRef, dependencies: [enabled, duration, ease] },
  );

  if (!enabled) return null;
  return (
    <div ref={rootRef} className={cn("cursor", className)} aria-hidden="true">
      <span className="cursor__dot" />
      <span ref={labelRef} className="cursor__label" />
    </div>
  );
}

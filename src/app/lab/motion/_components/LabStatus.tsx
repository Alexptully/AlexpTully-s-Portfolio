"use client";

import { useSyncExternalStore } from "react";
import { useLenis } from "@/components/motion/lenis-store";
import { useFinePointer } from "@/components/motion/useMediaQuery";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

function subscribeHtmlClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getHtmlMotionClasses() {
  const list = document.documentElement.classList;
  return ["motion", "motion-ready", "motion-preload", "lenis"].filter((c) => list.contains(c)).join(" ");
}

/** Live readout of the motion layer's state, for checking each mode by eye. */
export function LabStatus() {
  const reduced = usePrefersReducedMotion();
  const fine = useFinePointer();
  const lenis = useLenis();
  const classes = useSyncExternalStore(subscribeHtmlClass, getHtmlMotionClasses, () => "(server)");

  const rows: [string, string][] = [
    ["html classes", classes || "(none)"],
    ["prefers-reduced-motion", reduced ? "reduce" : "no-preference"],
    ["fine pointer", fine ? "yes" : "no"],
    ["Lenis", lenis ? "running" : "off"],
  ];

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 font-mono text-xs">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="text-muted">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

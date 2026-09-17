"use client";

import type { ReactNode } from "react";

type PinCanvasProps = {
  /** The SVG poster shown under the canvas, and instead of it here. */
  poster: ReactNode;
  className?: string;
};

/**
 * Stub for the home hero's pin canvas (design-spec §10.1). WP8 replaces this file with
 * the real wrapper (dynamic PinScene, pause logic, low-end guard). Until then it renders
 * only the poster, so `heroMode === "canvas"` degrades to a static plate.
 */
export default function PinCanvas({ poster, className }: PinCanvasProps) {
  return <div className={className}>{poster}</div>;
}

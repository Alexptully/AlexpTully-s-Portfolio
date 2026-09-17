import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CSSProperties } from "react";
import type { ImageRef } from "@/content/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * The ground a crop sits on, when it is not one of the tokens (design-spec §12.1).
 *
 * Almost every `light` crop is levelled at build time so its border median is exactly
 * `--plate-light` and its edge vanishes into the plate. Three poster crops could not be
 * levelled without blowing out the object, so they declare `plateColor` — the crop's own
 * measured border colour — and whatever holds them paints that instead.
 */
export function plateGround(image: ImageRef): CSSProperties | undefined {
  return image.plateColor ? { background: image.plateColor } : undefined;
}

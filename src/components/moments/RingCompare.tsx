"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { HowBlock } from "@/content/types";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type How = Extract<HowBlock, { component: "RingCompare" }>;

type RingCompareProps = { how: How };

/** Both frames are recorded by the same camera at the same 16:9 aspect (design-spec §7.1). */
const FRAME_ASPECT = "16 / 9";
const FRAME_MAX = 960;
const SIZES = `(max-width: 1024px) calc(100vw - 2 * var(--gutter, 16px)), ${FRAME_MAX}px`;

/**
 * The AntiCam moment (design-spec §7.1, §10.3): the same Ring doorbell camera, same street,
 * same night, with the device off and on. A native range input wipes the "on" frame across the
 * "off" frame with `clip-path`; the seam is a hairline, not a drag handle, so the only control
 * is the labelled slider and the whole thing works from the keyboard.
 *
 * Direction: the intro sentence says the off frame is on the left and the on frame on the right,
 * and the value text runs "Device off" to "Device on". Both hold only if the on frame grows in
 * from the right edge as the value rises, so the seam sits at `100 − value` rather than at the
 * thumb. (The spec's §7.1 sketch clips from the other side, which would put the on frame on the
 * left at the midpoint and contradict the sentence above the figure.)
 *
 * Reduced motion: the wipe is user-driven at every value, so the only thing dropped is the
 * 150 ms smoothing on the seam.
 */
export function RingCompare({ how }: RingCompareProps) {
  const id = useId();
  const [value, setValue] = useState(50);
  const reduceMotion = usePrefersReducedMotion();

  // Safety net: `MomentSlot` shows the declared fallback and never mounts this component while
  // either frame is uncleared (open question 2). If it ever does, the uncleared frames stay off.
  if (!how.off.cleared || !how.on.cleared) {
    return (
      <Image
        src={how.fallback.src}
        alt={how.fallback.alt}
        width={how.fallback.width}
        height={how.fallback.height}
        sizes={`${Math.min(how.fallback.width, 520)}px`}
        className="h-auto w-full rounded-photo"
        style={{ maxWidth: `min(100%, ${Math.min(how.fallback.width, 520)}px)` }}
      />
    );
  }

  const seam = 100 - value;
  const stateText = value < 50 ? how.valueTextLow : how.valueTextHigh;
  const wipe = reduceMotion ? undefined : "clip-path 150ms var(--ease-out)";
  const slide = reduceMotion ? undefined : "left 150ms var(--ease-out), opacity 150ms var(--ease-out)";

  return (
    <div className="w-full" style={{ maxWidth: `${FRAME_MAX}px` }}>
      <div
        className="relative w-full overflow-hidden rounded-photo bg-bg"
        style={{ aspectRatio: FRAME_ASPECT }}
      >
        <Image
          src={how.off.src}
          alt={how.off.alt}
          fill
          sizes={SIZES}
          quality={75}
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${seam}%)`, transition: wipe }}
        >
          <Image
            src={how.on.src}
            alt={how.on.alt}
            fill
            sizes={SIZES}
            quality={75}
            className="object-cover"
          />
        </div>
        {/* The seam is decoration: the frames carry their own alt text and the value text below
            names the state, so nothing here is the only cue. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-ink"
          style={{ left: `${seam}%`, opacity: value === 0 || value === 100 ? 0 : 0.55, transition: slide }}
        />
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
        <label htmlFor={id} className="type-caption sm:shrink-0">
          {how.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={(event) => setValue(event.currentTarget.valueAsNumber)}
          aria-valuetext={stateText}
          className="range-input sm:flex-1"
        />
        <output htmlFor={id} className="type-value sm:w-28 sm:shrink-0 sm:text-right">
          {stateText}
        </output>
      </div>
    </div>
  );
}

export default RingCompare;

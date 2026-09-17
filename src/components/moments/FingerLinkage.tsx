"use client";

import { useId, useState } from "react";
import type { HowBlock } from "@/content/types";

type How = Extract<HowBlock, { component: "FingerLinkage" }>;

type FingerLinkageProps = { how: How };

/** The box is sized to the union of every pose, from fully open to a closed fist. */
const W = 460;
const H = 348;

/** The metacarpal block the finger hangs off, and the pin at its knuckle. */
const PALM = { x: 30, y: 69, w: 140, h: 130, r: 12 };
const PIVOT: readonly [number, number] = [170, 134];
/** The open hand rests with the finger a little above the knuckle line, as a hand does. */
const REST = (-22 * Math.PI) / 180;

/**
 * Phalanx lengths in the ratio the design brief draws (30 : 22 : 18), and the joint travel in
 * radians at full servo pull. The angles are illustrative — chosen so the hand closes at full
 * travel — which is what `how.note` says under the drawing.
 */
const SEGMENTS = [
  { length: 120, travel: 0.95 },
  { length: 88, travel: 1.15 },
  { length: 72, travel: 0.85 },
] as const;

/** Half the drawn thickness of a phalanx, and how far off the bone each cord is routed. */
const HALF = 14;
const CORD = 9;
/** How far in from each pin a cord is anchored to the segment it drives. */
const ANCHOR = 8;
/** Where the two cords leave the drawing on their way to the servo in the forearm. */
const FOREARM_X = 8;

type Frame = { x: number; y: number; angle: number };

/** Forward kinematics: each joint's world position and cumulative angle at travel `t` (0–1). */
function frames(t: number): Frame[] {
  const out: Frame[] = [];
  let [x, y] = PIVOT;
  let angle = REST;
  for (const segment of SEGMENTS) {
    angle += segment.travel * t;
    out.push({ x, y, angle });
    x += segment.length * Math.cos(angle);
    y += segment.length * Math.sin(angle);
  }
  return out;
}

const round = (n: number) => Math.round(n * 10) / 10;

/** A point given in a segment's own frame, returned in the drawing's coordinates. */
function toWorld(frame: Frame, x: number, y: number): [number, number] {
  const c = Math.cos(frame.angle);
  const s = Math.sin(frame.angle);
  return [frame.x + x * c - y * s, frame.y + x * s + y * c];
}

/**
 * One cord's route: out of the forearm, through the palm, then over or under each phalanx.
 * `side` is −1 for the outside of the bend (the elastic) and +1 for the inside (the Kevlar).
 */
function cordPoints(joints: Frame[], side: 1 | -1): string {
  const offset = side * CORD;
  const points: Array<[number, number]> = [
    [FOREARM_X, PIVOT[1] + offset],
    [PIVOT[0] - 24, PIVOT[1] + offset],
  ];
  joints.forEach((frame, i) => {
    const length = SEGMENTS[i].length;
    points.push(toWorld(frame, ANCHOR, offset));
    points.push(toWorld(frame, length - ANCHOR, offset));
  });
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(" ");
}

/**
 * The prosthetic-arm moment (design-spec §7.2, §10.3): one finger, two cords, one servo. The
 * range input is the servo's travel; forty lines of forward kinematics put the three phalanges
 * where that travel leaves them, and both cords are re-routed through their anchors, so the
 * elastic visibly lengthens over the outside of the bend while the Kevlar shortens inside it.
 *
 * Motion: every joint and both cords are solved in one pass from the input's own value, so the
 * drawing tracks the control frame for frame with no easing anywhere — which is exactly the
 * behaviour §10.3 asks for under reduced motion, in both motion modes. Easing the phalanx
 * transforms in CSS was tried and rejected: a `<polyline>`'s points cannot be transitioned, so
 * the cords would lag off their anchors for the length of every transition.
 *
 * `how.intro` above the drawing says which cord is which (outside the bend, inside the bend) and
 * `how.note` below it says the angles are illustrative; `MomentSlot` renders both, so nothing is
 * labelled twice and no copy is invented here.
 */
export function FingerLinkage({ how }: FingerLinkageProps) {
  const id = useId();
  const [travel, setTravel] = useState(0);

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const joints = frames(travel / 100);
  const tip = toWorld(joints[2], SEGMENTS[2].length, 0);
  const valueText = `${how.label} ${travel} ${how.valueTextUnit}`;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="h-auto w-full"
        style={{ maxWidth: "560px" }}
        fill="none"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title id={titleId}>{how.label}</title>
        <desc id={descId}>
          {how.intro} {valueText}.
        </desc>

        <rect
          x={PALM.x}
          y={PALM.y}
          width={PALM.w}
          height={PALM.h}
          rx={PALM.r}
          fill="var(--surface)"
          stroke="var(--muted)"
          vectorEffect="non-scaling-stroke"
        />

        {joints.map((frame, i) => {
          const length = SEGMENTS[i].length;
          return (
            <g
              key={`phalanx-${i}`}
              transform={`translate(${round(frame.x)} ${round(frame.y)}) rotate(${round(
                (frame.angle * 180) / Math.PI,
              )})`}
            >
              <rect
                x={0}
                y={-HALF}
                width={length}
                height={HALF * 2}
                rx={HALF}
                fill="var(--surface)"
                stroke="var(--muted)"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          );
        })}

        {/* Outside of the bend: the elastic that holds the finger open. Dashed, and it visibly
            lengthens as the finger curls. */}
        <polyline
          points={cordPoints(joints, -1)}
          stroke="var(--muted)"
          strokeDasharray="7 5"
          vectorEffect="non-scaling-stroke"
        />
        {/* Inside of the bend: the Kevlar cord the servo pulls. */}
        <polyline
          points={cordPoints(joints, 1)}
          stroke="var(--render-blue)"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />

        {joints.map((frame, i) => (
          <circle
            key={`pin-${i}`}
            cx={round(frame.x)}
            cy={round(frame.y)}
            r={4.5}
            fill="var(--bg)"
            stroke="var(--muted)"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <circle
          cx={round(tip[0])}
          cy={round(tip[1])}
          r={2.5}
          fill="var(--muted)"
          stroke="none"
        />
      </svg>

      <div className="mt-4 flex max-w-[560px] flex-col gap-1 sm:flex-row sm:items-center sm:gap-5">
        <label htmlFor={id} className="type-caption sm:shrink-0">
          {how.label}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={1}
          value={travel}
          onChange={(event) => setTravel(event.currentTarget.valueAsNumber)}
          aria-valuetext={valueText}
          className="range-input sm:flex-1"
        />
        <output htmlFor={id} className="type-value sm:w-12 sm:shrink-0 sm:text-right">
          {travel}%
        </output>
      </div>
    </div>
  );
}

export default FingerLinkage;

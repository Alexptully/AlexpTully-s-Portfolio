"use client";

import { useId, useState, type CSSProperties } from "react";
import type { HowBlock } from "@/content/types";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type How = Extract<HowBlock, { component: "HexProfile" }>;

type HexProfileProps = { how: How };

const W = 600;
const H = 360;

/** The tool's own range, and the step the die can be indexed by (README, §7.4). */
const MIN_DIAMETER = 40;
const MAX_DIAMETER = 78;
const ROTATION_STEP = 30;

/** Section view: centre, and how many drawing units one millimetre of diameter is worth. */
const SECTION = { x: 164, y: 168, scale: 1.45 };
/** The hexagon is drawn at unit size and scaled, so one path serves every diameter. */
const UNIT_RADIUS = 100;
/** Wall thickness as a fraction of the outer radius. Proportion only: no source gives a wall. */
const BORE = 0.76;

/** Span view: a schematic at its own scale, divided from the section by a hairline. */
const SPAN = { x: 356, y: 168, halfHeight: 26, limit: 170, over: 210, overhang: 16, sag: 13 };

const MUTED = "var(--muted)";
const MOVING = "var(--render-blue)";
const WARN = "var(--accent)";
const ORIGIN: CSSProperties = { transformBox: "view-box", transformOrigin: "0px 0px" };

const round = (n: number) => Math.round(n * 100) / 100;

/** A hexagon with a flat top and bottom, points left and right: the die's own orientation. */
function hexPath(radius: number): string {
  return `${[0, 60, 120, 180, 240, 300]
    .map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return `${i === 0 ? "M" : "L"}${round(radius * Math.cos(a))} ${round(radius * Math.sin(a))}`;
    })
    .join(" ")} Z`;
}

const OUTER = hexPath(UNIT_RADIUS);
const INNER = hexPath(UNIT_RADIUS * BORE);

/** The pipe in elevation, between its two supports, with `sag` at midspan. */
function pipePath(length: number, sag: number): string {
  const x0 = SPAN.x - SPAN.overhang;
  const x1 = SPAN.x + length + SPAN.overhang;
  const mid = (x0 + x1) / 2;
  const top = SPAN.y - SPAN.halfHeight;
  const bottom = SPAN.y + SPAN.halfHeight;
  if (sag === 0) return `M${x0} ${top} L${x1} ${top} L${x1} ${bottom} L${x0} ${bottom} Z`;
  return [
    `M${x0} ${top}`,
    `Q${mid} ${top + sag * 2} ${x1} ${top}`,
    `L${x1} ${bottom}`,
    `Q${mid} ${bottom + sag * 2} ${x0} ${bottom}`,
    "Z",
  ].join(" ");
}

/** A support block under the pipe, drawn at the origin of whatever group carries it. */
function Support() {
  const top = SPAN.y + SPAN.halfHeight;
  return (
    <path
      d={`M-13 ${top + 16} L0 ${top} L13 ${top + 16} Z`}
      stroke={MUTED}
      fill="var(--surface)"
      vectorEffect="non-scaling-stroke"
    />
  );
}

/**
 * The CeraPiper moment (design-spec §7.4, §10.3). Two views of one constraint set: the hexagonal
 * section the die can cut, at the diameter and index angle the tool allows, and the same pipe in
 * elevation between two supports. Push the span past the README's 150 mm advisory and the pipe
 * sags and turns pink — the one pink element on the page, and the tool's own warning state.
 *
 * Every control is native: a range for the diameter, a button that steps the die 30° at a time,
 * and a `role="switch"` for the span. The colour change is never the only cue: the advisory
 * sentence prints under the drawing and the switch reports its own state.
 *
 * The CAM-to-CAD table and the two drawings that follow this one are rendered by `MomentSlot`.
 */
export function HexProfile({ how }: HexProfileProps) {
  const id = useId();
  const [diameter, setDiameter] = useState(58);
  const [rotation, setRotation] = useState(0);
  const [overLimit, setOverLimit] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const spin = reduceMotion ? undefined : "transform 240ms var(--ease-out)";
  const fade = reduceMotion ? undefined : "opacity 200ms var(--ease-out)";
  const slide = reduceMotion ? undefined : "transform 200ms var(--ease-out)";

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const warningId = `${id}-warning`;
  const rotationId = `${id}-rotation`;
  const spanId = `${id}-span`;
  const radius = diameter * SECTION.scale;
  const indexed = ((rotation % 360) + 360) % 360;
  const diameterText = `${diameter} ${how.unit}`;
  const diameterSpoken = `${diameter} ${how.valueTextUnit}`;
  const spanLength = overLimit ? SPAN.over : SPAN.limit;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="h-auto w-full"
        style={{ maxWidth: "600px" }}
        fill="none"
        strokeWidth={1.25}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <title id={titleId}>{`${how.diameterLabel} ${diameterText}`}</title>
        <desc id={descId}>
          {how.intro} {how.diameterLabel} {diameterSpoken}, {indexed} {how.rotationUnit}.
          {overLimit ? ` ${how.spanWarning}.` : ""}
        </desc>

        {/* Two views, two scales: the hairline says so. */}
        <path d="M320 44 L320 316" stroke="var(--border)" vectorEffect="non-scaling-stroke" />

        <g transform={`translate(${SECTION.x} ${SECTION.y})`}>
          {/* The die aperture the profile is indexed inside. */}
          <circle
            cx={0}
            cy={0}
            r={round(radius)}
            stroke={MUTED}
            strokeDasharray="4 6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M${round(-radius - 14)} 0 L${round(radius + 14)} 0 M0 ${round(-radius - 14)} L0 ${round(
              radius + 14,
            )}`}
            stroke="var(--border)"
            vectorEffect="non-scaling-stroke"
          />
          <g style={{ ...ORIGIN, transform: `rotate(${rotation}deg)`, transition: spin }}>
            <g style={{ ...ORIGIN, transform: `scale(${round(radius / UNIT_RADIUS)})` }}>
              <path
                d={`${OUTER} ${INNER}`}
                fillRule="evenodd"
                fill="var(--clay)"
                fillOpacity={0.22}
                stroke={MOVING}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>

          {/* Outer-diameter dimension, across the die aperture, in millimetres. */}
          <path
            d={`M${round(-radius)} 150 L${round(radius)} 150 M${round(-radius)} 143 L${round(
              -radius,
            )} 157 M${round(radius)} 143 L${round(radius)} 157`}
            stroke={MUTED}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={0}
            y={139}
            fill="var(--ink)"
            fontSize={20}
            textAnchor="middle"
            stroke="none"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {diameterText}
          </text>
        </g>

        {/* The advisory line: where a 150 mm span would put the second support. */}
        <path
          d={`M${SPAN.x + SPAN.limit} ${SPAN.y - 56} L${SPAN.x + SPAN.limit} ${SPAN.y + 62}`}
          stroke="var(--border-strong)"
          strokeDasharray="4 6"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x={SPAN.x + SPAN.limit}
          y={SPAN.y - 66}
          fill={MUTED}
          fontSize={20}
          textAnchor="middle"
          stroke="none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {how.spanLimitLabel}
        </text>

        <path
          d={pipePath(SPAN.limit, 0)}
          stroke={MOVING}
          strokeWidth={2}
          opacity={overLimit ? 0 : 1}
          style={{ transition: fade }}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={pipePath(SPAN.over, SPAN.sag)}
          stroke={WARN}
          strokeWidth={2}
          opacity={overLimit ? 1 : 0}
          style={{ transition: fade }}
          vectorEffect="non-scaling-stroke"
        />

        <g transform={`translate(${SPAN.x} 0)`}>
          <Support />
        </g>
        <g style={{ ...ORIGIN, transform: `translateX(${SPAN.x + spanLength}px)`, transition: slide }}>
          <Support />
        </g>
      </svg>

      {/*
        One control pattern for all three: a muted label, then a 44 px control row. The die
        index used to print a bare "0°" between a bordered button and a 24 px pill switch, so
        the line read as three unrelated widgets at three heights.
      */}
      <div className="mt-6 grid max-w-[600px] gap-x-8 gap-y-5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
          <label htmlFor={id} className="type-caption">
            {how.diameterLabel}
          </label>
          <div className="flex min-h-11 items-center gap-4">
            <input
              id={id}
              type="range"
              min={MIN_DIAMETER}
              max={MAX_DIAMETER}
              step={1}
              value={diameter}
              onChange={(event) => setDiameter(event.currentTarget.valueAsNumber)}
              aria-valuetext={diameterSpoken}
              className="range-input flex-1"
            />
            <output htmlFor={id} className="type-value w-16 shrink-0 text-right tabular-nums">
              {diameterText}
            </output>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span id={rotationId} className="type-caption">
            {how.rotationLabel}
          </span>
          <div className="flex min-h-11 items-center gap-4">
            <button
              type="button"
              aria-describedby={rotationId}
              onClick={() => setRotation((current) => current + ROTATION_STEP)}
              className="type-button flex min-h-11 flex-1 items-center justify-center rounded-control border border-border-strong px-4"
            >
              {how.rotateLabel}
            </button>
            <output className="type-value w-16 shrink-0 text-right tabular-nums">{indexed}°</output>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span id={spanId} className="type-caption">
            {how.spanLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={overLimit}
            aria-labelledby={spanId}
            aria-describedby={overLimit ? warningId : undefined}
            onClick={() => setOverLimit((current) => !current)}
            className="type-button flex min-h-11 items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="flex h-6 w-11 shrink-0 items-center rounded-full border border-border-strong bg-surface px-[3px]"
            >
              <span
                className="block h-4 w-4 rounded-full bg-ink"
                style={{
                  transform: overLimit ? "translateX(20px)" : "translateX(0)",
                  transition: slide,
                }}
              />
            </span>
            <span className="tabular-nums">{how.spanLimitLabel}</span>
          </button>
        </div>
      </div>

      {/* A live region that is empty until the span passes the advisory, so the sentence is
          announced when it appears rather than sitting silently in the DOM. */}
      <p id={warningId} role="status" className="mt-4 min-h-6 type-caption text-ink">
        {overLimit ? how.spanWarning : null}
      </p>
    </div>
  );
}

export default HexProfile;

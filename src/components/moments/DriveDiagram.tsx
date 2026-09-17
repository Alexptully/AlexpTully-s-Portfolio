"use client";

import { useId, useState, type CSSProperties, type PointerEvent } from "react";
import type { HowBlock } from "@/content/types";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type How = Extract<HowBlock, { component: "DriveDiagram" }>;

type DriveDiagramProps = { how: How };

/*
 * TODO(wp1): the one word here that is not in `projects.ts`. `aria-valuetext` has to spell the
 * unit out (design-spec §14), so it lives here until `how` carries a `valueTextUnit` field.
 */
const UNIT_DEGREES = "degrees";

/** The drawing is laid out on a 600 grid and cropped to what it actually uses. */
const CENTRE = 300;
const VIEW = { x: 104, y: 104, size: 392 };
/** The chassis plate, and the four module centres inset from its corners. */
const CHASSIS = { x: 140, y: 140, size: 320, r: 18 };
/**
 * The four corners, and which mecanum diagonal each one carries: front-left and back-right take
 * forward plus right, the other two take forward minus right (the X arrangement).
 */
const MODULES = [
  { id: "front-left", x: 196, y: 196, diagonal: 1 },
  { id: "front-right", x: 404, y: 196, diagonal: -1 },
  { id: "back-left", x: 196, y: 404, diagonal: -1 },
  { id: "back-right", x: 404, y: 404, diagonal: 1 },
] as const;

/**
 * Which drawing each drivetrain in `projects.ts` gets. Keyed by `how.options[].id`, so a renamed
 * id falls through to the bare chassis and command vector rather than drawing the wrong machine.
 */
const DRAWINGS: Record<string, "swerve" | "ball" | "mecanum"> = {
  swerve: "swerve",
  "ball-drive": "ball",
  strafer: "mecanum",
};

const MUTED = "var(--muted)";
const MOVING = "var(--render-blue)";
/** CSS transforms on SVG children resolve their origin against the viewBox, so pin it down. */
const ORIGIN: CSSProperties = { transformBox: "view-box", transformOrigin: "0px 0px" };

const round = (n: number) => Math.round(n * 1000) / 1000;
const rad = (deg: number) => (deg * Math.PI) / 180;

type VectorProps = {
  /** Degrees clockwise from the chassis's forward direction (up). */
  angle: number;
  /** Signed magnitude, −1 to 1. Negative points the arrow the other way. */
  k: number;
  length: number;
  color?: string;
  width?: number;
  transition?: string;
};

/**
 * An arrow drawn from the current origin, pointing up at unit magnitude. Length comes from a
 * `scaleY` on the shaft and a `translate` on the head, so a magnitude change is a transform
 * change and eases with everything else instead of jumping.
 */
function Vector({ angle, k, length, color = MOVING, width = 2, transition }: VectorProps) {
  return (
    <g
      style={{ ...ORIGIN, transform: `rotate(${round(angle)}deg)`, transition }}
      opacity={Math.abs(k) < 0.04 ? 0 : 1}
    >
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={-length}
        stroke={color}
        strokeWidth={width}
        vectorEffect="non-scaling-stroke"
        style={{ ...ORIGIN, transform: `scaleY(${round(k)})`, transition }}
      />
      <path
        d="M0 0 L-6 12 L6 12 Z"
        fill={color}
        stroke="none"
        style={{
          ...ORIGIN,
          transform: `translate(0px, ${round(-k * length)}px) scaleY(${k < 0 ? -1 : 1})`,
          transition,
        }}
      />
    </g>
  );
}

/**
 * The robotics moment (design-spec §7.3, §10.3): a top-down chassis whose four corner modules
 * answer one steering command, drawn three ways. Swerve slews all four modules to the command.
 * Ball drive resolves it onto each ball's two roller axes. The Strafer's mecanum wheels never
 * turn: the command becomes four signed wheel speeds, and the roller diagonals show why.
 *
 * The pointer and the "Drive direction" range drive the same number, so the slider always reads
 * the current heading and the whole thing works from the keyboard. `touch-action: pan-y` keeps
 * vertical scrolling working over the drawing on a phone.
 *
 * Everything that moves moves by transform, so one 200 ms `cubic-bezier(0.16, 1, 0.3, 1)`
 * transition covers the lot and reduced motion drops it in one place. The comparison caption and
 * its source are rendered by `MomentSlot`, not here.
 */
export function DriveDiagram({ how }: DriveDiagramProps) {
  const id = useId();
  const [selected, setSelected] = useState(how.options[0].id);
  const [direction, setDirection] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  const transition = reduceMotion
    ? undefined
    : "transform 200ms var(--ease-out), opacity 200ms var(--ease-out)";
  const swatch = reduceMotion
    ? undefined
    : "color 150ms var(--ease-out), background-color 150ms var(--ease-out), border-color 150ms var(--ease-out)";
  const option = how.options.find((candidate) => candidate.id === selected) ?? how.options[0];
  const drawing = DRAWINGS[option.id];
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const noteId = `${id}-note`;
  const valueText = `${how.label} ${direction} ${UNIT_DEGREES}`;

  // Forward is up the screen; right is right. One unit command, resolved per drivetrain.
  const forward = Math.cos(rad(direction));
  const right = Math.sin(rad(direction));
  /** Mecanum in the X arrangement: two wheels take forward plus right, two take forward minus. */
  const mecanum = (diagonal: number) => (forward + diagonal * right) / Math.SQRT2;

  function steer(event: PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    if (Math.hypot(x, y) < rect.width * 0.06) return;
    const deg = (Math.atan2(x, -y) * 180) / Math.PI;
    setDirection(Math.round((deg + 360) % 360));
  }

  return (
    <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
      <svg
        viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.size} ${VIEW.size}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="h-auto w-full lg:shrink-0"
        style={{ maxWidth: "460px", touchAction: "pan-y" }}
        fill="none"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
        onPointerMove={steer}
        onPointerDown={steer}
      >
        <title id={titleId}>{`${how.legend}: ${option.label}`}</title>
        <desc id={descId}>
          {option.note} {valueText}.
        </desc>

        <rect
          x={CHASSIS.x}
          y={CHASSIS.y}
          width={CHASSIS.size}
          height={CHASSIS.size}
          rx={CHASSIS.r}
          stroke={MUTED}
          vectorEffect="non-scaling-stroke"
        />
        {/* Forward mark: without it, a heading of 0 has nothing to be 0 against. */}
        <path
          d={`M${CENTRE - 16} ${CHASSIS.y} L${CENTRE} ${CHASSIS.y - 18} L${CENTRE + 16} ${CHASSIS.y}`}
          stroke={MUTED}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={CENTRE} cy={CENTRE} r={3} fill={MUTED} stroke="none" />

        {MODULES.map((module) => (
          <g key={module.id} transform={`translate(${module.x} ${module.y})`}>
            {drawing === "swerve" ? (
              <>
                <rect
                  x={-34}
                  y={-34}
                  width={68}
                  height={68}
                  rx={8}
                  stroke={MUTED}
                  vectorEffect="non-scaling-stroke"
                />
                <g style={{ ...ORIGIN, transform: `rotate(${direction}deg)`, transition }}>
                  <rect
                    x={-9}
                    y={-27}
                    width={18}
                    height={54}
                    rx={9}
                    stroke={MOVING}
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={0} cy={0} r={7} stroke={MOVING} vectorEffect="non-scaling-stroke" />
                  <path d="M0 -27 L0 -33" stroke={MOVING} strokeWidth={2} vectorEffect="non-scaling-stroke" />
                </g>
              </>
            ) : null}

            {drawing === "ball" ? (
              <>
                <circle cx={0} cy={0} r={32} stroke={MUTED} vectorEffect="non-scaling-stroke" />
                {[45, -45].map((axis) => (
                  <path
                    key={`axis-${axis}`}
                    d={`M${round(-38 * Math.sin(rad(axis)))} ${round(38 * Math.cos(rad(axis)))} L${round(
                      38 * Math.sin(rad(axis)),
                    )} ${round(-38 * Math.cos(rad(axis)))}`}
                    stroke={MUTED}
                    strokeDasharray="5 5"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                {[45, -45].map((axis) => (
                  <Vector
                    key={`roller-${axis}`}
                    angle={axis}
                    k={Math.cos(rad(direction - axis))}
                    length={34}
                    transition={transition}
                  />
                ))}
              </>
            ) : null}

            {drawing === "mecanum" ? (
              <>
                <rect
                  x={-12}
                  y={-30}
                  width={24}
                  height={60}
                  rx={6}
                  stroke={MUTED}
                  vectorEffect="non-scaling-stroke"
                />
                {[-16, 0, 16].map((offset) => (
                  <path
                    key={`roller-${offset}`}
                    d={`M${-10} ${offset - module.diagonal * 10} L${10} ${offset + module.diagonal * 10}`}
                    stroke={MUTED}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <Vector k={mecanum(module.diagonal)} angle={0} length={46} transition={transition} />
              </>
            ) : null}
          </g>
        ))}

        {/* The command itself, from the centre of the chassis. */}
        <g transform={`translate(${CENTRE} ${CENTRE})`}>
          <Vector angle={direction} k={1} length={112} width={2.5} transition={transition} />
        </g>
      </svg>

      <div className="flex w-full flex-col gap-5 lg:max-w-[24rem]">
        <fieldset>
          <legend className="type-caption">{how.legend}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {how.options.map((candidate) => (
              <label key={candidate.id} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${id}-drivetrain`}
                  value={candidate.id}
                  checked={selected === candidate.id}
                  onChange={() => setSelected(candidate.id)}
                  className="peer sr-only"
                />
                <span
                  className={[
                    "flex min-h-11 items-center rounded-control border px-4 type-button",
                    "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent",
                    selected === candidate.id
                      ? "border-ink bg-surface text-ink"
                      : "border-border-strong text-muted",
                  ].join(" ")}
                  style={{ transition: swatch }}
                >
                  {candidate.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-1">
          <label htmlFor={id} className="type-caption">
            {how.label}
          </label>
          <div className="flex items-center gap-4">
            <input
              id={id}
              type="range"
              min={0}
              max={360}
              step={1}
              value={direction}
              onChange={(event) => setDirection(event.currentTarget.valueAsNumber)}
              aria-valuetext={valueText}
              aria-describedby={noteId}
              className="range-input flex-1"
            />
            <output htmlFor={id} className="type-value w-14 shrink-0 text-right">
              {direction}°
            </output>
          </div>
        </div>

        <p id={noteId} className="type-caption" aria-live="polite">
          {option.note}
        </p>
      </div>
    </div>
  );
}

export default DriveDiagram;

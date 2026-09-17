import { cn } from "@/lib/utils";

/**
 * The static poster for the home hero's pin canvas (design-spec §10.1): the AntiCam clip-on pin
 * drawn as geometry — textured black rim, dark navy body, light plate, the COB module and its
 * nine emitters lit, with the light they spill. It is what the server renders, what shows while
 * the scene's chunk downloads, what stays if WebGL fails or the frame-time guard trips, what the
 * reduced-motion and print states show, and the backdrop behind the transparent canvas.
 *
 * It fills the hero's 4:3 box on `--bg` and uses the §2.2 canvas materials, so the poster and the
 * scene are the same object in two media. It carries no copy: the hero's caption says what it is.
 * Pass `title` and `desc` only where the poster stands alone as the figure.
 */

export type PinPosterProps = {
  /** Accessible name. Omit while the caption next to it carries the meaning. */
  title?: string;
  /** Longer description, read after the name. */
  desc?: string;
  /** Prefix for gradient and label ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const CENTER = { x: 480, y: 360 };
/** The pin's 42 mm width, in drawing units. */
const UNIT = 440;
const RIM = UNIT;
const BODY = UNIT * 0.92;
const PLATE = UNIT * 0.71;
const MODULE = UNIT * 0.36;
const PITCH = UNIT * 0.1;
const EMITTER = UNIT * 0.032;

const square = (size: number) => ({
  x: CENTER.x - size / 2,
  y: CENTER.y - size / 2,
  width: size,
  height: size,
});

const EMITTERS = [-1, 0, 1].flatMap((row) =>
  [-1, 0, 1].map((col) => ({
    cx: CENTER.x + col * PITCH,
    cy: CENTER.y + row * PITCH,
    key: `${row}-${col}`,
  })),
);

export function PinPoster({ title, desc, id = "pin-poster", className }: PinPosterProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const labelled = Boolean(title);
  return (
    <svg
      viewBox="0 0 960 720"
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
      {...(labelled
        ? { role: "img" as const, "aria-labelledby": desc ? `${titleId} ${descId}` : titleId }
        : { "aria-hidden": true })}
    >
      {labelled ? <title id={titleId}>{title}</title> : null}
      {labelled && desc ? <desc id={descId}>{desc}</desc> : null}
      <defs>
        <radialGradient id={`${id}-spill`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity={0.14} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}-glare`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.85} />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}-emitter`}>
          <stop offset="55%" stopColor="var(--accent)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.35} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={960} height={720} fill="var(--bg)" />
      {/* The light the emitters throw into the room. */}
      <circle cx={CENTER.x} cy={CENTER.y} r={430} fill={`url(#${id}-spill)`} />

      {/* Rim, body, plate: the pin as three stacked plates. */}
      <rect {...square(RIM)} rx={UNIT * 0.17} fill="var(--pin-rim)" />
      <rect {...square(BODY)} rx={UNIT * 0.15} fill="var(--pin-body)" />
      <rect {...square(PLATE)} rx={UNIT * 0.11} fill="var(--plate-light)" />
      {/* Two fixing points in the plate, as on the built module. */}
      <circle cx={CENTER.x - PLATE * 0.34} cy={CENTER.y - PLATE * 0.34} r={UNIT * 0.018} fill="var(--pin-rim)" fillOpacity={0.55} />
      <circle cx={CENTER.x + PLATE * 0.34} cy={CENTER.y + PLATE * 0.34} r={UNIT * 0.018} fill="var(--pin-rim)" fillOpacity={0.55} />

      {/* The COB module and its nine infrared emitters, lit. */}
      <rect {...square(MODULE)} rx={UNIT * 0.02} fill="var(--led-module)" />
      <rect
        {...square(MODULE * 0.86)}
        rx={UNIT * 0.012}
        fill="var(--emitter-off)"
        fillOpacity={0.9}
      />
      {EMITTERS.map((e) => (
        <circle key={e.key} cx={e.cx} cy={e.cy} r={EMITTER} fill={`url(#${id}-emitter)`} />
      ))}
      {/* The bloom a sensor records over the array. */}
      <circle cx={CENTER.x} cy={CENTER.y} r={UNIT * 0.4} fill={`url(#${id}-glare)`} />
    </svg>
  );
}

export default PinPoster;

import { cn } from "@/lib/utils";

/**
 * The static poster for the home hero's pin canvas (design-spec §10.1): the AntiCam clip-on pin
 * drawn as geometry — textured black rim, dark navy body, light plate, the COB module and its
 * nine emitters lit, with the light they spill. It is what the server renders, what shows while
 * the scene's chunk downloads, what stays if WebGL fails or the frame-time guard trips, what the
 * reduced-motion and print states show, and the backdrop behind the transparent canvas.
 *
 * It fills the hero's 4:3 box on `--bg`. Every part is sized from the same unit as the scene's
 * geometry table and painted with the same §2.2 material tokens, so the poster and the scene are
 * the same object in two media and the cross-fade between them does not jump. The light is the
 * scene's light, built from tokens only: a key wash from the upper left (`--plate-light`), the
 * shade it leaves at the lower right (`--bg`), and the pink the emitters throw onto the plate,
 * the bezel and the room (`--accent`).
 *
 * It carries no copy: the hero's caption says what it is. Pass `title` and `desc` only where the
 * poster stands alone as the figure.
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

const BOX = { w: 960, h: 720 };
const CENTER = { x: BOX.w / 2, y: BOX.h / 2 };
/**
 * The pin's 42 mm width, in drawing units. Every part below is a multiple of it, as in §10.1.
 * Sized so the pin covers the same share of the box as it does through the scene camera
 * (fov 21 at z 4.2, object at z 0.2: 2 · 4 · tan 10.5° ≈ 1.48 units tall), so the canvas can
 * cross-fade in over the poster without the object jumping size. The object fills about
 * seven tenths of the box height: at a third of it the hero's largest element was ground.
 */
const UNIT = 487;
const RIM = UNIT * 1.06;
const BODY = UNIT * 0.98;
const PLATE = UNIT * 0.78;
/**
 * The emitter module takes nearly half the pin, as it does on the V2 flatlay: the object a
 * reader recognises is the emitter plate, not the housing around it.
 */
const MODULE = UNIT * 0.46;
const WELL = MODULE * 0.86;
const PITCH = UNIT * 0.125;
const EMITTER = UNIT * 0.038;
/**
 * Corner radii, as a share of the unit. The pin is a laser-cut square stack, so the corners
 * are eased, not rounded: at a squircle radius the drawing reads as an application icon
 * rather than as hardware.
 */
const R_RIM = UNIT * 0.055;
const R_BODY = UNIT * 0.045;
const R_PLATE = UNIT * 0.03;

const square = (size: number, radius: number) => ({
  x: CENTER.x - size / 2,
  y: CENTER.y - size / 2,
  width: size,
  height: size,
  rx: radius,
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
  /** The key and its shade are painted over each part, so one gradient serves every surface. */
  const lit = (size: number, radius: number) => (
    <>
      <rect {...square(size, radius)} fill={`url(#${id}-key)`} />
      <rect {...square(size, radius)} fill={`url(#${id}-shade)`} />
    </>
  );
  return (
    <svg
      viewBox={`0 0 ${BOX.w} ${BOX.h}`}
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
      {...(labelled
        ? { role: "img" as const, "aria-labelledby": desc ? `${titleId} ${descId}` : titleId }
        : { "aria-hidden": true })}
    >
      {labelled ? <title id={titleId}>{title}</title> : null}
      {labelled && desc ? <desc id={descId}>{desc}</desc> : null}
      <defs>
        {/* The light the emitters throw into the room behind the pin. */}
        <radialGradient id={`${id}-room`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.22} />
          <stop offset="45%" stopColor="var(--accent)" stopOpacity={0.06} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        {/* The key light, upper left, and the shade it leaves at the lower right. */}
        <linearGradient id={`${id}-key`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--plate-light)" stopOpacity={0.14} />
          <stop offset="62%" stopColor="var(--plate-light)" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="1" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--bg)" stopOpacity={0.34} />
          <stop offset="58%" stopColor="var(--bg)" stopOpacity={0} />
        </linearGradient>
        {/* Pink spilling from the array onto the plate and the bezel. */}
        <radialGradient id={`${id}-wash`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.17} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        {/* The bloom a sensor records over the array. */}
        <radialGradient id={`${id}-glare`}>
          <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.6} />
          <stop offset="38%" stopColor="var(--accent)" stopOpacity={0.16} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}-emitter`}>
          <stop offset="55%" stopColor="var(--accent)" stopOpacity={1} />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.35} />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={BOX.w} height={BOX.h} fill="var(--bg)" />
      {/* The light the emitters throw into the room stays near the object; at the width of
          the whole box it read as a halo behind an icon rather than as spill. */}
      <circle cx={CENTER.x} cy={CENTER.y} r={UNIT * 0.78} fill={`url(#${id}-room)`} />

      {/* Rim, body, plate: the pin as three stacked plates, each taking the same light. */}
      <rect {...square(RIM, R_RIM)} fill="var(--pin-rim)" />
      {lit(RIM, R_RIM)}
      <rect {...square(BODY, R_BODY)} fill="var(--pin-body)" />
      {lit(BODY, R_BODY)}
      <rect {...square(PLATE, R_PLATE)} fill="var(--plate-light)" />
      <rect {...square(PLATE, R_PLATE)} fill={`url(#${id}-shade)`} />

      {/* The pink the array spills back over the object it sits in. */}
      <circle cx={CENTER.x} cy={CENTER.y} r={UNIT * 0.45} fill={`url(#${id}-wash)`} />

      {/* The COB module, its well and the nine infrared emitters, lit. */}
      <rect {...square(MODULE, UNIT * 0.014)} fill="var(--led-module)" />
      {lit(MODULE, UNIT * 0.014)}
      <rect {...square(WELL, UNIT * 0.008)} fill="var(--emitter-off)" />
      {EMITTERS.map((e) => (
        <circle key={e.key} cx={e.cx} cy={e.cy} r={EMITTER} fill={`url(#${id}-emitter)`} />
      ))}
      <circle cx={CENTER.x} cy={CENTER.y} r={UNIT * 0.36} fill={`url(#${id}-glare)`} />
    </svg>
  );
}

export default PinPoster;

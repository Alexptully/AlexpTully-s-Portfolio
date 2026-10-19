import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The task Pando Surgical's LapRotator exists for, drawn without the product. Sources:
 * "Pando Surgical Executive Summary (internal)"; www.pandosurgical.com.
 *
 * A laparoscope enters the body through a port. Its tip is cut at an angle, so the scope looks
 * off its own axis, and turning the scope about that axis swings the view (the filled cone is
 * the view now, the dashed cone the view after half a turn). Today the turn takes a second hand,
 * which means setting an instrument down; the inset compares that with doing it one-handed.
 *
 * Deliberately absent: anything that could suggest how the LapRotator works or looks. There is
 * no attachment on the scope, no housing, gear, motor or button — only a standard scope, its
 * camera head, light post and port, and the hand. Keep it that way: the device is not cleared.
 *
 * Text is sized against a 358 px phone column, as the other drawings are (16 units ≈ 14 px), and
 * every word is a prop rendered as live text. Colours are tokens only.
 */

type Pt = readonly [number, number];

export type LapRotatorTaskLabels = {
  /** Under the left inset panel: the scope turned with a second hand, an instrument set down. */
  twoHands: string;
  /** Under the right inset panel: the scope turned with the hand already holding it. */
  oneHand: string;
  /** Next to the rotation arrow in the main drawing. */
  rotate: string;
};

export type LapRotatorTaskProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** Keep each short (about 18 characters): every label is set on one line. */
  labels: LapRotatorTaskLabels;
  /** Widest the drawing is allowed to grow, so the labels never become headline-sized. */
  maxWidth?: number;
  /** Prefix for every id in the drawing; change it if two of these share a page. */
  id?: string;
  className?: string;
};

/* ------------------------------------------------------------------------------------------ */
/* Frame and palette                                                                          */
/* ------------------------------------------------------------------------------------------ */

const W = 400;
const H = 438;

const LINE = "var(--muted)";
const QUIET = "var(--border-strong)";
const ACCENT = "var(--accent)";
/* Opaque tints, so a nearer part hides what is behind it instead of ghosting over it. */
const STEEL = "color-mix(in srgb, var(--ink) 20%, var(--bg))";
const STEEL_DARK = "color-mix(in srgb, var(--ink) 11%, var(--bg))";
const GLOVE = "color-mix(in srgb, var(--ink) 34%, var(--bg))";
const GLOVE_SHADE = "color-mix(in srgb, var(--ink) 25%, var(--bg))";
const WALL_FILL = "color-mix(in srgb, var(--ink) 6%, var(--bg))";

/** `vector-effect` is not inherited, so every stroked shape carries it. */
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

const n2 = (n: number) => Math.round(n * 100) / 100;
const rad = (deg: number) => (deg * Math.PI) / 180;
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
const pts = (list: Pt[]) =>
  list.map(([x, y], i) => `${i === 0 ? "M" : "L"}${n2(x)} ${n2(y)}`).join(" ");

/** A stadium (capsule) from `a` to `b`, `w` wide. */
function capsule(a: Pt, b: Pt, w: number): string {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const u: Pt = [(b[0] - a[0]) / len, (b[1] - a[1]) / len];
  const nrm: Pt = mul([-u[1], u[0]], w / 2);
  const a1 = add(a, nrm);
  const b1 = add(b, nrm);
  const b2 = add(b, mul(nrm, -1));
  const a2 = add(a, mul(nrm, -1));
  const r = n2(w / 2);
  return `M${n2(a1[0])} ${n2(a1[1])} L${n2(b1[0])} ${n2(b1[1])} A${r} ${r} 0 0 0 ${n2(b2[0])} ${n2(b2[1])} L${n2(a2[0])} ${n2(a2[1])} A${r} ${r} 0 0 0 ${n2(a1[0])} ${n2(a1[1])} Z`;
}

/* ------------------------------------------------------------------------------------------ */
/* The scope, in its own frame: shaft along +x from the ocular body (x = 0) to the tip          */
/* ------------------------------------------------------------------------------------------ */

const SHAFT_R = 4.2;
const TIP_X = 192;
/** A 30° scope: the lens face is cut so it looks 30° off the axis, towards local -y. */
const VIEW_OFF_AXIS = 30;
const BEVEL = 2 * SHAFT_R * Math.tan(rad(VIEW_OFF_AXIS));
const LENS: Pt = [TIP_X + BEVEL / 2, 0];
const OCULAR = { x0: -38, x1: 0, r: 7.5 };
const EYEPIECE = { x0: -46, x1: -38, r: 9.5 };
const CAMERA = { x0: -96, x1: -46, r: 12.5 };
const POST = { x: -21, r: 2.6, len: 12 };
/** Where the hand closes on the camera head. */
const GRIP_X = -72;
/** Where the rotation ring sits on the shaft. */
const RING = { x: 24, rx: 6.5, ry: 17 };

/** The scope's tilt in the main drawing, and where its frame origin sits on the page. */
const SCOPE_ANGLE = 33;
const SCOPE_ORIGIN: Pt = [150, 106];
const U: Pt = [Math.cos(rad(SCOPE_ANGLE)), Math.sin(rad(SCOPE_ANGLE))];
const V: Pt = [-Math.sin(rad(SCOPE_ANGLE)), Math.cos(rad(SCOPE_ANGLE))];
const toPage = ([x, y]: Pt): Pt => add(SCOPE_ORIGIN, add(mul(U, x), mul(V, y)));

function Cylinder({ x0, x1, r, fill = STEEL }: { x0: number; x1: number; r: number; fill?: string }) {
  return (
    <rect x={x0} y={-r} width={x1 - x0} height={2 * r} rx={Math.min(1.5, r / 3)} fill={fill} {...HAIRLINE} />
  );
}

/** The cables leave the drawing, so they are drawn first and only in the main scene. */
function ScopeCables() {
  return (
    <g stroke={QUIET}>
      <path d={`M${CAMERA.x0} 0 C${CAMERA.x0 - 30} 0 ${CAMERA.x0 - 44} 26 ${CAMERA.x0 - 70} 52 S${CAMERA.x0 - 120} 110 ${CAMERA.x0 - 150} 150`} {...HAIRLINE} />
      <path
        d={`M${POST.x} ${-OCULAR.r - POST.len} C${POST.x} ${-OCULAR.r - 40} ${POST.x + 14} ${-OCULAR.r - 62} ${POST.x + 40} ${-OCULAR.r - 96} S${POST.x + 66} ${-OCULAR.r - 150} ${POST.x + 72} ${-OCULAR.r - 200}`}
        {...HAIRLINE}
      />
    </g>
  );
}

/** Camera head, eyepiece, ocular body, light post and shaft, back to front. */
function ScopeBody({ tip = true }: { tip?: boolean }) {
  const shaft = tip
    ? pts([
        [OCULAR.x1, -SHAFT_R],
        [TIP_X, -SHAFT_R],
        [TIP_X + BEVEL, SHAFT_R],
        [OCULAR.x1, SHAFT_R],
      ]) + " Z"
    : pts([
        [OCULAR.x1, -SHAFT_R],
        [TIP_X, -SHAFT_R],
        [TIP_X, SHAFT_R],
        [OCULAR.x1, SHAFT_R],
      ]) + " Z";
  return (
    <g>
      <Cylinder {...CAMERA} fill={STEEL_DARK} />
      {/* The camera head's coupler ring, where it clamps the eyepiece. */}
      <path d={`M${CAMERA.x1 - 7} ${-CAMERA.r} L${CAMERA.x1 - 7} ${CAMERA.r}`} {...HAIRLINE} />
      <Cylinder {...EYEPIECE} />
      <Cylinder {...OCULAR} />
      <rect x={POST.x - POST.r} y={-OCULAR.r - POST.len} width={POST.r * 2} height={POST.len} fill={STEEL} {...HAIRLINE} />
      <rect x={POST.x - POST.r - 1.4} y={-OCULAR.r - POST.len - 3} width={POST.r * 2 + 2.8} height={3} rx={1} fill={STEEL} {...HAIRLINE} />
      <path d={shaft} fill={STEEL} {...HAIRLINE} />
      {/* The lens face on the bevel. */}
      {tip ? (
        <path
          d={pts([
            [TIP_X + BEVEL * 0.22, -SHAFT_R * 0.56],
            [TIP_X + BEVEL * 0.78, SHAFT_R * 0.56],
          ])}
          stroke={ACCENT}
          {...HAIRLINE}
        />
      ) : null}
    </g>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* The hand: a gloved hand closing on a cylinder, back of the hand towards the viewer          */
/* ------------------------------------------------------------------------------------------ */

type HandSpec = {
  /** Centre of the grip along the held cylinder. */
  cx: number;
  /** Radius of the cylinder it closes on. */
  r: number;
  /** Unit vector, in the cylinder's frame, along which the forearm leaves (y must be < 0). */
  forearm: Pt;
};

/** The forearm always rises towards the top of the page, whatever the tool's angle. */
function handFor(cx: number, r: number, toolAngle: number): { spec: HandSpec; flip: boolean } {
  const up: Pt = [-Math.sin(rad(toolAngle)), -Math.cos(rad(toolAngle))];
  const flip = up[1] > 0;
  return { spec: { cx, r, forearm: flip ? [up[0], -up[1]] : up }, flip };
}

const FINGERS = [
  { dx: -15.3, reach: -2.5 }, // little
  { dx: -5.1, reach: 0.5 }, // ring
  { dx: 5.1, reach: 1.5 }, // middle
  { dx: 15.3, reach: 0 }, // index, nearest the tip
] as const;
const FINGER_W = 9.8;

function handGeometry({ cx, r, forearm: f }: HandSpec) {
  const across: Pt = [-f[1], f[0]]; // perpendicular to the forearm, pointing towards +x
  const knuckle = -r - 1.5;
  const wrist = add([cx - 4, knuckle], mul(f, 30));
  const wristFront = add(wrist, mul(across, 12));
  const wristBack = add(wrist, mul(across, -12));
  const far = 170;
  const elbowFront = add(add(wrist, mul(f, far)), mul(across, 16));
  const elbowBack = add(add(wrist, mul(f, far)), mul(across, -16));
  const cuff = add(wrist, mul(f, 20));
  return { across, knuckle, wristFront, wristBack, elbowFront, elbowBack, cuff };
}

/** Forearm and the back of the hand: behind the cylinder. */
function HandBack({ spec }: { spec: HandSpec }) {
  const { cx } = spec;
  const g = handGeometry(spec);
  const k = g.knuckle;
  const indexK: Pt = [cx + 21, k + 2];
  const littleK: Pt = [cx - 21, k + 2];
  const back = [
    `M${n2(indexK[0])} ${n2(indexK[1])}`,
    `C${n2(cx + 24)} ${n2(k - 10)} ${n2(g.wristFront[0] + 10)} ${n2(g.wristFront[1] + 6)} ${n2(g.wristFront[0])} ${n2(g.wristFront[1])}`,
    `L${n2(g.wristBack[0])} ${n2(g.wristBack[1])}`,
    `C${n2(g.wristBack[0] - 4)} ${n2(g.wristBack[1] + 12)} ${n2(cx - 26)} ${n2(k - 6)} ${n2(littleK[0])} ${n2(littleK[1])}`,
    `Q${n2(cx)} ${n2(k - 3)} ${n2(indexK[0])} ${n2(indexK[1])} Z`,
  ].join(" ");
  const cuffA = add(g.cuff, mul(g.across, 12.6));
  const cuffB = add(g.cuff, mul(g.across, -12.6));
  return (
    <g>
      <path
        d={pts([g.wristFront, g.elbowFront, g.elbowBack, g.wristBack]) + " Z"}
        fill={GLOVE_SHADE}
        {...HAIRLINE}
      />
      <path d={pts([cuffA, cuffB])} {...HAIRLINE} />
      <path d={back} fill={GLOVE} {...HAIRLINE} />
    </g>
  );
}

/** Thumb along the top of the scope, then the four fingers closed across its near face. */
function HandFront({ spec }: { spec: HandSpec }) {
  const { cx, r } = spec;
  const k = handGeometry(spec).knuckle;
  return (
    <g>
      <path d={capsule([cx + 12, -r + 1], [cx + 36, -r + 2.5], 9.5)} fill={GLOVE} {...HAIRLINE} />
      {FINGERS.map(({ dx, reach }) => {
        const top: Pt = [cx + dx, k - 1];
        // Fingertips stop just inside the far edge: the fingers wrap the cylinder, not pass it.
        const tip: Pt = [cx + dx + 1.4, r - 6.5 + reach];
        const joint = (top[1] + tip[1]) / 2 + 1;
        return (
          <g key={dx}>
            <path d={capsule(top, tip, FINGER_W)} fill={GLOVE} {...HAIRLINE} />
            <path
              d={`M${n2(cx + dx - 2.6)} ${n2(joint)} Q${n2(cx + dx + 0.6)} ${n2(joint + 1.6)} ${n2(cx + dx + 3.4)} ${n2(joint)}`}
              stroke={QUIET}
              {...HAIRLINE}
            />
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* The rotation: a ring about the shaft axis, split so the shaft hides its far half            */
/* ------------------------------------------------------------------------------------------ */

/** A point on the ring; t = 0 is the top, t = 90° the side nearest the viewer. */
const ringPt = (cx: number, rx: number, ry: number, deg: number): Pt => [
  cx + rx * Math.sin(rad(deg)),
  -ry * Math.cos(rad(deg)),
];
const RING_FROM = 214;
const RING_TO = 500;

function ringArc(cx: number, rx: number, ry: number, from: number, to: number): string {
  const a = ringPt(cx, rx, ry, from);
  const b = ringPt(cx, rx, ry, to);
  const large = to - from > 180 ? 1 : 0;
  return `M${n2(a[0])} ${n2(a[1])} A${rx} ${ry} 0 ${large} 1 ${n2(b[0])} ${n2(b[1])}`;
}

function RingBack({ cx, rx, ry, stroke }: { cx: number; rx: number; ry: number; stroke: string }) {
  return <path d={ringArc(cx, rx, ry, RING_FROM, 360)} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" {...HAIRLINE} />;
}

function RingFront({ cx, rx, ry, stroke, head = 6 }: { cx: number; rx: number; ry: number; stroke: string; head?: number }) {
  const end = ringPt(cx, rx, ry, RING_TO);
  const t = rad(RING_TO);
  const tl = Math.hypot(rx * Math.cos(t), ry * Math.sin(t)) || 1;
  const dir: Pt = [(rx * Math.cos(t)) / tl, (ry * Math.sin(t)) / tl];
  const side: Pt = [-dir[1], dir[0]];
  const tipPt = add(end, mul(dir, head * 0.9));
  const base = add(end, mul(dir, -head * 0.25));
  const arrow = pts([tipPt, add(base, mul(side, head * 0.55)), add(base, mul(side, -head * 0.55))]) + " Z";
  return (
    <g>
      <path d={ringArc(cx, rx, ry, 360, RING_TO)} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" {...HAIRLINE} />
      <path d={arrow} fill={stroke} stroke="none" />
    </g>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* The port and the body wall, in page coordinates                                             */
/* ------------------------------------------------------------------------------------------ */

const WALL = { apexX: 200, apexY: 150, k: 0.00042, thickness: 14 };
const wallY = (x: number, depth = 0) => WALL.apexY + WALL.k * (x - WALL.apexX) ** 2 + depth;

/** The parabola from x0 to x1 is exactly one quadratic Bézier. */
function wallCurve(x0: number, x1: number, depth: number, move: boolean): string {
  const y0 = wallY(x0, depth);
  const y1 = wallY(x1, depth);
  const xc = (x0 + x1) / 2;
  const yc = y0 + 2 * WALL.k * (x0 - WALL.apexX) * (xc - x0);
  return `${move ? "M" : "L"}${n2(x0)} ${n2(y0)} Q${n2(xc)} ${n2(yc)} ${n2(x1)} ${n2(y1)}`;
}

/** Where along the shaft (scope frame x) the axis crosses the wall at a given depth. */
function crossing(depth: number): number {
  let lo = 0;
  let hi = 400;
  for (let i = 0; i < 40; i += 1) {
    const mid = (lo + hi) / 2;
    const [x, y] = toPage([mid, 0]);
    if (y < wallY(x, depth)) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const PORT_IN = crossing(0);
const PORT_OUT = crossing(WALL.thickness);
const SLEEVE = { x0: PORT_IN - 16, x1: PORT_OUT + 6, r: SHAFT_R + 3.2 };

const WALL_BAND = `${wallCurve(-10, W + 10, 0, true)} ${wallCurve(W + 10, -10, WALL.thickness, false)} Z`;
/** Everything under the wall: the cavity the scope looks into. */
const CAVITY = `${wallCurve(-10, W + 10, WALL.thickness, true)} L${W + 10} ${H} L-10 ${H} Z`;

/* The view cone from the lens, in the scope frame. */
const CONE = { len: 82, half: 34 };
function cone(centerDeg: number): string {
  const a = add(LENS, mul([Math.cos(rad(centerDeg - CONE.half)), Math.sin(rad(centerDeg - CONE.half))], CONE.len));
  const b = add(LENS, mul([Math.cos(rad(centerDeg + CONE.half)), Math.sin(rad(centerDeg + CONE.half))], CONE.len));
  return `M${n2(LENS[0])} ${n2(LENS[1])} L${n2(a[0])} ${n2(a[1])} A${CONE.len} ${CONE.len} 0 0 1 ${n2(b[0])} ${n2(b[1])} Z`;
}

const sceneTransform = `translate(${SCOPE_ORIGIN[0]} ${SCOPE_ORIGIN[1]}) rotate(${SCOPE_ANGLE})`;
const MAIN_HAND = handFor(GRIP_X, CAMERA.r, SCOPE_ANGLE);
/** The rotate label sits beyond the top of the ring, clear of the shaft and the light cable. */
const ROTATE_AT = add(toPage([RING.x + 4, -RING.ry]), [14, 8]);

/* ------------------------------------------------------------------------------------------ */
/* The inset: the same scope and hand, small, twice                                            */
/* ------------------------------------------------------------------------------------------ */

const PANEL = { y: 312, w: 190, h: 124, gap: 20, labelY: 113 };
/** The pictogram area of a panel ends here; the label sits below it. */
const PANEL_ART_H = PANEL.labelY - 21;
const MINI = 0.4;
/** Mini scope frame origin, inside a panel: centres the scope with room to its right. */
const MINI_ORIGIN: Pt = [62, 38];

/** A laparoscopic grasper, in its own frame: handle at the origin, jaws at +x. */
const GRASPER = { len: 135, r: 3.6 };
/** `idle` is the instrument put down: same shape, drawn back in the quiet tone. */
function Grasper({ idle = false }: { idle?: boolean }) {
  const L = GRASPER.len;
  return (
    <g stroke={idle ? QUIET : LINE}>
      <rect x={-34} y={-7} width={34} height={14} rx={4} fill={idle ? "var(--bg)" : STEEL_DARK} {...HAIRLINE} />
      <rect x={0} y={-GRASPER.r} width={L} height={GRASPER.r * 2} fill={idle ? "var(--bg)" : STEEL} {...HAIRLINE} />
      <path d={`M${L} ${-GRASPER.r} L${L + 18} ${-8} M${L} ${GRASPER.r} L${L + 18} 5`} strokeLinecap="round" {...HAIRLINE} />
    </g>
  );
}

function Panel({
  x,
  label,
  emphasis,
  clipId,
  children,
}: {
  x: number;
  label: string;
  emphasis: boolean;
  clipId: string;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${PANEL.y})`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={PANEL.w} height={PANEL_ART_H} rx={6} />
        </clipPath>
      </defs>
      <rect x={0.5} y={0.5} width={PANEL.w - 1} height={PANEL.h - 1} rx={6} stroke={QUIET} {...HAIRLINE} />
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <path d={`M0.5 ${PANEL_ART_H} L${PANEL.w - 0.5} ${PANEL_ART_H}`} stroke="var(--border)" {...HAIRLINE} />
      <text
        x={PANEL.w / 2}
        y={PANEL.labelY}
        fill={emphasis ? "var(--ink)" : LINE}
        fontSize={15}
        textAnchor="middle"
        stroke="none"
      >
        {label}
      </text>
    </g>
  );
}

/** Scope and hands at inset scale; `extra` hands are drawn on the ocular body. */
function MiniScope({ secondHand, ring }: { secondHand: boolean; ring: string }) {
  const grip = handFor(GRIP_X, CAMERA.r, SCOPE_ANGLE);
  const second = handFor(-14, OCULAR.r, SCOPE_ANGLE);
  return (
    <g transform={`translate(${MINI_ORIGIN[0]} ${MINI_ORIGIN[1]}) rotate(${SCOPE_ANGLE}) scale(${MINI})`}>
      <HandBack spec={grip.spec} />
      {secondHand ? <HandBack spec={second.spec} /> : null}
      <RingBack cx={RING.x + 18} rx={RING.rx} ry={RING.ry + 4} stroke={ring} />
      <ScopeBody tip={false} />
      {secondHand ? <HandFront spec={second.spec} /> : null}
      <HandFront spec={grip.spec} />
      <RingFront cx={RING.x + 18} rx={RING.rx} ry={RING.ry + 4} stroke={ring} head={16} />
    </g>
  );
}

/* ------------------------------------------------------------------------------------------ */

export function LapRotatorTask({
  title,
  desc,
  labels,
  maxWidth = 560,
  id = "laprotator-task",
  className,
}: LapRotatorTaskProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const hatchId = `${id}-hatch`;
  const cavityId = `${id}-cavity`;
  const viewId = `${id}-view`;
  const depthId = `${id}-depth`;

  const heldAngle = 180 - SCOPE_ANGLE;
  const held = handFor(-20, GRASPER.r + 3, heldAngle);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("h-auto w-full", className)}
      style={{ maxWidth: `${maxWidth}px` }}
      fill="none"
      stroke={LINE}
      strokeWidth={1.25}
      strokeLinejoin="round"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <pattern id={hatchId} width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 5" stroke={QUIET} strokeOpacity={0.55} strokeWidth={0.8} />
        </pattern>
        <clipPath id={cavityId}>
          <path d={CAVITY} />
        </clipPath>
        <linearGradient id={depthId} x1={0} y1={WALL.apexY} x2={0} y2={PANEL.y - 8} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--ink)", stopOpacity: 0.07 }} />
          <stop offset="1" style={{ stopColor: "var(--ink)", stopOpacity: 0 }} />
        </linearGradient>
        <radialGradient id={viewId} cx={LENS[0]} cy={LENS[1]} r={CONE.len} gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.42 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Inside the body: a tint that fades with depth, so the cavity reads as a space. */}
      <path d={CAVITY} fill={`url(#${depthId})`} stroke="none" />
      {/* The body wall in section, with the port through it. */}
      <path d={WALL_BAND} fill={WALL_FILL} stroke="none" />
      <path d={WALL_BAND} fill={`url(#${hatchId})`} stroke="none" />
      <path d={wallCurve(-10, W + 10, 0, true)} {...HAIRLINE} />
      <path d={wallCurve(-10, W + 10, WALL.thickness, true)} stroke={QUIET} {...HAIRLINE} />

      {/* What the scope sees, now and after half a turn. Clipped to the cavity. */}
      <g clipPath={`url(#${cavityId})`}>
        <g transform={sceneTransform}>
          <path d={cone(-VIEW_OFF_AXIS)} fill={`url(#${viewId})`} stroke="none" />
          <path d={cone(-VIEW_OFF_AXIS)} stroke={ACCENT} strokeOpacity={0.7} {...HAIRLINE} />
          <path d={cone(VIEW_OFF_AXIS)} stroke={ACCENT} strokeOpacity={0.55} strokeDasharray="2 4" strokeLinecap="round" {...HAIRLINE} />
        </g>
      </g>

      <g transform={sceneTransform}>
        <ScopeCables />
        {/* The port: a sleeve through the wall, with its lip standing on the skin. */}
        <rect x={SLEEVE.x0} y={-SLEEVE.r} width={SLEEVE.x1 - SLEEVE.x0} height={SLEEVE.r * 2} fill="var(--bg)" {...HAIRLINE} />
        <rect x={SLEEVE.x0 - 5} y={-SLEEVE.r - 4} width={5} height={(SLEEVE.r + 4) * 2} rx={1.2} fill={STEEL_DARK} {...HAIRLINE} />
        <HandBack spec={MAIN_HAND.spec} />
        <RingBack cx={RING.x} rx={RING.rx} ry={RING.ry} stroke={ACCENT} />
        <ScopeBody />
        <HandFront spec={MAIN_HAND.spec} />
        <RingFront cx={RING.x} rx={RING.rx} ry={RING.ry} stroke={ACCENT} />
      </g>

      <text x={n2(ROTATE_AT[0])} y={n2(ROTATE_AT[1])} fill={ACCENT} fontSize={15} stroke="none">
        {labels.rotate}
      </text>

      {/* The inset: turning with a second hand, an instrument set down — and with one hand. */}
      <Panel x={0} label={labels.twoHands} emphasis={false} clipId={`${id}-panel-a`}>
        {/* The instrument the second hand had to put down, resting on the tray. */}
        <path d="M92 36 L180 36" stroke={QUIET} {...HAIRLINE} />
        <g transform={`translate(${108} ${32.6}) scale(${MINI})`}>
          <Grasper idle />
        </g>
        <MiniScope secondHand ring={LINE} />
      </Panel>
      <Panel x={PANEL.w + PANEL.gap} label={labels.oneHand} emphasis clipId={`${id}-panel-b`}>
        <g transform={`translate(${166} ${20}) rotate(${heldAngle}) scale(${MINI})`}>
          <g transform={held.flip ? "scale(1 -1)" : undefined}>
            <HandBack spec={held.spec} />
          </g>
          <Grasper />
          <g transform={held.flip ? "scale(1 -1)" : undefined}>
            <HandFront spec={held.spec} />
          </g>
        </g>
        <MiniScope secondHand={false} ring={ACCENT} />
      </Panel>
    </svg>
  );
}

export default LapRotatorTask;

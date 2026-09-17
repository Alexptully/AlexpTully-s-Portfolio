import { cn } from "@/lib/utils";

/**
 * The seven hand measurements that drive the prosthetic's parametric model, across digits 1–5
 * (design-spec §7.2; content/notes/sections/04-prosthetic.md). Redrawn rather than cropped from
 * the design brief, whose serif labels are illegible at source resolution.
 *
 * The hand is built from exact primitives — stadia for the digits, a rounded rectangle for the
 * palm — so it reads as a measurement drawing and never pretends to be an illustration of a hand.
 * Dimensions sit outside the part where drafting convention puts them; each is numbered on the
 * drawing and named underneath, so the long parameter names stay at reading size.
 *
 * TODO(alex): in the brief, the "palm length" arrow reads horizontal at source resolution. It is
 * drawn here as the vertical wrist-crease-to-finger-root dimension, which is what the name means.
 * Confirm against the original slide.
 */

export type HandParameterLabels = {
  /** 1: measured around the palm; drawn as the across-the-palm dimension the brief uses. */
  handCircumference: string;
  /** 2: wrist crease to the tip of digit 3. */
  handLength: string;
  /** 3: wrist crease to the finger roots. */
  palmLength: string;
  /** 4: around the wrist. */
  wristCircumference: string;
  /** 5: around the root of a finger. */
  fingerRoot: string;
  /** 6: around the interphalangeal joint, marked here on digit 1. */
  interphalangeal: string;
  /** 7: around the distal interphalangeal joint, marked here on digit 5. */
  distalInterphalangeal: string;
};

export type HandParametersProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** Labels for digits 1 to 5, in that order. Keep them short: they are drawn at the fingertips. */
  digitLabels: [string, string, string, string, string];
  parameters: HandParameterLabels;
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const LINE = "var(--muted)";
const DIM = "var(--render-blue)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

/* Layout: the hand, in drawing units. */
const PALM = { x: 90, y: 222, w: 152, h: 140, r: 26 };
const KNUCKLE_Y = 250;
const CREASE_Y = 362;
const DIGITS = [
  { x: 166, w: 32, top: 100 }, // digit 3, the longest
  { x: 130, w: 30, top: 118 },
  { x: 204, w: 30, top: 124 },
  { x: 96, w: 28, top: 158 },
];
const WRIST = { x: 118, y: CREASE_Y, w: 96, h: 68, r: 14 };
/** The thumb's own frame: base at the palm's lower right, laid out along its local -y axis. */
const THUMB = { originX: 248, originY: 336, angle: 35, w: 34, len: 118, over: 14 };
const THUMB_DIR = {
  x: Math.sin((THUMB.angle * Math.PI) / 180),
  y: -Math.cos((THUMB.angle * Math.PI) / 180),
};
const thumbPoint = (along: number) => ({
  x: THUMB.originX + THUMB_DIR.x * along,
  y: THUMB.originY + THUMB_DIR.y * along,
});

/** A dimension line with an arrowhead at each end. */
function Dim({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const head = (x: number, y: number, s: 1 | -1) => {
    const bx = x + s * ux * 9;
    const by = y + s * uy * 9;
    return `M${x} ${y} L${bx - uy * 3.2} ${by + ux * 3.2} L${bx + uy * 3.2} ${by - ux * 3.2} Z`;
  };
  return (
    <g>
      <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={DIM} {...HAIRLINE} />
      <path d={head(x1, y1, 1)} fill={DIM} stroke="none" />
      <path d={head(x2, y2, -1)} fill={DIM} stroke="none" />
    </g>
  );
}

function Mark({ n, x, y, to }: { n: number; x: number; y: number; to?: [number, number] }) {
  return (
    <g>
      {to ? <path d={`M${x} ${y} L${to[0]} ${to[1]}`} stroke={DIM} {...HAIRLINE} /> : null}
      <circle cx={x} cy={y} r={11} fill="var(--bg)" stroke={DIM} {...HAIRLINE} />
      <text
        x={x}
        y={y + 4.5}
        fill="var(--ink)"
        fontSize={13}
        textAnchor="middle"
        stroke="none"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {n}
      </text>
    </g>
  );
}

export function HandParameters({
  title,
  desc,
  digitLabels,
  parameters,
  maxWidth = 420,
  id = "hand-parameters",
  className,
}: HandParametersProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const key = [
    parameters.handCircumference,
    parameters.handLength,
    parameters.palmLength,
    parameters.wristCircumference,
    parameters.fingerRoot,
    parameters.interphalangeal,
    parameters.distalInterphalangeal,
  ];
  const ip = thumbPoint(72);
  const ipEdge = { x: ip.x - THUMB_DIR.y * 17, y: ip.y + THUMB_DIR.x * 17 };

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox="0 0 360 450"
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full"
        style={{ maxWidth: `${maxWidth}px` }}
        fill="none"
        stroke={LINE}
        strokeWidth={1.25}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{desc}</desc>

        {/* The hand: wrist, palm, four digits and the thumb. */}
        <rect
          x={WRIST.x}
          y={WRIST.y}
          width={WRIST.w}
          height={WRIST.h}
          rx={WRIST.r}
          {...HAIRLINE}
        />
        <rect x={PALM.x} y={PALM.y} width={PALM.w} height={PALM.h} rx={PALM.r} {...HAIRLINE} />
        {DIGITS.map((d) => (
          <g key={d.x}>
            <rect
              x={d.x}
              y={d.top}
              width={d.w}
              height={KNUCKLE_Y - d.top + 14}
              rx={d.w / 2}
              {...HAIRLINE}
            />
            <path
              d={`M${d.x + 3} ${d.top + 40} L${d.x + d.w - 3} ${d.top + 40} M${d.x + 3} ${d.top + 82} L${d.x + d.w - 3} ${d.top + 82}`}
              strokeOpacity={0.6}
              {...HAIRLINE}
            />
          </g>
        ))}
        <rect
          x={-THUMB.w / 2}
          y={-THUMB.len}
          width={THUMB.w}
          height={THUMB.len + THUMB.over}
          rx={THUMB.w / 2}
          transform={`translate(${THUMB.originX} ${THUMB.originY}) rotate(${THUMB.angle})`}
          {...HAIRLINE}
        />
        {/* Finger roots and the wrist crease. */}
        <path
          d={`M${PALM.x + 4} ${KNUCKLE_Y} L${PALM.x + PALM.w - 24} ${KNUCKLE_Y} M${PALM.x + 6} ${CREASE_Y} L${PALM.x + PALM.w - 6} ${CREASE_Y}`}
          strokeOpacity={0.6}
          {...HAIRLINE}
        />

        {/* Digit labels. */}
        <text x={318} y={238} fill={LINE} fontSize={14} textAnchor="middle" stroke="none">
          {digitLabels[0]}
        </text>
        <text x={219} y={112} fill={LINE} fontSize={14} textAnchor="middle" stroke="none">
          {digitLabels[1]}
        </text>
        <text x={182} y={88} fill={LINE} fontSize={14} textAnchor="middle" stroke="none">
          {digitLabels[2]}
        </text>
        <text x={145} y={106} fill={LINE} fontSize={14} textAnchor="middle" stroke="none">
          {digitLabels[3]}
        </text>
        <text x={110} y={146} fill={LINE} fontSize={14} textAnchor="middle" stroke="none">
          {digitLabels[4]}
        </text>

        {/* Extension lines for the two length dimensions. */}
        <path
          d={`M160 100 L36 100 M84 ${CREASE_Y} L36 ${CREASE_Y} M84 ${KNUCKLE_Y} L60 ${KNUCKLE_Y}`}
          stroke={DIM}
          strokeOpacity={0.5}
          strokeDasharray="5 4"
          {...HAIRLINE}
        />

        {/* 2 hand length, 3 palm length, 1 hand circumference. */}
        <Dim x1={44} y1={100} x2={44} y2={CREASE_Y} />
        <Dim x1={68} y1={KNUCKLE_Y} x2={68} y2={CREASE_Y} />
        <Dim x1={PALM.x} y1={306} x2={PALM.x + PALM.w} y2={306} />

        {/* 4 wrist, 5 finger root, 6 interphalangeal, 7 distal interphalangeal. */}
        <path
          d={`M${WRIST.x + 2} 392 Q${WRIST.x + WRIST.w / 2} 378 ${WRIST.x + WRIST.w - 2} 392`}
          stroke={DIM}
          {...HAIRLINE}
        />
        <path d="M204 242 Q219 232 234 242" stroke={DIM} {...HAIRLINE} />
        <path d="M96 202 Q110 192 124 202" stroke={DIM} {...HAIRLINE} />
        <path
          d={`M${ip.x - THUMB_DIR.y * 17} ${ip.y + THUMB_DIR.x * 17} Q${ip.x + THUMB_DIR.x * 9} ${ip.y + THUMB_DIR.y * 9} ${ip.x + THUMB_DIR.y * 17} ${ip.y - THUMB_DIR.x * 17}`}
          stroke={DIM}
          {...HAIRLINE}
        />

        <Mark n={1} x={166} y={306} />
        <Mark n={2} x={44} y={231} />
        <Mark n={3} x={68} y={306} />
        <Mark n={4} x={250} y={386} to={[WRIST.x + WRIST.w, 386]} />
        <Mark n={5} x={270} y={242} to={[234, 242]} />
        <Mark n={6} x={330} y={296} to={[ipEdge.x + 6, ipEdge.y + 4]} />
        <Mark n={7} x={56} y={202} to={[96, 202]} />
      </svg>
      <dl className="mt-4 grid grid-cols-[1.25rem_1fr] gap-x-3 gap-y-1 type-caption">
        {key.map((label, i) => (
          <div key={label} className="contents">
            <dt className="text-[var(--ink)] tabular-nums">{i + 1}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default HandParameters;

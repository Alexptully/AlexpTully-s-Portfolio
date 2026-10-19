import { cn } from "@/lib/utils";

/**
 * The robotic-arm flower, from above. Source: "Terra Labs project notes, October 2026
 * (internal)". Four people each wear a wristband (an IMU for wrist rotation, a myoelectric sensor
 * for grip) that drives one robot arm; the four arms place orbs that light a central flower,
 * which blooms. No photographs exist yet (TODO(alex)), and the flower mechanism is still an open
 * question, so this draws the arrangement and the idea only: no stem, cable or actuator is shown,
 * and the dotted lines say "linked", not how (the wireless link is also undecided).
 *
 * The arms are drawn as a top-down arm really looks: the base turns, then every other joint
 * pitches, so from above each arm is a straight run of links and servo bodies from its base to
 * where it reaches. Each arm reaches for its own socket a little ahead of the centre, so the
 * four together turn like a pinwheel, the same way the petals unfurl.
 *
 * `openness` (0–1) is the only state, and the drawing is a pure function of it: petal length,
 * width, twist and tint interpolate layer by layer, outer petals first. Colours are tokens only;
 * the flower is the one place the accent gathers.
 */

type Pt = readonly [number, number];

export type ArmFlowerLabels = {
  wristband?: string;
  arm?: string;
  flower?: string;
};

export type ArmFlowerProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** 0 is a closed bud, 1 fully open. Out-of-range values clamp. */
  openness: number;
  /** Optional callouts, each drawn once with a hairline leader. Keep them to a word or two. */
  labels?: ArmFlowerLabels;
  /** Widest the drawing is allowed to grow. */
  maxWidth?: number;
  /** Prefix for every id in the drawing; give each instance on a page its own. */
  id?: string;
  className?: string;
};

/* ------------------------------------------------------------------------------------------ */
/* Frame and palette                                                                          */
/* ------------------------------------------------------------------------------------------ */

const S = 560;
const C: Pt = [S / 2, S / 2];

const LINE = "var(--muted)";
const QUIET = "var(--border-strong)";
const PLATE = "color-mix(in srgb, var(--ink) 5%, var(--bg))";
const LINK = "color-mix(in srgb, var(--ink) 11%, var(--bg))";
const SERVO = "color-mix(in srgb, var(--ink) 19%, var(--bg))";
const BAND = "color-mix(in srgb, var(--ink) 15%, var(--bg))";
const POD = "color-mix(in srgb, var(--ink) 24%, var(--bg))";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

const n2 = (n: number) => Math.round(n * 100) / 100;
const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number): Pt => [C[0] + r * Math.cos(rad(deg)), C[1] + r * Math.sin(rad(deg))];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0));

/* ------------------------------------------------------------------------------------------ */
/* Arrangement: four stations, rotationally symmetric                                         */
/* ------------------------------------------------------------------------------------------ */

const R_BAND = 252; // wristbands, at the corners
const R_BASE = 196; // arm bases
const R_SOCKET = 106; // where each arm sets its orb down
const BASE_LAG = 24; // a base sits this far behind its wristband, around the circle
const REACH_LEAD = 34; // an arm reaches this far ahead of its base, around the circle

const STATIONS = [45, 135, 225, 315].map((corner) => {
  const baseDeg = corner - BASE_LAG;
  const socketDeg = baseDeg + REACH_LEAD;
  const band = polar(R_BAND, corner);
  const base = polar(R_BASE, baseDeg);
  const socket = polar(R_SOCKET, socketDeg);
  const reach = Math.hypot(socket[0] - base[0], socket[1] - base[1]);
  const heading = (Math.atan2(socket[1] - base[1], socket[0] - base[0]) * 180) / Math.PI;
  // The link from wristband to base bows outward, clear of the arm, and starts at the band's
  // rim rather than its centre.
  const bow = polar(R_BAND + 6, corner - BASE_LAG * 0.55);
  const away = Math.hypot(bow[0] - band[0], bow[1] - band[1]) || 1;
  const linkStart: Pt = [band[0] + ((bow[0] - band[0]) / away) * 25, band[1] + ((bow[1] - band[1]) / away) * 25];
  return { corner, baseDeg, band, base, socket, reach, heading, bow, linkStart };
});

/* ------------------------------------------------------------------------------------------ */
/* One arm, in its own frame: base at the origin, reaching along +x                            */
/* ------------------------------------------------------------------------------------------ */

function Arm({ reach }: { reach: number }) {
  const elbow = reach * 0.54;
  const wrist = reach * 0.84;
  return (
    <g>
      {/* Upper arm and forearm: paired side plates, with the gap between them showing. */}
      <rect x={6} y={-8.5} width={elbow - 6} height={17} rx={3} fill={LINK} {...HAIRLINE} />
      <path d={`M${n2(12)} 0 L${n2(elbow - 14)} 0`} stroke={QUIET} {...HAIRLINE} />
      <rect x={elbow} y={-6.5} width={wrist - elbow} height={13} rx={3} fill={LINK} {...HAIRLINE} />
      {/* Servo bodies at the shoulder, elbow and wrist, each with its horn. */}
      <rect x={-15} y={-18} width={30} height={36} rx={3.5} fill={SERVO} {...HAIRLINE} />
      <circle cx={0} cy={-18} r={5} fill={SERVO} {...HAIRLINE} />
      <rect x={elbow - 12} y={-15} width={24} height={30} rx={3} fill={SERVO} {...HAIRLINE} />
      <circle cx={elbow} cy={15} r={4.2} fill={SERVO} {...HAIRLINE} />
      <rect x={wrist - 9} y={-11} width={18} height={22} rx={3} fill={SERVO} {...HAIRLINE} />
      {/* The gripper: a fixed jaw and a moving jaw closed on the orb. */}
      <path
        d={`M${n2(wrist + 9)} 6 L${n2(reach - 6)} 7 Q${n2(reach + 2)} 8 ${n2(reach + 6)} 4`}
        strokeWidth={1.75}
        strokeLinecap="round"
        {...HAIRLINE}
      />
      <path
        d={`M${n2(wrist + 9)} -6 L${n2(reach - 6)} -7 Q${n2(reach + 2)} -8 ${n2(reach + 6)} -4`}
        strokeWidth={1.75}
        strokeLinecap="round"
        {...HAIRLINE}
      />
    </g>
  );
}

/**
 * A wristband seen from above: an open ring (the band, slightly oval as a wrist is), its sensor
 * pod on the outside, and a status light on the pod.
 */
function Wristband() {
  const band =
    "M-22 0 A22 18 0 1 0 22 0 A22 18 0 1 0 -22 0 Z " + "M-15.5 0 A15.5 11.5 0 1 1 15.5 0 A15.5 11.5 0 1 1 -15.5 0 Z";
  return (
    <g>
      <path d={band} fill={BAND} fillRule="evenodd" {...HAIRLINE} />
      <rect x={-9} y={-23} width={18} height={12} rx={3} fill={POD} {...HAIRLINE} />
      <circle cx={0} cy={-17} r={1.7} fill="var(--accent)" stroke="none" />
    </g>
  );
}

/* ------------------------------------------------------------------------------------------ */
/* The flower                                                                                 */
/* ------------------------------------------------------------------------------------------ */

type Range = readonly [number, number];
type Layer = {
  count: number;
  phase: number;
  len: Range;
  width: Range;
  /** Twist about the centre: tight when closed, relaxed when open. */
  twist: Range;
  /** The layer starts opening once `openness` passes this. Outer petals open first. */
  delay: number;
  /** Accent share of the petal tint, closed → open. */
  tint: Range;
};

/* Closed, the layers nearly coincide in length and overlap edge to edge, so the bud reads as
   one wrapped form; open, they step out to three distinct rings. */
const LAYERS: Layer[] = [
  { count: 8, phase: 0, len: [25, 90], width: [24, 40], twist: [62, 4], delay: 0, tint: [8, 24] },
  { count: 8, phase: 22.5, len: [23, 68], width: [22, 31], twist: [76, 9], delay: 0.14, tint: [11, 36] },
  { count: 6, phase: 9, len: [19, 42], width: [19, 23], twist: [94, 14], delay: 0.28, tint: [15, 52] },
];
const PETAL_ROOT = 4;

function petal(len: number, w: number): string {
  const r = PETAL_ROOT;
  return [
    `M${r} 0`,
    `C${n2(r + len * 0.26)} ${n2(-w * 0.64)} ${n2(r + len * 0.8)} ${n2(-w * 0.5)} ${n2(r + len)} 0`,
    `C${n2(r + len * 0.8)} ${n2(w * 0.5)} ${n2(r + len * 0.26)} ${n2(w * 0.64)} ${r} 0 Z`,
  ].join(" ");
}

function layerState(layer: Layer, openness: number) {
  const p = clamp01((openness - layer.delay) / (1 - layer.delay));
  return {
    p,
    len: lerp(layer.len[0], layer.len[1], p),
    width: lerp(layer.width[0], layer.width[1], p),
    twist: lerp(layer.twist[0], layer.twist[1], p),
    fill: `color-mix(in srgb, var(--accent) ${Math.round(lerp(layer.tint[0], layer.tint[1], p))}%, var(--bg))`,
    stroke: `color-mix(in srgb, var(--accent) ${Math.round(lerp(22, 78, p))}%, var(--muted))`,
  };
}

function Flower({ openness }: { openness: number }) {
  const core = lerp(7, 13, openness);
  return (
    <g>
      {LAYERS.map((layer, li) => {
        const s = layerState(layer, openness);
        const d = petal(s.len, s.width);
        const rib = `M${n2(PETAL_ROOT + s.len * 0.14)} 0 Q${n2(PETAL_ROOT + s.len * 0.5)} ${n2(s.width * 0.05)} ${n2(PETAL_ROOT + s.len * 0.84)} 0`;
        return (
          <g key={li}>
            {Array.from({ length: layer.count }, (_, j) => {
              const angle = layer.phase + (j * 360) / layer.count + s.twist;
              return (
                <g key={j} transform={`translate(${C[0]} ${C[1]}) rotate(${n2(angle)})`}>
                  <path d={d} fill={s.fill} stroke={s.stroke} {...HAIRLINE} />
                  <path d={rib} stroke={s.stroke} strokeOpacity={0.45} {...HAIRLINE} />
                </g>
              );
            })}
          </g>
        );
      })}
      <circle
        cx={C[0]}
        cy={C[1]}
        r={n2(core)}
        fill={`color-mix(in srgb, var(--accent) ${Math.round(lerp(40, 85, openness))}%, var(--bg))`}
        stroke="var(--accent)"
        {...HAIRLINE}
      />
      {Array.from({ length: 10 }, (_, i) => {
        const [x, y] = polar(lerp(4, core + 6, openness), i * 36 + 18);
        return (
          <circle
            key={i}
            cx={n2(x)}
            cy={n2(y)}
            r={1.7}
            fill="color-mix(in srgb, var(--accent) 40%, var(--ink))"
            stroke="none"
            opacity={n2(openness)}
          />
        );
      })}
    </g>
  );
}

/** The flower's outer reach at a given openness, for the callout leader. */
const flowerRadius = (openness: number) => PETAL_ROOT + layerState(LAYERS[0], openness).len;

/* ------------------------------------------------------------------------------------------ */

function Callout({ text, at, to, anchor = "start" }: { text: string; at: Pt; to: Pt; anchor?: "start" | "middle" | "end" }) {
  return (
    <g>
      <path d={`M${n2(at[0])} ${n2(at[1])} L${n2(to[0])} ${n2(to[1])}`} stroke={QUIET} {...HAIRLINE} />
      <circle cx={n2(to[0])} cy={n2(to[1])} r={2} fill={QUIET} stroke="none" />
      <text
        x={n2(at[0] + (anchor === "start" ? 6 : anchor === "end" ? -6 : 0))}
        y={n2(at[1] + (anchor === "middle" ? 20 : 6.5))}
        fill={LINE}
        fontSize={19}
        textAnchor={anchor}
        stroke="none"
      >
        {text}
      </text>
    </g>
  );
}

export function ArmFlower({
  title,
  desc,
  openness,
  labels,
  maxWidth = 720,
  id = "arm-flower",
  className,
}: ArmFlowerProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const glowId = `${id}-glow`;
  const o = clamp01(openness);

  // Callout anchors, fixed to particular stations so they never cross the drawing.
  const bandStation = STATIONS[1];
  const armStation = STATIONS[3];
  const armMid: Pt = [
    lerp(armStation.base[0], armStation.socket[0], 0.36),
    lerp(armStation.base[1], armStation.socket[1], 0.36),
  ];
  const flowerEdge: Pt = [C[0], C[1] + flowerRadius(o) * 0.82];

  return (
    <svg
      viewBox={`0 0 ${S} ${S}`}
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
        <radialGradient id={glowId}>
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.34 }} />
          <stop offset="0.5" style={{ stopColor: "var(--accent)", stopOpacity: 0.1 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* The flower lights as it opens. */}
      <circle cx={C[0]} cy={C[1]} r={170} fill={`url(#${glowId})`} stroke="none" opacity={n2(0.15 + 0.85 * o)} />

      {/* The ring of sockets the orbs are set into. */}
      <circle cx={C[0]} cy={C[1]} r={R_SOCKET} stroke="var(--border)" strokeDasharray="2 5" {...HAIRLINE} />

      {/* Wristband to arm: linked, mechanism undecided, so only dotted. */}
      {STATIONS.map((s) => (
        <path
          key={`link-${s.corner}`}
          d={`M${n2(s.linkStart[0])} ${n2(s.linkStart[1])} Q${n2(s.bow[0])} ${n2(s.bow[1])} ${n2(s.base[0])} ${n2(s.base[1])}`}
          stroke={LINE}
          strokeWidth={1.75}
          strokeDasharray="0 6"
          strokeLinecap="round"
          {...HAIRLINE}
        />
      ))}

      {STATIONS.map((s) => (
        <g key={`band-${s.corner}`} transform={`translate(${n2(s.band[0])} ${n2(s.band[1])}) rotate(${s.corner + 90})`}>
          <Wristband />
        </g>
      ))}

      {/* Base plates are bolted square to the circle; the turntable on each turns the arm. */}
      {STATIONS.map((s) => (
        <g key={`base-${s.corner}`} transform={`translate(${n2(s.base[0])} ${n2(s.base[1])})`}>
          <rect x={-29} y={-29} width={58} height={58} rx={8} fill={PLATE} stroke={QUIET} transform={`rotate(${s.baseDeg})`} {...HAIRLINE} />
          <circle r={23} fill={PLATE} {...HAIRLINE} />
          <circle r={15} stroke={QUIET} {...HAIRLINE} />
        </g>
      ))}

      <Flower openness={o} />

      {/* Sockets and orbs, then the arms that hold them. */}
      {STATIONS.map((s) => (
        <g key={`orb-${s.corner}`}>
          <circle cx={n2(s.socket[0])} cy={n2(s.socket[1])} r={12} fill="var(--bg)" stroke={QUIET} {...HAIRLINE} />
          <circle
            cx={n2(s.socket[0])}
            cy={n2(s.socket[1])}
            r={8.5}
            fill="color-mix(in srgb, var(--accent) 45%, var(--bg))"
            stroke="var(--accent)"
            {...HAIRLINE}
          />
        </g>
      ))}
      {STATIONS.map((s) => (
        <g key={`arm-${s.corner}`} transform={`translate(${n2(s.base[0])} ${n2(s.base[1])}) rotate(${n2(s.heading)})`}>
          <Arm reach={s.reach} />
        </g>
      ))}

      {labels?.wristband ? (
        <Callout
          text={labels.wristband}
          at={[bandStation.band[0], bandStation.band[1] + 40]}
          to={[bandStation.band[0], bandStation.band[1] + 18]}
          anchor="middle"
        />
      ) : null}
      {labels?.arm ? <Callout text={labels.arm} at={[armMid[0] + 44, armMid[1]]} to={[armMid[0] + 12, armMid[1]]} /> : null}
      {labels?.flower ? (
        <Callout text={labels.flower} at={[C[0], C[1] + 136]} to={flowerEdge} anchor="middle" />
      ) : null}
    </svg>
  );
}

export default ArmFlower;

import { cn } from "@/lib/utils";

/**
 * The CeraPiper pipe, drawn from the tool's own primitives (design-spec §5.3 row 4, §7.4 hero):
 * a hexagonal hollow profile, rib increments, one perpendicular branch that carves a matching
 * hex hole in the host, and a plug-and-socket connector. No photograph of the system is cleared,
 * so this drawing stands in for one: geometry only, no shading, no imitation of a render.
 *
 * Projection is cavalier oblique — the cross-section plane is the screen plane and is drawn true;
 * one unit along the pipe axis is drawn as `AXIS`. Hidden lines are removed by building each
 * tube's silhouette from its two extreme vertices, so the drawing reads as a solid object.
 *
 * Colours are the §2.2 content-only tokens (`--clay` body, `--muted` hairlines); strokes use
 * `vector-effect: non-scaling-stroke` so the 1.25 px hairline stays 1.25 px at every width.
 */

type Pt = readonly [number, number];

/** Hexagon vertices, flat top and bottom, points left and right (the die's orientation). */
const HEX_ANGLES = [0, 60, 120, 180, 240, 300] as const;

/** One unit along the pipe axis, drawn on screen. Right and up, foreshortened. */
const AXIS: Pt = [0.86, -0.44];

const n2 = (n: number) => Math.round(n * 100) / 100;

/** A hexagon lying in the screen plane: the pipe's cross-section, drawn true. */
function sectionHex(radius: number): Pt[] {
  return HEX_ANGLES.map((deg) => {
    const a = (deg * Math.PI) / 180;
    return [radius * Math.cos(a), radius * Math.sin(a)] as Pt;
  });
}

/** A hexagon lying in the plane of screen-x and the pipe axis: the branch's cross-section. */
function branchHex(radius: number): Pt[] {
  return HEX_ANGLES.map((deg) => {
    const a = (deg * Math.PI) / 180;
    const p = radius * Math.cos(a);
    const q = radius * Math.sin(a);
    return [p + q * AXIS[0], q * AXIS[1]] as Pt;
  });
}

function ring(center: Pt, offsets: Pt[]): string {
  return `${offsets
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${n2(center[0] + x)} ${n2(center[1] + y)}`)
    .join(" ")} Z`;
}

function walk(from: number, to: number, len: number, dir: 1 | -1): number[] {
  const out: number[] = [from];
  let i = from;
  while (i !== to) {
    i = (i + dir + len) % len;
    out.push(i);
  }
  return out;
}

/**
 * The visible silhouette of a hexagonal tube: the two extreme vertices along the extrusion's
 * normal are the silhouette edges; the far rim is drawn on the side the tube extrudes towards,
 * the near rim on the other side (where it coincides with the end cap and overdraws it exactly).
 */
function tube(center: Pt, offsets: Pt[], ext: Pt): string {
  const normal: Pt = [-ext[1], ext[0]];
  const along = offsets.map((o) => o[0] * normal[0] + o[1] * normal[1]);
  const a = along.indexOf(Math.max(...along));
  const b = along.indexOf(Math.min(...along));
  const facing = (path: number[]) =>
    path.slice(1, -1).reduce((t, i) => t + offsets[i][0] * ext[0] + offsets[i][1] * ext[1], 0);
  const forward = walk(a, b, offsets.length, 1);
  const backward = walk(a, b, offsets.length, -1);
  const far = facing(forward) >= facing(backward) ? forward : backward;
  const near = walk(b, a, offsets.length, far === forward ? 1 : -1);
  const points: Pt[] = [
    offsets[a],
    ...far.map((i) => [offsets[i][0] + ext[0], offsets[i][1] + ext[1]] as Pt),
    ...near.map((i) => offsets[i]),
  ];
  return `${points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${n2(center[0] + x)} ${n2(center[1] + y)}`)
    .join(" ")} Z`;
}

const move = (p: Pt, ext: Pt): Pt => [p[0] + ext[0], p[1] + ext[1]];
const scale = (p: Pt, k: number): Pt => [p[0] * k, p[1] * k];

/* Layout. One place to change the drawing. */
const R = 68; // outer radius of the pipe's hexagonal profile
const BORE = 0.56; // bore as a fraction of the outer radius
const LENGTH = 660; // pipe length, in drawing units along AXIS
const EXT = scale(AXIS, LENGTH);
const NEAR: Pt = [213, 450];
const FAR = move(NEAR, EXT);

/** Ribs stand only slightly proud, so a close pitch reads as increments and not as a telescope. */
const RIB_R = R * 1.08;
const RIB_EXT = scale(AXIS, LENGTH * 0.028);
/** Rib increments, evenly spaced along the run and drawn far to near so each occludes the last. */
const RIB_AT = [0.88, 0.76, 0.5, 0.38, 0.26, 0.14];

const SOCKET_R = R * 1.19;
/** Shallow enough that the floor of the recess stays visible through the mouth. */
const SOCKET_EXT = scale(AXIS, -LENGTH * 0.042);

const PLUG_R = R * 0.72;
const PLUG_EXT = scale(AXIS, LENGTH * 0.09);

const BRANCH_R = R * 0.62;
const BRANCH_AT = 0.62;
const BRANCH_EXT: Pt = [0, -120];
/** The branch is seated in the pipe's top face, not on its axis. */
const BRANCH_SEAT = move(move(NEAR, scale(EXT, BRANCH_AT)), [0, -R * 0.8660254]);
const BRANCH_TOP = move(BRANCH_SEAT, BRANCH_EXT);

const section = sectionHex(R);
const bore = sectionHex(R * BORE);
const ribSection = sectionHex(RIB_R);
const socketSection = sectionHex(SOCKET_R);
const plugSection = sectionHex(PLUG_R);
const branchSection = branchHex(BRANCH_R);
const branchBore = branchHex(BRANCH_R * BORE);

/* Opaque tints, so a nearer part hides what is behind it instead of ghosting over it. */
const BODY_FILL = "color-mix(in srgb, var(--clay) 30%, var(--bg))";
const FACE_FILL = "color-mix(in srgb, var(--clay) 46%, var(--bg))";
const HOLE_FILL = "var(--bg)";
const LINE = "var(--muted)";

/** `vector-effect` is not an inherited property, so every drawn path carries it. */
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

/** The mouth of the socket: the plane the plug of the next pipe enters. */
const MOUTH = move(NEAR, SOCKET_EXT);
const ribsBeyond = RIB_AT.filter((t) => t > BRANCH_AT);
const ribsNear = RIB_AT.filter((t) => t <= BRANCH_AT);

/** One rib increment: its outward face, its collar, and the pipe re-emerging from it. */
function Rib({ t }: { t: number }) {
  const at = move(NEAR, scale(EXT, t));
  return (
    <g>
      <path d={tube(at, ribSection, RIB_EXT)} fill={BODY_FILL} {...HAIRLINE} />
      <path d={ring(at, ribSection)} fill={FACE_FILL} {...HAIRLINE} />
      <path d={ring(at, section)} fill={BODY_FILL} {...HAIRLINE} />
    </g>
  );
}

export type HexPipeProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** Widest the drawing is allowed to grow. Defaults to the §7.4 hero width. */
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

export function HexPipe({ title, desc, maxWidth = 960, id = "hexpipe", className }: HexPipeProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const mouthId = `${id}-mouth`;
  return (
    <svg
      viewBox="0 0 960 620"
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
        {/* Everything inside the socket is seen through its mouth, so the mouth is the clip. */}
        <clipPath id={mouthId}>
          <path d={ring(MOUTH, plugSection)} />
        </clipPath>
      </defs>
      {/* Drawn far to near, so the painter's order does the hidden-line work. */}
      <g>
        {/* The plug end of the connector, behind the pipe's far rim. */}
        <path d={tube(FAR, plugSection, PLUG_EXT)} fill={BODY_FILL} {...HAIRLINE} />
        {/* The pipe itself. */}
        <path d={tube(NEAR, section, EXT)} fill={BODY_FILL} {...HAIRLINE} />
        {/* Ribs beyond the branch. */}
        {ribsBeyond.map((t) => (
          <Rib key={t} t={t} />
        ))}
        {/* The hex hole the branch carves in the host, then the branch standing in it. */}
        <path d={ring(BRANCH_SEAT, branchSection)} fill={HOLE_FILL} {...HAIRLINE} />
        <path d={tube(BRANCH_SEAT, branchSection, BRANCH_EXT)} fill={BODY_FILL} {...HAIRLINE} />
        <path d={ring(BRANCH_TOP, branchSection)} fill={FACE_FILL} {...HAIRLINE} />
        <path d={ring(BRANCH_TOP, branchBore)} fill={HOLE_FILL} {...HAIRLINE} />
        {/* Ribs between the branch and the socket. */}
        {ribsNear.map((t) => (
          <Rib key={t} t={t} />
        ))}
        {/* The near end of the pipe: end face and through bore. */}
        <path d={ring(NEAR, section)} fill={FACE_FILL} {...HAIRLINE} />
        <path d={ring(NEAR, bore)} fill={HOLE_FILL} {...HAIRLINE} />
        {/* The socket end of the connector: a collar standing proud of that face. */}
        <path d={tube(NEAR, socketSection, SOCKET_EXT)} fill={BODY_FILL} {...HAIRLINE} />
        <path d={ring(MOUTH, socketSection)} fill={FACE_FILL} {...HAIRLINE} />
        {/* Looking in: the recess wall, its floor at the pipe's face, and the bore through it. */}
        <g clipPath={`url(#${mouthId})`}>
          <rect x={0} y={0} width={960} height={620} fill={BODY_FILL} stroke="none" />
          <path d={ring(NEAR, plugSection)} fill={FACE_FILL} {...HAIRLINE} />
          <path d={ring(NEAR, bore)} fill={HOLE_FILL} {...HAIRLINE} />
        </g>
        <path d={ring(MOUTH, plugSection)} {...HAIRLINE} />
      </g>
    </svg>
  );
}

export default HexPipe;

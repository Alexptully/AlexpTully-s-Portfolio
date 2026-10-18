import { cn } from "@/lib/utils";

/**
 * The Bloom bracelet: a band of chain-link segments with five LEDs, lighting one more LED for
 * every connection a guest makes (1 to 5). Source: "Bloom PRD F26 v2 (NFC), Terra Labs
 * (internal)". It stands in for photographs that are not yet available (TODO(alex): stills from
 * "Bloom Terra Video.mp4" and breadboard prototype photos), so it draws the idea, not the build:
 * no PCB, antenna or coin cell is shown, and nothing here is a dimensioned drawing.
 *
 * The band is a true projection, not a sketch: every link is a rounded panel on a cylinder,
 * sampled in (arc length, height) and projected from 30° above, then sorted far to near so the
 * painter's order hides what the band hides. The near half shows its outer faces, the far half
 * its inner faces, and every link shows its top edge. Faces are shaded from one light by their
 * normals, as opaque token mixes, so the drawing restyles with the theme.
 *
 * Pure function of its props: `lit` (0–5) lights that many LEDs, left to right, with an
 * `--accent` glow (radial gradient + blur, ids prefixed by `id` so several can share a page).
 * No text, so it holds up from a 240 px card to a 900 px hero.
 */

type Pt = readonly [number, number];
type Vec3 = readonly [number, number, number];

export type BloomBraceletProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** How many of the five LEDs are lit: 0 to 5. Fractions round; out-of-range values clamp. */
  lit: number;
  /** Prefix for every id in the drawing; give each instance on a page its own. */
  id?: string;
  className?: string;
};

/* ------------------------------------------------------------------------------------------ */
/* Frame, projection, light                                                                   */
/* ------------------------------------------------------------------------------------------ */

const VW = 600;
const VH = 372;
const C: Pt = [300, 178];
/** Outer radius, link depth (radial), half the band's height, all in drawing units. */
const R = 206;
const DEPTH = 11;
const HALF_H = 32;
/** Seen from this far above the band's plane. */
const ELEV = (30 * Math.PI) / 180;
const SIN_E = Math.sin(ELEV);
const COS_E = Math.cos(ELEV);
/** A gentle three-quarter turn of the whole drawing. */
const TILT = -7;

/** Eighteen links put the gaps exactly at the silhouette, so no link straddles it. */
const LINKS = 18;
const STEP = (2 * Math.PI) / LINKS;
const GAP = 7; // arc length between neighbouring links, at the outer radius
const CORNER = 6;
const INSET = 5.5; // the recessed panel on each outer face

const LED_R = 7.5;
/** The five LEDs sit on the five links nearest the viewer. */
const LED_LINKS = [-2, -1, 0, 1, 2] as const;

const LINE = "var(--border-strong)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

const n2 = (n: number) => Math.round(n * 100) / 100;
const tint = (pct: number) => `color-mix(in srgb, var(--ink) ${Math.round(pct)}%, var(--bg))`;

/** World: x right, y towards the viewer, z up the band's axis. θ = 90° faces the viewer. */
function project(theta: number, z: number, rho: number): Pt {
  return [C[0] + rho * Math.cos(theta), C[1] - z * COS_E + rho * Math.sin(theta) * SIN_E];
}

const LIGHT: Vec3 = (() => {
  const v: Vec3 = [-0.45, 0.72, 0.55];
  const l = Math.hypot(...v);
  return [v[0] / l, v[1] / l, v[2] / l];
})();
const lambert = (n: Vec3) => Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);

const path = (list: Pt[]) =>
  `${list.map(([x, y], i) => `${i === 0 ? "M" : "L"}${n2(x)} ${n2(y)}`).join(" ")} Z`;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * A rounded rectangle lying on the cylinder of radius `rho`, between angles `t0`–`t1` and
 * heights `z0`–`z1`, with corners of radius `corner` (arc length). Sampled, then projected.
 */
function panel(rho: number, t0: number, t1: number, z0: number, z1: number, corner: number): string {
  const ct = corner / rho;
  const out: Pt[] = [];
  const edge = 14;
  const arc = 5;
  /** A quarter turn about a corner centre, from angle `from` (in the (θ, z) plane) down 90°. */
  const sweep = (cAng: number, cz: number, from: number) => {
    for (let i = 1; i <= arc; i += 1) {
      const a = from - (Math.PI / 2) * (i / arc);
      out.push(project(cAng + ct * Math.cos(a), cz + corner * Math.sin(a), rho));
    }
  };
  for (let i = 0; i <= edge; i += 1) out.push(project(lerp(t0 + ct, t1 - ct, i / edge), z1, rho));
  sweep(t1 - ct, z1 - corner, Math.PI / 2);
  for (let i = 1; i <= edge; i += 1) out.push(project(t1, lerp(z1 - corner, z0 + corner, i / edge), rho));
  sweep(t1 - ct, z0 + corner, 0);
  for (let i = 1; i <= edge; i += 1) out.push(project(lerp(t1 - ct, t0 + ct, i / edge), z0, rho));
  sweep(t0 + ct, z0 + corner, -Math.PI / 2);
  for (let i = 1; i <= edge; i += 1) out.push(project(t0, lerp(z0 + corner, z1 - corner, i / edge), rho));
  sweep(t0 + ct, z1 - corner, Math.PI);
  return path(out);
}

/** The top edge of a link: the slice of the annulus between the inner and outer radii. */
function topEdge(t0: number, t1: number): string {
  const out: Pt[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i += 1) out.push(project(lerp(t0, t1, i / steps), HALF_H, R));
  for (let i = steps; i >= 0; i -= 1) out.push(project(lerp(t0, t1, i / steps), HALF_H, R - DEPTH));
  return path(out);
}

/* ------------------------------------------------------------------------------------------ */
/* The band, computed once: it does not depend on props                                        */
/* ------------------------------------------------------------------------------------------ */

type Piece = { key: string; depth: number; d: string; fill: string; stroke: string };

const BAND: Piece[] = (() => {
  const pieces: Piece[] = [];
  const gapT = GAP / R;
  for (let i = 0; i < LINKS; i += 1) {
    const tc = Math.PI / 2 + i * STEP;
    const near = Math.sin(tc) > 0;
    const t0 = tc - STEP / 2 + gapT / 2;
    const t1 = tc + STEP / 2 - gapT / 2;
    const depth = Math.sin(tc);

    // The pin that joins this link to the next, under both of them.
    const tg = tc + STEP / 2;
    const pinR = near ? R - 2.5 : R - DEPTH + 2.5;
    const pinNormal: Vec3 = near ? [Math.cos(tg), Math.sin(tg), 0] : [-Math.cos(tg), -Math.sin(tg), 0];
    pieces.push({
      key: `pin-${i}`,
      depth: Math.sin(tg) - 0.05,
      d: panel(pinR, tg - (GAP / 2 + 4) / R, tg + (GAP / 2 + 4) / R, -HALF_H * 0.26, HALF_H * 0.26, 2),
      fill: tint(5 + 8 * lambert(pinNormal)),
      stroke: LINE,
    });

    const ct = CORNER / R;
    pieces.push({
      key: `top-${i}`,
      depth,
      d: topEdge(t0 + ct, t1 - ct),
      fill: tint(13 + 12 * lambert([0, 0, 1])),
      stroke: LINE,
    });

    if (near) {
      const normal: Vec3 = [Math.cos(tc), Math.sin(tc), 0];
      pieces.push({
        key: `face-${i}`,
        depth: depth + 0.001,
        d: panel(R, t0, t1, -HALF_H, HALF_H, CORNER),
        fill: tint(6 + 17 * lambert(normal)),
        stroke: LINE,
      });
      pieces.push({
        key: `recess-${i}`,
        depth: depth + 0.002,
        d: panel(R, t0 + INSET / R, t1 - INSET / R, -HALF_H + INSET, HALF_H - INSET, CORNER - 2),
        fill: tint(4 + 13 * lambert(normal)),
        stroke: "var(--border)",
      });
    } else {
      const rho = R - DEPTH;
      const normal: Vec3 = [-Math.cos(tc), -Math.sin(tc), 0];
      pieces.push({
        key: `inner-${i}`,
        depth: depth + 0.001,
        d: panel(rho, tc - STEP / 2 + GAP / rho / 2, tc + STEP / 2 - GAP / rho / 2, -HALF_H, HALF_H, CORNER),
        fill: tint(3 + 6 * lambert(normal)),
        stroke: LINE,
      });
    }
  }
  return pieces.sort((a, b) => a.depth - b.depth);
})();

/** Each LED as an affine map of a unit circle onto the link's face, left to right on screen. */
const LEDS = LED_LINKS.map((k) => {
  const t = Math.PI / 2 + k * STEP;
  const [x, y] = project(t, 0, R);
  // d(screen)/d(arc length) and d(screen)/d(height) at this point of the outer face.
  const m = [-Math.sin(t), Math.cos(t) * SIN_E, 0, -COS_E, x, y].map(n2);
  return { k, x, y, matrix: `matrix(${m.join(" ")})` };
}).sort((a, b) => a.x - b.x);

const POOL = project(Math.PI / 2, -HALF_H - 8, R + 22);

/* ------------------------------------------------------------------------------------------ */

export function BloomBracelet({ title, desc, lit, id = "bloom-bracelet", className }: BloomBraceletProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const glowId = `${id}-glow`;
  const poolId = `${id}-pool`;
  const blurId = `${id}-blur`;
  const count = Math.max(0, Math.min(LEDS.length, Math.round(Number.isFinite(lit) ? lit : 0)));

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("h-auto w-full", className)}
      fill="none"
      strokeWidth={1.25}
      strokeLinejoin="round"
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.75 }} />
          <stop offset="0.35" style={{ stopColor: "var(--accent)", stopOpacity: 0.32 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id={poolId}>
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.5 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
        <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={7} />
        </filter>
      </defs>

      <g transform={`rotate(${TILT} ${C[0]} ${C[1]})`}>
        {/* Light thrown on the surface under the band grows with the count. */}
        {count > 0 ? (
          <ellipse
            cx={n2(POOL[0])}
            cy={n2(POOL[1])}
            rx={210}
            ry={34}
            fill={`url(#${poolId})`}
            opacity={(0.25 + 0.75 * (count / LEDS.length)) * 0.8}
            filter={`url(#${blurId})`}
          />
        ) : null}

        {BAND.map((p) => (
          <path key={p.key} d={p.d} fill={p.fill} stroke={p.stroke} {...HAIRLINE} />
        ))}

        {LEDS.map((led, i) => {
          const on = i < count;
          return (
            <g key={led.k}>
              <circle
                r={LED_R}
                transform={led.matrix}
                fill={on ? "var(--accent)" : "var(--bg)"}
                stroke={on ? "none" : LINE}
                {...HAIRLINE}
              />
              {on ? (
                <circle
                  r={LED_R * 0.42}
                  transform={led.matrix}
                  fill="color-mix(in srgb, var(--accent) 35%, var(--ink))"
                />
              ) : (
                <circle r={LED_R * 0.42} transform={led.matrix} stroke="var(--border)" {...HAIRLINE} />
              )}
            </g>
          );
        })}

        {/* Glows last, so the light spills over the neighbouring links. */}
        {LEDS.slice(0, count).map((led) => (
          <circle
            key={`glow-${led.k}`}
            cx={n2(led.x)}
            cy={n2(led.y)}
            r={46}
            fill={`url(#${glowId})`}
            filter={`url(#${blurId})`}
          />
        ))}
      </g>
    </svg>
  );
}

export default BloomBracelet;

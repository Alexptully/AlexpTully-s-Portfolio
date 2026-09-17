import { cn } from "@/lib/utils";

/**
 * The CeraPiper paper blueprint (design-spec §7.4): the 20 cm-wide sheet that runs along the
 * conveyor bed under the freshly extruded clay, carrying the decisions that belong next to the
 * material — which part this is, where the clay is cut, the mandrel in use, and where a hole is
 * hand-cut to receive a perpendicular connector.
 *
 * It is the one drawn light surface on the site, licensed because the object really is paper
 * (§2.2 `--paper` / `--paper-ink`). Marks are numbered on the sheet and named underneath, so the
 * long labels stay at reading size instead of shrinking with the drawing.
 */

export type BlueprintStripProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  /** Printed at the head of the sheet, as each bed carries its own part name. */
  partName: string;
  /** The piece ID printed at the other end of the head. */
  pieceId: string;
  /** The sheet's across-the-bed dimension, e.g. "20 cm". */
  sheetWidth: string;
  /** The four numbered marks, named in this order under the drawing. */
  marks: {
    /** 1: the cut line. */
    cut: string;
    /** 2: the fixed start and end pieces at the ends of the bed. */
    endPiece: string;
    /** 3: the mandrel size in use, drawn as the bore centreline. */
    mandrel: string;
    /** 4: where a hole is hand-cut to receive a perpendicular branch. */
    hexHole: string;
  };
  /** The sheet's notes line, printed on the sheet itself. */
  note?: string;
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const W = 360;
const H = 196;
const SHEET = { x: 24, y: 34, w: 320, h: 120 };
const AXIS_Y = SHEET.y + SHEET.h / 2;
const PIPE = { top: AXIS_Y - 30, bottom: AXIS_Y + 30, from: 50, to: 318 };
const CUT_X = 230;
const HEX_X = 150;
const INK = "var(--paper-ink)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

const hatch = (from: number, to: number) => {
  const lines: string[] = [];
  for (let x = from - SHEET.h; x < to; x += 9) {
    const x0 = Math.max(from, x);
    const y0 = SHEET.y + (x0 - x);
    const x1 = Math.min(to, x + SHEET.h);
    const y1 = SHEET.y + (x1 - x);
    if (x1 > x0) lines.push(`M${x0} ${y0} L${x1} ${y1}`);
  }
  return lines.join(" ");
};

const hexAt = (cx: number, cy: number, r: number) =>
  `${[0, 60, 120, 180, 240, 300]
    .map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
    })
    .join(" ")} Z`;

function Mark({ n, x, y, to }: { n: number; x: number; y: number; to: number }) {
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${to}`} stroke={INK} strokeOpacity={0.55} {...HAIRLINE} />
      <circle cx={x} cy={y} r={10} fill="var(--bg)" stroke={INK} strokeOpacity={0.55} {...HAIRLINE} />
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

export function BlueprintStrip({
  title,
  desc,
  partName,
  pieceId,
  sheetWidth,
  marks,
  note,
  maxWidth = 520,
  id = "blueprint",
  className,
}: BlueprintStripProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const key = [marks.cut, marks.endPiece, marks.mandrel, marks.hexHole];
  const grid: string[] = [];
  for (let x = SHEET.x + 20; x < SHEET.x + SHEET.w; x += 20) {
    grid.push(`M${x} ${SHEET.y} L${x} ${SHEET.y + SHEET.h}`);
  }
  for (let y = SHEET.y + 20; y < SHEET.y + SHEET.h; y += 20) {
    grid.push(`M${SHEET.x} ${y} L${SHEET.x + SHEET.w} ${y}`);
  }
  const ribs: string[] = [];
  for (let x = PIPE.from + 14; x < PIPE.to - 8; x += 18) {
    if (Math.abs(x - HEX_X) < 20 || Math.abs(x - CUT_X) < 10) continue;
    ribs.push(`M${x} ${PIPE.top} L${x} ${PIPE.bottom}`);
  }

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        className="h-auto w-full"
        style={{ maxWidth: `${maxWidth}px` }}
        fill="none"
        stroke={INK}
        strokeWidth={1.25}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{desc}</desc>

        {/* The sheet, its grid and its crop marks. */}
        <rect
          x={SHEET.x}
          y={SHEET.y}
          width={SHEET.w}
          height={SHEET.h}
          fill="var(--paper)"
          stroke={INK}
          {...HAIRLINE}
        />
        <path d={grid.join(" ")} stroke={INK} strokeOpacity={0.14} {...HAIRLINE} />
        {[
          [SHEET.x, SHEET.y, 1, 1],
          [SHEET.x + SHEET.w, SHEET.y, -1, 1],
          [SHEET.x, SHEET.y + SHEET.h, 1, -1],
          [SHEET.x + SHEET.w, SHEET.y + SHEET.h, -1, -1],
        ].map(([x, y, sx, sy]) => (
          <path
            key={`${x}-${y}`}
            d={`M${x - sx * 9} ${y} L${x + sx * 5} ${y} M${x} ${y - sy * 9} L${x} ${y + sy * 5}`}
            stroke={INK}
            strokeOpacity={0.7}
            {...HAIRLINE}
          />
        ))}

        {/* The sheet's own head: part name and piece ID. */}
        <text x={PIPE.from + 8} y={SHEET.y + 18} fill={INK} fontSize={14} stroke="none">
          {partName}
        </text>
        <text
          x={SHEET.x + SHEET.w - 10}
          y={SHEET.y + 18}
          fill={INK}
          fillOpacity={0.75}
          fontSize={14}
          textAnchor="end"
          stroke="none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {pieceId}
        </text>
        {note ? (
          <text
            x={PIPE.from + 8}
            y={SHEET.y + SHEET.h - 8}
            fill={INK}
            fillOpacity={0.75}
            fontSize={14}
            stroke="none"
          >
            {note}
          </text>
        ) : null}

        {/* The extruded section in top view, with its rib increments. */}
        <rect
          x={PIPE.from}
          y={PIPE.top}
          width={PIPE.to - PIPE.from}
          height={PIPE.bottom - PIPE.top}
          fill="var(--clay)"
          fillOpacity={0.22}
          stroke={INK}
          {...HAIRLINE}
        />
        <path d={ribs.join(" ")} stroke={INK} strokeOpacity={0.5} {...HAIRLINE} />
        {/* Bore centreline: the mandrel in use. */}
        <path
          d={`M${PIPE.from} ${AXIS_Y} L${PIPE.to} ${AXIS_Y}`}
          stroke={INK}
          strokeDasharray="14 4 2 4"
          {...HAIRLINE}
        />
        {/* The fixed start and end pieces of the bed. */}
        <path d={hatch(SHEET.x, PIPE.from)} stroke={INK} strokeOpacity={0.35} {...HAIRLINE} />
        <path
          d={hatch(PIPE.to, SHEET.x + SHEET.w)}
          stroke={INK}
          strokeOpacity={0.35}
          {...HAIRLINE}
        />
        {/* Where the clay is cut. */}
        <path
          d={`M${CUT_X} ${SHEET.y} L${CUT_X} ${SHEET.y + SHEET.h}`}
          stroke={INK}
          strokeDasharray="6 4"
          {...HAIRLINE}
        />
        {/* Where a hole is hand-cut to receive a perpendicular branch. */}
        <path d={hexAt(HEX_X, AXIS_Y, 13)} fill="var(--paper)" stroke={INK} {...HAIRLINE} />
        <path
          d={`M${HEX_X - 18} ${AXIS_Y} L${HEX_X + 18} ${AXIS_Y} M${HEX_X} ${AXIS_Y - 18} L${HEX_X} ${AXIS_Y + 18}`}
          stroke={INK}
          strokeOpacity={0.55}
          {...HAIRLINE}
        />

        {/* The sheet's across-the-bed dimension. */}
        <path
          d={`M14 ${SHEET.y} L14 ${SHEET.y + SHEET.h} M10 ${SHEET.y} L18 ${SHEET.y} M10 ${SHEET.y + SHEET.h} L18 ${SHEET.y + SHEET.h}`}
          stroke="var(--muted)"
          {...HAIRLINE}
        />
        <text
          x={0}
          y={0}
          transform={`translate(10 ${AXIS_Y}) rotate(-90)`}
          fill="var(--muted)"
          fontSize={14}
          textAnchor="middle"
          stroke="none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {sheetWidth}
        </text>

        <Mark n={1} x={CUT_X} y={20} to={SHEET.y} />
        <Mark n={4} x={HEX_X} y={20} to={SHEET.y} />
        <Mark n={3} x={110} y={H - 20} to={SHEET.y + SHEET.h} />
        <Mark n={2} x={331} y={H - 20} to={SHEET.y + SHEET.h} />
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

export default BlueprintStrip;

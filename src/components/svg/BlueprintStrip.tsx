import type { BlueprintMarks } from "@/content/types";
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
  /**
   * The four numbered marks, named in this order under the drawing: the cut line, the fixed
   * start and end pieces, the mandrel in use, and where a hole is hand-cut for a branch.
   */
  marks: BlueprintMarks;
  /** The sheet's notes line, printed on the sheet itself. */
  note?: string;
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const W = 392;
const H = 206;
const SHEET = { x: 34, y: 34, w: 312, h: 132 };
/**
 * The sheet is a title block, the drawing band and a note band. Everything the machine marks —
 * hatching, the cut line, the bore centreline — stays inside the drawing band, so no rule or
 * hatch ever crosses a printed word.
 */
const BAND = { top: SHEET.y + 26, bottom: SHEET.y + SHEET.h - 26 };
const BAND_H = BAND.bottom - BAND.top;
const AXIS_Y = (BAND.top + BAND.bottom) / 2;
const PIPE = { top: AXIS_Y - 26, bottom: AXIS_Y + 26, from: 60, to: 320 };
const CUT_X = 240;
const HEX_X = 150;
/** Mid-point of the fixed end piece, where its callout points. */
const END_X = (PIPE.to + SHEET.x + SHEET.w) / 2;
/** The bore centreline overruns the clay to the sheet edge, where the mandrel leader meets it. */
const AXIS_FROM = SHEET.x;
const AXIS_TO = PIPE.to + 8;
/** Callouts sit off the paper, so they are drawn in the page's ink, not the sheet's. */
const CALLOUT = "var(--muted)";
const INK = "var(--paper-ink)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

/** 45° hatching over a slice of the drawing band: the fixed pieces the machine always extrudes. */
const hatch = (from: number, to: number) => {
  const lines: string[] = [];
  for (let x = from - BAND_H; x < to; x += 9) {
    const x0 = Math.max(from, x);
    const y0 = BAND.top + (x0 - x);
    const x1 = Math.min(to, x + BAND_H);
    const y1 = BAND.top + (x1 - x);
    if (x1 > x0) lines.push(`M${x0} ${y0} L${x1} ${y1}`);
  }
  return lines.join(" ");
};

/** The plotter's faint square grid across the whole sheet. */
const GRID = [
  ...Array.from({ length: Math.floor((SHEET.w - 1) / 20) }, (_, i) => {
    const x = SHEET.x + (i + 1) * 20;
    return `M${x} ${SHEET.y} L${x} ${SHEET.y + SHEET.h}`;
  }),
  ...Array.from({ length: Math.floor((SHEET.h - 1) / 20) }, (_, i) => {
    const y = SHEET.y + (i + 1) * 20;
    return `M${SHEET.x} ${y} L${SHEET.x + SHEET.w} ${y}`;
  }),
].join(" ");

/** The rib increments, plotted the whole length of the run at an even pitch. */
const RIBS = Array.from(
  { length: Math.floor((PIPE.to - 8 - (PIPE.from + 14)) / 18) + 1 },
  (_, i) => {
    const x = PIPE.from + 14 + i * 18;
    return `M${x} ${PIPE.top} L${x} ${PIPE.bottom}`;
  },
).join(" ");

const hexAt = (cx: number, cy: number, r: number) =>
  `${[0, 60, 120, 180, 240, 300]
    .map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      return `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
    })
    .join(" ")} Z`;

/** A numbered callout sitting off the sheet, with a leader to the feature it names. */
function Mark({ n, x, y, to }: { n: number; x: number; y: number; to: [number, number] }) {
  const dx = to[0] - x;
  const dy = to[1] - y;
  const len = Math.hypot(dx, dy) || 1;
  return (
    <g>
      <path
        d={`M${x + (dx / len) * 10} ${y + (dy / len) * 10} L${to[0]} ${to[1]}`}
        stroke={CALLOUT}
        {...HAIRLINE}
      />
      <circle cx={x} cy={y} r={10} fill="var(--bg)" stroke={CALLOUT} {...HAIRLINE} />
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
        <path d={GRID} stroke={INK} strokeOpacity={0.14} {...HAIRLINE} />
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

        {/* The title block and the note band, ruled off from the drawing. */}
        <path
          d={`M${SHEET.x} ${BAND.top} L${SHEET.x + SHEET.w} ${BAND.top} M${SHEET.x} ${BAND.bottom} L${SHEET.x + SHEET.w} ${BAND.bottom}`}
          stroke={INK}
          strokeOpacity={0.4}
          {...HAIRLINE}
        />
        <text x={SHEET.x + 12} y={SHEET.y + 18} fill={INK} fontSize={14} stroke="none">
          {partName}
        </text>
        <text
          x={SHEET.x + SHEET.w - 12}
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
            x={SHEET.x + 12}
            y={BAND.bottom + 18}
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
        <path d={RIBS} stroke={INK} strokeOpacity={0.5} {...HAIRLINE} />
        {/* Bore centreline: the mandrel in use. */}
        <path
          d={`M${AXIS_FROM} ${AXIS_Y} L${AXIS_TO} ${AXIS_Y}`}
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
          d={`M${CUT_X} ${BAND.top} L${CUT_X} ${BAND.bottom}`}
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

        {/* The sheet's across-the-bed dimension, off the right edge. */}
        <path
          d={`M${W - 26} ${SHEET.y} L${W - 26} ${SHEET.y + SHEET.h} M${W - 30} ${SHEET.y} L${W - 22} ${SHEET.y} M${W - 30} ${SHEET.y + SHEET.h} L${W - 22} ${SHEET.y + SHEET.h}`}
          stroke={CALLOUT}
          {...HAIRLINE}
        />
        <text
          x={0}
          y={0}
          transform={`translate(${W - 10} ${AXIS_Y}) rotate(-90)`}
          fill={CALLOUT}
          fontSize={14}
          textAnchor="middle"
          stroke="none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {sheetWidth}
        </text>

        <Mark n={4} x={HEX_X} y={14} to={[HEX_X, SHEET.y]} />
        <Mark n={1} x={CUT_X} y={14} to={[CUT_X, SHEET.y]} />
        <Mark n={3} x={12} y={AXIS_Y} to={[SHEET.x, AXIS_Y]} />
        <Mark n={2} x={END_X} y={H - 14} to={[END_X, SHEET.y + SHEET.h]} />
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

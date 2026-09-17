import { cn } from "@/lib/utils";

/**
 * The launcher regression as a drawn chart rather than a crop of the poster (design-spec §7.3
 * Results): axes, a fitted line from the equation the team published, and the equation labelled
 * on the line itself.
 *
 * One series, so there is no legend: the title names it. Trial points are only plotted if the
 * caller has them — no source publishes the 200+ trials, so by default the chart shows the fitted
 * line alone and the notes underneath say what the line is and where it comes from. Nothing here
 * invents a data point.
 */

export type Axis = {
  /** Drawn along the axis, e.g. "Shot distance (mm)". */
  label: string;
  min: number;
  max: number;
  /** Values to tick and number. Keep to three or four. */
  ticks: number[];
};

export type RegressionChartProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  x: Axis;
  y: Axis;
  /** The fitted line, and the equation as the source writes it. */
  line: { slope: number; intercept: number; label: string };
  /** Measured trials, when they exist. Omitted by default. */
  points?: Array<{ x: number; y: number }>;
  /** Lines of DOM text under the chart: what was measured, by whom, and the correlation. */
  notes?: string[];
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const W = 420;
const H = 300;
/** Left padding carries the axis title and the widest tick number side by side, not stacked. */
const PAD = { top: 18, right: 18, bottom: 54, left: 82 };
const PLOT = {
  x: PAD.left,
  y: PAD.top,
  w: W - PAD.left - PAD.right,
  h: H - PAD.top - PAD.bottom,
};
const LINE = "var(--muted)";
const SERIES = "var(--render-blue)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

export function RegressionChart({
  title,
  desc,
  x,
  y,
  line,
  points,
  notes,
  maxWidth = 520,
  id = "regression",
  className,
}: RegressionChartProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;
  const sx = (v: number) => PLOT.x + ((v - x.min) / (x.max - x.min)) * PLOT.w;
  const sy = (v: number) => PLOT.y + PLOT.h - ((v - y.min) / (y.max - y.min)) * PLOT.h;
  const fit = (v: number) => line.slope * v + line.intercept;
  // Clip the fitted line to the plotted range, so the chart never draws past what it claims.
  const ends = [x.min, x.max]
    .map((v) => ({ v, f: fit(v) }))
    .map(({ v, f }) => ({ v, f: Math.min(Math.max(f, y.min), y.max) }));
  const labelAt = ends[1];

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
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

        {/* Grid and axes stay recessive: the fitted line is the only thing with weight. */}
        {y.ticks.map((t) => (
          <path
            key={`gy-${t}`}
            d={`M${PLOT.x} ${sy(t)} L${PLOT.x + PLOT.w} ${sy(t)}`}
            stroke="var(--border)"
            {...HAIRLINE}
          />
        ))}
        <path
          d={`M${PLOT.x} ${PLOT.y} L${PLOT.x} ${PLOT.y + PLOT.h} L${PLOT.x + PLOT.w} ${PLOT.y + PLOT.h}`}
          stroke={LINE}
          {...HAIRLINE}
        />
        {x.ticks.map((t) => (
          <g key={`x-${t}`}>
            <path
              d={`M${sx(t)} ${PLOT.y + PLOT.h} L${sx(t)} ${PLOT.y + PLOT.h + 6}`}
              stroke={LINE}
              {...HAIRLINE}
            />
            <text
              x={sx(t)}
              y={PLOT.y + PLOT.h + 24}
              fill={LINE}
              fontSize={14}
              textAnchor="middle"
              stroke="none"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {t}
            </text>
          </g>
        ))}
        {y.ticks.map((t) => (
          <text
            key={`ty-${t}`}
            x={PLOT.x - 10}
            y={sy(t) + 5}
            fill={LINE}
            fontSize={14}
            textAnchor="end"
            stroke="none"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {t}
          </text>
        ))}

        {points?.map((p) => (
          <circle
            key={`${p.x}-${p.y}`}
            cx={sx(p.x)}
            cy={sy(p.y)}
            r={4}
            fill={SERIES}
            fillOpacity={0.55}
            stroke="var(--bg)"
            strokeWidth={2}
            {...HAIRLINE}
          />
        ))}

        <path
          d={`M${sx(ends[0].v)} ${sy(ends[0].f)} L${sx(ends[1].v)} ${sy(ends[1].f)}`}
          stroke={SERIES}
          strokeWidth={2}
          {...HAIRLINE}
        />
        <text
          x={sx(labelAt.v) - 8}
          y={sy(labelAt.f) + 22}
          fill="var(--ink)"
          fontSize={15}
          textAnchor="end"
          stroke="none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {line.label}
        </text>

        <text
          x={PLOT.x + PLOT.w}
          y={H - 8}
          fill={LINE}
          fontSize={14}
          textAnchor="end"
          stroke="none"
        >
          {x.label}
        </text>
        <text
          x={0}
          y={0}
          transform={`translate(15 ${PLOT.y + PLOT.h / 2}) rotate(-90)`}
          fill={LINE}
          fontSize={14}
          textAnchor="middle"
          stroke="none"
        >
          {y.label}
        </text>
      </svg>
      {notes?.length ? (
        <ul className="mt-4 type-caption">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default RegressionChart;

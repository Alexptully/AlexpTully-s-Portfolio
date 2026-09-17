import { cn } from "@/lib/utils";

/**
 * The CeraPiper stack as the README describes it (design-spec §7.4): the Onshape FeatureScript
 * design layer, the Python/Flask middleware that compiles the feature tree into an extrusion
 * sequence, the Arduino fabrication backend, and the printed paper blueprint as the one physical
 * layer. Geometry and hairlines only; every word is a prop, rendered as text in the DOM.
 *
 * The block heights are computed from the copy, so a layer can carry one detail line or three
 * without the caller touching the drawing.
 */

export type ArchitectureLayer = {
  /** What the layer is, e.g. "Design layer". */
  name: string;
  /** What it is built with, e.g. "Onshape, FeatureScript". */
  tech: string;
  /** Short detail lines. Lines are not wrapped for you: one string per drawn line. */
  lines?: string[];
  /** `physical` draws the layer on paper stock instead of as an outline. */
  kind?: "software" | "physical";
};

export type ArchitectureProps = {
  /** Accessible name of the figure. */
  title: string;
  /** The longer description an assistive technology reads after the name. */
  desc: string;
  layers: ArchitectureLayer[];
  /** What passes from one layer to the next. One fewer item than `layers`. */
  links: string[];
  maxWidth?: number;
  /** Prefix for the `<title>`/`<desc>` ids; change it if two of these share a page. */
  id?: string;
  className?: string;
};

const WIDTH = 360;
const INSET = 2;
const PAD_X = 20;
const GAP = 58;
const LINE = "var(--muted)";
const HAIRLINE = { vectorEffect: "non-scaling-stroke" } as const;

function blockHeight(layer: ArchitectureLayer): number {
  const detail = layer.lines?.length ?? 0;
  return 34 + 22 + (detail > 0 ? 20 + (detail - 1) * 18 : 0) + 20;
}

export function Architecture({
  title,
  desc,
  layers,
  links,
  maxWidth = 480,
  id = "architecture",
  className,
}: ArchitectureProps) {
  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  let y = INSET;
  const placed = layers.map((layer, i) => {
    const height = blockHeight(layer);
    const top = y;
    y += height + (i < layers.length - 1 ? GAP : 0);
    return { layer, top, height };
  });
  const height = y + INSET;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${height}`}
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
      className={cn("h-auto w-full", className)}
      style={{ maxWidth: `${maxWidth}px` }}
      fill="none"
      stroke={LINE}
      strokeWidth={1.25}
    >
      <title id={titleId}>{title}</title>
      <desc id={descId}>{desc}</desc>
      {placed.map(({ layer, top, height: h }, i) => {
        const paper = layer.kind === "physical";
        const ink = paper ? "var(--paper-ink)" : "var(--ink)";
        const quiet = paper ? "var(--paper-ink)" : LINE;
        const techY = top + 34 + 22;
        return (
          <g key={layer.name}>
            <rect
              x={INSET}
              y={top}
              width={WIDTH - INSET * 2}
              height={h}
              fill={paper ? "var(--paper)" : "none"}
              stroke={paper ? "var(--paper-ink)" : LINE}
              {...HAIRLINE}
            />
            <text x={PAD_X} y={top + 34} fill={ink} fontSize={18} fontWeight={500} stroke="none">
              {layer.name}
            </text>
            <text
              x={PAD_X}
              y={techY}
              fill={quiet}
              fillOpacity={paper ? 0.75 : 1}
              fontSize={15}
              stroke="none"
            >
              {layer.tech}
            </text>
            {layer.lines?.map((line, j) => (
              <text
                key={line}
                x={PAD_X}
                y={techY + 20 + j * 18}
                fill={quiet}
                fillOpacity={paper ? 0.75 : 1}
                fontSize={14}
                stroke="none"
              >
                {line}
              </text>
            ))}
            {i < placed.length - 1 ? (
              <g>
                <path
                  d={`M${PAD_X + 10} ${top + h} L${PAD_X + 10} ${top + h + GAP - 9}`}
                  {...HAIRLINE}
                />
                <path
                  d={`M${PAD_X + 4.5} ${top + h + GAP - 9} L${PAD_X + 15.5} ${top + h + GAP - 9} L${PAD_X + 10} ${top + h + GAP} Z`}
                  fill={LINE}
                  stroke="none"
                />
                <text
                  x={PAD_X + 26}
                  y={top + h + GAP / 2 + 5}
                  fill={LINE}
                  fontSize={14}
                  stroke="none"
                >
                  {links[i]}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

export default Architecture;

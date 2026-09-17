import type { Stat as StatData } from "@/content/types";
import { site } from "@/content/site";

type FootnoteRefProps = {
  /** 1-based position of the source in the page's Sources list. */
  index: number;
  /**
   * Give the marker `id="ref-N"` so the Sources item can link back to it. Pass `false`
   * when the same source is cited a second time on one page, so ids stay unique.
   */
  backlink?: boolean;
};

/**
 * Superscript footnote marker: `<sup><a href="#src-N" aria-describedby="src-N">N</a></sup>`
 * (design-spec §14). Used on its own after a sentence, and by `Stat` after a figure.
 */
export function FootnoteRef({ index, backlink = true }: FootnoteRefProps) {
  const target = `src-${index}`;
  return (
    <sup>
      <a
        href={`#${target}`}
        id={backlink ? `ref-${index}` : undefined}
        aria-describedby={target}
        className="footnote-mark"
      >
        {index}
      </a>
    </sup>
  );
}

type StatProps = {
  stat: StatData;
  /** 1-based position of `stat.source` in the page's Sources list. */
  index: number;
  backlink?: boolean;
  className?: string;
};

/**
 * Prints `value unit` in tabular figures, then the footnote marker, and appends
 * "(team measurement)" when the figure is an internal team number (design-spec §4.3).
 * A `Stat` cannot be rendered without a source, because the type has none without one.
 */
export function Stat({ stat, index, backlink, className }: StatProps) {
  return (
    <span className={className}>
      <span className="tabular-nums">
        {stat.value}
        {stat.unit ? ` ${stat.unit}` : ""}
      </span>
      <FootnoteRef index={index} backlink={backlink} />
      {stat.attribution === "team" ? ` ${site.labels.teamMeasurement}` : null}
    </span>
  );
}

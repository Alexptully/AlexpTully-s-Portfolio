import type { CSSProperties } from "react";
import type { Source } from "@/content/types";
import { FootnoteRef } from "@/components/content/Stat";
import { cn } from "@/lib/utils";

export type TimelineRowData = {
  /** Exactly as the source prints it: "Summer 2024", "7 June 2023", "2021–2022". */
  when: string;
  what: string;
  source: Source;
};

type TimelineProps = {
  rows: TimelineRowData[];
  /**
   * The page's Sources list. When given, a row whose source is in it (by reference) gets a
   * footnote marker. Markers here never carry a backlink id, so a `Stat` citing the same
   * source elsewhere on the page keeps `ref-N` unique.
   */
  sources?: Source[];
  /** Width of the term column at `sm`+, any CSS length. "7ch" for dates, wider for seasons. */
  termWidth?: string;
  className?: string;
};

/**
 * A dated list as a real `<dl>` (design-spec §5.4, §8.2): hairlines between rows, the term
 * in muted 15 px, the description in ink 18 px, tabular numerals throughout. Terms stack
 * above descriptions on phone and sit in their own column from `sm`.
 */
export function Timeline({ rows, sources, termWidth = "9rem", className }: TimelineProps) {
  return (
    <dl
      className={cn("divide-y divide-border border-y border-border", className)}
      style={{ "--term-w": termWidth } as CSSProperties}
    >
      {rows.map((row, i) => {
        const n = sources ? sources.indexOf(row.source) + 1 : 0;
        return (
          <div
            key={`${row.when}-${i}`}
            className="grid gap-x-5 gap-y-1 py-4 sm:grid-cols-[var(--term-w)_minmax(0,1fr)]"
          >
            <dt className="type-caption tabular-nums">{row.when}</dt>
            <dd className="type-value max-w-[40rem]">
              {row.what}
              {n > 0 ? <FootnoteRef index={n} backlink={false} /> : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

import type { Source, Version } from "@/content/types";
import { site } from "@/content/site";
import { Stat } from "@/components/content/Stat";
import { Tile, type Cite } from "@/components/work/Figure";
import { cn } from "@/lib/utils";

type VersionLedgerProps = {
  /** The table's `<caption>`, read by assistive technology; the visible heading sits above. */
  caption: string;
  rows: Version[];
  /** One line under the table, e.g. which rows predate the internship. */
  note?: string;
  cite: Cite;
  /** Prefix that keeps `#ref-N` owners unique when a page has more than one ledger. */
  citeKey?: string;
  className?: string;
};

/** Value plus unit when the measurement's source is not in the page's list (never expected). */
function PlainMeasurement({ value, unit, source }: { value: string; unit?: string; source: Source }) {
  return (
    <span>
      <span className="tabular-nums">
        {value}
        {unit ? ` ${unit}` : ""}
      </span>
      <span className="type-footnote"> ({source.name})</span>
    </span>
  );
}

/**
 * The versions ledger (design-spec §6.5, §13): one real `<table>` with a `<caption>`. At `lg`+
 * it lays out as a table (version · tile · what changed · measurement · date); below `lg` the
 * same elements reflow into a stacked grid per row, so nothing is duplicated in the DOM and
 * every footnote anchor stays unique. Tiles are 160 px squares on their ground, 104 px on
 * phones. Every measurement is a `Stat` with its footnote; dates print exactly as the source
 * does, or "date not recorded".
 *
 * The switch is at `lg`, not `md`: at 768 the five columns leave the sentence 187 px and the
 * measurement 128 px, so the prose wraps to eight lines beside two near-empty columns. The
 * stacked layout holds until there is room for all five.
 */
export function VersionLedger({ caption, rows, note, cite, citeKey = "ver", className }: VersionLedgerProps) {
  const { labels } = site;
  const cell = "align-top max-lg:block max-lg:py-0 lg:py-5 lg:pr-5";
  /** A ledger with no tiles at all (CeraPiper) drops the column instead of leaving it blank. */
  const hasTiles = rows.some((row) => row.tile);
  return (
    <div className={className}>
      <table className="w-full border-collapse max-lg:block">
        <caption className="sr-only">{caption}</caption>
        <thead className="max-lg:sr-only">
          <tr>
            <th scope="col" className="type-caption pb-3 pr-5 text-left font-normal">
              {labels.versionTag}
            </th>
            {hasTiles ? (
              <th scope="col" className="type-caption pb-3 pr-5 text-left font-normal">
                {labels.versionTile}
              </th>
            ) : null}
            <th scope="col" className="type-caption pb-3 pr-5 text-left font-normal">
              {labels.versionChange}
            </th>
            <th scope="col" className="type-caption pb-3 pr-5 text-left font-normal">
              {labels.versionMeasurement}
            </th>
            <th scope="col" className="type-caption pb-3 text-left font-normal">
              {labels.versionDate}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border border-y border-border max-lg:block">
          {rows.map((row) => {
            const measurement = row.measurement;
            /*
             * A row without a tile lays out as a single explicit column, so its cells must
             * start in column 1. Asking for `col-start-2` there put the content in a phantom
             * implicit second column whose width followed the text, which indented some rows
             * past the page gutter and left them ragged against each other.
             */
            const col = row.tile ? "max-lg:col-start-2" : "max-lg:col-start-1";
            const citation = measurement ? cite(measurement.source, `${citeKey}:${row.tag}`) : null;
            return (
              <tr
                key={row.tag}
                className={cn(
                  "max-lg:grid max-lg:gap-x-4 max-lg:gap-y-1 max-lg:py-4",
                  row.tile ? "max-lg:grid-cols-[104px_minmax(0,1fr)]" : "max-lg:grid-cols-1",
                )}
              >
                <th
                  scope="row"
                  className={cn("type-value w-[7ch] text-left font-normal max-lg:w-auto", col, cell)}
                >
                  {row.tag}
                </th>
                {hasTiles ? (
                  <td className={cn("w-40 max-lg:col-start-1 max-lg:row-span-4 max-lg:row-start-1", cell)}>
                    {row.tile ? <Tile image={row.tile} /> : null}
                  </td>
                ) : null}
                <td className={cn("type-value max-w-[34rem]", col, cell)}>{row.sentence}</td>
                <td className={cn("type-value", col, cell)}>
                  {measurement && citation ? (
                    citation.index > 0 ? (
                      <Stat stat={measurement} index={citation.index} backlink={citation.backlink} />
                    ) : (
                      <PlainMeasurement value={measurement.value} unit={measurement.unit} source={measurement.source} />
                    )
                  ) : (
                    <span aria-hidden="true">—</span>
                  )}
                </td>
                <td className={cn("type-caption whitespace-nowrap lg:pr-0", col, cell)}>
                  {row.date ? <time>{row.date}</time> : labels.dateNotRecorded}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {note ? <p className="type-caption mt-3 max-w-[60ch]">{note}</p> : null}
    </div>
  );
}

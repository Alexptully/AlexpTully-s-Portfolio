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
 * The versions ledger (design-spec §6.5, §13): one real `<table>` with a `<caption>`. At `md`+
 * it lays out as a table (version · tile · what changed · measurement · date); below `md` the
 * same elements reflow into a stacked grid per row, so nothing is duplicated in the DOM and
 * every footnote anchor stays unique. Tiles are 160 px squares on their ground, 104 px on
 * phones. Every measurement is a `Stat` with its footnote; dates print exactly as the source
 * does, or "date not recorded".
 */
export function VersionLedger({ caption, rows, note, cite, citeKey = "ver", className }: VersionLedgerProps) {
  const { labels } = site;
  const cell = "align-top max-md:block max-md:py-0 md:py-5 md:pr-5";
  /** A ledger with no tiles at all (CeraPiper) drops the column instead of leaving it blank. */
  const hasTiles = rows.some((row) => row.tile);
  return (
    <div className={className}>
      <table className="w-full border-collapse max-md:block">
        <caption className="sr-only">{caption}</caption>
        <thead className="max-md:sr-only">
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
        <tbody className="divide-y divide-border border-y border-border max-md:block">
          {rows.map((row) => {
            const measurement = row.measurement;
            const citation = measurement ? cite(measurement.source, `${citeKey}:${row.tag}`) : null;
            return (
              <tr
                key={row.tag}
                className={cn(
                  "max-md:grid max-md:gap-x-4 max-md:gap-y-1 max-md:py-4",
                  row.tile ? "max-md:grid-cols-[104px_1fr]" : "max-md:grid-cols-1",
                )}
              >
                <th
                  scope="row"
                  className={cn("type-value w-[7ch] text-left font-normal max-md:col-start-2 max-md:w-auto", cell)}
                >
                  {row.tag}
                </th>
                {hasTiles ? (
                  <td className={cn("w-40 max-md:col-start-1 max-md:row-span-4 max-md:row-start-1", cell)}>
                    {row.tile ? <Tile image={row.tile} /> : null}
                  </td>
                ) : null}
                <td className={cn("type-value max-w-[34rem] max-md:col-start-2", cell)}>{row.sentence}</td>
                <td className={cn("type-value max-md:col-start-2", cell)}>
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
                <td className={cn("type-caption whitespace-nowrap max-md:col-start-2 md:pr-0", cell)}>
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

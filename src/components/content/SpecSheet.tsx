import type { ReactNode } from "react";
import type { SpecRow } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type SpecSheetProps = {
  rows: SpecRow[];
  /**
   * Renders a row's value; the case study passes a renderer that turns the superscript digits
   * in the copy into footnote links. Defaults to the plain string.
   */
  renderValue?: (row: SpecRow, index: number) => ReactNode;
  className?: string;
};

/**
 * The spec sheet (design-spec §6.2): a real `<dl>`, terms muted 15 px, values ink 18 px with
 * tabular numerals, the "My role" value at weight 500. Two columns (4 / 8) at `md`+, stacked
 * below, a hairline between rows. Rows arrive in the fixed order and already omit anything
 * without a sourced value.
 */
export function SpecSheet({ rows, renderValue, className }: SpecSheetProps) {
  return (
    <dl className={cn("divide-y divide-border border-y border-border", className)}>
      {rows.map((row, i) => {
        const isRole = row.term === site.labels.role;
        return (
          <div key={row.term} className="grid gap-1 py-4 md:grid-cols-12 md:gap-x-5 md:py-5">
            <dt className="type-caption md:col-span-4">{row.term}</dt>
            <dd className={cn(isRole ? "type-role" : "type-value", "md:col-span-8")}>
              {renderValue ? renderValue(row, i) : row.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

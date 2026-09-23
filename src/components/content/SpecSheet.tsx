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
    <dl
      className={cn(
        "grid overflow-hidden rounded-plate border border-border bg-[linear-gradient(180deg,color-mix(in_oklch,var(--surface)_70%,transparent),transparent)] md:grid-cols-2",
        className,
      )}
    >
      {rows.map((row, i) => {
        const isRole = row.term === site.labels.role;
        return (
          <div
            key={row.term}
            className={cn(
              "flex flex-col gap-2 border-border px-5 py-5 md:px-6",
              // Title-block cells: hairlines between every cell, the role across the full width.
              i > 0 && "border-t",
              isRole ? "md:col-span-2" : "md:[&:nth-child(odd)]:border-l",
            )}
          >
            <dt className="type-label flex items-center gap-2">
              {isRole ? <span aria-hidden="true" className="led" /> : null}
              {row.term}
            </dt>
            <dd className={cn(isRole ? "type-role text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] tracking-[-0.01em]" : "type-value")}>
              {renderValue ? renderValue(row, i) : row.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

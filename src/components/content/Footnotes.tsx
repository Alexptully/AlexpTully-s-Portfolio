import { Fragment, type ReactNode } from "react";
import { FootnoteRef } from "@/components/content/Stat";

/**
 * The one footnote splitter (design-spec §4.3, `src/content/types.ts`).
 *
 * Superscript digits written inside a copy string are 1-based indices into that page's
 * `sources` array. A run of superscript characters is one index, so `¹⁰` is ten, not one
 * and zero. Two markers that sit side by side are written with a comma between them —
 * `⁹,¹⁰,¹¹` — because "9" and "10" printed flush read as "910"; the comma is a separator,
 * not text, and the renderer prints its own between the markers instead.
 *
 * Both the about page and the case-study template split prose with this; nothing else does.
 */

const SUPERSCRIPT: Record<string, number> = {
  "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9,
};

export type FootnotePart = string | number;

export function splitFootnotes(text: string): FootnotePart[] {
  const chars = Array.from(text);
  const parts: FootnotePart[] = [];
  let buffer = "";
  let digits = "";
  const flush = () => {
    if (!digits) return;
    if (buffer) parts.push(buffer);
    buffer = "";
    parts.push(Number(digits));
    digits = "";
  };
  chars.forEach((ch, i) => {
    if (SUPERSCRIPT[ch] !== undefined) {
      digits += SUPERSCRIPT[ch];
      return;
    }
    // A comma between two markers separates them; it is never printed.
    if (ch === "," && digits && SUPERSCRIPT[chars[i + 1] ?? ""] !== undefined) {
      flush();
      return;
    }
    flush();
    buffer += ch;
  });
  flush();
  if (buffer) parts.push(buffer);
  return parts;
}

/**
 * Two markers set flush read as one number, so a run is separated the way a printed
 * footnote run is: a comma and a hair space, at the marker's own size.
 */
export function MarkerSeparator(): ReactNode {
  return <sup className="align-super text-[0.7em] leading-[0] text-ink">,&#8201;</sup>;
}

/**
 * A run of copy with its superscript markers rendered as footnote links. `owners` maps a
 * footnote number to the key of the marker that owns its `#ref-N` anchor, so a source cited
 * twice on one page still has exactly one back-link target.
 */
export function ProseFootnotes({
  text,
  ownerKey,
  owners,
}: {
  text: string;
  ownerKey: string;
  owners: Map<number, string>;
}): ReactNode {
  const parts = splitFootnotes(text);
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "number" ? (
          <Fragment key={`${ownerKey}#${i}`}>
            {typeof parts[i - 1] === "number" ? <MarkerSeparator /> : null}
            <FootnoteRef index={part} backlink={owners.get(part) === `${ownerKey}#${i}`} />
          </Fragment>
        ) : (
          part
        ),
      )}
    </>
  );
}

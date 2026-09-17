import { Fragment } from "react";
import { FootnoteRef } from "@/components/content/Stat";

/**
 * Footnote plumbing for the about page (design-spec §14, `src/content/types.ts`).
 *
 * Superscript digits written inside the copy in `about.ts` are 1-based indices into
 * `about.sources`. A block may also carry `extra` indices: sources whose claim a sentence
 * makes without the copy printing a marker for it. The first marker of an index on the page
 * owns `id="ref-N"`, so the Sources list's "Back to text" link always lands somewhere and
 * no id is emitted twice.
 */

/** One run of prose that may carry footnote markers. */
export type FootnoteBlock = {
  /** Unique within the page; identifies the marker that owns the back-link anchor. */
  key: string;
  text: string;
  /** Indices appended after the text, for a claim the copy does not mark itself. */
  extra?: number[];
};

export type FootnoteOwners = Map<number, string>;

const SUPERSCRIPT: Record<string, number> = {
  "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9,
};

type Part = string | number;

/** Splits prose at its superscript digits; a run of them becomes one footnote index. */
export function splitFootnotes(text: string): Part[] {
  const parts: Part[] = [];
  let buffer = "";
  let digits = "";
  const flush = () => {
    if (!digits) return;
    if (buffer) parts.push(buffer);
    buffer = "";
    parts.push(Number(digits));
    digits = "";
  };
  for (const ch of text) {
    const digit = SUPERSCRIPT[ch];
    if (digit !== undefined) {
      digits += digit;
    } else {
      flush();
      buffer += ch;
    }
  }
  flush();
  if (buffer) parts.push(buffer);
  return parts;
}

/** Every marker a block renders, in order, with the position that identifies it. */
function markersOf(block: FootnoteBlock): Array<{ index: number; at: string }> {
  const out: Array<{ index: number; at: string }> = [];
  splitFootnotes(block.text).forEach((part, i) => {
    if (typeof part === "number" && part > 0) out.push({ index: part, at: `${block.key}#${i}` });
  });
  (block.extra ?? []).forEach((index, j) => {
    if (index > 0) out.push({ index, at: `${block.key}#x${j}` });
  });
  return out;
}

/** The first marker of each index, in render order, owns that index's back-link anchor. */
export function footnoteOwners(blocks: FootnoteBlock[]): FootnoteOwners {
  const owners: FootnoteOwners = new Map();
  for (const block of blocks) {
    for (const { index, at } of markersOf(block)) {
      if (!owners.has(index)) owners.set(index, at);
    }
  }
  return owners;
}

/**
 * Two markers set side by side read as one number ("9" and "10" become "910"), so a run of
 * them is separated the way a printed footnote run is: a comma and a hair space, at the
 * marker's own size.
 */
function MarkerSeparator() {
  return <sup className="align-super text-[0.7em] leading-[0] text-ink">,&#8201;</sup>;
}

/** Renders one block's text with its markers inline, then any `extra` markers after it. */
export function Footnoted({ block, owners }: { block: FootnoteBlock; owners: FootnoteOwners }) {
  const parts = splitFootnotes(block.text);
  const extra = (block.extra ?? []).filter((index) => index > 0);
  const endsOnMarker = typeof parts.at(-1) === "number";
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "number" ? (
          part > 0 ? (
            <FootnoteRef
              key={`${block.key}#${i}`}
              index={part}
              backlink={owners.get(part) === `${block.key}#${i}`}
            />
          ) : null
        ) : (
          <Fragment key={`${block.key}#${i}`}>{part}</Fragment>
        ),
      )}
      {extra.map((index, j) => (
        <Fragment key={`${block.key}#x${j}`}>
          {j > 0 || endsOnMarker ? <MarkerSeparator /> : null}
          <FootnoteRef index={index} backlink={owners.get(index) === `${block.key}#x${j}`} />
        </Fragment>
      ))}
    </>
  );
}

/**
 * Anchors for sources whose only citation is a list that prints its source as text (the
 * timeline's markers carry no id, the awards records name their source in words). Each
 * anchor sits at the top of the section that makes the claim, so "Back to text" lands on
 * the list the reader needs rather than nowhere.
 */
export function BacklinkAnchors({ indices }: { indices: number[] }) {
  if (indices.length === 0) return null;
  return (
    <>
      {indices.map((n) => (
        <span key={n} id={`ref-${n}`} className="sr-only" />
      ))}
    </>
  );
}

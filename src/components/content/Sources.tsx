import type { Source } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type SourcesProps = {
  sources: Source[];
  /** Heading level: h2 inside a page body, h3 inside the footer. */
  as?: "h2" | "h3";
  heading?: string;
  /**
   * The 1-based source numbers that have a `ref-N` anchor on the page. When given, the
   * "Back to text" link renders only for those, so it can never point at nothing. Omit it
   * and every item links back, which is right when the page marks every source in prose.
   */
  backlinks?: Iterable<number>;
  id?: string;
  className?: string;
};

/** Hostname shown after a public link so the reader sees where it goes. */
function hostOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return href;
  }
}

/**
 * The page's numbered Sources list (design-spec §5.6, §14). Item N has `id="src-N"` so a
 * `FootnoteRef` can point at it with `href="#src-N"` and `aria-describedby="src-N"`, and
 * each item links back to its marker at `#ref-N` — but only when that anchor exists, which
 * `backlinks` decides. A public `href` renders as a link; an internal `path` renders the
 * document name as text.
 */
export function Sources({
  sources,
  as: Heading = "h2",
  heading = site.footer.sourcesHeading,
  backlinks,
  id = "sources",
  className,
}: SourcesProps) {
  if (sources.length === 0) return null;
  const headingId = `${id}-heading`;
  const anchored = backlinks ? new Set(backlinks) : null;
  /** The page-body list (h2) takes the two-column rule; the footer's h3 variant does not. */
  const page = Heading === "h2";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(page && "lg:grid lg:grid-cols-12 lg:gap-x-5", className)}
    >
      <Heading
        id={headingId}
        className={cn(page ? "type-title lg:col-span-5" : "type-heading")}
      >
        {heading}
      </Heading>
      {/* Columns 6-12 at `lg`, so the numbered list fills the half of the rule the heading
          leaves empty rather than stacking under it in a narrow column (§5.6). Inside the
          footer's own right column the list just follows its h3. */}
      <ol
        className={cn(
          "type-footnote mt-6 list-none space-y-3",
          page && "lg:col-span-7 lg:mt-2",
        )}
      >
        {sources.map((source, i) => {
          const n = i + 1;
          return (
            <li key={`${n}-${source.name}`} id={`src-${n}`} className="flex gap-3">
              <span className="w-[2ch] shrink-0 text-right">{n}</span>
              <p className="max-w-[60ch]">
                {source.claim ? <span>{source.claim}: </span> : null}
                {source.href ? (
                  <>
                    <a href={source.href} rel="noopener" className="link text-ink">
                      {source.name}
                    </a>
                    <span> ({hostOf(source.href)})</span>
                  </>
                ) : (
                  <span className="text-ink">{source.name}</span>
                )}
                {/* The note strings end in a full stop of their own; the template adds the
                    list item's single terminator, so a trailing one is dropped first. */}
                {source.note ? <span>; {source.note.replace(/\.$/, "")}</span> : null}.
                {!anchored || anchored.has(n) ? (
                  <>
                    {" "}
                    {/* `link`, not `link-quiet`: the back-link is the only route from a
                        source to the sentence that cites it, so it carries the site's
                        underline at rest. `inline-block py-1` lifts the box past 24 px. */}
                    <a href={`#ref-${n}`} className="link inline-block py-1 whitespace-nowrap">
                      {site.labels.backToText}
                    </a>
                  </>
                ) : null}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

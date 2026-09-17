import type { Source } from "@/content/types";
import { site } from "@/content/site";

type SourcesProps = {
  sources: Source[];
  /** Heading level: h2 inside a page body, h3 inside the footer. */
  as?: "h2" | "h3";
  heading?: string;
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
 * each item links back to its marker at `#ref-N`. A public `href` renders as a link; an
 * internal `path` renders the document name as text.
 */
export function Sources({
  sources,
  as: Heading = "h2",
  heading = site.footer.sourcesHeading,
  id = "sources",
  className,
}: SourcesProps) {
  if (sources.length === 0) return null;
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <Heading id={headingId} className={Heading === "h2" ? "type-title" : "type-heading"}>
        {heading}
      </Heading>
      <ol className="type-footnote mt-6 list-none space-y-3">
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
                {source.note ? <span>; {source.note}</span> : null}.{" "}
                <a href={`#ref-${n}`} className="link-quiet whitespace-nowrap">
                  Back to text
                </a>
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

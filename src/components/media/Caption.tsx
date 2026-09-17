import type { Source } from "@/content/types";
import { cn } from "@/lib/utils";

type CaptionProps = {
  /** The lab-note sentence: what, when, how it was shot. */
  text: string;
  /** Exactly as the source prints it; rendered only when the text does not already say it. */
  date?: string;
  /** Omitted only for a drawing of the site's own (the pin model), which cites no document. */
  source?: Source;
  className?: string;
};

/**
 * The caption under every plate and tile (design-spec §1.4 graft 6, §3.3): the sentence at
 * 15 px muted, then the source line 4 px below at 14 px quiet. A public source links; an
 * internal document prints its title. Renders as `<figcaption>`, so it sits inside a `<figure>`.
 */
export function Caption({ text, date, source, className }: CaptionProps) {
  const showDate = date && !text.includes(date);
  return (
    <figcaption className={cn("mt-3 max-w-[60ch]", className)}>
      <p className="type-caption">
        {text}
        {showDate ? (
          <>
            {" "}
            <time>{date}</time>.
          </>
        ) : null}
      </p>
      {source ? (
        <p className="type-footnote mt-1">
          Source:{" "}
          {source.href ? (
            <a href={source.href} rel="noopener" className="link">
              {source.name}
            </a>
          ) : (
            <span>{source.name}</span>
          )}
        </p>
      ) : null}
    </figcaption>
  );
}

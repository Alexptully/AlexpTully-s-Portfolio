import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
};

/**
 * `ALEX` set heavy and condensed, then `tully` in italic with its `t` in a pink box
 * (redesign-spec §2). Decorative lettering: callers supply the accessible name.
 */
export function Wordmark({ className }: WordmarkProps) {
  return (
    <span aria-hidden="true" className={cn("wordmark", className)}>
      <span className="wordmark__first">Alex</span>
      <span className="wordmark__box">t</span>
      <span className="wordmark__rest">ully</span>
    </span>
  );
}

import type { Award } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type AwardsListProps = {
  awards: Award[] | "none";
  className?: string;
};

/** The record's second line: robot and team, role, and when, only where the source gives them. */
function detail(award: Award) {
  const where = [award.robot, award.team].filter(Boolean).join(", ");
  return [where, award.role, award.when].filter(Boolean).join(" · ");
}

/**
 * Awards as records, never as a trophy row (design-spec §6.6, §7.3): what, on which robot,
 * with which team, in which role, when the source says, and the source itself. "None." is
 * printed where the content declares it, so the absence is a statement too.
 */
export function AwardsList({ awards, className }: AwardsListProps) {
  if (awards === "none") {
    return <p className={cn("type-value", className)}>{site.labels.awardsNone}</p>;
  }
  return (
    <ul className={cn("divide-y divide-border border-y border-border", className)}>
      {awards.map((award, i) => {
        const line = detail(award);
        return (
          <li key={`${award.name}-${i}`} className="grid gap-x-5 gap-y-1 py-3 md:grid-cols-12">
            <span className="type-value md:col-span-5">{award.name}</span>
            {line ? <span className="type-caption md:col-span-4">{line}</span> : null}
            <span className={cn("type-footnote", line ? "md:col-span-3" : "md:col-span-7")}>
              {award.source.href ? (
                <a href={award.source.href} rel="noopener" className="link">
                  {award.source.name}
                </a>
              ) : (
                award.source.name
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

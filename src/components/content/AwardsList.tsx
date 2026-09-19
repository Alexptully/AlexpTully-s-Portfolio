import type { Award, Source } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type AwardsListProps = {
  awards: Award[] | "none";
  /**
   * `"collapse"` lifts an attribution every row shares — robot, team, role, and the source —
   * into one muted line above the list, so a robot's own award list does not print the same
   * "Monti, #17253 · Captain" and the same source seven times. The page-level table keeps
   * `"rows"`, where each record really does name a different robot.
   */
  attribution?: "rows" | "collapse";
  className?: string;
};

/** The record's second line: robot and team, role, and when, only where the source gives them. */
function detail(award: Award, omit: { where?: boolean; role?: boolean }) {
  const where = omit.where ? "" : [award.robot, award.team].filter(Boolean).join(", ");
  return [where, omit.role ? "" : award.role, award.when].filter(Boolean).join(" · ");
}

function SourceName({ source }: { source: Source }) {
  return source.href ? (
    <a href={source.href} rel="noopener" className="link">
      {source.name}
    </a>
  ) : (
    <>{source.name}</>
  );
}

/** True when every award agrees on the value `pick` reads. */
function shared<T>(awards: Award[], pick: (award: Award) => T): T | null {
  const first = pick(awards[0]);
  if (first === undefined || first === null || first === "") return null;
  return awards.every((award) => pick(award) === first) ? first : null;
}

/**
 * Awards as records, never as a trophy row (design-spec §6.6, §7.3): what, on which robot,
 * with which team, in which role, when the source says, and the source itself. "None." is
 * printed where the content declares it, so the absence is a statement too.
 */
export function AwardsList({ awards, attribution = "rows", className }: AwardsListProps) {
  if (awards === "none") {
    return <p className={cn("type-value", className)}>{site.labels.awardsNone}</p>;
  }

  const collapse = attribution === "collapse" && awards.length > 1;
  const where = collapse
    ? shared(awards, (a) => [a.robot, a.team].filter(Boolean).join(", "))
    : null;
  const role = collapse ? shared(awards, (a) => a.role) : null;
  const source = collapse ? shared(awards, (a) => a.source) : null;
  const lead = [where, role].filter(Boolean).join(" · ");

  return (
    <div className={className}>
      {lead || source ? (
        <p className="type-footnote mb-3">
          {lead}
          {lead && source ? " — " : null}
          {source ? <SourceName source={source} /> : null}
        </p>
      ) : null}
      <ul className="divide-y divide-border border-y border-border">
        {awards.map((award, i) => {
          const line = detail(award, { where: Boolean(where), role: Boolean(role) });
          const showSource = !source;
          return (
            <li key={`${award.name}-${i}`} className="grid gap-x-5 gap-y-1 py-3 md:grid-cols-12">
              <span className={cn("type-value", showSource || line ? "md:col-span-5" : "md:col-span-12")}>
                {award.name}
              </span>
              {line ? <span className="type-caption md:col-span-4">{line}</span> : null}
              {showSource ? (
                <span className={cn("type-footnote", line ? "md:col-span-3" : "md:col-span-7")}>
                  <SourceName source={award.source} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

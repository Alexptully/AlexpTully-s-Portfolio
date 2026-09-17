import type { Stat as StatData } from "@/content/types";
import { site } from "@/content/site";
import { Stat } from "@/components/content/Stat";
import { cn } from "@/lib/utils";

type MiniSpecProps = {
  role: string;
  proof: StatData;
  /** 1-based position of `proof.source` in the page's Sources list. */
  footnote: number;
  className?: string;
};

/**
 * The two-row spec sheet under a lineup title (design-spec §5.3): "My role" and "Proof", a real
 * `<dl>` with hairline rows, labels muted 15 px above values ink 18 px, the role at weight 500.
 * The footnote marker is positioned so it stays clickable above the row's stretched link.
 */
export function MiniSpec({ role, proof, footnote, className }: MiniSpecProps) {
  return (
    <dl className={cn("divide-y divide-border border-y border-border", className)}>
      <div className="py-4">
        <dt className="type-caption">{site.labels.role}</dt>
        <dd className="type-role mt-1 max-w-[40rem]">{role}</dd>
      </div>
      <div className="py-4">
        <dt className="type-caption">{site.labels.proof}</dt>
        <dd className="type-value mt-1 max-w-[40rem] [&_sup]:relative">
          <Stat stat={proof} index={footnote} />
        </dd>
      </div>
    </dl>
  );
}

import { cn } from "@/lib/utils";

type ListSpec = { heading: string; items: string[] };

type TwoListsProps = {
  left: ListSpec;
  right: ListSpec;
  className?: string;
};

function List({ heading, items, className }: ListSpec & { className?: string }) {
  return (
    <div className={className}>
      <h3 className="type-heading">{heading}</h3>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item} className="type-body max-w-[34rem] py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * "What I did" beside "What others did" (design-spec §6.7): two `<ul>` side by side at `md`+
 * with a hairline between, stacked below. Roles are named, never teammates.
 */
export function TwoLists({ left, right, className }: TwoListsProps) {
  return (
    <div className={cn("grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border", className)}>
      <List {...left} className="md:pr-10" />
      <List {...right} className="md:pl-10" />
    </div>
  );
}

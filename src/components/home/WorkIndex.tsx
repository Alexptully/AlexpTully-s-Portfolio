import type { HomeIndexEntry } from "@/content/types";

type WorkIndexProps = {
  label: string;
  items: HomeIndexEntry[];
  className?: string;
};

/**
 * The hero's four-line index of the featured work (design-spec §5.2): a `<nav>` of anchors to
 * the lineup rows, hairlines between rows, the title in ink 18 px/500 and the description in
 * muted 15 px. The whole row is the link; hover and focus underline the title.
 */
export function WorkIndex({ label, items, className }: WorkIndexProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="group flex flex-col gap-y-0.5 py-3">
              <span className="text-[18px] font-medium leading-snug text-ink underline decoration-1 decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-ink group-focus-visible:decoration-ink">
                {item.title}
              </span>
              <span className="type-caption">{item.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

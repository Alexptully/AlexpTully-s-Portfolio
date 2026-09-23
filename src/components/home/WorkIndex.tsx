import type { HomeIndexEntry } from "@/content/types";

type WorkIndexProps = {
  label: string;
  items: HomeIndexEntry[];
  className?: string;
};

/**
 * The hero's index of the featured work: numbered like parts on a drawing, hairlines between
 * rows, the title in ink and the description in muted. The whole row is the link.
 */
export function WorkIndex({ label, items, className }: WorkIndexProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="border-t border-border">
        {items.map((item, i) => (
          <li key={item.href} className="border-b border-border">
            <a
              href={item.href}
              className="group grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-2 py-3.5"
            >
              <span className="type-label text-quiet transition-colors duration-150 group-hover:text-accent group-focus-visible:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-[17px] leading-snug font-medium text-ink">{item.title}</span>
                <span className="type-caption text-[14px]">{item.description}</span>
              </span>
              <span
                aria-hidden="true"
                className="type-label translate-x-[-4px] opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                ↓
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

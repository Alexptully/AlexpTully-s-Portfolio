import type { ContactSheetItem } from "@/content/types";
import { Tile } from "@/components/work/Figure";
import { cn } from "@/lib/utils";

type ContactSheetProps = {
  tiles: ContactSheetItem[];
  className?: string;
};

/**
 * The photographed build order as a contact sheet (design-spec §7.1, §13): square tiles on
 * their ground, `repeat(auto-fill, 160px)` at `md`+ and three per row below, each with a
 * lab-note label, the date where the photograph has one, and its source. Uncleared
 * photographs are left out; the content file says which and why.
 */
export function ContactSheet({ tiles, className }: ContactSheetProps) {
  const shown = tiles.filter((tile) => tile.image.cleared);
  if (shown.length === 0) return null;
  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-x-4 gap-y-6 md:grid-cols-[repeat(auto-fill,160px)] md:gap-x-6 md:gap-y-8",
        className,
      )}
    >
      {shown.map(({ label, image }) => (
        <li key={image.id}>
          <figure>
            <Tile image={image} size="sheet" />
            <figcaption className="mt-2">
              <p className="type-caption">
                {label}
                {image.date && !label.includes(image.date) ? (
                  <>
                    , <time>{image.date}</time>
                  </>
                ) : null}
              </p>
              <p className="type-footnote mt-1">{image.source.name}</p>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

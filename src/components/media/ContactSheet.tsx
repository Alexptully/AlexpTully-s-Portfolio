import type { ContactSheetItem, ImageGround } from "@/content/types";
import { Tile } from "@/components/work/Figure";
import { cn } from "@/lib/utils";

type ContactSheetProps = {
  tiles: ContactSheetItem[];
  className?: string;
};

/** Build order is kept inside each ground; the grounds themselves follow first appearance. */
function byGround(tiles: ContactSheetItem[]): Array<[ImageGround, ContactSheetItem[]]> {
  const groups = new Map<ImageGround, ContactSheetItem[]>();
  for (const tile of tiles) {
    const list = groups.get(tile.image.ground) ?? [];
    list.push(tile);
    groups.set(tile.image.ground, list);
  }
  return [...groups.entries()];
}

/**
 * The photographed build order as a contact sheet (design-spec §7.1, §13): square tiles on
 * their ground, a lab-note label, the date where the photograph has one, and its source.
 * Uncleared photographs are left out; the content file says which and why.
 *
 * Tiles are grouped by ground and each ground gets its own grid, so a light plate and a dark
 * one never share a row (§6). Two columns on a phone rather than three: at 390 px a third
 * column leaves 109 px per tile, and labels like "Second prototype, MDF on the laser bed"
 * wrap to four lines beside a two-word label on the same row.
 */
export function ContactSheet({ tiles, className }: ContactSheetProps) {
  const shown = tiles.filter((tile) => tile.image.cleared);
  if (shown.length === 0) return null;
  return (
    <div className={cn("space-y-10", className)}>
      {byGround(shown).map(([ground, list]) => (
        <ul
          key={ground}
          className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,160px)] md:gap-x-6 md:gap-y-8"
        >
          {list.map(({ label, image }) => (
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
      ))}
    </div>
  );
}

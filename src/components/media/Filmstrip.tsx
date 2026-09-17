import Image from "next/image";
import type { FilmstripItem } from "@/content/types";
import { cn, plateGround } from "@/lib/utils";

type FilmstripProps = {
  tiles: FilmstripItem[];
  /** `aria-label` of the `<nav>`, e.g. the section heading the tiles jump to. */
  label: string;
  className?: string;
};

const TILE_HEIGHT = 120;

/**
 * The robots in role order (design-spec §7.3, §13): five tiles 120 px tall on their ground,
 * each a link to its section anchor, captioned at 15 px. Five in a row at `md`+; a
 * scroll-snap row below, with the tile widths following each render's own proportions so
 * nothing is cropped or scaled past its native pixels.
 */
export function Filmstrip({ tiles, label, className }: FilmstripProps) {
  const shown = tiles.filter((tile) => tile.image.cleared);
  if (shown.length === 0) return null;
  return (
    <nav aria-label={label} className={className}>
      <ul
        className={cn(
          "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          "md:grid md:snap-none md:gap-5 md:overflow-visible md:pb-0",
        )}
        style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
      >
        {shown.map(({ label: text, href, image }) => {
          const width = Math.min(image.width, Math.round((image.width * TILE_HEIGHT) / image.height));
          return (
            <li key={image.id} className="w-44 shrink-0 snap-start md:w-auto">
              <a href={href} className="link-quiet block">
                <span
                  className={cn(
                    "flex h-[120px] items-center justify-center overflow-hidden rounded-photo px-3",
                    image.ground === "light" ? "bg-plate-light" : "bg-surface",
                  )}
                  style={plateGround(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={width}
                    height={Math.min(image.height, TILE_HEIGHT)}
                    quality={75}
                    sizes={`${width}px`}
                    loading="lazy"
                    className={cn("h-auto max-h-full w-auto object-contain", image.ground === "photo" && "rounded-photo")}
                    style={{ aspectRatio: `${image.width} / ${image.height}` }}
                  />
                </span>
                <span className="type-caption mt-2 block text-ink">{text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

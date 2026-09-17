import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { PlateTransition } from "@/components/media/PlateTransition";
import { cn } from "@/lib/utils";

export type PlateAspect = "4/3" | "16/10";

type PlateProps = {
  image: ImageRef;
  aspect?: PlateAspect;
  /** 75 for plates, 90 for hero plates (§12.1). Both exist in `images.qualities`. */
  quality?: 75 | 90;
  /** The plate's CSS width per breakpoint, so no srcset entry exceeds what is drawn (§13). */
  sizes: string;
  /** `plate-${slug}` pairs the image with the case-study hero (§4.2). */
  transitionName?: string;
  /** The LCP candidate: eager, high fetch priority. `priority` itself is deprecated in Next 16. */
  priority?: boolean;
  className?: string;
};

const aspectClass: Record<PlateAspect, string> = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
};

/**
 * The object plate (design-spec §1.2, §12.1): a fixed-aspect box whose ground comes from the
 * image's `ground`, with the image centred at native size and never larger. Light crops are
 * levelled to `--plate-light`, dark crops are keyed onto `--bg`, photographs keep their own
 * ground with a 2 px radius on `--bg`. The box is fixed so nothing shifts while the image loads.
 *
 * Rule one: `max-width: min(100%, width px)`. The declared aspect and `object-fit: contain`
 * mean a file whose real pixels differ from its `ImageRef` is contained, never stretched.
 * An uncleared image renders nothing; the caller shows its declared fallback.
 */
export function Plate({
  image,
  aspect = "4/3",
  quality = 75,
  sizes,
  transitionName,
  priority = false,
  className,
}: PlateProps) {
  if (!image.cleared) {
    // TODO(alex): this image is not cleared for publication; its row falls back or stays empty.
    return null;
  }

  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      quality={quality}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("h-auto object-contain", image.ground === "photo" && "rounded-photo")}
      style={{
        maxWidth: `min(100%, ${image.width}px)`,
        maxHeight: "100%",
        aspectRatio: `${image.width} / ${image.height}`,
      }}
    />
  );

  return (
    <div
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-plate",
        aspectClass[aspect],
        image.ground === "light" ? "bg-plate-light" : "bg-bg",
        className,
      )}
    >
      {transitionName ? <PlateTransition name={transitionName}>{img}</PlateTransition> : img}
    </div>
  );
}

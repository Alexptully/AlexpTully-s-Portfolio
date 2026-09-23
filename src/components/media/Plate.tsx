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

/** The ground under the object: a lit light-box for light crops, a spotlit stage for dark ones. */
const groundClass: Record<ImageRef["ground"], string> = {
  light: "border-black/10 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,#f1f2f3,var(--plate-light)_60%,#d5d7db)]",
  // Dark crops are levelled to --bg exactly, so the ground stays flat: any gradient behind
  // them would show the crop rectangle.
  dark: "border-border bg-bg",
  photo: "border-border bg-[linear-gradient(180deg,#131820,var(--bg))]",
};

const aspectClass: Record<PlateAspect, string> = {
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
};

/**
 * A plate is never more than twice as wide as the object it holds, and never narrower than
 * this. Rule one means a crop is drawn at its native width at most, so without a cap a small
 * crop — the two Monty renders are 176 and 179 px — would float in a plate five times its
 * width. The cap keeps the object the thing you see. Every crop at 480 px or wider fills its
 * column as before, so this only bites where the source material is small.
 */
const MIN_PLATE_WIDTH = 360;

function plateWidth(image: ImageRef): number {
  return Math.max(image.width * 2, MIN_PLATE_WIDTH);
}

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
        "group/plate relative flex w-full items-center justify-center overflow-hidden rounded-plate border",
        aspectClass[aspect],
        groundClass[image.ground],
        className,
      )}
      style={{ maxWidth: `${plateWidth(image)}px` }}
    >
      {/* Registration ticks inset from the frame, like a print sheet. */}
      <div
        aria-hidden="true"
        className={cn(
          "ticks pointer-events-none absolute inset-3 [--tick:10px]",
          image.ground === "light" ? "[--tick-c:#9aa1ab]" : "[--tick-c:var(--border-strong)]",
        )}
      />
      <div className="relative flex h-full w-full items-center justify-center p-6 transition-transform duration-700 ease-[var(--ease-out)] group-hover/row:scale-[1.025] md:p-8">
        {transitionName ? <PlateTransition name={transitionName}>{img}</PlateTransition> : img}
      </div>
    </div>
  );
}

import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { Caption } from "@/components/media/Caption";
import { Plate } from "@/components/media/Plate";
import { PlateTransition } from "@/components/media/PlateTransition";
import { cn } from "@/lib/utils";

type DiptychProps = {
  /** Upper frame. */
  a: ImageRef;
  /** Lower frame. */
  b: ImageRef;
  /** Shown whole, on its own ground, while either frame is uncleared. */
  fallback: ImageRef;
  caption: string;
  fallbackCaption: string;
  sizes: string;
  transitionName?: string;
  className?: string;
};

/** One of the two 16:9 frames. */
function Frame({ image, sizes }: { image: ImageRef; sizes: string }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      quality={75}
      sizes={sizes}
      loading="lazy"
      className="h-auto w-full rounded-photo object-contain md:h-full md:w-auto"
      style={{ maxWidth: `min(100%, ${image.width}px)`, aspectRatio: "16 / 9" }}
    />
  );
}

/**
 * Two dated frames stacked in one plate (design-spec §5.3 row 1): the same doorbell camera
 * with the device off above and on below, each 16:9 with a 2 px radius, 8 px apart, on `--bg`.
 * At `md`+ the plate keeps the lineup's 4:3 box and the frames are height-limited; below it
 * they run full width. While either frame is uncleared the declared fallback shows instead,
 * whole, with its own caption.
 */
export function Diptych({
  a,
  b,
  fallback,
  caption,
  fallbackCaption,
  sizes,
  transitionName,
  className,
}: DiptychProps) {
  if (!a.cleared || !b.cleared) {
    // TODO(alex): open question 2 — clear the two Ring frames; the diptych renders once both are.
    return (
      <figure className={className}>
        <Plate image={fallback} sizes={sizes} transitionName={transitionName} />
        <Caption text={fallbackCaption} source={fallback.source} />
      </figure>
    );
  }

  const frames = (
    <div
      className={cn(
        "grid w-full gap-2 rounded-plate bg-bg",
        "md:aspect-[4/3] md:grid-rows-2 md:justify-items-center md:overflow-hidden",
      )}
    >
      <Frame image={a} sizes={sizes} />
      <Frame image={b} sizes={sizes} />
    </div>
  );

  return (
    <figure className={className}>
      {transitionName ? <PlateTransition name={transitionName}>{frames}</PlateTransition> : frames}
      <Caption text={caption} date={a.date} source={a.source} />
    </figure>
  );
}

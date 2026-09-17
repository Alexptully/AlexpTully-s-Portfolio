import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageRef, Source } from "@/content/types";
import { Plate, type PlateAspect } from "@/components/media/Plate";
import { FootnoteRef } from "@/components/content/Stat";
import { cn, plateGround } from "@/lib/utils";

/**
 * A resolved citation: `index` is the 1-based position of the source in the page's Sources
 * list (0 when the source is not in the list), `backlink` says whether this marker owns the
 * `#ref-N` anchor that the Sources item links back to.
 */
export type Citation = { index: number; backlink: boolean };

/** Resolves a source by object identity against the page's Sources list (see `CaseStudy`). */
export type Cite = (source: Source, key: string) => Citation;

type FigureCaptionProps = {
  text: string;
  /** Exactly as the source prints it; shown only when the sentence does not already say it. */
  date?: string;
  source: Source;
  citation?: Citation;
  /** Extra caption lines after the sentence (e.g. the illustrative-angles note). */
  children?: ReactNode;
  className?: string;
};

/**
 * The caption under a plate, card or tile (design-spec §3.3, §6): the sentence at 15 px muted,
 * the source line 4 px under it at 14 px quiet. When the figure's source is one of the page's
 * numbered Sources, the line also carries the superscript marker so it joins the footnotes.
 */
export function FigureCaption({
  text,
  date,
  source,
  citation,
  children,
  className,
}: FigureCaptionProps) {
  const showDate = date && !text.includes(date);
  return (
    <figcaption className={cn("mt-3 max-w-[60ch]", className)}>
      <p className="type-caption">
        {text}
        {showDate ? (
          <>
            {" "}
            <time>{date}</time>.
          </>
        ) : null}
      </p>
      {children}
      <p className="type-footnote mt-1">
        Source:{" "}
        {source.href ? (
          <a href={source.href} rel="noopener" className="link">
            {source.name}
          </a>
        ) : (
          <span>{source.name}</span>
        )}
        {citation && citation.index > 0 ? (
          <FootnoteRef index={citation.index} backlink={citation.backlink} />
        ) : null}
      </p>
    </figcaption>
  );
}

type PlateFigureProps = {
  image: ImageRef;
  aspect?: PlateAspect;
  sizes: string;
  quality?: 75 | 90;
  transitionName?: string;
  priority?: boolean;
  citation?: Citation;
  /** Overrides `image.caption`. */
  caption?: string;
  children?: ReactNode;
  className?: string;
};

/** A fixed-aspect plate with its caption. Renders nothing while the image is uncleared. */
export function PlateFigure({
  image,
  aspect = "4/3",
  sizes,
  quality,
  transitionName,
  priority,
  citation,
  caption,
  children,
  className,
}: PlateFigureProps) {
  if (!image.cleared) return null;
  return (
    <figure className={className}>
      <Plate
        image={image}
        aspect={aspect}
        sizes={sizes}
        quality={quality}
        transitionName={transitionName}
        priority={priority}
      />
      <FigureCaption
        text={caption ?? image.caption}
        date={image.date}
        source={image.source}
        citation={citation}
      >
        {children}
      </FigureCaption>
    </figure>
  );
}

type CardFigureProps = {
  image: ImageRef;
  /** Short label above the caption sentence, e.g. "The emitter". */
  label?: string;
  citation?: Citation;
  caption?: string;
  /** Caps the card; the image is never wider than its native pixels regardless. */
  maxWidth?: number;
  children?: ReactNode;
  className?: string;
};

/**
 * A card: the image at its native size on its own ground with a 24 px margin, no fixed aspect
 * (design-spec §6 "card and tile crops in sections 4 and 5"). Photographs keep their ground.
 */
export function CardFigure({
  image,
  label,
  citation,
  caption,
  maxWidth,
  children,
  className,
}: CardFigureProps) {
  if (!image.cleared) return null;
  const width = maxWidth ? Math.min(maxWidth, image.width) : image.width;
  return (
    <figure className={cn("w-full", className)} style={{ maxWidth: `${width + 48}px` }}>
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden rounded-plate p-6",
          image.ground === "light" ? "bg-plate-light" : "bg-bg",
        )}
        style={plateGround(image)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          quality={75}
          sizes={`(max-width: ${width + 48}px) calc(100vw - 80px), ${width}px`}
          loading="lazy"
          className={cn("h-auto w-full object-contain", image.ground === "photo" && "rounded-photo")}
          style={{ maxWidth: `min(100%, ${width}px)`, aspectRatio: `${image.width} / ${image.height}` }}
        />
      </div>
      {label ? <p className="type-heading mt-4">{label}</p> : null}
      <FigureCaption
        text={caption ?? image.caption}
        date={image.date}
        source={image.source}
        citation={citation}
        className={label ? "mt-1" : undefined}
      >
        {children}
      </FigureCaption>
    </figure>
  );
}

type TileProps = {
  image: ImageRef;
  /** 160 px at `md`+, 104 px below, or the same at every width. */
  size?: "ledger" | "sheet";
  className?: string;
};

/**
 * A square tile on `--surface` (design-spec §6.5, §13): light crops sit on the light ground
 * they were levelled to, everything else on the surface fill. The image is contained, never
 * cropped, never wider than its native pixels.
 */
export function Tile({ image, size = "ledger", className }: TileProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-photo p-2",
        image.ground === "light" ? "bg-plate-light" : "bg-surface",
        size === "ledger" ? "h-[104px] w-[104px] md:h-40 md:w-40" : "aspect-square w-full",
        className,
      )}
      style={plateGround(image)}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={75}
        sizes="160px"
        loading="lazy"
        className={cn("h-auto max-h-full w-auto max-w-full object-contain", image.ground === "photo" && "rounded-photo")}
        style={{ maxWidth: `min(100%, ${image.width}px)`, aspectRatio: `${image.width} / ${image.height}` }}
      />
    </div>
  );
}

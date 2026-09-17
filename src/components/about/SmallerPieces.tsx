import Image from "next/image";
import type { About, ImageRef } from "@/content/types";
import { Caption } from "@/components/media/Caption";
import { Footnoted, type FootnoteOwners } from "@/components/about/Footnoted";

/** §7.5: the only images in this section, at 200 px, each on its own ground. */
const IMAGE_WIDTH = 200;

function PieceImage({ image }: { image: ImageRef }) {
  if (!image.cleared) return null;
  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        quality={75}
        sizes={`${IMAGE_WIDTH}px`}
        className={image.ground === "photo" ? "h-auto rounded-photo" : "h-auto"}
        style={{ width: `min(100%, ${IMAGE_WIDTH}px)` }}
      />
      <Caption text={image.caption} date={image.date} source={image.source} />
    </figure>
  );
}

type SmallerPiecesProps = {
  data: About["smallerPieces"];
  /** Rendered as the last row only when Alex approves it (open question 5). */
  extendedMemory: About["extendedMemory"];
  owners: FootnoteOwners;
};

/**
 * Smaller pieces (design-spec §7.5, §8.6): a `<dl>` with hairlines, one row each, the term
 * at the heading scale and the description at body size. The only images are the two
 * Electric Road frames at 200 px. The Extended Memory concept note is the last row, and
 * renders only when `about.extendedMemory.approved` is true.
 */
export function SmallerPieces({ data, extendedMemory, owners }: SmallerPiecesProps) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {data.items.map((item) => {
        const images = (item.images ?? []).filter((image) => image.cleared);
        return (
          <div key={item.id} id={item.id} className="py-6">
            <dt className="type-heading">{item.term}</dt>
            <dd className="type-body measure mt-2">
              <Footnoted block={{ key: `piece-${item.id}`, text: item.description }} owners={owners} />
            </dd>
            {images.length > 0 ? (
              <dd className="mt-6 grid gap-6 sm:grid-cols-2">
                {images.map((image) => (
                  <PieceImage key={image.id} image={image} />
                ))}
              </dd>
            ) : null}
          </div>
        );
      })}

      {/*
        TODO(alex): open question 5. `about.extendedMemory.approved` is false, so this row is
        not on the page and `#extended-memory` does not exist. Flip the flag in
        `src/content/about.ts` to publish it.
      */}
      {extendedMemory.approved ? (
        <div id={extendedMemory.id} className="py-6">
          <dt className="type-heading">{extendedMemory.term}</dt>
          <dd className="type-body measure mt-2">{extendedMemory.description}</dd>
          <dd className="type-footnote mt-2">Source: {extendedMemory.source.name}</dd>
        </div>
      ) : null}
    </dl>
  );
}

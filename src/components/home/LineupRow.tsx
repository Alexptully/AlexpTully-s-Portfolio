import Image from "next/image";
import Link from "next/link";
import type { PlateRef, Project } from "@/content/types";
import { Caption } from "@/components/media/Caption";
import { Diptych } from "@/components/media/Diptych";
import { Plate } from "@/components/media/Plate";
import { MiniSpec } from "@/components/content/MiniSpec";
import { HexPipe } from "@/components/svg/HexPipe";

type LineupRowProps = {
  project: Project;
  /** 1-based position of `project.proof.source` in the home Sources list. */
  footnote: number;
  /**
   * The rows near the top of the page load their plate eagerly. A lazy plate that only
   * decodes on scroll leaves the row as a caption under an empty box for anything that
   * paints the page in one pass — a print, a share preview, a page capture.
   */
  priority?: boolean;
  /** 0-based position in the lineup: sets the part number and which side the plate sits on. */
  index: number;
  /** One mono line of context above the title (the hero index's description). */
  meta?: string;
};

/** §13: the plate's CSS width per breakpoint, so no srcset entry exceeds what is drawn. */
const PLATE_SIZES = "(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, 580px";

/** The plate for whatever fills it: an image, the two-frame diptych, or an authored drawing. */
function RowPlate({ plate, slug, priority }: { plate: PlateRef; slug: string; priority?: boolean }) {
  const name = `plate-${slug}`;
  if ("kind" in plate && plate.kind === "diptych") {
    return (
      <Diptych
        a={plate.a}
        b={plate.b}
        fallback={plate.fallback}
        caption={plate.caption}
        fallbackCaption={plate.fallbackCaption}
        sizes={PLATE_SIZES}
        transitionName={name}
        priority={priority}
      />
    );
  }
  if ("kind" in plate && plate.kind === "svg") {
    return (
      <figure>
        <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-plate bg-bg">
          {/* HexPipe is the only drawing declared for a home plate. */}
          <HexPipe title={plate.alt} desc={plate.caption} id={`hexpipe-${slug}`} className="h-full w-full" />
        </div>
        <Caption text={plate.caption} source={plate.source} />
      </figure>
    );
  }
  return (
    <figure>
      <Plate image={plate} aspect="4/3" sizes={PLATE_SIZES} transitionName={name} priority={priority} />
      <Caption text={plate.caption} date={plate.date} source={plate.source} />
    </figure>
  );
}

/** Three small renders on one spotlit stage, each at its native size or smaller. */
function GroupPlate({ group }: { group: NonNullable<Project["homeGroup"]> }) {
  const images = group.images.filter((image) => image.cleared);
  const sources = [...new Set(images.map((image) => image.source.name))];
  return (
    <figure>
      <div className="relative flex aspect-[4/3] w-full items-end justify-center gap-2 overflow-hidden rounded-plate border border-border bg-bg px-4 pb-[12%] md:gap-4 md:px-8">
        {/* Floor light under the three robots, kept below the renders so no crop edge shows. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[11%] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,color-mix(in_oklch,var(--render-blue)_22%,transparent),transparent)]" />
        <div aria-hidden="true" className="ticks pointer-events-none absolute inset-3 [--tick:10px]" />
        {images.map((image, i) => (
          <div
            key={image.id}
            className="relative min-w-0 flex-1 transition-transform duration-700 ease-[var(--ease-out)] group-hover/row:-translate-y-1.5"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              quality={90}
              sizes="(max-width: 768px) 30vw, 240px"
              className="mx-auto h-auto w-full object-contain"
              style={{ maxWidth: `${image.width}px` }}
            />
            {/* A floor reflection line under each robot. */}
            <span aria-hidden="true" className="mx-auto mt-3 block h-px w-3/4 bg-gradient-to-r from-transparent via-border-strong to-transparent" />
          </div>
        ))}
      </div>
      <figcaption className="mt-4 max-w-[60ch]">
        <p className="type-caption">{group.caption}</p>
        <p className="type-label mt-2 normal-case tracking-normal text-quiet">
          <span aria-hidden="true" className="mr-2 inline-block h-px w-4 align-middle bg-border-strong" />
          Sources: {sources.join("; ")}
        </p>
      </figcaption>
    </figure>
  );
}

/**
 * One row of the lineup (design-spec §5.3): a rule above, the plate, then the title, one
 * first-person sentence and the two-row mini `<dl>`. DOM order is plate-then-text; at `md`+
 * the plate takes columns 1–6 and the text columns 7–12, aligned to the plate's top. The
 * `<h2>` anchor is a stretched link, so the row's accessible name is the title and the mini
 * `<dl>` stays outside the link. The plate never moves or zooms.
 */
export function LineupRow({ project, footnote, priority, index, meta }: LineupRowProps) {
  const { slug, title, oneLine, role, proof, homePlate } = project;
  const titleId = `${slug}-title`;
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={slug}
      aria-labelledby={titleId}
      className="group/row relative grid gap-y-8 border-t border-border pt-10 md:grid-cols-12 md:gap-x-8 md:pt-14"
    >
      {/* Part number on the rule, like a callout on a drawing. */}
      <div aria-hidden="true" className="type-label absolute -top-[9px] left-0 bg-bg pr-3 text-quiet">
        {number} / 04
      </div>

      <div className={flip ? "md:order-2 md:col-span-7" : "md:col-span-7"}>
        {project.homeGroup ? (
          <GroupPlate group={project.homeGroup} />
        ) : (
          <RowPlate plate={homePlate} slug={slug} priority={priority} />
        )}
      </div>

      <div className={flip ? "md:order-1 md:col-span-5 md:self-center" : "md:col-span-5 md:self-center"}>
        {meta ? <p className="type-label mb-5">{meta}</p> : null}
        <h2 id={titleId} className="type-title">
          <Link
            href={`/work/${slug}`}
            className="underline decoration-2 decoration-transparent underline-offset-[6px] transition-[text-decoration-color] duration-150 after:absolute after:inset-0 after:content-[''] hover:decoration-accent focus-visible:decoration-accent"
          >
            {title}
          </Link>
        </h2>
        <p className="type-lead measure mt-5 text-muted">{oneLine}</p>
        <MiniSpec role={role} proof={proof} footnote={footnote} className="mt-8" />
        <p aria-hidden="true" className="type-label mt-6 inline-flex items-center gap-3 text-ink">
          <span className="relative inline-block h-px w-8 bg-ink transition-[width] duration-300 ease-[var(--ease-out)] group-hover/row:w-14 group-hover/row:bg-accent" />
          Case study
        </p>
      </div>
    </article>
  );
}

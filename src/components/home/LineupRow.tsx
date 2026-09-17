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
};

/** §13: the plate's CSS width per breakpoint, so no srcset entry exceeds what is drawn. */
const PLATE_SIZES = "(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, 580px";

/** The plate for whatever fills it: an image, the two-frame diptych, or an authored drawing. */
function RowPlate({ plate, slug }: { plate: PlateRef; slug: string }) {
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
      <Plate image={plate} aspect="4/3" sizes={PLATE_SIZES} transitionName={name} />
      <Caption text={plate.caption} date={plate.date} source={plate.source} />
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
export function LineupRow({ project, footnote }: LineupRowProps) {
  const { slug, title, oneLine, role, proof, homePlate } = project;
  const titleId = `${slug}-title`;

  return (
    <article
      id={slug}
      aria-labelledby={titleId}
      className="relative grid gap-y-5 border-t border-border pt-10 md:grid-cols-12 md:gap-x-5 md:pt-16"
    >
      <div className="md:col-span-6">
        <RowPlate plate={homePlate} slug={slug} />
      </div>

      <div className="md:col-span-6">
        <h2 id={titleId} className="type-title">
          <Link
            href={`/work/${slug}`}
            className="underline decoration-2 decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 after:absolute after:inset-0 after:content-[''] hover:decoration-accent focus-visible:decoration-accent"
          >
            {title}
          </Link>
        </h2>
        <p className="type-lead measure mt-4">{oneLine}</p>
        <MiniSpec role={role} proof={proof} footnote={footnote} className="mt-6" />
      </div>
    </article>
  );
}

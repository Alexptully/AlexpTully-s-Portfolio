import type { HeroMode, HomeHero, Source } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Caption } from "@/components/media/Caption";
import { Plate } from "@/components/media/Plate";
import { WorkIndex } from "@/components/home/WorkIndex";
import { FootnoteRef } from "@/components/content/Stat";
import PinCanvas from "@/components/three/PinCanvas";
import { PinPoster } from "@/components/three/PinPoster";

type HeroProps = {
  mode: HeroMode;
  hero: HomeHero;
  /** The home Sources list; hero figures resolve their footnote number against it by reference. */
  sources: Source[];
};

/** The object box is 4:3 at every width, so nothing shifts between photo and canvas mode. */
const HERO_SIZES =
  "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 680px";

/**
 * A camera viewfinder drawn over the object: the pin is shown the way a camera frames it,
 * which is the thing AntiCam defeats. Corner brackets, a recording dot and a frame label.
 * Decorative only; the caption under the figure carries the meaning.
 */
function Viewfinder({ label }: { label: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-5">
      <div className="ticks absolute inset-0 [--tick-c:var(--muted)] [--tick:22px]" />
      <div className="type-label absolute top-3 left-4 flex items-center gap-2 text-ink">
        <span className="led led-pulse" />
        Rec
      </div>
      <div className="type-label absolute top-3 right-4">{label}</div>
      <div className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute top-1/2 left-0 h-px w-full bg-muted/40" />
        <span className="absolute top-0 left-1/2 h-full w-px bg-muted/40" />
      </div>
    </div>
  );
}

/**
 * Home hero. Left: a mono kicker, the h1, the lead, the role line and the index. Right: the
 * AntiCam object inside a camera viewfinder over a drawing-sheet dot grid. Under both, a
 * strip of four sourced figures. Canvas mode keeps the V1 photograph as a plate further down.
 */
export function Hero({ mode, hero, sources }: HeroProps) {
  const { kicker, headline, lead, roleLine, indexLabel, index, photo, canvas, figures } = hero;

  return (
    <section className="relative overflow-hidden">
      {/* Pink light spilling from the object side, the only colour in the frame. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_14%,transparent),transparent_65%)]"
      />
      <Container className="relative pt-12 pb-16 lg:pt-20 lg:pb-20">
        <div className="grid gap-y-12 lg:min-h-[620px] lg:grid-cols-12 lg:items-center lg:gap-x-8">
          <div className="lg:col-span-6">
            <p className="type-label rise flex items-center gap-3">
              <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
              {kicker}
            </p>
            <h1 className="type-display rise mt-6 lg:text-[clamp(3.5rem,1.2rem+3.4vw,5rem)] [animation-delay:80ms]">{headline}</h1>
            <p className="type-lead measure rise mt-7 text-muted [animation-delay:160ms]">{lead}</p>
            <p className="type-role rise mt-5 [animation-delay:200ms]">{roleLine}</p>
            <WorkIndex label={indexLabel} items={index} className="rise mt-10 [animation-delay:260ms]" />
          </div>

          <figure className="lg:col-span-6">
            {mode === "canvas" ? (
              <>
                <div className="relative">
                  <div aria-hidden="true" className="dot-grid absolute -inset-10" />
                  <PinCanvas
                    poster={<PinPoster />}
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-plate border border-border/60 bg-[radial-gradient(ellipse_at_50%_45%,#141923,var(--bg)_70%)]"
                  />
                  <Viewfinder label="AntiCam · clip-on pin" />
                </div>
                {/* The model is the site's own drawing, so this caption cites no document. */}
                <Caption text={canvas.caption} />
              </>
            ) : (
              <>
                {/* No transition name here: the AntiCam lineup row carries `plate-anticam` (§5.3). */}
                <Plate image={photo.image} aspect="4/3" quality={90} sizes={HERO_SIZES} priority />
                <Caption text={photo.image.caption} source={photo.image.source} />
              </>
            )}
          </figure>
        </div>

        {/* Four figures, each with its source. */}
        <dl className="mt-16 grid grid-cols-2 border-y border-border lg:mt-20 lg:grid-cols-4">
          {figures.map((f, i) => {
            const n = sources.indexOf(f.source) + 1;
            return (
              <div
                key={f.value}
                className={[
                  "flex flex-col gap-3 py-6 pr-4 lg:py-8",
                  i % 2 === 1 ? "border-l border-border pl-4 lg:pl-6" : "",
                  i === 2 ? "border-t border-border lg:border-t-0 lg:border-l lg:pl-6" : "",
                  i === 3 ? "border-t border-border lg:border-t-0" : "",
                ].join(" ")}
              >
                <dt className="order-2 type-caption max-w-[26ch]">
                  {f.label}
                  {n > 0 ? <FootnoteRef index={n} backlink={false} /> : null}
                </dt>
                <dd className="order-1 text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] leading-none font-medium tracking-[-0.045em] tabular-nums">
                  {f.value}
                </dd>
              </div>
            );
          })}
        </dl>

        {mode === "canvas" ? (
          <div className="mt-16 grid items-end gap-8 md:grid-cols-12 md:gap-x-8 lg:mt-20">
            <div className="md:col-span-5 md:pb-10">
              <p className="type-label">Fig. 00 — the real thing</p>
              <p className="type-lead mt-4 max-w-[28rem] text-muted">{photo.image.caption}</p>
            </div>
            {/* The V1 photograph: the model above is drawn from it. */}
            <figure className="md:col-span-7">
              <Plate
                image={photo.image}
                aspect="4/3"
                quality={90}
                sizes="(max-width: 768px) calc(100vw - 32px), 680px"
                priority
              />
              <Caption text="" source={photo.image.source} />
            </figure>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

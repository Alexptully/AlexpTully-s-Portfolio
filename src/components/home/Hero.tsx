import type { HeroMode, HomeHero } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Caption } from "@/components/media/Caption";
import { Plate } from "@/components/media/Plate";
import { WorkIndex } from "@/components/home/WorkIndex";
import PinCanvas from "@/components/three/PinCanvas";
import { PinPoster } from "@/components/three/PinPoster";

type HeroProps = {
  mode: HeroMode;
  hero: HomeHero;
};

/** The object box is 4:3 at every width, so nothing shifts between photo and canvas mode. */
const HERO_SIZES =
  "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 680px";

/**
 * Home hero (design-spec §5.2, §10.1). Left: the h1 sentence, the role line and the index.
 * Right: the AntiCam object in a 4:3 plate. Photo mode holds the V1 photograph on a light
 * plate; canvas mode hosts `PinCanvas` over its SVG poster in the same box, and the V1
 * photograph moves to a 500 px light plate directly under the hero. At `lg` the text takes
 * columns 1–5 and the object columns 6–12, centred on the text block; below it they stack.
 */
export function Hero({ mode, hero }: HeroProps) {
  const { headline, lead, roleLine, indexLabel, index, photo, canvas } = hero;

  return (
    <Container as="section" className="pt-10 pb-20 lg:pt-16 lg:pb-24">
      <div className="grid gap-y-10 lg:min-h-[640px] lg:grid-cols-12 lg:items-center lg:gap-x-5">
        <div className="lg:col-span-5">
          {/*
            The h1 takes the site's display step, like every case-study h1 and the /about h1.
            It is short enough to hold it: the list of work that used to run inside the
            sentence is the lead below, at the lead scale, where it reads as one line of
            specifics rather than eight lines of display type.
          */}
          <h1 className="type-display">{headline}</h1>
          <p className="type-lead measure mt-6">{lead}</p>
          <p className="type-role mt-6">{roleLine}</p>
          <WorkIndex label={indexLabel} items={index} className="mt-8" />
        </div>

        <figure className="lg:col-span-7">
          {mode === "canvas" ? (
            <>
              <PinCanvas
                poster={<PinPoster />}
                className="aspect-[4/3] w-full overflow-hidden rounded-plate bg-bg"
              />
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

      {mode === "canvas" ? (
        <div className="mt-16 lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* The V1 photograph, directly under the object column, at 500 px. Plate first,
              caption under it: every other plate on the site reads in that order, and one
              flipped pair breaks the unit the whole catalogue is built from (§1.4 graft 14). */}
          <figure className="max-w-[500px] lg:col-span-7 lg:col-start-6">
            <Plate
              image={photo.image}
              aspect="4/3"
              quality={90}
              sizes="(max-width: 640px) calc(100vw - 32px), 500px"
              priority
            />
            <Caption text={photo.image.caption} source={photo.image.source} />
          </figure>
        </div>
      ) : null}
    </Container>
  );
}

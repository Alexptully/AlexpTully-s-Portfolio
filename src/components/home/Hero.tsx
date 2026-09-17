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
  const { headline, roleLine, indexLabel, index, photo, canvas } = hero;

  return (
    <Container as="section" className="pt-10 pb-20 lg:pt-16 lg:pb-24">
      <div className="grid gap-y-10 lg:min-h-[640px] lg:grid-cols-12 lg:items-center lg:gap-x-5">
        <div className="lg:col-span-5">
          {/*
            Display weight and tracking, but capped at 56 px instead of the 88 px display step:
            the sentence is 23 words, and at 88 px in the 480 px column it runs to fourteen
            lines (about 1,250 px). 56 px gives the seven or eight lines the §5.7 wireframe
            draws; 40 px on phone matches §5.8 exactly. The full display step stays on the
            contact-band name.
          */}
          <h1 className="text-balance text-[clamp(2.5rem,1.7rem+2.2vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-ink">
            {headline}
          </h1>
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
          {/* The V1 photograph, directly under the object column, at 500 px with the caption above (§5.2). */}
          <figure className="max-w-[500px] lg:col-span-7 lg:col-start-6">
            <Caption text={photo.image.caption} source={photo.image.source} className="mt-0 mb-3" />
            <Plate
              image={photo.image}
              aspect="4/3"
              quality={90}
              sizes="(max-width: 640px) calc(100vw - 32px), 500px"
            />
          </figure>
        </div>
      ) : null}
    </Container>
  );
}

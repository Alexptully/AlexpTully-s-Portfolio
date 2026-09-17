import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";

/**
 * Temporary placeholder so the shell can be seen with real type on it. WP4 replaces this
 * file with the home page (design-spec §5). Copy below is the §5.2 h1 and role line
 * (sources: résumé; root CLAUDE.md; AntiCam deck founder slide).
 */
export default function Home() {
  return (
    <Container as="section" className="pt-16 pb-24 lg:pt-24">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <div className="lg:col-span-7">
          <h1 className="type-display">
            I&rsquo;m Alex Tully. I design and build hardware: a privacy wearable, a low-cost
            prosthetic arm, competition robots, and a CAD tool for clay.
          </h1>
          <p className="type-role mt-6">Founder, Tully Tech. Sole designer and builder of AntiCam.</p>
        </div>
      </div>

      <div id="work" className="mt-24 border-t border-border pt-16">
        <h2 className="type-title">Work</h2>
        <Prose className="mt-6">
          <p>
            The lineup goes here: AntiCam, the low-cost prosthetic arm, robotics, and CeraPiper,
            each as a plate with a spec sheet.
          </p>
        </Prose>
      </div>
    </Container>
  );
}

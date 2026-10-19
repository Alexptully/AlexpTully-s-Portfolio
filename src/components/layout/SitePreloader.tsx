import { Preloader } from "@/components/motion/Preloader";
import { Wordmark } from "@/components/layout/Wordmark";

/**
 * First visit of a session only (redesign-spec §2): the wordmark rises, a counter runs to 100,
 * then the wordmark's pink box grows to fill the screen and the whole sheet slides off left.
 * All CSS (globals.css, "Preloader"), so it finishes even before hydration; never shown
 * without JS or under reduced motion.
 */
export function SitePreloader() {
  return (
    <Preloader className="preloader-box">
      <Wordmark className="preloader-box__mark" />
      <div className="preloader-box__lines type-label">
        <p>(Portfolio / ©2026)</p>
        <p>Hardware, product, robotics</p>
      </div>
      <p className="preloader-box__count" />
    </Preloader>
  );
}

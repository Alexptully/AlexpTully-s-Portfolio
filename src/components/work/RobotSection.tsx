import type { RobotSection as RobotData } from "@/content/types";
import { site } from "@/content/site";
import { AwardsList } from "@/components/content/AwardsList";
import { ProseFootnotes } from "@/components/content/Footnotes";
import { CardFigure, PlateFigure, type Cite } from "@/components/work/Figure";

type RobotSectionProps = {
  robot: RobotData;
  cite: Cite;
  /** Footnote-anchor owners for the page, so the idea sentence can carry its markers. */
  owners: Map<number, string>;
  /** Heading for the awards records under each robot. */
  awardsHeading: string;
  sizes: string;
};

/**
 * One robot on the robotics page (design-spec §7.3): an anchored `<section>` with an h3 at
 * the title scale, the plate at the lineup's 4:3 with the render centred at native size, the
 * role line first, one idea sentence, a detail card where one exists, and the awards as
 * records with their sources. Team work is written as "we"; the role line is Alex's.
 */
export function RobotSection({ robot, cite, owners, awardsHeading, sizes }: RobotSectionProps) {
  const headingId = `${robot.id}-heading`;
  return (
    <section id={robot.id} aria-labelledby={headingId} className="mt-16 md:mt-24">
      <h3 id={headingId} className="type-title">
        {robot.name}
        <span className="text-muted">, {robot.team}</span>
      </h3>
      <div className="mt-6 grid gap-8 md:grid-cols-12 md:gap-x-5">
        <PlateFigure
          image={robot.plate}
          aspect="4/3"
          sizes={sizes}
          citation={cite(robot.plate.source, `robot:${robot.id}:plate`)}
          className="md:col-span-6"
        />
        <div className="md:col-span-6">
          <dl className="border-y border-border py-4">
            <dt className="type-caption">{site.labels.role}</dt>
            <dd className="type-role mt-1">{robot.role}</dd>
          </dl>
          <p className="type-body measure mt-6">
            <ProseFootnotes text={robot.idea} ownerKey={`robot:${robot.id}:idea`} owners={owners} />
          </p>
          {robot.detail ? (
            <CardFigure
              image={robot.detail}
              maxWidth={300}
              citation={cite(robot.detail.source, `robot:${robot.id}:detail`)}
              className="mt-8"
            />
          ) : null}
        </div>
      </div>
      {/*
        Five robots on one page each end in an "Awards" heading, so a screen reader's heading
        list would read "Awards" five times with nothing to tell them apart. The visible text
        stays as the content file writes it; the robot's name is added for the heading list.
      */}
      <h4 className="type-heading mt-10">
        {awardsHeading}
        <span className="sr-only">, {robot.name}</span>
      </h4>
      <AwardsList awards={robot.awards} attribution="collapse" className="mt-3" />
    </section>
  );
}

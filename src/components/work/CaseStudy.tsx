import type { ReactNode } from "react";
import Link from "next/link";
import type { Figure as FigureData, ImageGround, Project, Source, SpecRow } from "@/content/types";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { Sources } from "@/components/content/Sources";
import { ProseFootnotes as Footnoted, splitFootnotes } from "@/components/content/Footnotes";
import { SpecSheet } from "@/components/content/SpecSheet";
import { VersionLedger } from "@/components/content/VersionLedger";
import { AwardsList } from "@/components/content/AwardsList";
import { TwoLists } from "@/components/content/TwoLists";
import { NextLink } from "@/components/content/NextLink";
import { ContactSheet } from "@/components/media/ContactSheet";
import { Filmstrip } from "@/components/media/Filmstrip";
import { HexPipe } from "@/components/svg/HexPipe";
import { HandParameters } from "@/components/svg/HandParameters";
import { RegressionChart } from "@/components/svg/RegressionChart";
import { CardFigure, FigureCaption, PlateFigure, type Cite } from "@/components/work/Figure";
import { MomentSlot } from "@/components/work/MomentSlot";
import { RobotSection } from "@/components/work/RobotSection";

/* ------------------------------------------------------------ footnotes */

type ProseEntry = { key: string; text: string };

/** The first prose marker for each footnote index owns the `#ref-N` anchor. */
function proseOwners(entries: ProseEntry[]): Map<number, string> {
  const owners = new Map<number, string>();
  for (const { key, text } of entries) {
    splitFootnotes(text).forEach((part, i) => {
      if (typeof part === "number" && !owners.has(part)) owners.set(part, `${key}#${i}`);
    });
  }
  return owners;
}

/**
 * Builds the page's citation resolver. Sources resolve by object identity against
 * `project.sources` (the content file shares the objects for exactly this reason). A prose
 * marker owns the back-link anchor when one exists; otherwise the first figure or measurement
 * citing that source does, in render order, so every "Back to text" link lands somewhere.
 */
function buildCite(project: Project, prose: Map<number, string>): { cite: Cite; anchored: Set<number> } {
  const { sources } = project;
  const indexOf = (source: Source) => sources.indexOf(source) + 1;

  const ordered: Array<[Source, string]> = [];
  project.versions.forEach((v) => v.measurement && ordered.push([v.measurement.source, `ver:${v.tag}`]));
  project.ledgers?.forEach((ledger, li) => {
    ledger.rows.forEach((v) => v.measurement && ordered.push([v.measurement.source, `led${li}:${v.tag}`]));
    if (ledger.aside) ordered.push([ledger.aside.source, `led${li}:aside`]);
  });
  ordered.push([project.hero.source, "hero"]);
  const how = project.how;
  if (how.component === "RingCompare") ordered.push([how.fallback.source, "how:fallback"]);
  if (how.component === "FingerLinkage") ordered.push([how.card.source, "how:card"]);
  if (how.component === "DriveDiagram") ordered.push([how.source, "how:caption"]);
  if (how.component === "HexProfile") {
    ordered.push([how.architecture.source, "how:architecture"], [how.blueprint.source, "how:blueprint"]);
  }
  project.robots?.forEach((r) => {
    ordered.push([r.plate.source, `robot:${r.id}:plate`]);
    if (r.detail) ordered.push([r.detail.source, `robot:${r.id}:detail`]);
  });
  project.figures?.forEach((f) => ordered.push([f.image.source, `fig:${f.image.id}`]));
  ordered.push(...extraCitations(project));

  const owners = new Map<number, string>();
  for (const [source, key] of ordered) {
    const n = indexOf(source);
    if (n > 0 && !prose.has(n) && !owners.has(n)) owners.set(n, key);
  }

  const cite: Cite = (source, key) => {
    const index = indexOf(source);
    return { index, backlink: index > 0 && owners.get(index) === key };
  };
  // Every number that will have a `ref-N` anchor in the DOM, so the Sources list only
  // offers "Back to text" where there is text to go back to.
  return { cite, anchored: new Set([...prose.keys(), ...owners.keys()]) };
}

/* ---------------------------------------------------- per-page drawings */

/*
 * The two authored drawings a case study places outside the moment (design-spec §7.2, §7.3):
 * the seven hand measurements beside the prosthetic ledger, and the launcher regression under
 * the robotics results. Their labels and their citation come from the project, so nothing here
 * is copy; the page renders whichever the project declares.
 */

function extraCitations(project: Project): Array<[Source, string]> {
  const out: Array<[Source, string]> = [];
  if (project.handParameters) out.push([project.handParameters.source, "extra:hand"]);
  if (project.regression) out.push([project.regression.source, "extra:regression"]);
  return out;
}

function LedgerExtra({ project, cite }: { project: Project; cite: Cite }) {
  const hand = project.handParameters;
  if (!hand) return null;
  return (
    <figure className="mt-12 max-w-[34rem]">
      <HandParameters
        title={hand.title}
        desc={hand.desc}
        digitLabels={hand.digitLabels}
        parameters={hand.parameters}
        maxWidth={420}
      />
      <FigureCaption text={hand.caption} source={hand.source} citation={cite(hand.source, "extra:hand")} />
    </figure>
  );
}

function ResultsExtra({ project, cite }: { project: Project; cite: Cite }) {
  const chart = project.regression;
  if (!chart) return null;
  return (
    <figure className="mt-10 max-w-[34rem]">
      <RegressionChart
        title={chart.title}
        desc={chart.desc}
        x={chart.x}
        y={chart.y}
        line={chart.line}
        notes={chart.notes}
      />
      <FigureCaption text={chart.caption} source={chart.source} citation={cite(chart.source, "extra:regression")} />
    </figure>
  );
}

/* --------------------------------------------------------------- layout */

const HERO_SIZES = "(max-width: 1024px) calc(100vw - 48px), 960px";
const COMPACT_HERO_SIZES = "(max-width: 1024px) calc(100vw - 48px), 490px";
/**
 * A crop is never drawn wider than its native pixels (§12.1), so a small source — the largest
 * clean Monti render in Alex's material is 295 px — leaves a stacked hero as a stamp floating
 * above an 88 px h1. Below this width the hero composes instead: the object in columns 1-5,
 * the title and lead in 6-12, both vertically centred. Above it the hero stays full width and
 * stacked, which is what AntiCam, the prosthetic arm and CeraPiper all get.
 */
const COMPACT_HERO_MAX = 640;
const PLATE_SIZES = "(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, 580px";

/**
 * A numbered section: a sticky side index (part number and heading) in columns 1-3, the
 * content in 4-12 at `lg`; stacked below, with the number above the heading.
 */
function Section({
  id,
  heading,
  n,
  children,
}: {
  id: string;
  heading: string;
  n: number;
  children: ReactNode;
}) {
  return (
    <section id={id} className="container-site mt-20 md:mt-32" aria-labelledby={`${id}-heading`}>
      <div className="border-t border-border pt-8 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pt-10">
        <div className="mb-8 lg:col-span-3 lg:mb-0">
          <div className="lg:sticky lg:top-24">
            <p aria-hidden="true" className="type-label text-quiet">
              § {String(n).padStart(2, "0")}
            </p>
            <h2 id={`${id}-heading`} className="type-title mt-3 lg:text-[clamp(1.75rem,1.2rem+1vw,2.25rem)]">
              {heading}
            </h2>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

/**
 * Cards grouped by ground, one row per ground, so light and dark plates never share a row
 * (§6), on a fixed grid rather than a wrapping flex row. Every card fills its cell and every
 * media box is 4:3, so the tiles are the same size and the captions under them sit on one
 * baseline; an odd count leaves an empty cell instead of restarting the stagger.
 */
function FigureRows({ figures, cite }: { figures: FigureData[]; cite: Cite }) {
  const groups = new Map<ImageGround, FigureData[]>();
  for (const figure of figures) {
    if (!figure.image.cleared) continue;
    const list = groups.get(figure.image.ground) ?? [];
    list.push(figure);
    groups.set(figure.image.ground, list);
  }
  return (
    <>
      {[...groups.entries()].map(([ground, list]) => (
        <div
          key={ground}
          className="mt-12 grid items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map(({ image, label }) => (
            <CardFigure
              key={image.id}
              image={image}
              label={label}
              fill
              citation={cite(image.source, `fig:${image.id}`)}
            />
          ))}
        </div>
      ))}
    </>
  );
}

type CaseStudyProps = {
  project: Project;
  /** 1-based position in the lineup, printed as the part number. */
  number: number;
  /** The next case study in lineup order. */
  next: Project;
};

/**
 * The case-study template (design-spec §6, §7): object hero, spec sheet, Why, How it works,
 * Versions (Robots), Results, What I did and what others did, Status with the Next link, and
 * Sources as the last section before the shared footer. Every word renders from `projects.ts`.
 */
export function CaseStudy({ project, next, number }: CaseStudyProps) {
  const { sectionHeadings: h } = site;
  const prose = proseOwners([
    ...project.spec.map((row, i) => ({ key: `spec-${i}`, text: row.value })),
    ...project.why.map((text, i) => ({ key: `why-${i}`, text })),
    ...project.results.map((text, i) => ({ key: `res-${i}`, text })),
    ...(project.robots ?? []).map((robot) => ({ key: `robot:${robot.id}:idea`, text: robot.idea })),
    { key: "status", text: project.status },
    { key: "next", text: project.next },
  ]);
  const { cite, anchored } = buildCite(project, prose);
  const renderSpecValue = (row: SpecRow, i: number) => <Footnoted text={row.value} ownerKey={`spec-${i}`} owners={prose} />;
  const awardsHeading = site.labels.awards;
  const hero = project.hero;
  // `Plate` caps a plate at twice its image's width, so this is the plate the hero will draw.
  const compactHero = !("kind" in hero) && hero.width * 2 < COMPACT_HERO_MAX;

  return (
    <article>
      {/* 1. Object hero */}
      <Container as="header" className="pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="type-label mb-8 flex items-center gap-3 text-quiet md:mb-10">
          <Link href="/#work" className="link-quiet hover:text-ink">
            {site.nav[0].label}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{String(number).padStart(2, "0")}</span>
          <span aria-hidden="true">/</span>
          <span className="text-ink" aria-current="page">
            {project.title}
          </span>
        </nav>
        <div
          className={
            compactHero
              ? "grid gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-5"
              : undefined
          }
        >
          <div className={compactHero ? "lg:col-span-5" : undefined}>
            {"kind" in hero ? (
              <figure className="max-w-[960px]">
                <HexPipe title={hero.alt} desc={hero.caption} id={`hexpipe-${project.slug}`} />
                <FigureCaption text={hero.caption} source={hero.source} citation={cite(hero.source, "hero")} />
              </figure>
            ) : (
              <PlateFigure
                image={hero}
                aspect="16/10"
                sizes={compactHero ? COMPACT_HERO_SIZES : HERO_SIZES}
                quality={90}
                priority
                transitionName={`plate-${project.slug}`}
                className="max-w-[960px]"
              />
            )}
          </div>
          <div className={compactHero ? "lg:col-span-7" : "mt-12 md:mt-16 lg:grid lg:grid-cols-12 lg:gap-x-8"}>
            <h1 className={compactHero ? "type-display" : "type-display lg:col-span-7"}>{project.title}</h1>
            <p className={compactHero ? "type-lead measure mt-6 text-muted" : "type-lead measure mt-6 text-muted lg:col-span-5 lg:mt-3 lg:self-end"}>
              {project.lead}
            </p>
          </div>
        </div>
      </Container>

      {/* 2. Spec sheet, and the robotics filmstrip under it */}
      <Container className="mt-12 md:mt-16">
        <SpecSheet rows={project.spec} renderValue={renderSpecValue} />
        {project.filmstrip ? (
          <Filmstrip tiles={project.filmstrip} label={project.versionsHeading} className="mt-8" />
        ) : null}
      </Container>

      {/* 3. Why */}
      <Section id="why" n={1} heading={h.why}>
        <Prose>
          {project.why.map((text, i) => (
            <p key={i}>
              <Footnoted text={text} ownerKey={`why-${i}`} owners={prose} />
            </p>
          ))}
        </Prose>
      </Section>

      {/* 4. How it works */}
      <Section id="how" n={2} heading={h.how}>
        <MomentSlot how={project.how} cite={cite} />
      </Section>

      {/* 5. Versions, or Robots */}
      <Section id="versions" n={3} heading={project.versionsHeading}>
        {project.robots ? (
          <div className="-mt-6">
            {project.robots.map((robot) => (
              <RobotSection
                key={robot.id}
                robot={robot}
                cite={cite}
                owners={prose}
                awardsHeading={awardsHeading}
                sizes={PLATE_SIZES}
              />
            ))}
          </div>
        ) : null}
        {project.versions.length > 0 ? (
          <VersionLedger
            caption={`${project.title}: ${project.versionsHeading}`}
            rows={project.versions}
            note={project.versionsNote}
            cite={cite}
          />
        ) : null}
        {project.ledgers?.map((ledger, li) => (
          <div key={ledger.heading} className="mt-12 md:mt-16">
            <h3 className="type-heading mb-3">{ledger.heading}</h3>
            <VersionLedger
              caption={`${project.title}: ${ledger.heading}`}
              rows={ledger.rows}
              note={ledger.note}
              cite={cite}
              citeKey={`led${li}`}
            />
            {ledger.aside ? (
              <CardFigure image={ledger.aside} citation={cite(ledger.aside.source, `led${li}:aside`)} className="mt-8" />
            ) : null}
          </div>
        ))}
        {project.figures ? <FigureRows figures={project.figures} cite={cite} /> : null}
        {project.contactSheet ? <ContactSheet tiles={project.contactSheet} className="mt-12" /> : null}
        <LedgerExtra project={project} cite={cite} />
      </Section>

      {/* 6. Results, with awards as records where the project has any */}
      <Section id="results" n={4} heading={h.results}>
        <Prose>
          {project.results.map((text, i) => (
            <p key={i}>
              <Footnoted text={text} ownerKey={`res-${i}`} owners={prose} />
            </p>
          ))}
        </Prose>
        <ResultsExtra project={project} cite={cite} />
        {project.awards !== "none" ? (
          <>
            <h3 className="type-heading mt-12 mb-3">{awardsHeading}</h3>
            <AwardsList awards={project.awards} />
          </>
        ) : null}
      </Section>

      {/* 7. What I did, what others did */}
      <Section id="who" n={5} heading={`${h.did}, ${h.others.charAt(0).toLowerCase()}${h.others.slice(1)}`}>
        <TwoLists left={{ heading: h.did, items: project.didList }} right={{ heading: h.others, items: project.othersList }} />
      </Section>

      {/* 8. Status and next */}
      <Section id="status" n={6} heading={h.status}>
        <Prose>
          <p>
            <Footnoted text={project.status} ownerKey="status" owners={prose} />
          </p>
          <p>
            <span className="text-muted">{h.nextPrefix}</span>{" "}
            <Footnoted text={project.next} ownerKey="next" owners={prose} />
          </p>
        </Prose>
        <NextLink title={next.title} href={`/work/${next.slug}`} className="mt-12 border-t border-border pt-8" />
      </Section>

      {/* 9. Sources, then the shared footer from the layout */}
      <Container className="mt-16 md:mt-24">
        <Sources sources={project.sources} backlinks={anchored} />
      </Container>
    </article>
  );
}

import type { ReactNode } from "react";
import type { Figure as FigureData, ImageGround, Project, Source, SpecRow } from "@/content/types";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { Sources } from "@/components/content/Sources";
import { FootnoteRef } from "@/components/content/Stat";
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
import { CardFigure, FigureCaption, PlateFigure, type Citation, type Cite } from "@/components/work/Figure";
import { MomentSlot } from "@/components/work/MomentSlot";
import { RobotSection } from "@/components/work/RobotSection";

/* ------------------------------------------------------------ footnotes */

const SUPERSCRIPT: Record<string, number> = {
  "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9,
};

type Part = string | number;

/**
 * Splits prose at its superscript digits (design-spec §4.3, content/types.ts): a run of
 * superscript characters becomes one footnote index, everything else stays text.
 */
function splitFootnotes(text: string): Part[] {
  const parts: Part[] = [];
  let buffer = "";
  let digits = "";
  const flush = () => {
    if (digits) {
      if (buffer) parts.push(buffer);
      buffer = "";
      parts.push(Number(digits));
      digits = "";
    }
  };
  for (const ch of text) {
    const digit = SUPERSCRIPT[ch];
    if (digit !== undefined) {
      digits += digit;
    } else {
      flush();
      buffer += ch;
    }
  }
  flush();
  if (buffer) parts.push(buffer);
  return parts;
}

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

function Footnoted({ text, ownerKey, owners }: { text: string; ownerKey: string; owners: Map<number, string> }) {
  return (
    <>
      {splitFootnotes(text).map((part, i) =>
        typeof part === "number" ? (
          <FootnoteRef key={`${ownerKey}#${i}`} index={part} backlink={owners.get(part) === `${ownerKey}#${i}`} />
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * Builds the page's citation resolver. Sources resolve by object identity against
 * `project.sources` (the content file shares the objects for exactly this reason). A prose
 * marker owns the back-link anchor when one exists; otherwise the first figure or measurement
 * citing that source does, in render order, so every "Back to text" link lands somewhere.
 */
function buildCite(project: Project, prose: Map<number, string>): Cite {
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

  return (source, key): Citation => {
    const index = indexOf(source);
    return { index, backlink: index > 0 && owners.get(index) === key };
  };
}

/* ---------------------------------------------------- per-page drawings */

/*
 * The two authored drawings that a case study places outside the moment (design-spec §7.2 and
 * §7.3): the seven hand measurements beside the prosthetic ledger, and the launcher regression
 * under the robotics results. Their labels are the facts the content map records
 * (content/notes/content-map.md, prosthetic §"parametric" and robotics §"Launcher").
 * TODO(wp1): move these label sets into `projects.ts` so no copy lives in a component.
 */
const HAND = {
  title: "The seven hand measurements the parametric model is built on",
  desc: "A drawing of a hand, palm side, with digits 1 to 5 labelled and each measurement marked as a girth arc or a length arrow.",
  digitLabels: ["Digit 1", "Digit 2", "Digit 3", "Digit 4", "Digit 5"] as [string, string, string, string, string],
  parameters: {
    handCircumference: "Hand circumference",
    handLength: "Hand length",
    palmLength: "Palm length",
    wristCircumference: "Wrist circumference",
    fingerRoot: "Finger root circumference",
    interphalangeal: "Interphalangeal joint circumference",
    distalInterphalangeal: "Distal interphalangeal joint circumference",
  },
  caption: "The seven hand measurements that size the model, redrawn from the design brief.",
  /** The source object is looked up by path so the figure joins the page's numbered list. */
  sourcePath: "#page-12",
};

const REGRESSION = {
  title: "Launcher speed against shot distance",
  desc: "A chart with shot distance in centimetres along the bottom and launcher speed up the side; one straight line rises from left to right, labelled with the team's equation.",
  x: { label: "Shot distance, d (cm)", min: 0, max: 300, ticks: [0, 100, 200, 300] },
  y: { label: "Launcher speed, v", min: 1000, max: 1900, ticks: [1000, 1300, 1600, 1900] },
  line: { slope: 2.64, intercept: 1013, label: "v = d · 2.64 + 1013" },
  notes: [
    "The line is drawn from the equation the team published; the individual trials are not published, so no points are plotted.",
    "Distance is in centimetres, as the poster deck's chart labels it. The unit of v is not legible in any source, so the axis carries the equation's own values.",
    // TODO(alex): the unit of v (encoder ticks per second, RPM, or something else).
  ],
  caption: "Launcher tuning: the team's regression from 200+ trials at 8 mm compression, redrawn from the equation.",
  sourceClaim: "2.64",
};

function extraCitations(project: Project): Array<[Source, string]> {
  const out: Array<[Source, string]> = [];
  if (project.slug === "prosthetic-arm") {
    const source = project.sources.find((s) => s.path?.endsWith(HAND.sourcePath));
    if (source) out.push([source, "extra:hand"]);
  }
  if (project.slug === "robotics") {
    const source = project.sources.find((s) => s.claim?.includes(REGRESSION.sourceClaim));
    if (source) out.push([source, "extra:regression"]);
  }
  return out;
}

function LedgerExtra({ project, cite }: { project: Project; cite: Cite }) {
  if (project.slug !== "prosthetic-arm") return null;
  const source = project.sources.find((s) => s.path?.endsWith(HAND.sourcePath));
  if (!source) return null;
  return (
    <figure className="mt-12 max-w-[34rem]">
      <HandParameters
        title={HAND.title}
        desc={HAND.desc}
        digitLabels={HAND.digitLabels}
        parameters={HAND.parameters}
        maxWidth={420}
      />
      <FigureCaption text={HAND.caption} source={source} citation={cite(source, "extra:hand")} />
    </figure>
  );
}

function ResultsExtra({ project, cite }: { project: Project; cite: Cite }) {
  if (project.slug !== "robotics") return null;
  const source = project.sources.find((s) => s.claim?.includes(REGRESSION.sourceClaim));
  if (!source) return null;
  return (
    <figure className="mt-10 max-w-[34rem]">
      <RegressionChart
        title={REGRESSION.title}
        desc={REGRESSION.desc}
        x={REGRESSION.x}
        y={REGRESSION.y}
        line={REGRESSION.line}
        notes={REGRESSION.notes}
      />
      <FigureCaption text={REGRESSION.caption} source={source} citation={cite(source, "extra:regression")} />
    </figure>
  );
}

/* --------------------------------------------------------------- layout */

const HERO_SIZES = "(max-width: 1024px) calc(100vw - 48px), 960px";
const PLATE_SIZES = "(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) 50vw, 580px";

/** Section heading rhythm (design-spec §3.3): 96 px above an h2 (64 on phones), 24 below. */
function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="type-title mb-6">
      {children}
    </h2>
  );
}

function Section({ id, heading, children }: { id: string; heading: string; children: ReactNode }) {
  return (
    <section id={id} className="container-site mt-16 md:mt-24" aria-labelledby={`${id}-heading`}>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      {children}
    </section>
  );
}

/** Cards grouped by ground, one row per ground, so light and dark plates never share a row (§6). */
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
        <div key={ground} className="mt-12 flex flex-wrap items-start gap-x-6 gap-y-10">
          {list.map(({ image, label }) => (
            <CardFigure key={image.id} image={image} label={label} citation={cite(image.source, `fig:${image.id}`)} />
          ))}
        </div>
      ))}
    </>
  );
}

type CaseStudyProps = {
  project: Project;
  /** The next case study in lineup order. */
  next: Project;
};

/**
 * The case-study template (design-spec §6, §7): object hero, spec sheet, Why, How it works,
 * Versions (Robots), Results, What I did and what others did, Status with the Next link, and
 * Sources as the last section before the shared footer. Every word renders from `projects.ts`.
 */
export function CaseStudy({ project, next }: CaseStudyProps) {
  const { sectionHeadings: h } = site;
  const prose = proseOwners([
    ...project.spec.map((row, i) => ({ key: `spec-${i}`, text: row.value })),
    ...project.why.map((text, i) => ({ key: `why-${i}`, text })),
    ...project.results.map((text, i) => ({ key: `res-${i}`, text })),
    { key: "status", text: project.status },
    { key: "next", text: project.next },
  ]);
  const cite = buildCite(project, prose);
  const renderSpecValue = (row: SpecRow, i: number) => <Footnoted text={row.value} ownerKey={`spec-${i}`} owners={prose} />;
  const awardsHeading = project.spec.find((row) => row.value === site.labels.awardsNone)?.term ?? "Awards";
  const hero = project.hero;

  return (
    <article>
      {/* 1. Object hero */}
      <Container as="header" className="pt-8 md:pt-12">
        {"kind" in hero ? (
          <figure className="max-w-[960px]">
            <HexPipe title={hero.alt} desc={hero.caption} id={`hexpipe-${project.slug}`} />
            <FigureCaption text={hero.caption} source={hero.source} citation={cite(hero.source, "hero")} />
          </figure>
        ) : (
          <PlateFigure
            image={hero}
            aspect="16/10"
            sizes={HERO_SIZES}
            quality={90}
            priority
            transitionName={`plate-${project.slug}`}
            className="max-w-[960px]"
          />
        )}
        <h1 className="type-display mt-12 md:mt-16">{project.title}</h1>
        <p className="type-lead measure mt-6">{project.lead}</p>
      </Container>

      {/* 2. Spec sheet, and the robotics filmstrip under it */}
      <Container className="mt-10 md:mt-12">
        <SpecSheet rows={project.spec} renderValue={renderSpecValue} />
        {project.filmstrip ? (
          <Filmstrip tiles={project.filmstrip} label={project.versionsHeading} className="mt-8" />
        ) : null}
      </Container>

      {/* 3. Why */}
      <Section id="why" heading={h.why}>
        <Prose>
          {project.why.map((text, i) => (
            <p key={i}>
              <Footnoted text={text} ownerKey={`why-${i}`} owners={prose} />
            </p>
          ))}
        </Prose>
      </Section>

      {/* 4. How it works */}
      <Section id="how" heading={h.how}>
        <MomentSlot how={project.how} cite={cite} />
      </Section>

      {/* 5. Versions, or Robots */}
      <Section id="versions" heading={project.versionsHeading}>
        {project.robots ? (
          <div className="-mt-6">
            {project.robots.map((robot) => (
              <RobotSection key={robot.id} robot={robot} cite={cite} awardsHeading={awardsHeading} sizes={PLATE_SIZES} />
            ))}
          </div>
        ) : null}
        {project.versions.length > 0 ? (
          <VersionLedger caption={`${project.title}: ${project.versionsHeading}`} rows={project.versions} cite={cite} />
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
      <Section id="results" heading={h.results}>
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
      <Section id="who" heading={`${h.did}, ${h.others.charAt(0).toLowerCase()}${h.others.slice(1)}`}>
        <TwoLists left={{ heading: h.did, items: project.didList }} right={{ heading: h.others, items: project.othersList }} />
      </Section>

      {/* 8. Status and next */}
      <Section id="status" heading={h.status}>
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
        <Sources sources={project.sources} />
      </Container>
    </article>
  );
}

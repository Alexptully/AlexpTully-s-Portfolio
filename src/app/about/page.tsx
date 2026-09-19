import type { Metadata } from "next";
import { about } from "@/content/about";
import { site } from "@/content/site";
import type { Source } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/content/Prose";
import { Sources } from "@/components/content/Sources";
import { Timeline } from "@/components/content/Timeline";
import { AwardsList } from "@/components/content/AwardsList";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactBlock } from "@/components/about/ContactBlock";
import { SmallerPieces } from "@/components/about/SmallerPieces";
import {
  BacklinkAnchors,
  Footnoted,
  footnoteOwners,
  type FootnoteBlock,
} from "@/components/about/Footnoted";

export const metadata: Metadata = {
  title: about.title,
  description: about.bio[0],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: about.title,
    description: about.bio[0],
    url: "/about",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: about.title,
    description: about.bio[0],
  },
};

/* ---------------------------------------------------------------- citations */

/** 1-based position of a source in this page's Sources list; 0 when it is not in it. */
function indexOf(source: Source): number {
  return about.sources.indexOf(source) + 1;
}

/*
 * Every run of prose on the page, in render order. `footnoteOwners` gives the first marker
 * of each index the `id="ref-N"` anchor, so ids stay unique and the Sources list's
 * "Back to text" links all resolve.
 */
const bioBlocks: FootnoteBlock[] = about.bio.map((text, i) => ({ key: `bio-${i}`, text }));

const toolBlocks: FootnoteBlock[] = about.tools.lines.map((text, i) => ({
  key: `tools-${i}`,
  text,
  // The résumé backs all three lines; the marker sits once, at the end of the last.
  extra: i === about.tools.lines.length - 1 ? [indexOf(about.tools.source)] : undefined,
}));

const outreachBlocks: FootnoteBlock[] = about.outreach.lines.map((text, i) => ({
  key: `outreach-${i}`,
  text,
}));

/** Keys here must match the ones `SmallerPieces` renders. */
const pieceBlocks: FootnoteBlock[] = about.smallerPieces.items.map((item) => ({
  key: `piece-${item.id}`,
  text: item.description,
}));

const BLOCKS: FootnoteBlock[] = [...bioBlocks, ...toolBlocks, ...outreachBlocks, ...pieceBlocks];

const owners = footnoteOwners(BLOCKS);

/*
 * The timeline's markers carry no back-link id (a `Stat` elsewhere could cite the same
 * source), and the awards records name their source in words rather than with a marker. So
 * any source cited only there gets its `ref-N` anchor at the head of that section, and
 * "Back to text" lands on the list that makes the claim.
 */
const unowned = about.sources.map((_, i) => i + 1).filter((n) => !owners.has(n));
const inTimeline = new Set(about.timeline.rows.map((row) => indexOf(row.source)));
const inAwards = new Set(about.awards.records.map((award) => indexOf(award.source)));
const timelineAnchors = unowned.filter((n) => inTimeline.has(n));
const awardsAnchors = unowned.filter((n) => !inTimeline.has(n) && inAwards.has(n));
const orphanAnchors = unowned.filter((n) => !inTimeline.has(n) && !inAwards.has(n));

/* -------------------------------------------------------------------- page */

/**
 * /about (design-spec §8): bio, dated timeline, awards as records, tools, teaching and
 * outreach, smaller pieces, the contact block, then Sources as the last section inside
 * `<main>`. Text-led: content sits in columns 1–8 at 1440 with the prose at the 34 rem
 * measure, one column on phone. No canvas and no motion on this route.
 */
export default function AboutPage() {
  return (
    <Container className="pt-10 pb-4 lg:pt-16">
      {/*
        The prose blocks carry the 34 rem measure themselves, so the page needs no second,
        narrower column of its own: the timeline, the awards records and the smaller-pieces
        list take the same 1200 px rule they take on every case study. Capping the whole page
        at 780 px left the right half of every rule empty and made this the one route whose
        tables measured differently from the rest of the site.
      */}
      <div>
        <h1 className="type-display">{about.title}</h1>

        <Prose className="mt-8">
          {about.bio.map((text, i) => (
            <p key={text.slice(0, 32)}>
              <Footnoted block={bioBlocks[i]} owners={owners} />
            </p>
          ))}
        </Prose>

        <AboutSection id={about.timeline.id} heading={about.timeline.heading}>
          <BacklinkAnchors indices={timelineAnchors} />
          <Timeline rows={about.timeline.rows} sources={about.sources} termWidth="11rem" />
        </AboutSection>

        <AboutSection id={about.awards.id} heading={about.awards.heading}>
          <BacklinkAnchors indices={awardsAnchors} />
          <AwardsList awards={about.awards.records} />
        </AboutSection>

        <AboutSection id="tools" heading={about.tools.heading}>
          <ul className="type-body measure space-y-3">
            {about.tools.lines.map((line, i) => (
              <li key={line}>
                <Footnoted block={toolBlocks[i]} owners={owners} />
              </li>
            ))}
          </ul>
        </AboutSection>

        <AboutSection id="teaching-and-outreach" heading={about.outreach.heading}>
          <ul className="type-body measure space-y-3">
            {about.outreach.lines.map((line, i) => (
              <li key={line}>
                <Footnoted block={outreachBlocks[i]} owners={owners} />
              </li>
            ))}
          </ul>
        </AboutSection>

        <AboutSection id={about.smallerPieces.id} heading={about.smallerPieces.heading}>
          <SmallerPieces
            data={about.smallerPieces}
            extendedMemory={about.extendedMemory}
            owners={owners}
          />
        </AboutSection>

        <AboutSection id="contact" heading={about.contact.heading}>
          <ContactBlock lines={about.contact.lines} />
        </AboutSection>

        {/* A source nothing on the page marks: its back-link lands on the Sources list itself. */}
        <BacklinkAnchors indices={orphanAnchors} />

        <div className="mt-16 md:mt-24">
          <Sources sources={about.sources} />
        </div>
      </div>
    </Container>
  );
}

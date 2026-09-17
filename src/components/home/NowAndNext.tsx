import Link from "next/link";
import type { NowAndNext as NowAndNextData } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Timeline } from "@/components/content/Timeline";

type NowAndNextProps = {
  data: NowAndNextData;
};

/** Split the foot line around its link label so only that substring becomes the link. */
function FootLine({ text, linkLabel, href }: NowAndNextData["footLine"]) {
  const at = text.indexOf(linkLabel);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <Link href={href} className="link">
        {linkLabel}
      </Link>
      {text.slice(at + linkLabel.length)}
    </>
  );
}

/**
 * "Now and next" (design-spec §5.4): the h2 in columns 1–3, a three-row `<dl>` in columns
 * 4–12 (terms 4–5, descriptions 6–12), and one body line under it pointing at the smaller
 * pieces on the about page. Stacked on phone. No motion.
 */
export function NowAndNext({ data }: NowAndNextProps) {
  const headingId = "now-and-next-heading";
  return (
    <section id="now-and-next" aria-labelledby={headingId} className="mt-20 md:mt-32">
      <Container className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-5">
        <h2 id={headingId} className="type-title lg:col-span-3">
          {data.heading}
        </h2>
        <div className="lg:col-span-9">
          <Timeline
            rows={data.rows.map((r) => ({ when: r.term, what: r.description, source: r.source }))}
            termWidth="180px"
          />
          <p className="type-body mt-6 max-w-[60ch]">
            <FootLine {...data.footLine} />
          </p>
        </div>
      </Container>
    </section>
  );
}

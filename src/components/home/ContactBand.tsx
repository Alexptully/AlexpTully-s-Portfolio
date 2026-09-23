import Link from "next/link";
import type { ContactBand as ContactBandData } from "@/content/types";
import { Container } from "@/components/layout/Container";

type ContactBandProps = ContactBandData;

/**
 * The closing contact band (design-spec §5.5, graft 4): a full-bleed `--surface` band with the
 * name at display size, the email as the viewport's one pink element, tullytech.com with an
 * ink underline, the USC and BUILD line in muted 15 px, and "About me". Content in columns
 * 1–8 at `lg`; left-aligned and stacked on phone. No motion.
 */
export function ContactBand({ name, email, site, line, link }: ContactBandProps) {
  const headingId = "contact-heading";
  return (
    <section
      aria-labelledby={headingId}
      className="relative mt-24 overflow-hidden border-y border-border bg-surface md:mt-36"
    >
      {/* The emitter's light, spilling into the band from its upper right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_62%)]"
      />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative py-20 lg:py-32">
        <p className="type-label flex items-center gap-3">
          <span className="led" aria-hidden="true" />
          Contact
        </p>
        <h2 id={headingId} className="type-display mt-6 text-[clamp(3.25rem,1.5rem+8vw,9rem)]">
          {name}
        </h2>
        <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-12 md:gap-x-8">
          <ul className="flex flex-col items-start gap-4 md:col-span-7">
            <li>
              <a
                href={`mailto:${email}`}
                className="link-accent text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-medium tracking-[-0.03em]"
              >
                {email}
              </a>
            </li>
            <li className="type-lead">
              <a
                href={site.href}
                rel="noopener"
                className="underline decoration-1 decoration-ink underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-muted focus-visible:decoration-muted"
              >
                {site.label}
              </a>
            </li>
          </ul>
          <div className="md:col-span-5">
            {/* TODO(alex): open question 13 — USC and TroyLabs BUILD come only from the project brief; confirm public. */}
            <p className="type-caption max-w-[48ch]">{line}</p>
            <p className="type-body mt-6">
              <Link href={link.href} className="link">
                {link.label}
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

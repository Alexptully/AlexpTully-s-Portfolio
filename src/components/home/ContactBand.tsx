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
    <section aria-labelledby={headingId} className="mt-20 bg-surface md:mt-32">
      <Container className="py-20 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <div className="lg:col-span-8">
            <h2 id={headingId} className="type-display">
              {name}
            </h2>
            <ul className="type-lead mt-8 flex flex-col items-start gap-3">
              <li>
                <a href={`mailto:${email}`} className="link-accent">
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={site.href}
                  rel="noopener"
                  className="underline decoration-1 decoration-ink underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-muted focus-visible:decoration-muted"
                >
                  {site.label}
                </a>
              </li>
            </ul>
            {/* TODO(alex): open question 13 — USC and TroyLabs BUILD come only from the project brief; confirm public. */}
            <p className="type-caption mt-8 max-w-[60ch]">{line}</p>
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

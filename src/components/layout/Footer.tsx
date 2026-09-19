import type { ReactNode } from "react";
import { site } from "@/content/site";
import type { Source } from "@/content/types";
import { Container } from "@/components/layout/Container";
import { Sources } from "@/components/content/Sources";

type FooterProps = {
  /** The page's numbered sources, rendered in the right column under an h3. */
  sources?: Source[];
  /** Anything else for the right column. */
  children?: ReactNode;
};

/**
 * Shared footer (design-spec §5.6, §9). Left: the full name (its one use per page), the
 * email, tullytech.com, and the résumé link only when a phone-number-free PDF exists.
 * Right: the Sources slot. Small print sits on `--bg` at 14 px, never on `--surface` (§2.4).
 */
export function Footer({ sources, children }: FooterProps) {
  const { fullName, email, website, footer } = site;
  const hasRight = (sources && sources.length > 0) || children;

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-12 pt-16 pb-12 lg:grid-cols-12 lg:gap-x-5">
        <div className="lg:col-span-5">
          <address className="type-body flex flex-col items-start gap-1">
            <span>{fullName}</span>
            <a href={`mailto:${email}`} className="link">
              {email}
            </a>
            <a href={website.href} rel="noopener" className="link">
              {website.label}
            </a>
            {/* TODO(alex): résumé PDF without the phone number (open question 4). Nothing renders until `site.footer.resumePdf` is set. */}
            {footer.resumePdf ? (
              <a href={footer.resumePdf.href} className="link mt-3">
                {footer.resumePdf.label}
              </a>
            ) : null}
          </address>
        </div>

        {hasRight ? (
          <div className="lg:col-span-7">
            {sources && sources.length > 0 ? <Sources sources={sources} as="h3" /> : null}
            {children}
          </div>
        ) : null}

        {/* With no sources column the small print takes columns 6-12 rather than leaving the
            right half of the rule empty under the address. */}
        <p
          className={
            hasRight
              ? "type-footnote max-w-[60ch] lg:col-span-12"
              : "type-footnote max-w-[60ch] lg:col-span-7 lg:col-start-6 lg:row-start-1"
          }
        >
          {footer.smallPrint}
        </p>
      </Container>
    </footer>
  );
}

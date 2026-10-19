import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "@/components/layout/Wordmark";

/**
 * Site footer: contact and pages, the small print (the full legal name's one use per page),
 * and the wordmark set edge to edge as a sign-off. The giant wordmark is decorative; the text
 * above carries everything it says.
 */
export function SiteFooter() {
  const { fullName, email, website, footer } = site;
  const pages = site.nav.filter((item) => item.href.startsWith("/"));

  return (
    <footer className="site-footer mt-32 border-t border-border">
      <div className="container-site grid gap-12 pt-16 pb-12 md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-6 lg:col-span-5">
          <p className="type-label">(Contact)</p>
          <address className="mt-5 flex flex-col items-start gap-2 not-italic">
            <a href={`mailto:${email}`} className="footer-link type-lead text-ink">
              {email}
            </a>
            <a href={website.href} rel="noopener" className="footer-link type-lead text-ink">
              {website.label}
            </a>
            {/* TODO(alex): résumé PDF without the phone number (open question 4). Nothing renders until `site.footer.resumePdf` is set. */}
            {footer.resumePdf ? (
              <a href={footer.resumePdf.href} className="footer-link type-lead text-ink">
                {footer.resumePdf.label}
              </a>
            ) : null}
          </address>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-start-8 lg:col-span-2">
          <p className="type-label">(Pages)</p>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <Link href="/" className="footer-link type-lead text-ink">
                Home
              </Link>
            </li>
            {pages.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link type-lead text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col justify-between gap-6 md:col-span-3 lg:col-span-3">
          <p className="type-label">(Index)</p>
          <a href="#top" className="type-nav nav-link inline-flex h-11 items-center self-start">
            Back to top ↑
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 md:col-span-12 md:flex-row md:items-start md:justify-between">
          <p className="type-label text-muted">© 2026 {fullName}</p>
          <p className="type-footnote max-w-[60ch] text-quiet md:text-right">{footer.smallPrint}</p>
        </div>
      </div>

      <div className="container-site overflow-hidden" aria-hidden="true">
        <Wordmark className="wordmark--giant" />
      </div>
    </footer>
  );
}

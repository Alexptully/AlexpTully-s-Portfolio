import type { About } from "@/content/types";
import { site } from "@/content/site";

type LinkSpec = {
  text: string;
  href: string;
  className: string;
  external?: boolean;
};

/**
 * Turns the address written in `about.contact.lines` into links without holding any copy:
 * the email and `tullytech.com` are matched as substrings of the content file's own text.
 */
function Linkified({ text, links }: { text: string; links: LinkSpec[] }) {
  let best: { at: number; spec: LinkSpec } | null = null;
  for (const spec of links) {
    const at = text.indexOf(spec.text);
    if (at >= 0 && (best === null || at < best.at)) best = { at, spec };
  }
  if (!best) return <>{text}</>;
  const { at, spec } = best;
  return (
    <>
      {text.slice(0, at)}
      <a href={spec.href} className={spec.className} rel={spec.external ? "noopener" : undefined}>
        {spec.text}
      </a>
      <Linkified text={text.slice(at + spec.text.length)} links={links} />
    </>
  );
}

/**
 * The about page's contact block (design-spec §8.7, §9). Plain text links, no form: the
 * email carries the page's one pink underline, tullytech.com an ink one. The résumé link
 * renders only once a phone-number-free PDF exists in `site.footer.resumePdf`.
 */
export function ContactBlock({ lines }: { lines: About["contact"]["lines"] }) {
  const links: LinkSpec[] = [
    { text: site.email, href: `mailto:${site.email}`, className: "link-accent" },
    {
      text: site.website.label,
      href: site.website.href,
      className: "link",
      external: true,
    },
  ];

  return (
    <address className="type-lead measure flex flex-col items-start gap-3">
      {lines.map((line) => (
        <span key={line}>
          <Linkified text={line} links={links} />
        </span>
      ))}
      {/* TODO(alex): open questions 3 and 4 — a résumé PDF with the phone number removed, and
          whichever social links you want listed. Nothing renders until `site.footer.resumePdf`
          is set; no source lists a social account, so none is printed. */}
      {site.footer.resumePdf ? (
        <a href={site.footer.resumePdf.href} className="link">
          {site.footer.resumePdf.label}
        </a>
      ) : null}
    </address>
  );
}

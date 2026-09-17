import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type NextLinkProps = {
  title: string;
  href: string;
  className?: string;
};

/**
 * "Next: <product>" at the end of every case study (design-spec §4.2, §6.8), in lineup order.
 * Lead size, ink, a hairline underline that darkens on hover and focus so the link is a link
 * without colour. It sits above Sources, which is the last section before the shared footer.
 */
export function NextLink({ title, href, className }: NextLinkProps) {
  return (
    <p className={cn("type-lead", className)}>
      <Link href={href} className="link inline-flex min-h-11 items-center">
        {site.sectionHeadings.nextPrefix}: {title}
      </Link>
    </p>
  );
}

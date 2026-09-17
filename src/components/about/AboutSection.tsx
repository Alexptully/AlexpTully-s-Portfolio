import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
  /** Anchor target; `[id]` in globals.css gives every anchor its scroll-margin-top (§13). */
  id: string;
  heading: string;
  children: ReactNode;
  className?: string;
};

/**
 * One section of the about page (design-spec §8, §3.3): an h2 at the title scale with 96 px
 * of space above it (64 on phone) and 24 below, labelling its own section. No decoration:
 * the hairlines inside the lists carry the rhythm.
 */
export function AboutSection({ id, heading, children, className }: AboutSectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("mt-16 md:mt-24", className)}>
      <h2 id={headingId} className="type-title">
        {heading}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

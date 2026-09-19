import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Body-copy wrapper (design-spec §3.2): the 34rem measure, `text-wrap: pretty`, and
 * paragraph rhythm by spacing (1em between paragraphs, never indentation). Links inside
 * are underlined so they are discoverable without colour.
 */
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "type-body measure",
        "[&>p+p]:mt-[1em] [&>ul]:mt-[1em] [&>ol]:mt-[1em] [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&_li+li]:mt-[0.5em]",
        // Footnote markers are excluded: they carry their own `footnote-mark` styling, whose
        // underline appears on hover and focus only. Without the exclusion a marker inside a
        // prose block would grow a solid underline that the same marker in a caption does not.
        "[&_a:not(.footnote-mark)]:link",
        className,
      )}
    >
      {children}
    </div>
  );
}

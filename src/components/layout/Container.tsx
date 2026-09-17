import { createElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "article" | "nav" | "aside" | "header" | "footer";

type ContainerProps = {
  /** Element to render; defaults to a div. */
  as?: ContainerTag;
  className?: string;
  id?: string;
  children: ReactNode;
};

/**
 * The 1200 px content column with the §2.3 gutters (16 / 24 / 48 px).
 * Full-bleed bands wrap this in their own element and put the colour outside.
 */
export function Container({ as = "div", className, id, children }: ContainerProps) {
  return createElement(as, { id, className: cn("container-site", className) }, children);
}

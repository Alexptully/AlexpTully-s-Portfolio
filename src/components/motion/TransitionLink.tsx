import Link from "next/link";
import type { ComponentProps } from "react";
import type { TransitionType } from "./motion-config";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "transitionTypes"> & {
  /**
   * View-transition type(s) for this navigation: `nav-forward` (default, deeper), `nav-back`
   * (up a level), `curtain`, or any custom type the CSS handles. `false` sends none, which
   * gives the default crossfade.
   */
  transition?: TransitionType | (string & {}) | readonly string[] | false;
};

/**
 * `next/link` with a transition type. Next 16.2+ supports `transitionTypes` on `<Link>` (checked
 * in node_modules/next/dist/client/app-dir/link.d.ts), which calls `addTransitionType` inside
 * the navigation transition, so `<PageTransition>` and the CSS in motion.css can pick the
 * animation. Works in Server Components; no client JS of its own.
 */
export function TransitionLink({ transition = "nav-forward", ...props }: TransitionLinkProps) {
  const transitionTypes =
    transition === false ? undefined : typeof transition === "string" ? [transition] : [...transition];
  return <Link {...props} transitionTypes={transitionTypes} />;
}

import { notFound } from "next/navigation";
import { PageTransition } from "@/components/motion/PageTransition";
import { SharedElement } from "@/components/motion/SharedElement";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TransitionLink } from "@/components/motion/TransitionLink";

/** Second lab page: the other end of the page-transition and shared-element tests. Dev only. */
export default function MotionLabNextPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Dev only</p>
        <SplitReveal as="h1" text="Second lab page" trigger="mount" className="mt-6 text-4xl font-semibold md:text-6xl" />
        <div className="mt-12 flex flex-wrap items-center gap-6">
          <TransitionLink href="/lab/motion" transition="nav-back" className="underline">
            Back (nav-back)
          </TransitionLink>
          <TransitionLink href="/lab/motion" transition="curtain" className="underline">
            Back (curtain)
          </TransitionLink>
        </div>
        <div className="mt-12">
          <SharedElement name="lab-square">
            <div className="h-48 w-full max-w-md rounded-photo bg-accent" />
          </SharedElement>
        </div>
      </div>
    </PageTransition>
  );
}

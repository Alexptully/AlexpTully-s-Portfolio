import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { HoverPreviewProvider, PreviewTarget } from "@/components/motion/HoverPreview";
import { Marquee } from "@/components/motion/Marquee";
import { PageTransition } from "@/components/motion/PageTransition";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SharedElement } from "@/components/motion/SharedElement";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { LabStatus } from "./_components/LabStatus";
import { MenuDemo } from "./_components/MenuDemo";
import { PreloaderReplay } from "./_components/PreloaderReplay";

/*
 * Dev-only test bench: every motion primitive with neutral styling and placeholder text.
 * No portfolio copy or images live here. 404s in production (here and in lab/layout.tsx).
 */

const rows = [
  { id: "one", title: "Row one", year: "2026", tone: "bg-render-blue" },
  { id: "two", title: "Row two", year: "2025", tone: "bg-honu-green" },
  { id: "three", title: "Row three", year: "2024", tone: "bg-clay" },
];

function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-12">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{title}</h2>
      <p className="mt-2 max-w-prose text-sm text-muted">{note}</p>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Swatch({ tone, label }: { tone: string; label: string }) {
  return (
    <span className={`flex aspect-[4/3] w-full items-end rounded-photo p-3 ${tone}`}>
      <span className="font-mono text-xs text-ink-dark">{label}</span>
    </span>
  );
}

export default function MotionLabPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-8">
        <header className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Dev only</p>
          <SplitReveal as="h1" text="Motion lab: every primitive, unstyled" by="lines" trigger="mount" className="text-4xl font-semibold leading-tight md:text-6xl" />
          <LabStatus />
        </header>

        <Section title="SplitReveal" note="Masked lines, words and characters. Static without JS and under reduced motion.">
          <div className="flex flex-col gap-10">
            <SplitReveal as="h2" text="Lines slide up out of their masks as this heading enters" by="lines" className="text-3xl font-semibold leading-tight" />
            <SplitReveal as="h3" text="Words rise one after another" by="words" className="text-2xl font-semibold" />
            <SplitReveal as="h3" text="Characters, briefly" by="chars" className="text-2xl font-semibold" />
          </div>
        </Section>

        <Section title="Reveal" note="Elements on screen at mount are never hidden. The rest reveal once on scroll.">
          <div className="grid gap-6 md:grid-cols-3">
            <Reveal variant="up" className="rounded-photo border border-border p-6">
              <p>variant=&quot;up&quot;</p>
            </Reveal>
            <Reveal variant="fade" className="rounded-photo border border-border p-6">
              <p>variant=&quot;fade&quot;</p>
            </Reveal>
            <Reveal variant="mask" className="rounded-photo border border-border p-6">
              <p>variant=&quot;mask&quot;</p>
            </Reveal>
          </div>
          <Reveal as="ul" each stagger={0.1} className="mt-8 grid gap-3">
            {["Staggered child one", "Staggered child two", "Staggered child three", "Staggered child four"].map((t) => (
              <li key={t} className="rounded-photo border border-border p-4">
                <p>{t}</p>
              </li>
            ))}
          </Reveal>
        </Section>

        <Section
          title="HoverPreview"
          note="Fine pointers: one floating layer follows the cursor; keyboard focus shows it beside the row. Touch and reduced motion: inline thumbnails instead."
        >
          <HoverPreviewProvider>
            <ul className="border-b border-border">
              {rows.map((row) => (
                <PreviewTarget
                  as="li"
                  key={row.id}
                  preview={<Swatch tone={row.tone} label={`${row.title} preview`} />}
                  className="border-t border-border"
                >
                  <TransitionLink href="/lab/motion/next" className="grid grid-cols-[1fr_auto] items-center gap-4 py-5" data-cursor="Open">
                    <span className="text-xl">{row.title}</span>
                    <span className="font-mono text-xs text-muted">{row.year}</span>
                    <span data-hover-inline className="col-span-2 block w-40">
                      <Swatch tone={row.tone} label="inline thumbnail" />
                    </span>
                  </TransitionLink>
                </PreviewTarget>
              ))}
            </ul>
          </HoverPreviewProvider>
        </Section>

        <Section title="Marquee" note="CSS only. Pauses on hover and focus. Under reduced motion the copy stops and wraps.">
          <Marquee duration={20} className="border-y border-border py-4 text-2xl">
            <span>Marquee item one</span>
            <span aria-hidden="true">/</span>
            <span>Marquee item two</span>
            <span aria-hidden="true">/</span>
            <a href="#marquee-link" className="underline">
              a link inside
            </a>
            <span aria-hidden="true">/</span>
          </Marquee>
        </Section>

        <Section title="Cursor" note="Fine pointers only, native cursor kept. Hover the boxes: the dot grows into their data-cursor label.">
          <div className="flex flex-wrap gap-4">
            <div data-cursor="View" className="grid h-32 w-48 place-items-center rounded-photo border border-border">
              <p>data-cursor=&quot;View&quot;</p>
            </div>
            <div data-cursor="Drag" className="grid h-32 w-48 place-items-center rounded-photo border border-border">
              <p>data-cursor=&quot;Drag&quot;</p>
            </div>
          </div>
        </Section>

        <Section title="Parallax" note="Scrubbed transform on desktop fine pointers. At rest on touch, under reduced motion and in print.">
          <div className="relative h-72 overflow-hidden rounded-photo border border-border">
            <Parallax amount={48} className="absolute inset-x-0 -inset-y-12 grid place-items-center bg-surface">
              <p className="font-mono text-xs">Parallax layer</p>
            </Parallax>
          </div>
        </Section>

        <Section title="MenuOverlay" note="Full-screen dialog: focus trap, Escape, inert page, focus returns to the trigger.">
          <MenuDemo />
        </Section>

        <Section title="Preloader" note="First page of a session only, CSS-driven, 1.2 s cap, click-through. Never without JS or under reduced motion.">
          <PreloaderReplay />
        </Section>

        <Section title="Page transitions" note="TransitionLink passes transitionTypes; PageTransition maps them to classes; the square morphs as a SharedElement.">
          <div className="flex flex-wrap items-center gap-6">
            <SharedElement name="lab-square">
              <div className="size-24 rounded-photo bg-accent" />
            </SharedElement>
            <TransitionLink href="/lab/motion/next" className="underline">
              nav-forward
            </TransitionLink>
            <TransitionLink href="/lab/motion/next" transition="curtain" className="underline">
              curtain
            </TransitionLink>
            <TransitionLink href="/lab/motion/next" transition={false} className="underline">
              untyped (crossfade)
            </TransitionLink>
          </div>
        </Section>

        <div className="h-[40vh]" aria-hidden="true" />
        <Reveal variant="up">
          <p id="marquee-link" className="text-sm text-muted">
            End of lab. This line reveals only when scrolled to.
          </p>
        </Reveal>
      </div>
    </PageTransition>
  );
}

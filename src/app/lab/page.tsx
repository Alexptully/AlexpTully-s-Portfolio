import type { Metadata } from "next";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { ViewTransition } from "react";
import LabCanvas from "@/components/three/LabCanvas";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import montiRobot from "../../../public/images/lab/01-monti-robot.jpg";

// Scoped to this page. next/font/google downloads and self-hosts the files at build
// time, so `next build` needs network access to fonts.googleapis.com / fonts.gstatic.com.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-lab-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lab: 3D and motion proof",
  description:
    "Internal proof page for the React Three Fiber, motion, next/image and next/font stack.",
  robots: { index: false, follow: false },
};

const checks = [
  "React Three Fiber <Canvas> loaded client-only through next/dynamic with ssr:false from a Client Component",
  "Instanced IR LED array plus a MeshPhysicalMaterial glass lens, drei <Float>, pointer parallax in useFrame",
  "Frameloop pauses for prefers-reduced-motion, when scrolled off-screen, in a hidden tab, or with the Pause button",
  "motion/react staggered whileInView reveal (this list), reduced motion handled by MotionConfig",
  "next/image static import from public/ with automatic width, height and blurDataURL",
  "React <ViewTransition> imported from 'react' with no Next config (wraps the scene above)",
];

export default function LabPage() {
  return (
    <MotionProvider>
      <main
        className={`${display.variable} mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-16 sm:px-6`}
      >
        <header className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Lab</p>
          <h1 className="font-(family-name:--font-lab-display) text-4xl font-medium tracking-tight sm:text-5xl">
            3D and motion stack proof
          </h1>
          <p className="max-w-prose text-neutral-500">
            Not linked from the site and excluded from search. It exists to confirm the
            rendering stack builds and behaves before the real pages are written.
          </p>
        </header>

        {/* No config needed: the App Router ships React canary, which exports ViewTransition. */}
        <ViewTransition name="lab-hero" default="none">
          <LabCanvas />
        </ViewTransition>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">What this page checks</h2>
          <Reveal className="grid gap-3 sm:grid-cols-2">
            {checks.map((check) => (
              <RevealItem
                key={check}
                className="rounded-xl border border-border p-4 text-sm leading-relaxed"
              >
                {check}
              </RevealItem>
            ))}
          </Reveal>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">next/image static import</h2>
          <figure className="flex flex-col gap-2">
            <Image
              src={montiRobot}
              alt="Portfolio page for Monti, FTC #17253: blue CAD renders of the modular robot and its three-ball intake, with Alex's role as captain, design notes and awards"
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full rounded-xl"
            />
            <figcaption className="text-xs text-neutral-500">
              Source {montiRobot.width}×{montiRobot.height}; blurDataURL{" "}
              {montiRobot.blurDataURL ? "generated at build time" : "missing"}.
            </figcaption>
          </figure>
        </section>
      </main>
    </MotionProvider>
  );
}

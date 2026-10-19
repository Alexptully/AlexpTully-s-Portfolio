import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Motion lab",
  robots: { index: false, follow: false },
};

/** Dev-only test bench for src/components/motion/*. 404s in production. The root layout wires the motion layer. */
export default function LabLayout({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") notFound();
  return <>{children}</>;
}

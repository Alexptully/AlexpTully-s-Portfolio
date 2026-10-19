"use client";

import { useState } from "react";
import { MenuOverlay, type MenuLink } from "@/components/motion/MenuOverlay";

const links: MenuLink[] = [
  { href: "/lab/motion", label: "Lab", current: true },
  { href: "/lab/motion/next", label: "Second lab page", transition: "nav-forward" },
  { href: "/lab/motion/next", label: "Second page (curtain)", transition: "curtain" },
];

/** Trigger + overlay. The trigger owns aria-expanded / aria-controls. */
export function MenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 items-center rounded-control border border-border px-4"
        aria-expanded={open}
        aria-controls="lab-menu"
        onClick={() => setOpen(true)}
      >
        Open menu
      </button>
      <MenuOverlay
        id="lab-menu"
        label="Lab menu"
        open={open}
        onOpenChange={setOpen}
        links={links}
        className="flex flex-col gap-8 p-6 md:p-12"
      >
        <p className="text-sm text-muted">Escape closes. Tab stays inside. The page behind is inert.</p>
      </MenuOverlay>
    </>
  );
}

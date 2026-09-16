"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the group that must be visible before it plays (0..1). */
  amount?: number;
};

/**
 * Staggered reveal. Wrap each child in `<RevealItem>`; they fade and rise in sequence
 * the first time `amount` of the group scrolls into view. With `<MotionProvider>` above,
 * users who prefer reduced motion get the opacity change only (no `y` movement).
 */
export function Reveal({ children, className, amount = 0.3 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

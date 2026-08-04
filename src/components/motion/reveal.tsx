"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Entrance animations.
 *
 * These are one-shot: they play once when the element scrolls into view and
 * then stop. Nothing here is scroll-*linked*, which is the expensive kind —
 * a scroll-linked transform recalculates on every frame of every scroll, and
 * on a mid-range Android that is the difference between 60fps and 40.
 *
 * The distances are small on purpose (16px, not 80px). A large travel distance
 * reads as a website announcing its own animation; a small one just feels like
 * the page settling.
 */

const DISTANCE = 16;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Motion's viewport margin: start the animation slightly before it's visible. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = Omit<ComponentProps<typeof motion.div>, "variants"> & {
  children: ReactNode;
  /** Seconds. Use sparingly — staggered lists should use <Stagger> instead. */
  delay?: number;
};

export function Reveal({ children, delay = 0, className, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={revealVariants}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/**
 * Parent for a list whose children should cascade in. Pairs with <StaggerItem>.
 * Prefer this over hand-tuned per-item delays: adding or removing a row then
 * needs no renumbering.
 */
export function Stagger({ children, className, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={revealVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

type TextRevealProps = {
  /**
   * One entry per visual line. Lines are authored rather than measured: any
   * runtime line-splitting either blocks paint or reflows after fonts load,
   * and both are worse than deciding the break yourself.
   */
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * The hero's line-by-line mask reveal — each line rises out from behind a
 * clipped box. Used exactly once per page. Repeating it turns a statement
 * into a tic.
 */
export function TextReveal({ lines, className, lineClassName, delay = 0 }: TextRevealProps) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: lines are a fixed, authored list
        <span key={index} className="block overflow-hidden pb-[0.12em]">
          {reduced ? (
            <span className={cn("block", lineClassName)}>{line}</span>
          ) : (
            <motion.span
              className={cn("block", lineClassName)}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: delay + index * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

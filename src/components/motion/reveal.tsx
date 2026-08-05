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

/**
 * Deliberately narrower than RevealProps: the two element types do not share
 * an event-handler surface, so inheriting `motion.div`'s props makes `li`
 * untypeable. Nothing passes more than this anyway.
 */
type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /**
   * `li` exists because a `<ul>` may only contain `<li>`. Wrapping each row in
   * a motion `div` and leaning on `display: contents` fixes the layout but not
   * the semantics — the list stops being a list, and a screen reader stops
   * announcing how many items are in it.
   */
  as?: "div" | "li";
};

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return as === "li" ? (
      <li className={className}>{children}</li>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  return as === "li" ? (
    <motion.li variants={revealVariants} className={className}>
      {children}
    </motion.li>
  ) : (
    <motion.div variants={revealVariants} className={className}>
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
  /**
   * Steps each line back in Z so they parallax when an ancestor tilts.
   * Only meaningful inside <Perspective>; harmless without it.
   *
   * The offset goes on the clipping wrapper, not the inner span. `overflow:
   * hidden` forces its own children to flatten, so a Z applied inside the mask
   * would be silently dropped — the wrapper has to carry the depth itself.
   */
  depth?: boolean;
};

/**
 * The hero's line-by-line mask reveal — each line rises out from behind a
 * clipped box. Used exactly once per page. Repeating it turns a statement
 * into a tic.
 */
export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  depth = false,
}: TextRevealProps) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("block", depth && "transform-3d", className)}>
      {lines.map((line, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: lines are a fixed, authored list
          key={index}
          className="block overflow-hidden pb-[0.12em]"
          style={
            depth ? { transform: `translateZ(calc(var(--depth-step) * ${index}))` } : undefined
          }
        >
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

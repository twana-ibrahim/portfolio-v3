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

/**
 * Marks every element that Motion may have given an entrance style.
 *
 * `globals.css` neutralises `[data-motion]` inside its reduced-motion block.
 * That indirection is not decoration — it is the only thing that works.
 *
 * `useReducedMotion()` cannot know the preference while the server renders, so
 * the server always emits the animated branch and Motion serialises its
 * initial state into the HTML:
 *
 *   <div  style="opacity:0;transform:translateY(16px)">
 *   <span style="transform:translateY(110%)">
 *
 * On the client the reduced branch then renders instead — and the styles stay
 * exactly as the server wrote them. React does not correct mismatched inline
 * styles on a hydration pass in a production build; it warns in development
 * and moves on. So neither dropping the `style` prop nor authoring an
 * overriding one removes them. Measured, not assumed: with the style prop
 * present the DOM still read `transform:translateY(110%)`.
 *
 * The result was a blank site for every reduced-motion user — every Reveal
 * stuck at opacity 0, every headline line still translated below its clipping
 * mask. The existing CSS guard could not catch it either: it zeroes transition
 * and animation durations, and an inline transform is neither.
 *
 * The marker goes on BOTH branches, because the leftover style is on the
 * element the reduced branch hydrates into.
 */
const MOTION_MARKER = { "data-motion": "" } as const;

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
    return (
      <div className={className} {...MOTION_MARKER}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={revealVariants}
      transition={{ delay }}
      className={className}
      {...MOTION_MARKER}
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
    return (
      <div className={className} {...MOTION_MARKER}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerVariants}
      className={className}
      {...MOTION_MARKER}
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
      <li className={className} {...MOTION_MARKER}>
        {children}
      </li>
    ) : (
      <div className={className} {...MOTION_MARKER}>
        {children}
      </div>
    );
  }

  return as === "li" ? (
    <motion.li variants={revealVariants} className={className} {...MOTION_MARKER}>
      {children}
    </motion.li>
  ) : (
    <motion.div variants={revealVariants} className={className} {...MOTION_MARKER}>
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
            <span className={cn("block", lineClassName)} {...MOTION_MARKER}>
              {line}
            </span>
          ) : (
            <motion.span
              className={cn("block", lineClassName)}
              {...MOTION_MARKER}
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

"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { DURATION, EASE_OUT_EXPO, STAGGER } from "@/components/motion/tokens";
import { cn } from "@/lib/utils/cn";

/**
 * One-shot entrances, never scroll-linked. 16px of travel, not 80: a long
 * distance reads as a site announcing its animation, a short one as the page
 * settling.
 */

const DISTANCE = 16;

/**
 * Neutralised by `[data-motion]` in the reduced-motion block of globals.css,
 * and that indirection is the only thing that works.
 *
 * The server cannot know the preference, so it emits the animated branch and
 * Motion serialises `opacity:0;transform:translateY(16px)` into the HTML. The
 * client renders the reduced branch and those styles stay — React does not
 * correct mismatched inline styles on hydration in production. The site loaded
 * blank for every reduced-motion user.
 *
 * On both branches, because the leftover style sits on the element the reduced
 * branch hydrates into.
 */
const MOTION_MARKER = { "data-motion": "" } as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0 },
};

/**
 * Not inside the variant. Motion resolves timing as `variant.transition ??
 * props.transition` — a replacement, not a merge — so a variant carrying its
 * own duration swallowed every `delay` passed next to it. Living here also
 * leaves `delay` absent for <StaggerItem>, whose offset the parent computes.
 */
const revealTransition = { duration: DURATION.slow, ease: EASE_OUT_EXPO } as const;

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
      transition={{ ...revealTransition, delay }}
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
  visible: { transition: { staggerChildren: STAGGER.item, delayChildren: STAGGER.lead } },
};

/** No `delay`: the children's offsets come from the variant above, and the
 *  prop would only ever have reached the DOM as an unknown attribute. */
type StaggerProps = Omit<RevealProps, "delay">;

/** Cascades its children in. Pairs with <StaggerItem>, so adding a row needs
 *  no renumbering of hand-tuned delays. */
export function Stagger({ children, className, ...props }: StaggerProps) {
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

/** Narrower than RevealProps: the two element types share no event-handler
 *  surface, so inheriting motion.div's props makes `li` untypeable. */
type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  /** `li` because a `<ul>` may only contain `<li>`. `display: contents` fixes
   *  the layout but not the semantics — the list stops being a list. */
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
    <motion.li
      variants={revealVariants}
      transition={revealTransition}
      className={className}
      {...MOTION_MARKER}
    >
      {children}
    </motion.li>
  ) : (
    <motion.div
      variants={revealVariants}
      transition={revealTransition}
      className={className}
      {...MOTION_MARKER}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

type TextRevealProps = {
  /** One entry per visual line, authored rather than measured: runtime
   *  splitting either blocks paint or reflows after the webfont loads. */
  lines: readonly ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /**
   * Steps each line back in Z so they parallax inside <Perspective>; harmless
   * without it. The offset goes on the clipping wrapper — `overflow: hidden`
   * flattens its children, so a Z applied inside the mask is dropped.
   */
  depth?: boolean;
};

/** The hero's mask reveal. Used once per page; repeating it turns a statement
 *  into a tic. */
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
                duration: DURATION.reveal,
                delay: delay + index * STAGGER.line,
                ease: EASE_OUT_EXPO,
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

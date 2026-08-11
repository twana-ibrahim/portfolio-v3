"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Cursor-driven depth.
 *
 * The contents sit on a plane that tilts toward the pointer. Children given
 * their own `translateZ` parallax against one another instead of moving as a
 * single flat card, which is the whole difference between "3D" and "a div
 * that rotates".
 *
 * Applied to the typography rather than to a decorative object beside it. An
 * unrelated floating shape is the generic version of this effect and dates
 * immediately; the headline already is the brand, so putting the depth there
 * reads as commitment to the design rather than ornament stuck onto it.
 *
 * Deliberately not a background layer. A decorative plane behind the text
 * would stop axe resolving what the text sits on and silently turn the
 * contrast suite from "checked" into "incomplete" — the same trap the paper
 * grain fell into. Transforming existing elements has no such cost.
 */

/** Degrees at the far edge of the viewport. Past ~6 it reads as a novelty. */
const MAX_TILT = 4;

/** Damping for the follow. Loose enough to feel physical, tight enough to settle. */
const SPRING = { stiffness: 120, damping: 24, mass: 0.6 } as const;

type PerspectiveProps = {
  children: ReactNode;
  className?: string;
  /** Scales the tilt. Use below 1 for layers that should lag behind. */
  intensity?: number;
};

export function Perspective({ children, className, intensity = 1 }: PerspectiveProps) {
  const reduced = useReducedMotion();

  /**
   * Coarse pointers have no cursor to follow, so the effect would either do
   * nothing or lurch on tap. Checked at runtime rather than by viewport width
   * — a touchscreen laptop is wide and still has no hover.
   */
  const [hasFinePointer, setHasFinePointer] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);

  const tilt = MAX_TILT * intensity;
  const rotateX = useTransform(springY, [-1, 1], [tilt, -tilt]);
  const rotateY = useTransform(springX, [-1, 1], [-tilt, tilt]);

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine)");
    setHasFinePointer(query.matches);

    const onChange = (event: MediaQueryListEvent) => setHasFinePointer(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const active = hasFinePointer && !reduced;

  useEffect(() => {
    if (!active) return;

    let frame = 0;

    // Tracked against the viewport rather than the element: the headline is
    // most of the screen, so element-relative coordinates would saturate at
    // the edges and stop responding.
    const onPointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
        pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [active, pointerX, pointerY]);

  /**
   * One tree shape in both states. `active` is false until the pointer query
   * resolves, and returning a different structure then changes the element
   * type here — React discards the headline and remounts it, restarting the
   * mask from hidden. Invisible on a fast machine, a visible snap-back on a
   * slow one. Only the transform is conditional.
   */
  return (
    <div className={cn(active && "perspective-type", className)}>
      <motion.div style={active ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}>
        {children}
      </motion.div>
    </div>
  );
}

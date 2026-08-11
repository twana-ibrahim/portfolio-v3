/**
 * The JavaScript half of the motion tokens.
 *
 * `src/styles/tokens.css` stays the source of truth; these mirror it by hand
 * because Motion resolves `duration` and `ease` itself, before any stylesheet
 * is consulted — a `var(--duration-slow)` handed to a transition is taken as
 * the literal string and dropped. The two files must be edited together.
 *
 * Seconds here, milliseconds there. That is Motion's unit, not a choice.
 */

/** `--ease-out-expo`. Entrances only; state changes use the quart curves. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  /** `--duration-slow` — the fade-and-lift entrance. */
  slow: 0.7,
  /** `--duration-reveal` — the hero's mask, the longest thing on the site. */
  reveal: 0.9,
} as const;

/**
 * Offsets between siblings, with no counterpart in `tokens.css`: nothing in
 * CSS staggers, and a custom property no stylesheet reads is dead weight that
 * still looks authoritative.
 */
export const STAGGER = {
  /** Gap between cascading rows. */
  item: 0.07,
  /** Beat before the first row moves, so the group reads as one gesture. */
  lead: 0.05,
  /** Gap between the hero's headline lines. Wider than `item` — three lines
   *  of one sentence, each of which should land on its own. */
  line: 0.09,
} as const;

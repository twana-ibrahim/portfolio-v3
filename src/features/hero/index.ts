/**
 * Public API of the hero slice.
 *
 * Everything outside `features/hero` imports from here, never from a file
 * inside `components/`. That indirection is what lets the slice be restructured
 * without touching a single call site.
 */
export { Hero } from "./components/hero";

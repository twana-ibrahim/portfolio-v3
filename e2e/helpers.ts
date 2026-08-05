import type { Page } from "@playwright/test";

/**
 * Every public route.
 *
 * `/work/[slug]` is absent on purpose: there are no case studies yet, so
 * `generateStaticParams` returns nothing and `dynamicParams: false` makes
 * every slug a 404. Add the slug here when the first one is written.
 */
export const routes = [
  { path: "/", name: "home" },
  { path: "/work", name: "work" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
] as const;

/**
 * Brings a page to a state worth asserting against.
 *
 * `globals.css` sets `scroll-behavior: smooth`, so a scripted scroll never
 * arrives unless it passes `behavior: "instant"` — and until it arrives the
 * `whileInView` reveals below the fold stay at opacity 0. That reads as a
 * rendering bug in a screenshot and as a contrast violation to axe, and is
 * neither. Scroll to the bottom to fire every reveal, then return to the top.
 */
export async function settle(page: Page) {
  await page.evaluate(async () => {
    // Stepped, not a single jump to the bottom. IntersectionObserver reports
    // what is intersecting when it samples, so moving from scroll 0 to
    // scrollHeight in one frame takes every mid-page element from below the
    // fold to above it without ever being inside it — the observer never
    // fires, `whileInView` never runs, and whole sections stay at opacity 0.
    // That reads as a rendering bug in a screenshot and is purely an artefact
    // of how the page was scrolled.
    const step = window.innerHeight * 0.6;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
  });

  // One-shot entrances are ~700ms at the slowest token, plus stagger.
  await page.waitForTimeout(900);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(150);
}

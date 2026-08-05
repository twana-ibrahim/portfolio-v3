import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { routes, settle } from "./helpers";

/**
 * Both themes are scanned because the palette is remapped in `.dark`, so
 * contrast is a genuinely different question in each. The theme comes from
 * `prefers-color-scheme` rather than a click: next-themes runs with
 * `defaultTheme: "system"`, so emulating the media query resolves before
 * first paint and there is no toggle race to wait out.
 */
for (const theme of ["light", "dark"] as const) {
  test.describe(`${theme} theme`, () => {
    /**
     * Scanned with motion off. The entrances animate opacity, so under load a
     * scan can catch an element mid-fade and report a contrast failure that
     * only ever existed for 300ms — the suite went from green to red purely on
     * worker count. Reduced motion makes every reveal render its final state
     * immediately, which is the state worth auditing, and exercises the
     * reduced-motion branch of each motion component as a side effect.
     */
    test.use({ colorScheme: theme, contextOptions: { reducedMotion: "reduce" } });

    for (const route of routes) {
      test(`${route.name} has no accessibility violations`, async ({ page }) => {
        await page.goto(route.path);

        // Guards against the scan passing because the theme never applied.
        await expect(page.locator("html")).toHaveClass(new RegExp(`\\b${theme}\\b`));

        await settle(page);

        const { violations } = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();

        expect(
          violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target.join(" ")),
          })),
        ).toEqual([]);
      });
    }
  });
}

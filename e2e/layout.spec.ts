import { expect, test } from "@playwright/test";
import { routes, settle } from "./helpers";

/**
 * Breakpoint sweep.
 *
 * The previous visual pass covered 390 and 1440 by screenshot. These are the
 * widths either side of those: the two the grid changes at, and the two where
 * a max-width either has not engaged yet or has been exceeded.
 */
const WIDTHS = [
  { width: 768, name: "768 (md — grid switches to columns)" },
  { width: 1024, name: "1024 (lg)" },
  { width: 1920, name: "1920 (beyond the container max)" },
] as const;

test.describe("no horizontal overflow", () => {
  for (const { width, name } of WIDTHS) {
    for (const route of routes) {
      test(`${route.name} at ${name}`, async ({ page }, testInfo) => {
        // Viewport is forced below, so the mobile profile would only repeat
        // this at exactly the same widths.
        test.skip(testInfo.project.name === "mobile", "viewport is forced");

        await page.setViewportSize({ width, height: 900 });
        await page.goto(route.path);
        await settle(page);

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          if (doc.scrollWidth <= doc.clientWidth) return null;

          // Name the culprit rather than just failing: the widest element whose
          // right edge is past the viewport is almost always the cause.
          const guilty = [...document.querySelectorAll<HTMLElement>("body *")]
            .map((el) => ({
              rect: el.getBoundingClientRect(),
              tag: el.tagName.toLowerCase(),
              cls: el.className?.toString().slice(0, 80) ?? "",
            }))
            .filter((e) => e.rect.right > doc.clientWidth + 1)
            .sort((a, b) => b.rect.right - a.rect.right)
            .slice(0, 3)
            .map((e) => `${e.tag}.${e.cls} → right ${Math.round(e.rect.right)}px`);

          return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, guilty };
        });

        expect(overflow).toBeNull();
      });
    }
  }
});

test.describe("the container respects its max width", () => {
  test("content stops widening past 1920", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "viewport is forced");

    await page.setViewportSize({ width: 1920, height: 900 });
    await page.goto("/");

    // An editorial layout that keeps stretching turns line length into
    // something unreadable at desk width; the container exists to stop that.
    const width = await page
      .locator("main .mx-auto")
      .first()
      .evaluate((el) => el.getBoundingClientRect().width);

    expect(width).toBeLessThan(1920);
  });
});

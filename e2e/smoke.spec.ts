import { expect, test } from "@playwright/test";
import { routes } from "./helpers";

test.describe("every route renders", () => {
  for (const route of routes) {
    test(`${route.name} responds, titles itself and has one h1`, async ({ page }) => {
      // Vercel serves the analytics and speed-insights scripts from its own
      // edge, so both 404 against `next start` and are noise anywhere except a
      // real deployment. They are the only thing excused.
      const isEdgeTelemetry = (url: string) => url.includes("/_vercel/");

      const errors: string[] = [];
      const failedRequests: string[] = [];

      page.on("pageerror", (error) => errors.push(error.message));

      page.on("console", (message) => {
        if (message.type() !== "error") return;
        const text = message.text();
        // "Failed to load resource" carries no URL, so it cannot be judged
        // here. Broken assets are caught from responses below instead, which
        // do name the file.
        if (isEdgeTelemetry(text) || text.startsWith("Failed to load resource")) return;
        errors.push(text);
      });

      page.on("response", (response) => {
        const url = response.url();
        if (response.status() >= 400 && !isEdgeTelemetry(url)) {
          failedRequests.push(`${response.status()} ${url}`);
        }
      });

      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(/\S/);

      // Exactly one — an editorial layout with two h1s is a heading-order bug
      // that axe will not catch, because both are individually valid.
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();

      await expect(page.getByRole("banner")).toBeVisible();
      await expect(page.getByRole("contentinfo")).toBeVisible();

      expect(errors).toEqual([]);
      expect(failedRequests).toEqual([]);
    });
  }
});

test("primary navigation reaches every page", async ({ page }, testInfo) => {
  // The desktop nav is hidden below md, where the dialog covers this instead.
  test.skip(testInfo.project.name === "mobile", "covered by the mobile nav test");

  await page.goto("/");

  // Scoped to the header: the footer links to the same three pages, so an
  // unscoped role query matches two elements and fails strict mode.
  const mainNav = page.getByRole("navigation", { name: "Main" });

  for (const { path, label } of [
    { path: "/work", label: "Work" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/", label: "Home" },
  ]) {
    await mainNav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(path);
    await expect(mainNav.getByRole("link", { name: label })).toHaveAttribute(
      "aria-current",
      "page",
    );

    // Exactly one. The home link is the trap here: every pathname starts with
    // "/", so a prefix match would mark Home current on every page and the
    // per-link assertion above would still pass.
    await expect(mainNav.locator("[aria-current='page']")).toHaveCount(1);
  }
});

test("an unknown route renders the 404 rather than crashing", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");

  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.getByRole("banner")).toBeVisible();
});

test("a case study slug with no MDX file 404s instead of erroring", async ({ page }) => {
  // With no case studies written, this is every slug. Kept because the moment
  // one is added this becomes the real assertion: dynamicParams is off, so an
  // unwritten slug must hard-404 rather than render a shell.
  const response = await page.goto("/work/not-a-real-case-study");

  expect(response?.status()).toBe(404);
});

test("SEO endpoints are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("<urlset");

  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/sitemap/i);

  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image");
});

test("the CV is downloadable", async ({ request }) => {
  const response = await request.get("/twana-ibrahim-cv.pdf");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("pdf");
});

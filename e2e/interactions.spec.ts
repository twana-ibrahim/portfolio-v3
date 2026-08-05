import { expect, test } from "@playwright/test";

/**
 * The three surfaces screenshots cannot reach. Each one is client-side state,
 * so none of it was exercised by the visual QA pass.
 */

test.describe("theme toggle", () => {
  test.use({ colorScheme: "light" });

  test("flips the theme and remembers it across a navigation", async ({ page }) => {
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /^Switch to/ });

    // The label is "Switch theme" until mount resolves the system preference;
    // waiting for the specific label is what makes the click meaningful.
    await expect(toggle).toHaveAccessibleName("Switch to dark theme");
    await expect(page.locator("html")).toHaveClass(/\blight\b/);

    await toggle.click();

    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAccessibleName("Switch to light theme");

    // next-themes persists to localStorage; a full navigation proves it is
    // read back before paint rather than re-resolved from the system.
    await page.goto("/about");
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
  });
});

test.describe("mobile navigation", () => {
  // Forced rather than inherited from the mobile project, so the dialog is
  // covered even when the suite runs desktop-only.
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, navigates, and closes", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();

    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await expect(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL("/about");
    await expect(dialog).not.toBeVisible();
  });

  test("offers a way back to the home page", async ({ page }) => {
    // The dialog covers the wordmark, so without a Home entry there is no
    // route back to the front page from inside the open menu.
    await page.goto("/about");

    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await dialog.getByRole("link", { name: "Home" }).click();

    await expect(page).toHaveURL("/");
    await expect(dialog).not.toBeVisible();
  });

  test("closes on Escape and returns focus to the trigger", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Open menu" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog", { name: "Navigation" })).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test("closes when the current page is chosen again", async ({ page }) => {
    // The click handler closes the dialog rather than an effect on pathname,
    // because navigating to the page you are already on reports no change.
    await page.goto("/about");

    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Navigation" });
    await dialog.getByRole("link", { name: "About" }).click();

    await expect(dialog).not.toBeVisible();
  });
});

test.describe("contact form", () => {
  test("reports a field error per empty required field", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send message" }).click();

    // Server Action roundtrip — these come back from Zod, not the browser,
    // because the form is noValidate.
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter an email address I can reply to.")).toBeVisible();
    await expect(page.getByText(/20 characters minimum/)).toBeVisible();

    await expect(page.getByLabel(/^Name/)).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByLabel(/^Email/)).toHaveAttribute("aria-invalid", "true");
  });

  test("wires each error to its input for assistive tech", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send message" }).click();

    const email = page.getByLabel(/^Email/);

    // Waits out the Server Action roundtrip. getAttribute resolves once and
    // does not retry, so reading it straight after the click races the render.
    await expect(email).toHaveAttribute("aria-invalid", "true");

    const describedBy = await email.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();

    // Attribute selector, not `#id`: useId emits ids like «r0», which are not
    // valid in a CSS id selector.
    await expect(page.locator(`[id="${describedBy}"]`)).toHaveText(
      "Please enter an email address I can reply to.",
    );
  });

  test("rejects a malformed email but keeps the other fields", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel(/^Name/).fill("Ada Lovelace");
    await page.getByLabel(/^Email/).fill("not-an-email");
    await page
      .getByLabel(/^Message/)
      .fill("A message comfortably past the twenty character floor.");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please enter an email address I can reply to.")).toBeVisible();
    await expect(page.getByText("Please enter your name.")).toBeHidden();
  });

  test("a honeypot submission gets a fake success", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel(/^Name/).fill("Ada Lovelace");
    await page.getByLabel(/^Email/).fill("ada@example.com");
    await page
      .getByLabel(/^Message/)
      .fill("A message comfortably past the twenty character floor.");

    // Uncontrolled and hidden from real users, so the value is set directly
    // rather than filled — Playwright would refuse to type into it, which is
    // the point of the field.
    await page.locator("#website").evaluate((el) => {
      (el as HTMLInputElement).value = "https://spam.example";
    });

    await page.getByRole("button", { name: "Send message" }).click();

    // Deliberately indistinguishable from a real send, and it never reaches
    // Resend — which is also why this covers the success UI without an API key.
    await expect(page.getByText("Message sent.")).toBeVisible();
  });
});

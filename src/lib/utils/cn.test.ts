import { describe, expect, it } from "vitest";
import { cn } from "./cn";

/**
 * Regression guard for a bug that shipped silently.
 *
 * tailwind-merge could not distinguish this project's custom font sizes from
 * its custom text colours, so `cn("text-heading text-ink")` collapsed to
 * `text-ink` and every MDX h2 rendered at body size. Nothing errored — the
 * page just looked subtly wrong.
 *
 * Add a case here whenever a token is added to the --text-* or --ease-*
 * namespace in tokens.css.
 */
describe("cn", () => {
  it("keeps a custom font size alongside a custom text colour", () => {
    const result = cn("text-heading text-ink");
    expect(result).toContain("text-heading");
    expect(result).toContain("text-ink");
  });

  it("keeps them regardless of the order they are written in", () => {
    const result = cn("text-ink text-subheading");
    expect(result).toContain("text-ink");
    expect(result).toContain("text-subheading");
  });

  it.each(["display", "title", "heading", "subheading", "lead", "body", "meta"])(
    "recognises text-%s as a font size",
    (size) => {
      expect(cn(`text-${size} text-ink-muted`)).toContain(`text-${size}`);
    },
  );

  it("still collapses two genuinely conflicting font sizes", () => {
    expect(cn("text-heading text-title")).toBe("text-title");
  });

  it("still collapses two genuinely conflicting text colours", () => {
    expect(cn("text-ink text-accent")).toBe("text-accent");
  });

  it("collapses conflicting custom durations", () => {
    expect(cn("duration-fast duration-slow")).toBe("duration-slow");
  });

  it("keeps a duration alongside an easing", () => {
    const result = cn("duration-base ease-out-expo");
    expect(result).toContain("duration-base");
    expect(result).toContain("ease-out-expo");
  });

  it("lets a caller override a component default", () => {
    expect(cn("bg-paper text-ink", "bg-accent")).toBe("text-ink bg-accent");
  });
});

import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps<T extends ElementType> = {
  as?: T;
  /** `prose` narrows to a ~68ch reading measure for long-form case studies. */
  width?: "page" | "prose";
} & Omit<ComponentProps<T>, "as">;

/**
 * The only place horizontal page padding is defined.
 *
 * Every section uses this rather than setting its own px-* values, which is
 * what keeps the left edge of the page aligned all the way down. Getting that
 * one line straight is most of what makes a layout read as designed.
 */
export function Container<T extends ElementType = "div">({
  as,
  width = "page",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 md:px-10 lg:px-16",
        width === "page" ? "max-w-page" : "max-w-prose",
        className,
      )}
      {...props}
    />
  );
}

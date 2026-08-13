import type { ComponentProps, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A baseline rule instead of a box. Nothing about the control's own box moves
 * on focus or error — no shadow, no border-width change — so an appearing
 * error message never pushes the form down.
 *
 * The `focus:outline-none` this used to carry is gone. It was justified by that
 * same no-movement rule, which an outline does not threaten: outlines are
 * painted outside the border box and take part in no layout. What it actually
 * did was delete the site's one focus style — `globals.css` says "visible,
 * never removed" — from the only four controls on the site that are typed
 * into, leaving a 1px hairline changing colour as the entire keyboard
 * indicator. `focus:border-ink` stays; it now reinforces the ring instead of
 * replacing it.
 */
const controlStyles = [
  "w-full bg-transparent pb-2.5 text-ink",
  "border-line border-b transition-colors duration-fast ease-out-expo",
  "placeholder:text-ink-subtle/60",
  "hover:border-line-strong focus:border-ink",
  "aria-[invalid=true]:border-accent",
];

type FieldProps = {
  label: string;
  /** Rendered and wired to aria-describedby when present. */
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => ReactNode;
};

export function Field({ label, error, hint, required, children }: FieldProps) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={id} className="label flex items-center gap-1.5 text-ink-subtle">
        {label}
        {required ? (
          <span aria-hidden className="text-accent">
            *
          </span>
        ) : null}
      </label>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy,
        className: cn(controlStyles),
      })}

      {error ? (
        <p id={`${id}-error`} className="text-accent text-sm">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-ink-subtle text-sm">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={cn("h-11", props.className)} />;
}

export function Textarea(props: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn("min-h-36 resize-none pt-2", props.className)} />;
}

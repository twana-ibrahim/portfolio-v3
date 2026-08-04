"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { siteConfig } from "@/lib/config/site";
import { submitContactForm } from "../actions";
import type { ContactState } from "../schema";

const INITIAL: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL);

  // Set once on first render, so it survives re-renders from action state.
  const mountedAt = useRef(Date.now());

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  /**
   * Stamps how long the form was on screen before submit. Done here rather
   * than with a hidden input written by an effect, so it is accurate even if
   * the user submits before hydration settles.
   */
  const action = (formData: FormData) => {
    formData.set("elapsed", String(Date.now() - mountedAt.current));
    formAction(formData);
  };

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 border-line border-t py-14">
        <span className="grid size-11 place-items-center rounded-full bg-positive/12 text-positive">
          <Check size={20} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className="font-medium text-ink text-subheading tracking-tight">Message sent.</p>
          <p className="mt-2 max-w-md text-ink-muted">
            Thanks for reaching out — I read everything and usually reply within a day or two.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-8">
      {/* Honeypot. aria-hidden + tabIndex keeps it away from real users and
          screen readers; only automated fillers will populate it. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name" error={errors.name} required>
          {(props) => (
            <Input {...props} name="name" autoComplete="name" placeholder="Your name" required />
          )}
        </Field>

        <Field label="Email" error={errors.email} required>
          {(props) => (
            <Input
              {...props}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          )}
        </Field>
      </div>

      <Field label="Company" error={errors.company} hint="Optional">
        {(props) => (
          <Input
            {...props}
            name="company"
            autoComplete="organization"
            placeholder="Where you work"
          />
        )}
      </Field>

      <Field label="Message" error={errors.message} required>
        {(props) => (
          <Textarea
            {...props}
            name="message"
            rows={6}
            placeholder="What are you building, and where do you need help?"
            required
          />
        )}
      </Field>

      {state.status === "error" && !state.fieldErrors ? (
        <p role="alert" className="border-accent border-l-2 py-1 pl-4 text-accent text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending…" : "Send message"}
          {pending ? null : <ArrowRight size={16} strokeWidth={2} aria-hidden />}
        </Button>
        <p className="text-ink-subtle text-sm">
          Or email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-ink-muted">
            {siteConfig.contact.email}
          </a>
        </p>
      </div>

      {/* Announces the outcome to assistive tech without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your message" : state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}

"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import type { Locale } from "@/lib/config/i18n";
import { siteConfig } from "@/lib/config/site";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { submitContactForm } from "../actions";
import type { ContactState } from "../schema";

const INITIAL: ContactState = { status: "idle" };

/**
 * Takes the locale and dictionary as props rather than reading them itself:
 * this is a Client Component, and `next/root-params` is server-only by design.
 */
export function ContactForm({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL);
  const t = dictionary.contact;

  // Set once on first render, so it survives re-renders from action state.
  const mountedAt = useRef(Date.now());

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  /**
   * Stamps how long the form was on screen before submit, and which language
   * the sender is reading. Both are set here rather than as hidden inputs
   * written by an effect, so they are accurate even if the user submits before
   * hydration settles — and the Server Action has no other way to learn the
   * locale, since root params do not reach actions.
   */
  const action = (formData: FormData) => {
    formData.set("elapsed", String(Date.now() - mountedAt.current));
    formData.set("locale", locale);
    formAction(formData);
  };

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 border-line border-t py-14">
        <span className="grid size-11 place-items-center rounded-full bg-positive/12 text-positive">
          <Check size={20} strokeWidth={2} aria-hidden />
        </span>
        <div>
          <p className="font-medium text-ink text-subheading tracking-tight">{t.sent}</p>
          <p className="mt-2 max-w-md text-ink-muted">{t.sentBody}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-8">
      {/* Honeypot. aria-hidden + tabIndex keeps it away from real users and
          screen readers; only automated fillers will populate it. Left in
          English in every locale — a bot reads the name attribute, and a
          translated label would only tell a human reader it is there. */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <Field label={t.name} error={errors.name} required>
          {(props) => (
            <Input
              {...props}
              name="name"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              required
            />
          )}
        </Field>

        <Field label={t.email} error={errors.email} required>
          {(props) => (
            <Input
              {...props}
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              required
            />
          )}
        </Field>
      </div>

      <Field label={t.company} error={errors.company} hint={t.optional}>
        {(props) => (
          <Input
            {...props}
            name="company"
            autoComplete="organization"
            placeholder={t.companyPlaceholder}
          />
        )}
      </Field>

      <Field label={t.message} error={errors.message} required>
        {(props) => (
          <Textarea
            {...props}
            name="message"
            rows={6}
            placeholder={t.messagePlaceholder}
            required
          />
        )}
      </Field>

      {state.status === "error" && !state.fieldErrors ? (
        // border-s: the rule marks the start of the line, so it has to move to
        // the right-hand side in RTL rather than sit where the text ends.
        <p role="alert" className="border-accent border-s-2 py-1 ps-4 text-accent text-sm">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? t.sending : t.send}
          {pending ? null : (
            <ArrowRight size={16} strokeWidth={2} aria-hidden className="rtl:-scale-x-100" />
          )}
        </Button>
        <p className="text-ink-subtle text-sm">
          {t.orEmail}{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            dir="ltr"
            className="link-underline text-ink-muted"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </div>

      {/* Announces the outcome to assistive tech without stealing focus. */}
      <p aria-live="polite" className="sr-only">
        {pending ? t.sendingAnnouncement : state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}

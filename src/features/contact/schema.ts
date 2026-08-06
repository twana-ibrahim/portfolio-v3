import { z } from "zod";
import type { Dictionary } from "@/lib/i18n/dictionary";

/** The message set the schema is built from. Owned by the dictionary. */
export type ContactValidationMessages = Dictionary["contact"]["validation"];

/**
 * The contact form contract.
 *
 * A factory rather than a constant, because the error copy is localized and a
 * Zod schema bakes its messages in at construction. The Server Action that
 * parses this form cannot call `next/root-params` — root params are
 * unavailable in actions by design — so the locale travels as a form field and
 * the schema is built per request from the matching message set.
 *
 * Building a schema per submission is not a cost worth avoiding: it is a few
 * object allocations against a network round-trip to Resend.
 */
export function createContactSchema(messages: ContactValidationMessages) {
  return z.object({
    name: z.string().trim().min(2, messages.name).max(80, messages.nameTooLong),

    email: z.email(messages.email),

    /** Optional, but the most useful field when it is filled in. */
    company: z.string().trim().max(120).optional().or(z.literal("")),

    message: z.string().trim().min(20, messages.message).max(4000, messages.messageTooLong),

    /**
     * Honeypot. Hidden from users and from assistive tech; only a bot fills it.
     * Named "website" because that is what naive form-filling bots look for.
     *
     * Deliberately accepts anything. A `.max(0)` here reads like the stricter
     * choice and is the opposite: a filled honeypot would fail the parse, so the
     * action would return a validation error and never reach the fake-success
     * branch — handing the scraper the one signal this field exists to withhold.
     * The trap is a runtime decision, not a validation rule.
     */
    website: z.string().nullish(),

    /**
     * Milliseconds the form was on screen before submit. Humans take seconds;
     * scripted submissions are near-instant. Cheap, stateless, and unlike a
     * rate limiter it actually works on serverless.
     */
    elapsed: z.coerce.number().int().min(0).default(0),
  });
}

export type ContactInput = z.infer<ReturnType<typeof createContactSchema>>;

/** Below this, treat the submission as automated. */
export const MIN_ELAPSED_MS = 2_000;

/** Keyed by field name so the form can render errors inline. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

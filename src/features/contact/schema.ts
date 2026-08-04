import { z } from "zod";

/**
 * The contact form contract.
 *
 * Shared by the Server Action and the client form so the validation rules and
 * the error copy cannot drift apart. Messages are written to be read by a
 * stranger, not by the developer.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is longer than this form supports."),

  email: z.email("Please enter an email address I can reply to."),

  /** Optional, but the most useful field when it is filled in. */
  company: z.string().trim().max(120).optional().or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps — 20 characters minimum.")
    .max(4000, "That is longer than this form accepts. Email me directly instead."),

  /**
   * Honeypot. Hidden from users and from assistive tech; only a bot fills it.
   * Named "website" because that is what naive form-filling bots look for.
   */
  website: z.string().max(0, "Rejected.").optional().or(z.literal("")),

  /**
   * Milliseconds the form was on screen before submit. Humans take seconds;
   * scripted submissions are near-instant. Cheap, stateless, and unlike a
   * rate limiter it actually works on serverless.
   */
  elapsed: z.coerce.number().int().min(0).default(0),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Below this, treat the submission as automated. */
export const MIN_ELAPSED_MS = 2_000;

/** Keyed by field name so the form can render errors inline. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: ContactFieldErrors };

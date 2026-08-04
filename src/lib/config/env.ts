import "server-only";
import { z } from "zod";

/**
 * Server-side environment variables.
 *
 * Parsed lazily rather than at module load: the contact form is the only thing
 * that needs these, and a missing key should not stop the whole site from
 * building. When it is needed and absent, the failure message says exactly
 * which variable to set rather than surfacing "undefined is not a function"
 * from three layers inside the Resend SDK.
 */
const serverEnvSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is not set"),
  /** Verified sender on the Resend account, e.g. "site@twana.dev". */
  CONTACT_FROM_EMAIL: z.email("CONTACT_FROM_EMAIL must be a valid email"),
  /** Where enquiries land. */
  CONTACT_TO_EMAIL: z.email("CONTACT_TO_EMAIL must be a valid email"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(): ServerEnv {
  const parsed = serverEnvSchema.safeParse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
  });

  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.message).join("; ");
    throw new Error(`Contact form is not configured: ${missing}`);
  }

  return parsed.data;
}

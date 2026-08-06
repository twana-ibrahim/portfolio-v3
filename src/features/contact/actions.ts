"use server";

import { Resend } from "resend";
import { profile } from "@/content/profile";
import { getServerEnv } from "@/lib/config/env";
import { defaultLocale, isLocale } from "@/lib/config/i18n";
import { siteConfig } from "@/lib/config/site";
import { getDictionarySync } from "@/lib/i18n/dictionary";
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import {
  type ContactFieldErrors,
  type ContactInput,
  type ContactState,
  createContactSchema,
  MIN_ELAPSED_MS,
} from "./schema";

/** Escapes user input before it is interpolated into the notification email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * The notification, which only Twana reads — so it stays in English whatever
 * language the sender used. The message body is theirs and is passed through
 * untouched (escaped, not translated).
 */
function buildEmail(input: ContactInput) {
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ...(input.company ? ([["Company", input.company]] as [string, string][]) : []),
  ];

  return `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#17171a">
      <p style="margin:0 0 20px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#77776f">
        New enquiry via ${escapeHtml(siteConfig.url)}
      </p>
      <table style="border-collapse:collapse;margin-bottom:24px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:4px 24px 4px 0;color:#77776f">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding-top:20px;border-top:1px solid #e3e1dd;white-space:pre-wrap">${escapeHtml(input.message)}</div>
    </div>
  `;
}

/**
 * Handles a contact submission.
 *
 * Runs entirely on the server: no API key reaches the browser and no
 * third-party form service sits between a prospective client and the inbox.
 * Signature matches React's useActionState.
 */
export async function submitContactForm(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /**
   * The locale arrives in the payload because `next/root-params` is not
   * available inside a Server Action. Validated against the known set rather
   * than trusted — it is client-supplied, and while the blast radius is only
   * "which language the error message is in", indexing a record with an
   * unchecked string is how that stops being true later.
   */
  const submitted = formData.get("locale");
  const locale = typeof submitted === "string" && isLocale(submitted) ? submitted : defaultLocale;
  const messages = getDictionarySync(locale).contact.validation;

  const parsed = createContactSchema(messages).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website"),
    elapsed: formData.get("elapsed"),
  });

  if (!parsed.success) {
    // First error per field only — a stack of three messages under one input
    // is noise, and the first one is always the actionable one.
    const fieldErrors: ContactFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput | undefined;
      if (key && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: messages.checkFields, fieldErrors };
  }

  const input = parsed.data;

  // Bot traps. Both return "success" on purpose — telling a scraper which
  // signal caught it just teaches whoever wrote it to avoid that signal.
  if (input.website || input.elapsed < MIN_ELAPSED_MS) {
    return { status: "success" };
  }

  const failed: ContactState = {
    status: "error",
    message: interpolate(messages.failed, { email: siteConfig.contact.email }),
  };

  try {
    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      // Latin in every locale: this is a mail From name, and mail clients
      // handle a non-ASCII display name inconsistently enough that it is not
      // worth the risk of the message being filed as suspicious.
      from: `${pick(profile.name, defaultLocale)} Portfolio <${env.CONTACT_FROM_EMAIL}>`,
      to: env.CONTACT_TO_EMAIL,
      replyTo: input.email,
      subject: `Enquiry from ${input.name}${input.company ? ` (${input.company})` : ""}`,
      html: buildEmail(input),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return failed;
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Unexpected failure:", error);
    return failed;
  }
}

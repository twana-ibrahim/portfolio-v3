"use server";

import { Resend } from "resend";
import { getServerEnv } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";
import {
  type ContactFieldErrors,
  type ContactInput,
  type ContactState,
  contactSchema,
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
  const parsed = contactSchema.safeParse({
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
    return { status: "error", message: "Please check the fields below.", fieldErrors };
  }

  const input = parsed.data;

  // Bot traps. Both return "success" on purpose — telling a scraper which
  // signal caught it just teaches whoever wrote it to avoid that signal.
  if (input.website || input.elapsed < MIN_ELAPSED_MS) {
    return { status: "success" };
  }

  try {
    const env = getServerEnv();
    const resend = new Resend(env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `${siteConfig.name} Portfolio <${env.CONTACT_FROM_EMAIL}>`,
      to: env.CONTACT_TO_EMAIL,
      replyTo: input.email,
      subject: `Enquiry from ${input.name}${input.company ? ` (${input.company})` : ""}`,
      html: buildEmail(input),
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return {
        status: "error",
        message: `Something went wrong sending that. Email me directly at ${siteConfig.contact.email}.`,
      };
    }

    return { status: "success" };
  } catch (error) {
    console.error("[contact] Unexpected failure:", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Email me directly at ${siteConfig.contact.email}.`,
    };
  }
}

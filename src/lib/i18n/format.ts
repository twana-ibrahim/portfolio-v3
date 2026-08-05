import type { Locale } from "@/lib/config/i18n";

/** Replaces `{token}` placeholders. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export type PluralForms = { one: string; other: string };

/**
 * Picks a plural form and fills `{count}`.
 *
 * English needs the singular special-cased; Kurdish does not inflect the noun
 * after a number, so its two forms are identical. Both still declare `one` and
 * `other`, because a dictionary that omits a form for one language and not the
 * other is where plural bugs live.
 */
export function plural(forms: PluralForms, count: number, _locale?: Locale): string {
  return interpolate(count === 1 ? forms.one : forms.other, { count });
}

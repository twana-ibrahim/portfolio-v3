import type { Locale } from "@/lib/config/i18n";
import { type Dictionary, en } from "./dictionaries/en";
import { ku } from "./dictionaries/ku";

/**
 * Both dictionaries are plain modules, imported statically.
 *
 * Two locales of UI chrome is a few kilobytes, and dynamic `import()` here
 * would buy a rounding error in bundle size while adding a suspense boundary
 * to every page. Revisit if this ever grows past a handful of languages.
 */
const dictionaries: Record<Locale, Dictionary> = { en, ku };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}

/** Synchronous access, for the client components that cannot await. */
export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { profile } from "@/content/profile";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";

/**
 * Regenerate once a day.
 *
 * Two figures on this site are read from the clock at render: the hero's
 * "years shipping" and the footer's copyright year. Under a pure static build
 * both are stamped at deploy, so a site left untouched over a new year states
 * something false — the exact staleness the derivation was meant to prevent.
 *
 * A day is the coarsest interval that still catches both on the day they
 * change. It must be a literal: the value has to be statically analyzable, so
 * `60 * 60 * 24` would not work. Declared on the layout so every page in the
 * group inherits it, the footer included.
 */
export const revalidate = 86400;

/**
 * Chrome shared by every public page.
 *
 * Kept in a route group rather than the root layout so that future routes
 * which should not have the site header — an OG image route, a bare print
 * view of the CV — can sit outside it without fighting the layout.
 *
 * The invalid-locale guard that used to live here is gone: the root layout
 * already calls `notFound()` for anything that is not a real locale, and it
 * renders first, so a second check here could only ever be dead code.
 */
export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { locale, dictionary } = await getTranslations();

  return (
    <>
      {/* Header is a Client Component and cannot call next/root-params, so its
          strings come down as props. Footer is not, and reads them itself. */}
      <Header locale={locale} dictionary={dictionary} name={pick(profile.name, locale)} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

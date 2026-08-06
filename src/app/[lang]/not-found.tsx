import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { pick } from "@/lib/i18n/localized";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";

/**
 * Lives at the locale root rather than inside (site), so it needs its own
 * chrome. Kept deliberately plain — a joke 404 is a liability on a page whose
 * entire job is to get someone back to the work.
 *
 * `getTranslations()` falls back to the default locale rather than throwing,
 * which matters most here: a request for a path with no valid locale segment
 * reaches this file before the segment resolves, and a 404 that crashes is
 * worse than a 404 in the wrong language.
 */
export default async function NotFound() {
  const { locale, dictionary } = await getTranslations();

  return (
    <>
      <Header locale={locale} dictionary={dictionary} name={pick(profile.name, locale)} />
      <main id="main" className="flex flex-1 items-center">
        <Container className="py-32">
          <p dir="ltr" className="label text-accent rtl:text-end">
            {dictionary.notFound.code}
          </p>
          <h1 className="mt-6 max-w-2xl text-ink text-title">{dictionary.notFound.title}</h1>
          <p className="mt-6 max-w-md text-ink-muted text-lead">{dictionary.notFound.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath(locale, "/")}>{dictionary.notFound.backHome}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, "/work")}>{dictionary.work.allWork}</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

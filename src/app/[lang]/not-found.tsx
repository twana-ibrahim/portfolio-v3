import Link from "next/link";
import { lang } from "next/root-params";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { defaultLocale, isLocale } from "@/lib/config/i18n";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localePath } from "@/lib/i18n/routing";

/**
 * Lives at the locale root rather than inside (site), so it needs its own
 * chrome. Kept deliberately plain — a joke 404 is a liability on a page whose
 * entire job is to get someone back to the work.
 *
 * `lang()` can be absent here: a request for a path with no valid locale
 * segment reaches this file before the segment resolves. Falling back to the
 * default rather than throwing means a wrong URL still renders a usable page.
 */
export default async function NotFound() {
  const current = await lang();
  const locale = current && isLocale(current) ? current : defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dictionary={dictionary} />
      <main id="main" className="flex flex-1 items-center">
        <Container className="py-32">
          <p className="label text-accent">{dictionary.notFound.code}</p>
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
      <Footer locale={locale} dictionary={dictionary} />
    </>
  );
}

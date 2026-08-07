import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";

/**
 * 404 for anything inside the site chrome.
 *
 * Sits in `(site)` rather than only at `[lang]`, so it renders *inside*
 * `(site)/layout.tsx` and inherits the header and footer instead of
 * reconstructing them. Its sibling at `[lang]/not-found.tsx` keeps its own
 * chrome, because nothing above this group provides any.
 *
 * The two exist for different reasons and neither is redundant: this one
 * catches `notFound()` from a page — an unknown case-study slug — while the
 * one above catches a URL that matched no route at all.
 */
export default async function SiteNotFound() {
  const { locale, dictionary } = await getTranslations();

  return (
    <Container className="flex flex-1 flex-col justify-center py-32">
      {/* dir="ltr": "404" is a Latin numeral and the bidi algorithm has no
          reason to keep it on the reading edge of an RTL line. */}
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
  );
}

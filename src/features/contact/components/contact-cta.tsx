import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { StatementText } from "@/components/ui/statement";
import { pageCopy } from "@/content/pages";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/config/site";
import { pick } from "@/lib/i18n/localized";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";

/**
 * Closing call to action.
 *
 * Full-bleed inverted block — the one moment on the page where the colour
 * flips. Used to end the home page, so the last thing on screen is an
 * invitation rather than a footer.
 */
export async function ContactCta() {
  const { locale, dictionary } = await getTranslations();
  const title = pick(pageCopy.cta.title, locale);

  return (
    <section className="bg-paper-inverted py-24 text-ink-inverted md:py-32">
      <Container>
        <Reveal>
          {/* One opacity level across the whole band. Now that the surface is
              dark in both themes, /70 is a soft grey on dark either way —
              9.18:1 light, 7.61:1 dark. /50 measured 4.4:1 in dark and is the
              floor, so this keeps headroom. */}
          <p className="label text-ink-inverted/70">{pick(profile.availability.label, locale)}</p>

          <h2 className="mt-7 max-w-4xl text-ink-inverted text-title">
            <StatementText lead={title.lead} emphasis={title.emphasis} trail={title.trail} />
          </h2>

          <p className="mt-7 max-w-xl text-ink-inverted/70 text-lead">
            {pick(pageCopy.cta.body, locale)}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild variant="accent" size="lg">
              <Link href={localePath(locale, "/contact")}>
                {dictionary.contact.ctaLabel}
                <ArrowRight size={16} strokeWidth={2} aria-hidden className="rtl:-scale-x-100" />
              </Link>
            </Button>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              dir="ltr"
              className="link-underline text-ink-inverted/70 transition-colors duration-fast hover:text-ink-inverted"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

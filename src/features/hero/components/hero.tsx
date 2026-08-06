import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Perspective } from "@/components/motion/perspective";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { industryCount, projects } from "@/content/projects";
import { siteConfig } from "@/lib/config/site";
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { localePath } from "@/lib/i18n/routing";
import { getTranslations } from "@/lib/i18n/server";
import { yearsSince } from "@/lib/utils/format";

export async function Hero() {
  const { locale, dictionary } = await getTranslations();

  const headline = pick(profile.headline, locale);

  /**
   * All three derived from content, so none can go stale.
   *
   * Counted from `careerStart` rather than the first employment record, which
   * begins 2021-10 and ignores the year spent learning the stack. Flooring is
   * what makes the "+" honest — see yearsSince. The same figure fills the
   * `{years}` token in the summary, so the prose and the stat cannot disagree.
   */
  const years = yearsSince(siteConfig.careerStart);
  const stats = [
    { value: `${years}+`, label: dictionary.home.yearsShipping },
    { value: String(projects.length), label: dictionary.home.projectsDelivered },
    { value: String(industryCount), label: dictionary.home.industries },
  ];

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center pt-10 pb-16">
      <Container>
        {/* Eyebrow: who and where, before the reader has read a single word of prose. */}
        <Reveal>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-subtle">
            <span>{pick(profile.name, locale)}</span>
            <span aria-hidden className="h-px w-4 bg-line-strong" />
            <span>{pick(profile.role, locale)}</span>
            <span aria-hidden className="h-px w-4 bg-line-strong" />
            <span>
              {pick(profile.location.city, locale)}
              {dictionary.listSeparator}
              {pick(profile.location.country, locale)}
            </span>
          </p>
        </Reveal>

        {/* The statement. Line breaks are authored, not measured — see TextReveal. */}
        <Perspective>
          <h1 className="mt-8 text-display text-ink md:mt-10">
            <TextReveal
              delay={0.15}
              depth
              lines={[
                headline.lead,
                // Italic serif in English, heavier Vazirmatn in Kurdish — the
                // `emphasis` utility switches on `dir`, because Arabic script
                // has no italic form to switch to.
                <em key="emphasis" className="emphasis">
                  {headline.emphasis}
                </em>,
                headline.trail,
              ]}
            />
          </h1>
        </Perspective>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-6 lg:col-span-5">
            <p className="text-ink-muted text-lead">
              {interpolate(pick(profile.summary, locale), { years })}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href={localePath(locale, "/work")}>
                  {dictionary.home.selectedWork}
                  {/* Rotated, not mirrored. `scale` is applied to the geometry
                      *before* `rotate` — so mirroring a vertically symmetric
                      glyph like ArrowDown changes nothing, and this arrow kept
                      pointing down-right on the Kurdish page. Turning it the
                      other way is the only thing that actually moves it. */}
                  <ArrowDown
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="-rotate-45 rtl:rotate-45"
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={localePath(locale, "/contact")}>{dictionary.home.getInTouch}</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.62} className="md:col-span-4 md:col-start-9">
            <p className="flex items-center gap-2.5">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-positive" />
              </span>
              <span className="label text-ink">{pick(profile.availability.label, locale)}</span>
            </p>
            <p className="mt-3 text-ink-muted text-sm">
              {pick(profile.availability.detail, locale)}
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-line border-t pt-6 md:grid-cols-1 md:gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="md:flex md:items-baseline md:justify-between md:gap-4"
                >
                  <dt className="label order-2 mt-1 text-ink-subtle md:mt-0">{stat.label}</dt>
                  <dd
                    // dir="ltr": "5+" is a Latin numeral followed by a sign,
                    // and the bidi algorithm moves the "+" to the wrong side
                    // of the digit in an RTL paragraph.
                    dir="ltr"
                    className="order-1 font-medium text-subheading text-ink tabular-nums rtl:text-end"
                  >
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

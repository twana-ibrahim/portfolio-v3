import { ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { StatementText } from "@/components/ui/statement";
import { certifications, education, languages } from "@/content/experience";
import { pageCopy } from "@/content/pages";
import { profile } from "@/content/profile";
import { SkillGrid } from "@/features/about";
import { ContactCta } from "@/features/contact";
import { ExperienceList } from "@/features/experience";
import { siteConfig } from "@/lib/config/site";
import { interpolate } from "@/lib/i18n/format";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDateRange, formatYearMonth, yearsSince } from "@/lib/utils/format";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getTranslations();

  return createMetadata({
    title: dictionary.about.eyebrow,
    path: "/about",
    locale,
    description: pick(pageCopy.about.description, locale),
  });
}

export default async function AboutPage() {
  const { locale, dictionary } = await getTranslations();

  const years = yearsSince(siteConfig.careerStart);
  const title = pick(pageCopy.about.title, locale);
  const bio = pick(profile.bio, locale);

  return (
    <>
      <Container className="pt-16 pb-4 md:pt-24">
        <Reveal>
          <p className="label text-ink-subtle">{dictionary.about.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-ink text-title">
            <StatementText
              lead={interpolate(title.lead, { years })}
              emphasis={title.emphasis}
              trail={title.trail}
            />
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-12">
          <Reveal delay={0.1} className="md:col-span-7">
            <div className="space-y-6">
              {bio.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-ink-muted text-lead">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href={siteConfig.resumePath} download>
                  {dictionary.about.downloadCv}
                  <Download size={15} strokeWidth={2} aria-hidden />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-4 md:col-start-9">
            <h2 className="label border-line border-t pt-4 text-ink-subtle">
              {dictionary.about.education}
            </h2>
            {education.map((entry) => (
              <div key={pick(entry.institution, "en")} className="mt-5">
                <p className="font-medium text-ink">{pick(entry.institution, locale)}</p>
                <p className="mt-1.5 text-ink-muted text-sm">{pick(entry.qualification, locale)}</p>
                <p className="label mt-3 text-ink-subtle">
                  {formatDateRange(entry.start, entry.end, locale)}
                </p>
              </div>
            ))}

            <h2 className="label mt-12 border-line border-t pt-4 text-ink-subtle">
              {dictionary.about.certifications}
            </h2>
            <ul className="mt-5 space-y-3">
              {certifications.map((certification) => (
                <li key={certification.name}>
                  {certification.verifyUrl ? (
                    <a
                      href={certification.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-start gap-1 text-ink text-sm"
                    >
                      {/* dir="ltr": credential names stay in English in every
                          locale so they match the certificate they link to. */}
                      <span dir="ltr" className="link-underline">
                        {certification.name}
                      </span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden
                        className="shrink-0 translate-y-0.5 text-ink-subtle transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <p dir="ltr" className="text-ink text-sm rtl:text-end">
                      {certification.name}
                    </p>
                  )}
                  <p className="label mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-subtle">
                    <span dir="ltr">{certification.issuer}</span>
                    {certification.awarded ? (
                      <>
                        <span aria-hidden className="h-px w-2 bg-line-strong" />
                        <span>{formatYearMonth(certification.awarded, locale)}</span>
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>

            <h2 className="label mt-12 border-line border-t pt-4 text-ink-subtle">
              {dictionary.about.languages}
            </h2>
            <dl className="mt-5 space-y-2.5">
              {languages.map((language) => (
                <div
                  key={pick(language.name, "en")}
                  className="flex items-baseline justify-between gap-4"
                >
                  <dt className="text-ink text-sm">{pick(language.name, locale)}</dt>
                  <dd className="label text-ink-subtle">
                    {dictionary.about.languageLevels[language.level]}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>

      <Section label={dictionary.about.capabilities} meta={dictionary.about.whatIReachFor}>
        <SkillGrid />
      </Section>

      <Section label={dictionary.home.experience} meta={dictionary.about.fullHistory}>
        <ExperienceList />
      </Section>

      <ContactCta />
    </>
  );
}

import { ArrowUpRight, Download } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { certifications, education, languages } from "@/content/experience";
import { SkillGrid } from "@/features/about";
import { ContactCta } from "@/features/contact";
import { ExperienceList } from "@/features/experience";
import { siteConfig } from "@/lib/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDateRange, formatYearMonth } from "@/lib/utils/format";

export const metadata: Metadata = createMetadata({
  title: "About",
  path: "/about",
  description: siteConfig.summary,
});

/**
 * ── WORTH A PASS IN YOUR OWN VOICE ──────────────────────────────────────────
 * Every fact below is from your CV, so nothing here is invented. But it is
 * written in a voice I chose for you, and the About page is the one place
 * where sounding like a person beats sounding polished. Read it aloud. Where
 * it does not sound like you, change the words — not the facts.
 * ────────────────────────────────────────────────────────────────────────────
 */
const bio = [
  "I'm a frontend engineer in Kalar, in the Sulaymaniyah region of Iraq. Five years in, almost all of it spent on software that other businesses run on — the dashboard a telecom operations team opens at the start of every shift, the app an agent uses to sell a SIM, the identity server that decides what six internal products will let you see.",
  "That kind of work has a particular shape. Nobody is delighted by an internal tool. They need it to be right, to stay responsive when the table has ten thousand rows in it, and to never offer a button the backend is going to refuse. So most of my effort goes into things that don't photograph well: access control that mirrors the API exactly, filtering that survives real data volumes, and structure the next person can change without breaking three screens they've never opened.",
  "Right now I'm building customer-facing features for FIB, a digital bank — a project I moved onto at Gateway ICT and carried with me to Tailored Applications. Before banking it was telecom sales platforms at Fastlink, streaming and advertising at Gateway, and Angular reporting systems at iQ Group, where I learned what shipping to a specification actually means.",
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-16 pb-4 md:pt-24">
        <Reveal>
          <p className="label text-ink-subtle">About</p>
          <h1 className="mt-6 max-w-4xl text-ink text-title">
            Five years building software people{" "}
            <em className="font-serif font-normal tracking-[-0.02em]">have to</em> use.
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
                  Download CV
                  <Download size={15} strokeWidth={2} aria-hidden />
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="md:col-span-4 md:col-start-9">
            <h2 className="label border-line border-t pt-4 text-ink-subtle">Education</h2>
            {education.map((entry) => (
              <div key={entry.institution} className="mt-5">
                <p className="font-medium text-ink">{entry.institution}</p>
                <p className="mt-1.5 text-ink-muted text-sm">{entry.qualification}</p>
                <p className="label mt-3 text-ink-subtle">
                  {formatDateRange(entry.start, entry.end)}
                </p>
              </div>
            ))}

            <h2 className="label mt-12 border-line border-t pt-4 text-ink-subtle">
              Certifications
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
                      <span className="link-underline">{certification.name}</span>
                      <ArrowUpRight
                        size={13}
                        aria-hidden
                        className="shrink-0 translate-y-0.5 text-ink-subtle transition-transform duration-fast ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <p className="text-ink text-sm">{certification.name}</p>
                  )}
                  <p className="label mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-subtle">
                    <span>{certification.issuer}</span>
                    {certification.awarded ? (
                      <>
                        <span aria-hidden className="h-px w-2 bg-line-strong" />
                        <span>{formatYearMonth(certification.awarded)}</span>
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>

            <h2 className="label mt-12 border-line border-t pt-4 text-ink-subtle">Languages</h2>
            <dl className="mt-5 space-y-2.5">
              {languages.map((language) => (
                <div key={language.name} className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink text-sm">{language.name}</dt>
                  <dd className="label text-ink-subtle">{language.level}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Container>

      <Section label="Capabilities" meta="What I reach for">
        <SkillGrid />
      </Section>

      <Section label="Experience" meta="Full history">
        <ExperienceList />
      </Section>

      <ContactCta />
    </>
  );
}

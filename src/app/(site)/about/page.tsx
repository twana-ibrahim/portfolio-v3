import { Download } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { education } from "@/content/experience";
import { SkillGrid } from "@/features/about";
import { ContactCta } from "@/features/contact";
import { ExperienceList } from "@/features/experience";
import { siteConfig } from "@/lib/config/site";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDateRange } from "@/lib/utils/format";

export const metadata: Metadata = createMetadata({
  title: "About",
  path: "/about",
  description: siteConfig.summary,
});

/**
 * ── NEEDS YOUR VOICE ────────────────────────────────────────────────────────
 * The paragraphs below are a scaffold, not a bio. Rewrite them in your own
 * words — this is the one page where sounding like a person beats sounding
 * polished. Say why you got into this, what you are actually good at, and what
 * you want to work on next.
 * ────────────────────────────────────────────────────────────────────────────
 */
const bio = [
  "I'm a software engineer in Erbil. For the last five years I've worked almost entirely on systems that other businesses depend on to operate — the portal a telecom dealer opens every morning, the app a field agent uses to activate a SIM, the identity server that sits between six internal products and their users.",
  "That kind of work shapes how you build. Nobody is delighted by an internal tool; they just need it to be correct, fast on a bad connection, and predictable enough that they stop thinking about it. So I've spent more time on validation, error states and load behaviour than on anything that photographs well.",
  "Right now I'm building customer-facing interfaces for a digital bank, where the tolerance for getting things wrong is close to zero. Before that: telecom sales platforms, a streaming service, and enterprise systems for government and NGO clients.",
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

            <h2 className="label mt-12 border-line border-t pt-4 text-ink-subtle">Languages</h2>
            <ul className="mt-5 space-y-2 text-ink text-sm">
              <li>Kurdish — native</li>
              <li>English — professional</li>
              <li>Arabic — conversational</li>
            </ul>
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

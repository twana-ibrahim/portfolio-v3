import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { siteConfig } from "@/lib/config/site";

/** Years since the first role. Derived so it is never a stale hardcoded "5+". */
function yearsOfExperience(): number {
  const first = experience.at(-1);
  if (!first) return 0;
  const [year, month] = first.start.split("-").map(Number);
  if (!year || !month) return 0;
  const now = new Date();
  return Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12);
}

const stats = () => [
  { value: `${yearsOfExperience()}+`, label: "Years shipping" },
  { value: String(projects.length), label: "Projects delivered" },
  { value: "6", label: "Industries" },
];

export function Hero() {
  const { headline, role, name, summary, availability, location } = siteConfig;

  return (
    <section className="relative flex min-h-[92svh] flex-col justify-center pt-10 pb-16">
      <Container>
        {/* Eyebrow: who and where, before the reader has read a single word of prose. */}
        <Reveal>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-subtle">
            <span>{name}</span>
            <span aria-hidden className="h-px w-4 bg-line-strong" />
            <span>{role}</span>
            <span aria-hidden className="h-px w-4 bg-line-strong" />
            <span>
              {location.city}, {location.country}
            </span>
          </p>
        </Reveal>

        {/* The statement. Line breaks are authored, not measured — see TextReveal. */}
        <h1 className="mt-8 text-display text-ink md:mt-10">
          <TextReveal
            delay={0.15}
            lines={[
              headline.lead,
              // <em> is already italic; the serif face carries the contrast.
              <em key="emphasis" className="font-serif font-normal tracking-[-0.02em]">
                {headline.emphasis}
              </em>,
              headline.trail,
            ]}
          />
        </h1>

        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-6 lg:col-span-5">
            <p className="text-ink-muted text-lead">{summary}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/work">
                  Selected work
                  <ArrowDown size={16} strokeWidth={2} aria-hidden className="-rotate-45" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in touch</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.62} className="md:col-span-4 md:col-start-9">
            <p className="flex items-center gap-2.5">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-positive opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-positive" />
              </span>
              <span className="label text-ink">{availability.label}</span>
            </p>
            <p className="mt-3 text-ink-muted text-sm">{availability.detail}</p>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-line border-t pt-6 md:grid-cols-1 md:gap-5">
              {stats().map((stat) => (
                <div
                  key={stat.label}
                  className="md:flex md:items-baseline md:justify-between md:gap-4"
                >
                  <dt className="label order-2 mt-1 text-ink-subtle md:mt-0">{stat.label}</dt>
                  <dd className="order-1 font-medium text-subheading text-ink tabular-nums">
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

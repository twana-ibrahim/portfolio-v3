import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/features/contact";
import { siteConfig } from "@/lib/config/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  path: "/contact",
  description:
    "Get in touch about remote frontend engineering roles. Based in Kalar, Sulaymaniyah, Iraq and open to new work.",
});

const directLinks = [
  { label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  {
    label: "Phone",
    value: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phoneHref}`,
  },
  { label: "LinkedIn", value: "twana-ibrahim", href: siteConfig.socials.linkedin },
  { label: "GitHub", value: "twana-ibrahim", href: siteConfig.socials.github },
] as const;

export default function ContactPage() {
  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="label text-ink-subtle">Contact</p>
        <h1 className="mt-6 max-w-3xl text-ink text-title">
          Let's talk about what you're building.
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-12">
        <Reveal delay={0.1} className="md:col-span-7">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.18} className="md:col-span-4 md:col-start-9">
          <h2 className="label text-ink-subtle">Direct</h2>
          <dl className="mt-6 border-line border-t">
            {directLinks.map((link) => (
              // Wraps rather than overflows. At exactly 768 the two-column
              // grid engages and leaves this sidebar ~220px, which is narrower
              // than the email address — and a flex item defaults to
              // min-width:auto, so it refuses to shrink and pushes the page
              // sideways instead. The value drops to its own line first, and
              // only breaks mid-token if even that is not enough.
              <div
                key={link.label}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-line border-b py-4"
              >
                <dt className="label text-ink-subtle">{link.label}</dt>
                <dd className="min-w-0">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group inline-flex max-w-full items-center gap-1 text-ink text-sm"
                  >
                    <span className="link-underline wrap-break-word">{link.value}</span>
                    {/* shrink-0: once the value wraps and fills the row, a
                        flex child with no floor gets compressed to zero and
                        the arrow silently disappears. */}
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="shrink-0 translate-y-px text-ink-subtle transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h2 className="label text-ink-subtle">Where</h2>
            <p className="mt-4 text-ink-muted text-sm leading-relaxed">
              {siteConfig.location.city}, {siteConfig.location.region},{" "}
              {siteConfig.location.country}. GMT+3 — a working day that overlaps comfortably with
              Europe and the Gulf, and the morning in North America.
            </p>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}

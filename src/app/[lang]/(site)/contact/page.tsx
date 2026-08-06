import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { pageCopy } from "@/content/pages";
import { ContactForm } from "@/features/contact";
import { siteConfig } from "@/lib/config/site";
import { pick } from "@/lib/i18n/localized";
import { getTranslations } from "@/lib/i18n/server";
import { createMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getTranslations();

  return createMetadata({
    title: dictionary.contact.eyebrow,
    path: "/contact",
    locale,
    description: pick(pageCopy.contact.description, locale),
  });
}

export default async function ContactPage() {
  const { locale, dictionary } = await getTranslations();

  /**
   * Every value here is Latin in both locales — an address, a number and two
   * handles — so each is rendered inside a `dir="ltr"` span. Without it the
   * bidi algorithm reorders "+964 770 672 4292" into something that is not the
   * phone number.
   */
  const directLinks = [
    {
      label: dictionary.contact.email,
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      label: dictionary.contact.phone,
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phoneHref}`,
    },
    { label: "LinkedIn", value: "twana-ibrahim", href: siteConfig.socials.linkedin },
    { label: "GitHub", value: "twana-ibrahim", href: siteConfig.socials.github },
  ];

  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <p className="label text-ink-subtle">{dictionary.contact.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl text-ink text-title">
          {pick(pageCopy.contact.title, locale)}
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-12 md:gap-12">
        <Reveal delay={0.1} className="md:col-span-7">
          <ContactForm locale={locale} dictionary={dictionary} />
        </Reveal>

        <Reveal delay={0.18} className="md:col-span-4 md:col-start-9">
          <h2 className="label text-ink-subtle">{dictionary.contact.direct}</h2>
          <dl className="mt-6 border-line border-t">
            {directLinks.map((link) => (
              // Wraps rather than overflows. At exactly 768 the two-column
              // grid engages and leaves this sidebar ~220px, which is narrower
              // than the email address — and a flex item defaults to
              // min-width:auto, so it refuses to shrink and pushes the page
              // sideways instead. The value drops to its own line first, and
              // only breaks mid-token if even that is not enough.
              <div
                key={link.href}
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
                    {/* dir sits on the value, not the link. Scoping it to the
                        Latin run keeps the arrow in the page's direction, so
                        it mirrors like every other "leaves the site" arrow
                        rather than pointing the opposite way to its twin in
                        the footer. */}
                    <span dir="ltr" className="link-underline wrap-break-word">
                      {link.value}
                    </span>
                    {/* shrink-0: once the value wraps and fills the row, a
                        flex child with no floor gets compressed to zero and
                        the arrow silently disappears. */}
                    <ArrowUpRight
                      size={13}
                      aria-hidden
                      className="shrink-0 translate-y-px text-ink-subtle transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
                    />
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h2 className="label text-ink-subtle">{dictionary.contact.where}</h2>
            <p className="mt-4 text-ink-muted text-sm leading-relaxed">
              {pick(pageCopy.contact.where, locale)}
            </p>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}

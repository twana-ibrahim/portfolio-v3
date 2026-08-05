import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { LocalTime } from "@/components/layout/local-time";
import type { Locale } from "@/lib/config/i18n";
import { navigation, siteConfig } from "@/lib/config/site";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { localePath } from "@/lib/i18n/routing";

const socialLinks = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Email", href: `mailto:${siteConfig.contact.email}` },
] as const;

export function Footer({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="mt-auto border-line border-t">
      <Container className="grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Logo className="h-7 text-ink" />
          <p className="mt-5 max-w-xs text-ink-muted text-sm leading-relaxed">
            {siteConfig.tagline}
          </p>
          <p className="label mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-ink-subtle">
            <span>
              {siteConfig.location.city}, {siteConfig.location.country}
            </span>
            <span aria-hidden className="h-px w-3 bg-line-strong" />
            <LocalTime suffix={dictionary.footer.localTime} />
          </p>
        </div>

        <nav aria-label={dictionary.a11y.footerNav} className="md:col-span-3 md:col-start-7">
          <h2 className="label text-ink-subtle">{dictionary.footer.pages}</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  // py-1.5 lifts this from an 18px target to 30px. Standalone
                  // links in a footer are not the inline-text exemption.
                  className="link-underline inline-block py-1.5 text-ink-muted text-sm hover:text-ink"
                >
                  {dictionary.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label text-ink-subtle">{dictionary.footer.elsewhere}</h2>
          <ul className="mt-5 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group inline-flex items-center gap-1 py-1.5 text-ink-muted text-sm transition-colors duration-fast hover:text-ink"
                >
                  <span className="link-underline">{link.label}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden
                    // rtl:-scale-x-100 mirrors the arrow. A "leaves the site"
                    // arrow points away from the reading direction, so in RTL
                    // it has to point up-left or it reads as "come back".
                    className="translate-y-px transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col gap-3 border-line border-t py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="label text-ink-subtle">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="label text-ink-subtle" dir="ltr">
          {dictionary.footer.builtWith}
        </p>
      </Container>
    </footer>
  );
}

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { LocalTime } from "@/components/layout/local-time";
import { navigation, siteConfig } from "@/lib/config/site";

const socialLinks = [
  { label: "GitHub", href: siteConfig.socials.github },
  { label: "LinkedIn", href: siteConfig.socials.linkedin },
  { label: "Email", href: `mailto:${siteConfig.contact.email}` },
] as const;

export function Footer() {
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
            <LocalTime />
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <h2 className="label text-ink-subtle">Pages</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-underline text-ink-muted text-sm hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="label text-ink-subtle">Elsewhere</h2>
          <ul className="mt-5 space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="group inline-flex items-center gap-1 text-ink-muted text-sm transition-colors duration-fast hover:text-ink"
                >
                  <span className="link-underline">{link.label}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden
                    className="translate-y-px transition-transform duration-fast ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
        <p className="label text-ink-subtle">Next.js · TypeScript · Tailwind</p>
      </Container>
    </footer>
  );
}

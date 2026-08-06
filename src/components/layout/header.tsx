"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import type { Locale } from "@/lib/config/i18n";
import { navigation, siteConfig } from "@/lib/config/site";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { localePath } from "@/lib/i18n/routing";
import { cn } from "@/lib/utils/cn";
import { ordinal } from "@/lib/utils/format";

type HeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
  /**
   * Resolved by the server parent. A Client Component cannot call
   * `next/root-params`, and importing the content module here would pull the
   * whole Zod-parsed profile into the browser bundle for one string.
   */
  name: string;
};

/**
 * The header is transparent over the hero and only grows a background and a
 * hairline once the page has scrolled. A permanently filled bar would cut the
 * hero's full-bleed type in half, which is the whole point of the layout.
 */
export function Header({ locale, dictionary, name }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Compared against the locale-prefixed path, because that is what the
   * router reports. "/" is still exact-match only: every pathname starts with
   * the locale root, so the prefix test that keeps Work current on
   * /en/work/<slug> would mark Home current everywhere.
   */
  const isActive = (href: (typeof navigation)[number]["href"]) => {
    const target = localePath(locale, href);
    return href === "/"
      ? pathname === target
      : pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-base ease-out-expo",
        scrolled && "border-line border-b bg-paper/80 backdrop-blur-md",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-8">
        <Link
          href={localePath(locale, "/")}
          className="group flex items-center gap-3 text-ink"
          aria-label={`${name} — ${dictionary.a11y.home}`}
        >
          <Logo className="h-7 transition-colors duration-fast group-hover:text-accent" />
          <span className="hidden font-medium text-[0.9375rem] tracking-tight sm:block">
            {name}
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <nav aria-label={dictionary.a11y.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(locale, item.href)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-underline text-[0.9375rem] transition-colors duration-fast",
                      isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {dictionary.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageToggle locale={locale} dictionary={dictionary} />
          <ThemeToggle dictionary={dictionary} />

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label={dictionary.a11y.openMenu}
              className="grid size-9 place-items-center text-ink-muted transition-colors duration-fast hover:text-ink md:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-100 flex flex-col bg-paper data-[state=closed]:dialog-exit data-[state=open]:dialog-enter">
                <Dialog.Title className="sr-only">{dictionary.a11y.navigationDialog}</Dialog.Title>

                <Container className="flex h-18 shrink-0 items-center justify-between">
                  <Logo className="h-7" />
                  <Dialog.Close
                    aria-label={dictionary.a11y.closeMenu}
                    className="grid size-9 place-items-center text-ink-muted transition-colors duration-fast hover:text-ink"
                  >
                    <X size={20} strokeWidth={1.5} aria-hidden />
                  </Dialog.Close>
                </Container>

                <Container as="nav" aria-label={dictionary.a11y.mobileNav} className="mt-10 flex-1">
                  <ul className="flex flex-col">
                    {navigation.map((item, index) => (
                      <li key={item.href} className="border-line border-t">
                        <Link
                          href={localePath(locale, item.href)}
                          // Closed here rather than in an effect watching the
                          // pathname: the click is the cause, so it should be
                          // the trigger. Also covers navigating to the page
                          // you are already on, which no route change reports.
                          onClick={() => setMenuOpen(false)}
                          className="flex items-baseline gap-5 py-6 text-heading text-ink"
                        >
                          <span dir="ltr" className="label text-ink-subtle">
                            {ordinal(index)}
                          </span>
                          {dictionary.nav[item.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Container>

                <Container className="border-line border-t py-8">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    dir="ltr"
                    className="link-underline text-ink-muted rtl:text-end"
                  >
                    {siteConfig.contact.email}
                  </a>
                </Container>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Container>
    </header>
  );
}

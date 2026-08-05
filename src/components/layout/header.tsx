"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navigation, siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils/cn";

/**
 * The header is transparent over the hero and only grows a background and a
 * hairline once the page has scrolled. A permanently filled bar would cut the
 * hero's full-bleed type in half, which is the whole point of the layout.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" is exact-match only. The prefix test below is what lets /work/<slug>
  // keep Work marked current, but every path starts with "/", so applying it
  // to the home link would mark Home as the current page on every route.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-base ease-out-expo",
        scrolled && "border-line border-b bg-paper/80 backdrop-blur-md",
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-ink"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo className="h-7 transition-colors duration-fast group-hover:text-accent" />
          <span className="hidden font-medium text-[0.9375rem] tracking-tight sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-1 md:gap-6">
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-underline text-[0.9375rem] transition-colors duration-fast",
                      isActive(item.href) ? "text-ink" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger
              aria-label="Open menu"
              className="grid size-9 place-items-center text-ink-muted transition-colors duration-fast hover:text-ink md:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Content className="fixed inset-0 z-100 flex flex-col bg-paper data-[state=closed]:dialog-exit data-[state=open]:dialog-enter">
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>

                <Container className="flex h-18 shrink-0 items-center justify-between">
                  <Logo className="h-7" />
                  <Dialog.Close
                    aria-label="Close menu"
                    className="grid size-9 place-items-center text-ink-muted transition-colors duration-fast hover:text-ink"
                  >
                    <X size={20} strokeWidth={1.5} aria-hidden />
                  </Dialog.Close>
                </Container>

                <Container as="nav" aria-label="Mobile" className="mt-10 flex-1">
                  <ul className="flex flex-col">
                    {navigation.map((item, index) => (
                      <li key={item.href} className="border-line border-t">
                        <Link
                          href={item.href}
                          // Closed here rather than in an effect watching the
                          // pathname: the click is the cause, so it should be
                          // the trigger. Also covers navigating to the page
                          // you are already on, which no route change reports.
                          onClick={() => setMenuOpen(false)}
                          className="flex items-baseline gap-5 py-6 text-heading text-ink"
                        >
                          <span className="label text-ink-subtle">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Container>

                <Container className="border-line border-t py-8">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="link-underline text-ink-muted"
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

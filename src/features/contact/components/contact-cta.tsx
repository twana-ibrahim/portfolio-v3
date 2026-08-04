import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

/**
 * Closing call to action.
 *
 * Full-bleed inverted block — the one moment on the page where the colour
 * flips. Used to end the home page, so the last thing on screen is an
 * invitation rather than a footer.
 */
export function ContactCta() {
  return (
    <section className="bg-paper-inverted py-24 text-ink-inverted md:py-32">
      <Container>
        <Reveal>
          <p className="label text-ink-inverted/50">{siteConfig.availability.label}</p>

          <h2 className="mt-7 max-w-4xl text-ink-inverted text-title">
            Have something that needs building{" "}
            <em className="font-serif font-normal tracking-[-0.02em]">properly</em>?
          </h2>

          <p className="mt-7 max-w-xl text-ink-inverted/70 text-lead">
            Open to remote and contract engagements. Tell me what you're working on and I'll come
            back with a straight answer about whether I'm the right person for it — including when
            I'm not.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </Link>
            </Button>

            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="link-underline text-ink-inverted/70 transition-colors duration-fast hover:text-ink-inverted"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

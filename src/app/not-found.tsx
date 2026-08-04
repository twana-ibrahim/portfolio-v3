import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

/**
 * Lives at the app root rather than inside (site), so it needs its own chrome.
 * Kept deliberately plain — a joke 404 is a liability on a page whose entire
 * job is to get someone back to the work.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 items-center">
        <Container className="py-32">
          <p className="label text-accent">404</p>
          <h1 className="mt-6 max-w-2xl text-ink text-title">This page doesn't exist.</h1>
          <p className="mt-6 max-w-md text-ink-muted text-lead">
            The link is either wrong or it pointed at something that has since moved.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/">Back home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/work">See the work</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

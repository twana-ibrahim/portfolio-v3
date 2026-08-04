import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

/**
 * Chrome shared by every public page.
 *
 * Kept in a route group rather than the root layout so that future routes
 * which should not have the site header — an OG image route, a bare print
 * view of the CV — can sit outside it without fighting the layout.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}

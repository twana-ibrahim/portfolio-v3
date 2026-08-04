import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/config/site";

export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-6 py-24">
      <ThemeToggle />
      <p className="label text-ink-subtle">{siteConfig.location.city}</p>
      <h1 className="mt-6 text-display">{siteConfig.name}</h1>
      <p className="mt-8 max-w-prose text-lead text-ink-muted transition-colors duration-fast ease-out-expo">
        {siteConfig.summary}
      </p>
    </main>
  );
}

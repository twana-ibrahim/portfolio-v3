<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Twana Ibrahim — Portfolio

Personal portfolio for a software engineer based in Kalar, Sulaymaniyah, Iraq.
Rebuild of
`twana-ibrahim.vercel.app`, deployed on Vercel.

## Commands

```bash
pnpm dev          # dev server (Turbopack)
pnpm build        # production build — also regenerates typed route definitions
pnpm verify       # lint + typecheck. Run before every commit.
pnpm lint:fix     # biome check --write
pnpm typecheck    # tsc --noEmit
pnpm analyze      # bundle analyzer
```

If `tsc` reports missing route types or `PageProps<"/x">` failing its
constraint, the generated types under `.next/types` are stale. Run `pnpm build`
— it regenerates them. This happens after moving or adding a route file.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript (strict, plus
`noUncheckedIndexedAccess` and `verbatimModuleSyntax`) · Tailwind v4 · Motion ·
Zod v4 · Radix · Resend · Biome · pnpm.

There is no test suite. It was removed deliberately; the build, `tsc` and Zod's
parse-at-module-load are the only automated guards left, so anything they do
not catch reaches production. Contrast, layout overflow and interactive states
are now manual checks.

Deliberately absent: no state library (a portfolio has no global state worth a
store), no UI kit (fights Tailwind, ships dead weight), no data-fetching
library (RSC covers it), no CMS (see "Content" below).

## Architecture

```
src/
├── app/              ROUTING ONLY. No logic, no styling decisions.
│   ├── (site)/       Public pages — share Header/Footer via the group layout.
│   └── icon.svg      Favicon, theme-aware via prefers-color-scheme.
├── features/         Vertical slices. Each owns its components and logic.
│   └── <slice>/
│       ├── components/
│       ├── index.ts  Public API — the ONLY file other code may import from.
│       └── …         actions.ts, schema.ts as needed
├── components/
│   ├── ui/           Primitives. Know nothing about the portfolio's domain.
│   ├── layout/       Container, Section, Header, Footer.
│   ├── motion/       Reveal, Stagger, TextReveal.
│   ├── mdx/          MDX element map + authoring components.
│   └── brand/        Logo.
├── content/          The actual portfolio content. Zod-validated.
│   ├── schema.ts     Every content shape + collection-level invariants.
│   ├── projects.ts · experience.ts · skills.ts
│   └── case-studies/ *.mdx
├── lib/
│   ├── config/       site.ts (every personal fact), env.ts (server env)
│   ├── content/      MDX reading and validation
│   ├── seo/          createMetadata()
│   └── utils/        cn, format
└── styles/           tokens.css (the design system), globals.css
```

### The five rules

1. **`app/` never contains logic.** Pages import feature slices and compose
   them. If a page file grows past a screen, the work belongs in a slice.
2. **Features never import from other features.** Cross-feature composition
   happens in `app/`. This is the rule that stops the dependency graph rotting.
3. **Import slices through `index.ts`.** `@/features/work`, never
   `@/features/work/components/project-row`.
4. **`components/ui/` knows nothing about the domain.** A `Tag` does not know
   what a "skill" is.
5. **No raw design values in components.** Every colour, size, duration and
   easing comes from `src/styles/tokens.css`. If a value is missing, add it to
   the tokens first. No `text-[#333]`, no `duration-[420ms]`.

## Design system

Direction is **Editorial / Swiss**: oversized type, generous whitespace, a
strict grid, hairline rules, sharp corners, one accent colour used as a signal.

- Colours are OKLCH, defined once in `:root` and remapped in `.dark`. Three ink
  levels, two line weights, one accent. That is the whole palette.
- Type scale is fluid `clamp()`; tracking tightens as size grows.
- Geist Sans (body/UI), Geist Mono (metadata via the `label` utility),
  Instrument Serif (used once or twice a page for emphasis — a seasoning).
- Tailwind v4 has an `--ease-*` namespace but **no `--duration-*` one**, so
  `duration-fast`/`base`/`slow` are declared as `@utility` in `globals.css`.
  Adding a duration token means adding the utility too.
- `!important` appears exactly once, in the `prefers-reduced-motion` block, and
  Biome's rule is disabled for that file only.

## Motion

One-shot entrances only — nothing is scroll-*linked*. Every motion component
early-returns a plain `<div>` when `useReducedMotion()` is true; the CSS guard
in `globals.css` does not stop JS-driven inline transforms, so this matters.

`TextReveal` takes **authored** lines rather than measuring them. Runtime line
splitting either blocks paint or reflows after the webfont loads.

The one exception to "components own their motion" is the theme change, which
sweeps out from the toggle as an expanding circle. It runs on the View
Transition API: one `clip-path` on `::view-transition-new(root)` reveals the
whole page, where transitioning the live DOM would mean a transition on every
element and a full repaint per frame.

Three things about it are load-bearing and none is obvious:

- `setTheme` goes inside `flushSync`. next-themes applies the class from an
  effect, and the API snapshots whatever the DOM looks like when its callback
  returns.
- `theme-toggle.tsx` injects a `<style>` with the circle's geometry already
  substituted, and removes it when the transition finishes. Not a rule in
  `globals.css` reading custom properties off `<html>` — the
  `::view-transition-*` tree inherits from the document element in theory, and
  a `var()` that arrives unresolved falls back in silence. Not
  `element.animate(…, { pseudoElement })` either, which is Chromium-only for
  these pseudo-elements.
- `::view-transition-new(root)` keeps the UA fade-in on purpose, so an engine
  that ignores the injected rule crossfades instead of cutting.

Every failure in this feature so far has been silent and plausible — a sweep
that still runs, from the wrong place or over the wrong duration. Neither the
build, the types nor a screenshot catches that. Check it by clicking, in more
than one browser.

## Content

Content is typed TS + MDX in `src/content/`, parsed through Zod at module load
so malformed data fails `pnpm build` rather than rendering broken in
production. There is no CMS and that is deliberate — one author, a handful of
updates a year, and a CMS would mean a database and hosting to solve a problem
that does not exist.

Adding a case study:

1. Copy `src/content/case-studies/fast-sim-pwa.mdx`.
2. Rename to `<project-slug>.mdx`. The `project` frontmatter field **must**
   equal the filename — the loader throws if it does not.
3. Flip `caseStudy: true` on that project in `projects.ts`. The loader also
   throws if a project claims a case study that has no file, because
   `dynamicParams` is off and the link would hard-404.

## Contact form

Server Action → Zod → Resend. No client-side API key, no third-party form
service. Spam handling is a honeypot field plus a time-trap (`MIN_ELAPSED_MS`);
both return a fake success so a scraper learns nothing. Serverless makes an
in-memory rate limiter useless, so there isn't one.

Requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`. These are
parsed lazily in `lib/config/env.ts` — a missing key breaks the form with a
clear message, not the build.

## Conventions

- Files kebab-case, components PascalCase.
- Comments explain **why**, never what. If a line needs a "what" comment, the
  line is wrong.
- `cn()` for all conditional classes. Every component accepts `className`.
- Prefer Server Components. `"use client"` only for state, effects or event
  handlers, pushed as far down the tree as possible.
- Accessibility is not optional: real focus states, labelled controls, correct
  landmarks, `prefers-reduced-motion` honoured.

## Open items

See `NOTES.md` — content that still needs Twana's own words and numbers, plus
the remaining build tasks.

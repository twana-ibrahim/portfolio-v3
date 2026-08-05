# Twana Ibrahim — Portfolio

Personal portfolio for a frontend engineer in Kalar, Sulaymaniyah, Iraq. Five
years of work on internal systems that businesses run on — digital banking,
telecom sales, streaming and advertising, identity and access management.

**Live:** [twana-ibrahim.vercel.app](https://twana-ibrahim.vercel.app)

---

## What this is

A rebuild, not a refresh. The previous version had the problems most developer
portfolios have: forty technology badges including "Hard Working", every
project styled as a link whether it went anywhere or not, and copy that
described nobody in particular.

This one is built on a few positions:

- **Nothing is invented.** Every claim traces to a line in a CV or a public
  repository. An early draft of a case study described an offline-first sync
  layer that never existed; it was cut rather than kept because it read well.
  Where a number is unknown, the field is empty rather than estimated.
- **Honest affordances.** Fourteen of the sixteen projects are internal work
  under NDA. Those rows are text, not dead links, and they say so.
- **Accessibility is a requirement.** WCAG AA contrast in both themes —
  every ink and surface pair computed against its background rather than
  eyeballed — correct landmarks and list semantics, and
  `prefers-reduced-motion` honoured everywhere motion appears.
- **Restraint as a design position.** Editorial/Swiss: oversized type,
  generous whitespace, hairline rules, one accent colour used as a signal.
  Three ink levels and two line weights are the entire palette.

## Built with Claude Opus

The site was built in collaboration with **Claude Opus** via
[Claude Code](https://claude.com/claude-code), working from a design direction
and a real CV rather than a template.

That collaboration is visible in the repository rather than hidden by it:

- `AGENTS.md` holds the architecture rules the code is held to — what may
  import what, where logic is allowed to live, why the design tokens exist.
- `NOTES.md` records open questions, decisions already made and why, and the
  findings from each QA pass. Decisions are written down specifically so they
  are not relitigated later.
- The commit history is one concern per commit, with the reasoning in the
  message rather than the diff.

Every engineering decision here — the content standard, the accessibility bar,
what to cut — was made deliberately and is documented where it was made.

## Stack

Next.js 16 (App Router, RSC) · React 19 · TypeScript (strict, plus
`noUncheckedIndexedAccess` and `verbatimModuleSyntax`) · Tailwind v4 · Motion ·
Zod v4 · Radix · Resend · Biome · pnpm.

Deliberately absent: no state library, no UI kit, no data-fetching library, no
CMS. Each of those solves a problem this site does not have, and the reasoning
for each is in `AGENTS.md`.

Every dependency is free and open source.

## Getting started

```bash
pnpm install
pnpm dev          # dev server (Turbopack)
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server |
| `pnpm build` | Production build; regenerates typed routes |
| `pnpm verify` | Lint + typecheck + unit tests. Run before every commit. |
| `pnpm test` | Vitest (watch) |
| `pnpm test:e2e` | Playwright — builds and serves first |
| `pnpm lint:fix` | Biome check and write |
| `pnpm analyze` | Bundle analyzer |

## Architecture

```
src/
├── app/          Routing only. No logic, no styling decisions.
├── features/     Vertical slices. Each owns its components and logic.
├── components/   ui/ · layout/ · motion/ · mdx/ · brand/
├── content/      The portfolio content itself. Zod-validated at module load.
├── lib/          config/ · content/ · seo/ · utils/
└── styles/       tokens.css (the design system), globals.css
```

Content is typed TypeScript and MDX, parsed through Zod when the module loads,
so malformed data fails `pnpm build` rather than rendering broken in
production. There is no CMS and that is deliberate — one author and a handful
of updates a year do not justify a database.

The full rules, and the reasoning behind them, are in `AGENTS.md`.

## Checks

```bash
pnpm verify       # lint + typecheck
```

There is no test suite. What still runs automatically:

- **TypeScript**, strict, with `noUncheckedIndexedAccess`
- **Biome** on commit, via lefthook
- **Zod at module load**, so malformed content fails `pnpm build` rather than
  rendering broken

Everything else is a manual check. Contrast in both themes, horizontal
overflow at each breakpoint, the mobile navigation dialog, the theme toggle
and the contact form's error states are not covered by anything — they are the
surfaces a type checker cannot see.

## Contact form

Server Action → Zod → Resend. No client-side API key and no third-party form
service. Spam handling is a honeypot field plus a submission-time trap; both
return a deliberately convincing success, so a scraper learns nothing about
which signal caught it.

Requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `CONTACT_TO_EMAIL`, parsed
lazily so a missing key breaks the form with a clear message rather than
breaking the build.

## Deployment

Deployed on Vercel. Pages are statically prerendered and revalidate daily, so
the two values read from the clock — years of experience and the copyright
year — cannot freeze at deploy time.

Set `NEXT_PUBLIC_SITE_URL` when a custom domain is attached; canonical URLs,
the sitemap and the Open Graph image all read from it.

---

The code is here to read. The content, CV and branding are Twana Ibrahim's.

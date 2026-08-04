# Open items

Working notes. Two lists: things only Twana can supply, and engineering work
still outstanding.

---

## 1. Content that needs your words and your numbers

The code is done and the site builds. **This list is what stands between it and
being genuinely better than the old one.** No amount of engineering substitutes
for it.

### Blocking — the site should not launch without these

- [ ] **Metrics.** Every project has `metrics: []`. Numbers are the single
      biggest differentiator: users, agents, records, transactions/day, load
      time before and after, bundle size, error rate. Rough is fine —
      "roughly 400 agents" beats silence. Deliberately left empty rather than
      guessed, because a wrong figure in an interview is worse than no figure.
- [ ] **Case study: Fast SIM.** `src/content/case-studies/fast-sim-pwa.mdx` is
      a structured template with `[BRACKETED]` prompts. Fill it in. The section
      that earns interviews is **"The decision"** — name the option you
      rejected and why.
- [ ] **Verify `src/content/experience.ts`.** Highlights were written from your
      old site's role descriptions. Read every line; rewrite anything you would
      not defend in an interview.
- [ ] **Verify project years** in `src/content/projects.ts`. Inferred from the
      employment timeline, so some are probably wrong.
- [ ] **Confirm the contact email.** `site.ts` uses
      `tuwana.ibrahim99@gmail.com` (from the old site). Your Claude account is
      `tuw.ibr99@gmail.com`. Which one should receive enquiries?
- [ ] **CV PDF** → `public/twana-ibrahim-cv.pdf`. The About page already links
      to it and currently 404s.

### High value

- [ ] **Two more case studies.** MyTV+ and the Authentication Server are
      already `featured` and marked `caseStudy: false`. Three deep case studies
      beats fifteen one-liners by a wide margin.
- [ ] **Rewrite the About bio** (`src/app/(site)/about/page.tsx`, the `bio`
      array). It is a scaffold in a plausible voice, not yours. This is the one
      page where sounding like a person beats sounding polished.
- [ ] **Screenshots.** Which projects can be shown? For NDA work, blurred or
      abstracted diagrams still beat nothing — the `<Figure>` MDX component is
      ready for them.
- [ ] **Public links.** Any live URL or public repo at all. Currently only the
      two personal React Native apps have one.
- [ ] **Pin your GitHub repos.** The profile has 22 repos, 18 of them
      tutorial-era from 2020–21, and nothing pinned — so `movie-app` and
      `spotlight-app` are buried. Anyone following the footer link sees the
      weakest work first. Pin the two good ones.

### Decisions still open

- [ ] **FIB project description.** `projects.ts` has a deliberately vague entry
      — confirm what you can say publicly about it.
- [ ] **Languages** on the About page (Kurdish native / English professional /
      Arabic conversational) — assumed. Correct if wrong.
- [ ] **Custom domain.** Currently `twana-ibrahim.vercel.app`. Set
      `NEXT_PUBLIC_SITE_URL` in Vercel when you attach one — canonical URLs,
      sitemap and OG image URLs all read from it.

---

## 2. Engineering still outstanding

- [ ] SEO layer: JSON-LD (Person + BreadcrumbList), `sitemap.ts`, `robots.ts`,
      dynamic OG image via `next/og`, custom `not-found.tsx`.
- [ ] Tests: Vitest units for `format.ts` and the content schemas; Playwright
      smoke + axe accessibility pass on every route, both themes.
- [ ] Visual QA at 360 / 768 / 1280 / 1920, light and dark.
- [ ] Lighthouse pass — target 100 across the board; it is achievable on a site
      this size and it is a credential in itself for a frontend engineer.
- [ ] `.env.example` + Resend setup (verify a sending domain).
- [ ] Push to GitHub and connect the Vercel project.

---

## Decisions already made

Recorded so they are not relitigated later.

| Question | Decision | Why |
| --- | --- | --- |
| Content source | Local MDX + typed TS | One author, few updates. A CMS adds a database and hosting to solve a problem that does not exist. |
| Design direction | Editorial / Swiss | Ages well, hardest to get wrong, puts the work first. |
| Motion | Tasteful, one-shot | Polish without a performance bill or a Safari fallback problem. |
| Languages | English only | Recruiters and remote clients read English; i18n + RTL triples the work. |
| Positioning | Software Engineer | Twana's call. Case studies carry backend/systems weight so the title is earned. |
| Blog | None for now | An empty or stale blog hurts. The MDX pipeline exists, so a route is one file away. |
| Logo | Inlined `currentColor` SVG | One file serves both themes; no second request, no flash on toggle. Sources kept in `public/brand/`. |

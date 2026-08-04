# Open items

Working notes. Two lists: things only Twana can supply, and engineering work
still outstanding.

---

## 1. Content

All content has been rewritten against the real CV (`public/twana-ibrahim-cv.pdf`).
Nothing on the site is invented any more — every claim traces to a line in that
document. What's left is the part a CV can't provide.

### Blocking — the site should not launch without these

- [ ] **Metrics.** Every project still has `metrics: []`. This is the single
      biggest differentiator available and the CV has none of it. Agents on the
      platform, activations per month, records under management, rows in the
      heaviest table, load time before and after your optimisation work. Rough
      is fine — "around 400 agents" is honest and useful. Left empty rather
      than guessed, because a wrong figure in an interview is worse than none.
- [ ] **The Fast SIM case study.** `src/content/case-studies/fast-sim-pwa.mdx`
      is a structured template with `[BRACKETED]` prompts, anchored to what the
      CV actually says the system did. Fill it in. The section that earns
      interviews is **"The decision"** — name the option you rejected and why.
- [ ] **Read the experience highlights aloud.** `src/content/experience.ts`.
      The facts are yours; the sentences are mine. Anywhere a line reads as a
      responsibility rather than an achievement, add the number that turns it
      into one.

### Decisions for you

- [ ] **Job title mismatch.** Your CV says *"Senior Software Engineer
      (Frontend)"*. The site says *"Software Engineer"* — your call earlier in
      the build. A recruiter comparing the two will notice. Pick one and make
      both match; `siteConfig.role` is the only place the site needs changing.
      For what it's worth, the CV's version is stronger and your history
      supports it.
- [ ] **FIB description.** `projects.ts` deliberately says little. Confirm what
      you can say publicly about a banking client.
- [ ] **Custom domain.** Currently `twana-ibrahim.vercel.app`. Set
      `NEXT_PUBLIC_SITE_URL` in Vercel when you attach one — canonical URLs,
      sitemap and OG image URLs all read from it.

### High value

- [ ] **Two more case studies.** MyTV+ and the Authentication Server are
      already `featured` with `caseStudy: false`. Three deep case studies beat
      fifteen one-liners by a wide margin. Copy the Fast SIM template.
- [ ] **Rewrite the About bio in your voice.** `src/app/(site)/about/page.tsx`,
      the `bio` array. Facts are all from the CV, but the voice is mine.
- [ ] **Screenshots.** Which projects can be shown? For NDA work, blurred or
      abstracted diagrams still beat nothing — the `<Figure>` MDX component is
      ready.
- [ ] **Pin your GitHub repos.** 22 repos, 18 of them tutorial-era from
      2020–21, nothing pinned — so `movie-app` and `spotlight-app` are buried.
      Anyone following the footer link currently sees your weakest work first.

### Resolved

- [x] CV supplied, renamed to `public/twana-ibrahim-cv.pdf` (spaces removed
      from the filename so the URL is clean).
- [x] Contact email confirmed: `tuwana.ibrahim99@gmail.com`.
- [x] Location corrected to Kalar, Sulaymaniyah.
- [x] Certifications added — Advanced React (Meta), Foundations of Project
      Management (Google), Jira Fundamentals (Atlassian). These were not on the
      old site at all.
- [x] Languages corrected: Arabic is *elementary*, not conversational, and
      Persian was missing entirely.
- [x] **Removed a fabrication.** The first draft of the Fast SIM case study was
      built around offline-first sync with an IndexedDB queue and background
      replay. None of that appears in the CV — it was invented. The template
      now follows what the CV documents: filtering and reporting at volume,
      role-based rendering, and real-time agent management.
- [x] FIB continuity captured — the project started on the Gateway ICT team and
      moved with you to Tailored Applications. That reads far better than two
      unrelated jobs.

---

## 2. Engineering still outstanding

- [ ] Visual QA at 360 / 768 / 1280 / 1920, light and dark.
- [ ] Playwright smoke + axe accessibility pass on every route, both themes.
- [ ] Lighthouse pass — target 100 across the board. Achievable on a site this
      size, and it's a credential in itself for a frontend engineer.
- [ ] Resend setup: verify a sending domain, then set the three variables in
      `.env.example`.
- [ ] Push to GitHub, connect the Vercel project.

---

## Decisions already made

Recorded so they are not relitigated later.

| Question | Decision | Why |
| --- | --- | --- |
| Content source | Local MDX + typed TS | One author, few updates. A CMS adds a database and hosting to solve a problem that does not exist. |
| Design direction | Editorial / Swiss | Ages well, hardest to get wrong, puts the work first. |
| Motion | Tasteful, one-shot | Polish without a performance bill or a Safari fallback problem. |
| Languages (site) | English only | Recruiters and remote clients read English; i18n + RTL triples the work. |
| Blog | None for now | An empty or stale blog hurts. The MDX pipeline exists, so a route is one file away. |
| Logo | Inlined `currentColor` SVG | One file serves both themes; no second request, no flash on toggle. Sources kept in `public/brand/`. |
| Skill list | 4 groups, 6 items max | The old 40-badge wall said "I have heard of these things". Everything cut still appears in context on the projects, where it proves more. |

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
      biggest differentiator available and the CV has none of it. Rough is
      fine — "around 400 agents" is honest and useful. Left empty rather
      than guessed, because a wrong figure in an interview is worse than none.
      `value` is a **string**, so `"~400"` and `"3 min → 40s"` both validate.
      Only the four `featured` projects need them:
      - Fast SIM — agents on the platform · activations per month · rows in the
        heaviest dealer table · time per activation before vs after
      - MyTV+ — subscribers or concurrent viewers · catalogue size · which
        device classes shipped to
      - Authentication Server — products it was the IdP for · accounts under
        management · roughly how many distinct roles
      - FIB — probably nothing publicly sayable; leaving it empty is fine
- [ ] **Read the experience highlights aloud.** `src/content/experience.ts`.
      The facts are yours; the sentences are mine. Anywhere a line reads as a
      responsibility rather than an achievement, add the number that turns it
      into one.

### Case studies — deliberately none, for now

The Fast SIM case study has been **removed**, not deferred. `caseStudy` is now
`false` on every project and `src/content/case-studies/` is empty.

The template asked for the before-state, what broke at volume, and one hard
call with the rejected option named. Twana's scope on Fast SIM was
spec-and-ticket delivery rather than owning those decisions, so the answers
would have had to be invented — the same failure already recorded below, where
an earlier draft fabricated an offline-first sync layer.

An empty case-study section costs less than a hollow one: the format promises
depth, and a reader who asks a single follow-up finds the floor. The work list
carries the site on its own.

To bring one back: write `src/content/case-studies/<slug>.mdx`, flip
`caseStudy: true` on that project, and add the slug to `routes` in
`e2e/helpers.ts`. The old template is at commit `a85418b` if the structure is
useful. The strongest honest anchor is whichever project gave the most
latitude — the personal repos (`movie-app`, `spotlight`) qualify by
definition, since every decision in them is his.

### Content audit against the CV — things only you can settle

Read `public/twana-ibrahim-cv.pdf` line by line against every content file.
Dates, languages, education, certifications and the technical-skills list all
match. Five things do not.

- [x] **"Erbil, Iraq" confirmed.** Company HQs are in Erbil; Twana works
      remotely from Kalar. `location` + `arrangement: "remote"` already says
      exactly that, so nothing changed.
- [x] **Fastlink renamed to the CV's *Fastlink Telecom*** across
      `experience.ts` and all four `projects.ts` entries.
- [x] **Mashqi Hawina confirmed real** — a final-year university project. Its
      `role` changed from "Frontend Developer" to "Final-year university
      project": next to a university's name the old wording read as a client
      engagement, which it was not.
- [x] **Backend background confirmed and now said out loud.** A paragraph in
      the About bio covers Node, Express, REST and schema design, framed as
      what it buys the frontend rather than as a second job title.
- [ ] **The performance claim still has no number.** This is
      `experience.ts` → Gateway ICT (2025-04) → *"Cut load and interaction
      cost across large React applications through code splitting, lazy
      loading and state that stopped re-rendering the world."*

      The sentence names three techniques and no result. A reader cannot tell
      whether it saved 100ms or four seconds, and it is the one line on the
      site an interviewer is most likely to stop on, because it is the only
      claim that is measurable in principle and unmeasured in practice.

      Anything concrete fixes it, and rough is fine:
      - bundle size before and after ("1.4MB → 480KB")
      - time to interactive on the heaviest screen ("6s → under 2s")
      - rows the table handled before it locked up, versus after
      - how long a report took to open for a dealer with a year of data

      If no number was ever recorded, say what changed qualitatively and
      concretely instead — "the agent list stopped freezing on mid-range
      Android" is checkable in a way that "improved performance" is not.

### What the content is still missing

- [ ] **Metrics** — see above, unchanged and still the biggest single gap.
- [ ] **FIB says almost nothing.** It is featured, it is the current work, and
      the summary is generic. Even under NDA the *shape* is sayable: how many
      screens, what the review bar is, what regulated delivery changes about
      the day job.
- [ ] **Nothing about how you work.** The CV mentions mentoring and code
      review; the site's About covers none of it. For a senior positioning
      that is the gap that matters most after metrics — a reader can see what
      you built but not what you would be like to work with.
- [ ] **No third-party voice.** One line from a lead at Gateway or Fastlink
      would outweigh several paragraphs of self-description. Worth asking
      while the relationships are warm.

### Decisions for you

- [x] **Job title resolved** — `siteConfig.role` is *"Software Engineer
      (Frontend)"*, matching the header of the CV dated Aug 2026.
- [ ] **Your CV contradicts itself in the first two lines.** The header says
      *Software Engineer (Frontend)*; the PROFESSIONAL SUMMARY directly below
      still opens *"Senior Software Engineer with over 5 years…"*. The site
      follows the header. Fix the summary line in the PDF, or put "Senior"
      back in the header and tell me — but the two should not disagree on the
      same page, and a reader sees both at once.
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

### Visual QA — first pass done, findings below

Screenshotted every route at 1440 and 390, light and dark, via Playwright.
No horizontal overflow anywhere. Three bugs found and fixed (commit `d696b9d`):
the tailwind-merge class-collapse, the wrapping hero headline, and the
floored years count.

Still to check:
- [ ] 768 and 1920 breakpoints (only 390 and 1440 were covered).
- [ ] Mobile detail pass — the 390px capture confirmed structure and stacking
      but was too small to judge type sizing and spacing properly.
- [ ] Mobile nav dialog, theme toggle, and form error states were never
      exercised — all three are interactive and screenshots don't reach them.
- [ ] Contact form submit path has never been run end to end (needs Resend
      credentials).

**Method note for whoever picks this up:** `globals.css` sets
`scroll-behavior: smooth`, so a scripted scroll must pass
`behavior: "instant"` or it never arrives and `whileInView` reveals stay at
opacity 0 — which looks exactly like a rendering bug and is not one. A
`fullPage` screenshot also expands the viewport, so scroll the page fully
first, then return to top, then capture.

**Second half of that note, learned the hard way:** scrolling to the bottom in
*one jump* is not enough either. IntersectionObserver reports what intersects
when it samples, so going from scroll 0 to `scrollHeight` in a single frame
takes every mid-page element from below the fold to above it without ever
being inside it — the observer never fires. The first capture of this pass had
entirely blank "Selected work" and "Experience" sections and looked like a
serious rendering bug. It was the scroll. `settle()` in `e2e/helpers.ts` now
steps down the page at 60% of viewport height per frame; use it rather than
rolling your own.

- [x] **Visual QA at 768 / 1024 / 1920** — passed at the time, and it found the
      contact-page overflow below. No longer guarded: the check that caught it
      lived in `e2e/layout.spec.ts`, which has been removed. Re-check by hand
      after any layout change.
- [ ] Mobile detail pass at 390 — still worth a human eye on type sizing and
      spacing, which a pass/fail assertion cannot judge.
- [ ] **No automated checks remain.** A Playwright suite (smoke, axe in both
      themes, breakpoint overflow, and the interactive surfaces) reached 67
      passing tests and was then removed on request, along with the 40 unit
      tests. `pnpm verify` is now lint and typecheck only.

      Everything below that says "verified" or "caught by" was true when
      written and is no longer enforced. The six bugs in the QA section were
      all found by those suites; nothing would catch them recurring.
- [~] **Lighthouse — run on localhost, which only half counts.**
      Accessibility **100**, SEO **100**, Best Practices **96**, Performance
      **90**.
      - The two 100s are trustworthy: both are static analyses and do not care
        where the page is served from.
      - Best Practices is 96 *only* because `/_vercel/insights/script.js` and
        `/_vercel/speed-insights/script.js` 404 against `next start` — Vercel
        serves those from its own edge. Expect 100 on a real deployment.
      - Performance 90 is not a real number. It comes from LCP 3.5s, which is
        Lighthouse's simulated Slow-4G plus 4× CPU throttle applied to a
        localhost origin with no CDN. Measured directly, LCP is **216ms** and
        the element is the hero `<span>`. CLS is 0, TBT 100ms, and there are
        **no render-blocking resources**.
      - Genuinely portable and worth acting on: ~50KB of unused JS across two
        chunks, and **4 woff2 files totalling 83KB** — the largest single
        category on the page.
- [ ] Re-run Lighthouse against the deployed Vercel URL. That is the only run
      whose Performance number means anything.
- [ ] Resend setup: verify a sending domain, then set the three variables in
      `.env.example`.
- [ ] Push to GitHub, connect the Vercel project.

### QA pass — bugs found and fixed

Five real defects, four of them invisible to a screenshot.

1. **The honeypot never fired.** `website: z.string().max(0)` in
   `features/contact/schema.ts` made a *filled* honeypot fail the parse, so the
   action returned a validation error and never reached the
   `if (input.website) return success` branch below it. A bot got a silent
   no-op instead of the fake success, which is exactly the signal the fake
   success exists to withhold — and the field's error had no `<Field>` to
   render in, so nothing appeared on screen at all. The trap is a runtime
   decision; the schema now accepts anything.
2. **Lists were not lists.** `StaggerItem` wrapped every row in a motion `div`
   inside `<ul>`/`<ol>`, with `className="contents"` hiding it visually.
   `display: contents` fixes layout, not semantics: axe reported `list` and
   `listitem` violations on the home, work and about pages, and a screen reader
   would not announce the item count. `StaggerItem` now takes `as="li"`.
3. **`--ink-subtle` failed WCAG AA in both themes** — 3.15:1 light, 3.96:1
   dark, against a 4.5:1 requirement. It carries `label`, which is 0.75rem and
   so counts as normal text, not large. That is every metadata line, section
   heading and footer link on the site: the smallest type had the weakest
   contrast. Now 0.55 / 0.585, measuring 4.65:1 and 4.68:1. Also dropped a
   `text-ink-subtle/70` in the experience list that sat below even the old
   floor, and `text-ink-inverted/50` in the contact CTA (3.59:1 in dark, where
   `paper-inverted` is the *light* surface — it passed in light theme, which is
   why a single-theme check would have missed it).
4. **Three public projects were badged "Internal" with a padlock.**
   `resolveTarget` in `project-row.tsx` returned `"none"` for any project
   without a link and the row keyed the lock off *that*, not off
   `confidential`. `mytv-plus-website`, `heart-beats` and `mashqi-hawina` are
   public work with no URL recorded, and the site was calling them
   confidential.
5. **`/contact` overflowed the viewport by 31px at exactly 768.** The `md:`
   grid engages at 768 and leaves the sidebar ~220px, which is narrower than
   `tuwana.ibrahim99@gmail.com` — and a flex item defaults to
   `min-width: auto`, so it refused to shrink and pushed the whole page
   sideways. Only reproduces in the 768–1023 band, which is why 390 and 1440
   both missed it. The value now wraps to its own line.
6. **The email row's ↗ was invisible.** Fallout from the fix above: once the
   value wrapped and filled the row, the icon had no `shrink-0` and the flex
   container compressed it to 0px wide while the other three rows kept theirs.
   Caught by measuring the rendered width per row, not by looking — at 13px it
   is exactly the kind of thing an eye skips over.

**Method note:** the axe suite runs with `contextOptions: { reducedMotion:
"reduce" }`. The entrances animate opacity, so under parallel load a scan
catches an element mid-fade and reports a contrast failure that existed for
300ms — the suite flipped green to red purely on worker count. Reduced motion
renders the final state immediately, which is the state worth auditing.

### QA pass — open, needs a decision rather than a fix

- [ ] **Dates freeze at build time.** The footer's `© {new Date()...}` and the
      hero's `yearsOfExperience()` both run during a static prerender, so they
      are baked at deploy. The hero comment says "derived so it is never a
      stale hardcoded 5+" — it is still stale, just stamped at build instead of
      typed by hand. Harmless if the site is redeployed a few times a year;
      wrong every January otherwise.
- [x] **"5+" no longer overstates.** Was counting from the first employment
      record (2021-10) and *rounding*, so 4 yrs 10 mos rendered as "5+" —
      claiming five or more when it was neither. Now counts from
      `siteConfig.careerStart` (2021-01, when the stack was being learned) and
      floors, which is what makes the "+" true rather than aspirational.
      Today: 5 yrs 7 mos → "5+". Ticks to "6+" in Jan 2027.
- [ ] **"Five years" is still hardcoded in three places** — `siteConfig.summary`,
      the About `bio`, and the About `h1`. They agree with the computed figure
      today and stop agreeing in **Jan 2027**. Left as prose on purpose:
      "Five years in" reads better than "5 years in", and substituting a
      numeral into a sentence to save one edit a year is a bad trade. Put a
      reminder somewhere.
- [ ] **"Projects delivered" counts the personal ones** (16), while
      `industryCount` excludes them. Two stats sitting side by side counting
      different populations.
- [ ] Hitting `/work/<anything>` logs `Internal: NoFallbackError` server-side
      before correctly returning 404. Cosmetic, but it will be log noise on
      Vercel once crawlers find the old case-study URL.
- [ ] **Stale comment in `projects.ts`.** `industryCount`'s doc comment calls
      it *the "six industries" stat*; it computes **9**. The number on screen
      is right — the comment is describing an older content set.
- [ ] **The project row is cramped between 768 and 1023.** The 12-column grid
      engages at `md:`, which leaves the summary column ~216px and wraps it to
      five or six lines against a 92px meta column. Not broken, and no
      overflow — but the layout only really breathes from `lg:` up. Worth
      considering `lg:grid-cols-12` and letting 768–1023 stay stacked.

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
| Paper grain | Tried, reverted | A tiled SVG turbulence on the body background is the cheapest "printed stock" cue there is, costs no request, and looked good. It also stops axe resolving what any text sits on: contrast went from 12 nodes checked to 0, and 26 to *incomplete*, in both themes — while violations stayed at zero, because nothing was being measured. That check has caught two real bugs here. Any full-bleed background image hides the solid colour axe walks up to, so there is no version of this that keeps both. Don't re-add it. |
| Positioning | Roles, not contracts | Five years of employment at companies, not a freelance book. Leading with "contract engagements" invited questions about a track record that isn't there and undersold the one that is. |
| Tests | Removed entirely | Both suites deleted on request — 40 unit tests and 67 Playwright tests, plus vitest, Playwright, axe and Testing Library. `pnpm verify` is lint and typecheck; lefthook's pre-push test job is gone. The trade was made knowingly: those suites caught six real bugs in one session and the paper-grain regression before it shipped, and nothing now guards contrast, overflow, list semantics or the interactive surfaces. Recorded so it reads as a decision rather than an oversight. |
| Light theme | Matte, not brilliant | Paper moved from `oklch(0.985 0.002)` to `oklch(0.963 0.005)` — off near-white, with a little more warmth. Near-white with no chroma reads as a lit screen rather than stock. Darkening paper lowers every ratio against it, which took `ink-subtle` under AA, so it moved to 0.54 in the same change. The two are a pair; do not edit one alone. `line` and `line-strong` stepped down with it to keep the rules the same weight, and `viewport.themeColor` tracks paper. |
| Hover feel | Slow curve, not a switch | All interaction easing moved to `ease-out-expo` and `--duration-fast` from 180ms to 260ms. Under ~200ms a colour change reads as a switch being thrown. The curve is doing most of the work — expo decelerates hard, which is what reads as considered. |
| Budget | Free and open source only | No paid dependency, asset, font, or service tier. Rules out Spline's paid plans, commercial 3D model libraries and licensed typefaces. Everything currently in use qualifies — Geist and Instrument Serif are open-licence, three.js and Motion are MIT, and Vercel and Resend are used inside their free tiers. Check the licence before adding anything. |
| `paper-inverted` in dark | Elevated dark, not a literal inversion | Inverting it turned the contact band into a full-bleed near-white slab on an otherwise dark page. Someone on dark theme chose it to avoid exactly that — a bright block three quarters down the page is glare, not emphasis. In dark it is now `oklch(0.255)`, a step above `paper-raised`, so the band still reads as its own moment and the ink stays light. Contrast is unaffected: 7.61:1 at `/70`, 14.12:1 at full. |
| "Home" in the nav | Explicit item, not just the wordmark | The logo is only a home link to people who know the convention, and the mobile dialog covers the wordmark entirely — so there was no way back to the front page from inside the open menu. Note `isActive` special-cases `/`: every pathname starts with it, so the prefix match that keeps Work current on `/work/<slug>` would mark Home current everywhere. |

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
- [x] **768, 1024 and 1920 re-covered.** Every route × 390/768/1024/1440/1920 ×
      light/dark — 80 combinations — driven through headless Chrome over CDP.
      No horizontal overflow anywhere and no console error or warning beyond
      the two `/_vercel/*` scripts that 404 against `next start` by design.
- [ ] Mobile detail pass — the 390px capture confirmed structure and stacking
      but was too small to judge type sizing and spacing properly.
- [x] **Mobile nav dialog exercised** in both locales at 390: opens, moves
      focus inside, closes on Escape, no overflow, all five links present.
- [x] **Theme toggle exercised**, including under `prefers-reduced-motion:
      reduce`, where it starts no view transition and swaps instantly.
- [ ] Form error states still unexercised — the validation branch renders only
      after a failed submit, which needs a driven form fill.
- [ ] Contact form submit path has never been run end to end (needs Resend
      credentials).

**On driving the browser without Playwright:** the suites are gone but Chrome
is still scriptable. Node 24 ships a WebSocket client, so a CDP session is
`spawn(chrome, ["--remote-debugging-port=…", "--headless=new"])` plus
`new WebSocket(target.webSocketDebuggerUrl)` and no dependency at all. That is
how the four checks above were re-run. The `settle()` scroll problem below
applies just the same.

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

### QA pass 2 — bugs found and fixed

Two more, both invisible to a screenshot and both in the same category as the
first six: correct-looking markup that fails on a detail nobody looks at.

1. **The 404 was two documents nested inside each other.** `app/not-found.tsx`
   had no root layout to render inside — `[lang]` owns `<html>` and by
   definition does not apply to a route that failed to match — so Next
   generated a bare `<html><body>` around it and this file's own `<html>`
   landed *inside* that one. Every attribute on it (`lang`, the three font
   variables, `h-full`, the body's flex centring) survived only by HTML parse
   error recovery, which merges attributes off a misplaced `<html>` onto the
   real one. Now `app/global-not-found.tsx` with
   `experimental.globalNotFound`, which is the convention Next documents for
   precisely this shape: a root layout behind a top-level dynamic segment. It
   skips app rendering, owns the whole document, and gained a real `<title>`
   in the move. Verified: one `<html>`, one `<body>`, `lang="en"`, the fonts,
   and `<meta name="robots" content="noindex">`.
2. **The form controls deleted the site's focus ring.** `field.tsx` carried
   `focus:outline-none`, justified in its own comment by the rule that nothing
   moves on focus — which an outline never threatened, since outlines paint
   outside the border box and take part in no layout. Tailwind's utilities
   layer beats `@layer base` unconditionally, so it beat the
   `:focus-visible { outline: 2px solid var(--accent) }` in `globals.css` that
   says "visible, never removed" two lines above itself. The entire keyboard
   indicator on the only four controls anyone types into was a 1px hairline
   changing colour. Removed; `focus:border-ink` stays as reinforcement.
   Verified by tabbing with real key events: 2px accent, 3px offset.

Also removed a dead `notFound.code` key from both dictionaries — the 404
numeral is a literal in the component and always was.

### QA pass 1 — bugs found and fixed

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

### i18n review — done, and what it left open

- [x] **An explicit language choice now sticks.** The toggle is a plain
      `<Link>`, so nothing client-side ran when it was used and
      `Accept-Language` won every time: a Kurdish-browser visitor could click
      "English", return to the bare domain later, and be sent straight back to
      Kurdish — the site overruling them, repeatedly. `proxy.ts` now writes
      `NEXT_LOCALE` on any locale-prefixed request and reads it ahead of the
      header. Written only when it changes, so ordinary requests stay free of
      `Set-Cookie`. The redirect also declares `Vary: Accept-Language, Cookie`.
- [x] **The language toggle keeps query and hash.** `usePathname()` returns
      neither, so switching language on `/en/work?domain=telecom#row-3` landed
      on a bare `/ku/work`. Read from `window.location` after mount rather than
      via `useSearchParams()` — that hook would opt every page rendering the
      header out of static generation. Latent today (nothing sets a query
      parameter); fixed before it isn't.
- [ ] **A longer Kurdish headline will silently break `TextReveal`.** Its
      lines are authored, not measured, and `tokens.css` re-cuts the display
      scale for Arabic specifically so the Sorani headline stops wrapping. It
      fits today. One longer word and it wraps, the mask animates a two-line
      block inside a one-line clip, and nothing warns anyone. Worth a dev-time
      length assertion on `profile.headline` before launch.
- [ ] **Latin runs inside Sorani prose are not marked `lang="en"`.** "React"
      inside a Kurdish sentence renders and reads correctly, but a screen
      reader in Sorani pronounces it with Kurdish phonetics. Common, rarely
      fixed, low priority for this audience — recorded so it is a decision.

### Contrast — re-measured, three open questions

Every ink/paper pair recomputed from `tokens.css` (OKLCH → linear sRGB →
WCAG 2.1), reproducing the numbers recorded above, so the method agrees with
what the deleted axe suite was measuring. Everything live passes. Three pairs
do not, and none of them is a one-line fix:

- [ ] **`ink-subtle` on `paper-raised` is 4.14:1 light, 4.35:1 dark** — under
      the 4.5:1 that 0.75rem `label` type needs. Currently harmless because
      `paper-raised` appears only in `mdx-components.tsx` (code blocks, inline
      code, the callout aside) and there are no case studies, so it renders on
      zero pages. It becomes a real failure the day one is written. Same for
      **`accent` on `paper-raised`, 4.35:1 light**. Fix when the first case
      study lands, not before — the right value depends on what the surface
      ends up carrying.
- [ ] **Borders are well under the 3:1 that WCAG 1.4.11 asks of UI
      components.** `--line` under the form fields is about 1.2:1 on paper;
      `--line-strong` on the outline button (the hero's second CTA and the CV
      link on About) is 1.72:1 light, 1.90:1 dark. Whether that is a failure
      is genuinely arguable — both controls carry visible text labels, and the
      Understanding document exempts a boundary that is not the only way to
      identify the component — but it is a real legibility question for
      low-vision readers, and it cannot be fixed without darkening the
      hairlines, which *is* the Swiss look. A designer's call, not a bug fix.
      The focus state is unaffected: 4.77:1 light, 6.51:1 dark.
- [x] **`positive` at 3.60:1 light is fine.** It is never text on paper — a
      2px status dot in the hero and an icon on a `positive/12` disc in the
      form's success state. Both are non-text graphics at the 3:1 bar.

### QA pass — open, needs a decision rather than a fix

- [x] **Dates no longer freeze at build time.** The footer's `© {new Date()...}`
      and the hero's years stat both ran during a static prerender, so they were
      stamped at deploy — the hero comment claimed "derived so it is never a
      stale hardcoded 5+" while being stale in a different way. `[lang]/layout.tsx`
      now sets `revalidate = 86_400`, so every page goes stale in the background
      and rebuilds once a day. Pages are still served from cache; nobody waits
      for it. Note this does **not** fix the hardcoded "Five years" prose below.
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
- [x] **The two project stats now count the same population.** "Projects
      delivered" counted all 16 including the personal repos, while
      `industryCount` excluded them — two figures side by side describing
      different sets. Both now derive from `professionalProjects` in
      `projects.ts`: 14 delivered, 9 industries. `/work` still lists all 16 and
      the "all N projects" link still says 16, which is right — that page is an
      index, not a claim.
- [x] **Every 404 on the site was a blank white page.** Chasing the
      `NoFallbackError` log noise turned up the real bug underneath it:
      `not-found.tsx` was at `[lang]/`, and with `[lang]` as a root-param
      segment Next never registers a boundary there — the build emits
      `/_not-found` and never `/[lang]/_not-found`. That file had never once
      rendered. Every mistyped URL got Next's built-in error shell with an
      empty `<body>`: no chrome, no way back, in either language.

      Now at `app/not-found.tsx`, rendering its own document. It has to: the
      layout that imports `globals.css` is `[lang]/layout.tsx`, which by
      definition does not apply to a route that failed to match — the first
      version of the fix shipped correct text with **zero stylesheets**
      attached. It carries its own fonts and CSS, and answers in both
      languages, because the segment that would name the locale is precisely
      the one that did not match.
- [ ] `Internal: NoFallbackError` still logs once per unknown `/work/<slug>`.
      Accepted, and the alternative was tested: `dynamicParams = true` silences
      it, but then the request reaches the page, `notFound()` throws, and
      **no** not-found boundary resolves anywhere in the `[lang]` tree — the
      visitor gets the blank shell again. A page that renders beats a log
      nobody reads. Recheck on the next Next.js major.
- [x] **Stale comment in `projects.ts` fixed.** `industryCount`'s doc called it
      *the "six industries" stat* while computing 9 — it was describing an
      older content set.
- [x] **The OG image was rendering on demand.** `[lang]/opengraph-image.tsx`
      had no `generateStaticParams`, so the `[lang]` segment stayed unresolved
      and Next rendered it per request — meaning a Google Fonts fetch on every
      scrape, for an image that never changes. Its own doc comment claimed it
      was "generated at build time". Both locales now prerender.
- [x] **The project row no longer cramps between 768 and 1023.** The 12-column
      grid engaged at `md:`, leaving the summary ~190px and wrapping one
      sentence to five or six lines against a 92px meta column. Nothing
      overflowed; it was just squeezed in the band with the least room. Moved
      to `lg:grid-cols-12`, so 768–1023 stays stacked at full width. Measured
      after: 688px summary at 768, 355px at 1024, 528px at 1440, no overflow at
      any of the three.

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
| Theme change | Circular sweep from the toggle | A crossfade of every colour at once has no source and reads as a glitch; a wipe that starts under the cursor says the button did it. Costs one `clip-path` on one pseudo-element because the View Transition API snapshots the whole document — no per-element transition, no repaint of the page per frame. Falls back to the instant swap on Firefox < 144, Safari < 18, and any reduced-motion request. |
| Sweep geometry | An injected stylesheet with the numbers already in it | Two tidier versions shipped broken before this one, and both failed the same way: they worked on the machine they were written on. **v1** put the keyframes in `globals.css` reading `--theme-origin-x/y/radius` off `<html>` — correct by the rules of this repo, and it swept from the top centre of the screen elsewhere. That is the `var()` fallback (`50% 50%`, `150vmax`), so the properties arrived unresolved: the `::view-transition-*` tree inherits from the document element in theory, and this is a corner not worth depending on. **v2** used `element.animate(…, { pseudoElement })`, which removes the inheritance — and is Chromium-only for these pseudo-elements, trading one engine's bug for another's missing feature. **v3** builds a `<style>` with the geometry already substituted and removes it when the transition finishes. No inheritance, no WAAPI, the duration stays `var(--duration-slow)` instead of a number parsed out of it, and `::view-transition-new(root)` deliberately keeps the UA fade-in so an engine that ignores the injected rule crossfades rather than cuts. Note the whole class of bug: every one of these fails *silently and plausibly* — the animation still runs, just wrong — so nothing in the build, the types or a screenshot catches it. |
| Reading a duration token in JS | Parse the unit | `--duration-slow` is authored `700ms`; the build minifies CSS times to the shorter spelling, so the browser sees `.7s` and `Number.parseFloat` returns **0.7**. That shipped for one iteration as a 0.7-millisecond sweep, which does not read as a fast animation — it reads as the animation not existing. Any token read out of `getComputedStyle` and used as a number needs the same treatment. |
| Sweep easing | `linear`, and none of the tokens | Shipped on `ease-out-quart` first and it was wrong twice over, in a way worth writing down: the animated quantity is a **radius**, so the curve controls the speed of the wave front, not the arrival of a box. Measured at 1440×900, the front was 142px out on the first frame anyone can see — the circle never appeared to leave the icon, it simply existed — and then spent the last 57% of the duration covering 158px, a crawl you feel rather than see. Every `ease-out-*` token does this; `ease-in-out-quart` does a milder version of both. Constant radius is constant front speed, which is what a spreading wave actually does. Now 37px at one frame and even 2287px/s throughout, with the last corner arriving on the final frame. Radius comes off `clientWidth/clientHeight`, not `innerWidth/innerHeight` — the scrollbar is not in the snapshot, and overshooting it puts dead time back on the end. |
| "Home" in the nav | Explicit item, not just the wordmark | The logo is only a home link to people who know the convention, and the mobile dialog covers the wordmark entirely — so there was no way back to the front page from inside the open menu. Note `isActive` special-cases `/`: every pathname starts with it, so the prefix match that keeps Work current on `/work/<slug>` would mark Home current everywhere. |

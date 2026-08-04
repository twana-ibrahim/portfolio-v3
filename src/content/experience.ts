import { z } from "zod";
import { projects } from "./projects";
import { certificationSchema, languageSchema, parseExperience } from "./schema";

/**
 * EMPLOYMENT HISTORY, newest first.
 *
 * Written from the CV, then edited hard. The CV's own bullets included the
 * usual filler — "writing clean, modular, testable code", "participating in
 * code reviews and agile ceremonies" — which every engineer on earth also
 * claims, so it says nothing. What survives here is the specific stuff: what
 * the software did, who used it, and which problems were actually difficult.
 *
 * Still worth your own pass. Anywhere a line reads as a responsibility rather
 * than an achievement, add the number that makes it one.
 */
export const experience = parseExperience(
  [
    {
      company: "Tailored Applications",
      role: "Frontend Developer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2026-07",
      end: null,
      highlights: [
        "Building customer-facing features for FIB, a digital bank — the same project I moved onto at Gateway ICT and carried across when I joined.",
        "Working against a regulated backend, where validation, access control and an auditable trail are requirements rather than refinements.",
        "Extending the shared component library instead of adding one-off components to it, so the design system stays a system.",
      ],
      projects: ["fib"],
    },
    {
      company: "Gateway ICT",
      role: "Frontend Developer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2025-04",
      end: "2026-07",
      highlights: [
        "Moved from the MyTV+ team onto the FIB banking project mid-2026 — an unfamiliar domain and an unfamiliar codebase, with no ramp.",
        "Cut load and interaction cost across large React applications through code splitting, lazy loading and state that stopped re-rendering the world.",
        "Set the component and file conventions the rest of the team built against, and reviewed to them.",
      ],
      projects: ["mytv-plus-app", "mytv-plus-ads"],
    },
    {
      company: "Fastlink Company",
      role: "Frontend Developer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2024-03",
      end: "2025-03",
      highlights: [
        "Built the dashboards and internal systems telecom agents and operations staff used every day to sell and reconcile.",
        "Designed filtering and reporting interfaces for data-heavy workflows — the kind where a naive table makes the page unusable at real volumes.",
        "Implemented role-based UI rendering that mirrors backend authorization, so the interface never offers an action the API will refuse.",
        "Refactored legacy frontend into modular components, removing duplication across the SIM sales, offers and restaurant products.",
      ],
      projects: ["fast-sim-pwa", "fast-sim-web", "smart-offers", "fast-serve"],
    },
    {
      company: "Gateway ICT",
      role: "Frontend Developer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2022-09",
      end: "2024-03",
      highlights: [
        "Built the MyTV+ streaming interfaces for both web and television, plus the advertising platform behind ad inventory and campaign delivery.",
        "Standardised the reusable components and patterns shared across products — the reason later platforms were quick to build.",
        "Improved runtime performance with lazy loading, memoisation and tighter state boundaries on interfaces that render a lot at once.",
      ],
      projects: [
        "mytv-plus-app",
        "mytv-plus-website",
        "mytv-plus-ads",
        "hotel-system",
        "heart-beats",
      ],
    },
    {
      company: "iQ Group",
      role: "Frontend Developer",
      location: "Sulaymaniyah, Iraq",
      arrangement: "on-site",
      start: "2021-10",
      end: "2022-09",
      highlights: [
        "Built Angular and TypeScript reporting tools for telecom recharge and subscription analytics across regions.",
        "Delivered the console and auth flows for a central identity provider: registration, role-based access control and granular permissions.",
        "First professional role — where I learned enterprise delivery, code review, and shipping to a specification rather than to taste.",
      ],
      projects: ["authentication-server", "ksc-system", "government-report-system"],
    },
  ],
  projects,
);

export const education = [
  {
    institution: "Salahaddin University — Erbil",
    qualification: "BSc, Software & Informatics Engineering",
    start: "2017-09",
    end: "2021-06",
  },
] as const;

/** Ordered by relevance to the work, not by date awarded. */
export const certifications = z.array(certificationSchema).parse([
  { name: "Advanced React", issuer: "Meta" },
  { name: "Foundations of Project Management", issuer: "Google" },
  { name: "Jira Fundamentals", issuer: "Atlassian" },
]);

export const languages = z.array(languageSchema).parse([
  { name: "Kurdish", level: "Native" },
  { name: "English", level: "Professional" },
  { name: "Persian", level: "Limited working" },
  { name: "Arabic", level: "Elementary" },
]);

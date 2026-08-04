import { projects } from "./projects";
import { parseExperience } from "./schema";

/**
 * EMPLOYMENT HISTORY, newest first.
 *
 * ── NEEDS VERIFICATION ──────────────────────────────────────────────────────
 * Highlights are written from the project list and the previous site's role
 * descriptions. They are plausible but not authored by you — read every line
 * and rewrite anything you would not defend in an interview. Where a highlight
 * begs for a number, add one.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const experience = parseExperience(
  [
    {
      company: "Gateway ICT",
      role: "Software Engineer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2025-04",
      end: null,
      highlights: [
        "Lead the frontend for Gateway's product line, owning architecture decisions and review standards across the team.",
        "Drove a performance pass on the streaming client focused on time-to-first-frame over slow mobile connections.",
      ],
      projects: ["mytv-plus-app", "mytv-plus-ads"],
    },
    {
      company: "Fastlink · Newroz Telecom",
      role: "Software Engineer",
      location: "Erbil, Iraq",
      arrangement: "remote",
      start: "2024-03",
      end: "2025-03",
      highlights: [
        "Built the agent-facing SIM and eSIM sales platform as an installable PWA, so field staff could keep selling through unreliable connectivity.",
        "Delivered the dealer back-office covering stock allocation, agent management and commission reporting.",
        "Shipped Smart Offers, the campaign tool used to build and target subscriber promotions by segment.",
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
        "Built the MyTV+ streaming client and its public marketing site, from video playback to subscription flows.",
        "Delivered the hotel property management system and its integration with in-room MyTV+ delivery.",
        "Worked directly with product and backend to turn loose requirements into shippable scope.",
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
        "Built the admin console and authentication flows for a central identity provider serving several internal products.",
        "Delivered case management for an NGO and a structured reporting system for a government body, both in Angular and RxJS.",
        "First professional role — learned enterprise delivery: code review, release process, and working to a spec.",
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

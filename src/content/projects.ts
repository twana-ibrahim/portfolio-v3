import { parseProjects } from "./schema";

/**
 * THE WORK.
 *
 * Ordered newest first. `featured: true` promotes a project to the home page —
 * keep that to four. Everything else lives on /work.
 *
 * ── NEEDS VERIFICATION ──────────────────────────────────────────────────────
 * Years are inferred from the employment timeline on the previous site and are
 * best guesses. `metrics` are deliberately empty: numbers get invented very
 * easily and a wrong figure in an interview is worse than no figure. Fill them
 * in — users, agents, records, requests/day, load time before and after.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const projects = parseProjects([
  {
    slug: "fast-sim-pwa",
    title: "Fast SIM",
    client: "Fastlink · Newroz Telecom",
    year: 2024,
    summary:
      "Installable field app that lets telecom agents sell and activate SIM and eSIM cards from a phone, online or off.",
    role: "Frontend engineer — sole owner of the client application",
    domain: "telecom",
    surface: "pwa",
    stack: ["React", "TypeScript", "PWA", "Service Workers", "IndexedDB", "Zod"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: true,
  },
  {
    slug: "smart-offers",
    title: "Smart Offers",
    client: "Fastlink · Newroz Telecom",
    year: 2024,
    summary:
      "Campaign tool for building and targeting subscriber offers by segment, then tracking take-up per campaign.",
    role: "Frontend engineer",
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "TanStack Query"],
    confidential: true,
  },
  {
    slug: "fast-sim-web",
    title: "Fast SIM Portal",
    client: "Fastlink · Newroz Telecom",
    year: 2024,
    summary:
      "Back-office portal where dealers and distributors manage agents, stock allocation and commission reporting.",
    role: "Frontend engineer",
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "TanStack Table", "Recharts"],
    confidential: true,
  },
  {
    slug: "fast-serve",
    title: "Fast Serve",
    client: "Fastlink",
    year: 2024,
    summary:
      "Restaurant operations system covering menu management, order flow and daily sales reconciliation.",
    role: "Frontend engineer",
    domain: "hospitality",
    surface: "web-app",
    stack: ["React", "TypeScript", "Zustand", "TailwindCSS"],
    confidential: true,
  },
  {
    slug: "mytv-plus-app",
    title: "MyTV+",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Streaming application for live channels, films and series, built for low-bandwidth conditions across Iraq.",
    role: "Frontend engineer",
    domain: "media",
    surface: "web-app",
    stack: ["React", "TypeScript", "HLS", "Redux Toolkit"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: true,
  },
  {
    slug: "mytv-plus-website",
    title: "MyTV+ Marketing Site",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Public brand site for the MyTV+ service, presenting packages and subscription plans with scroll-led motion.",
    role: "Frontend engineer",
    domain: "media",
    surface: "website",
    stack: ["Next.js", "React", "GSAP", "TailwindCSS"],
  },
  {
    slug: "mytv-plus-ads",
    title: "MyTV+ Ads Platform",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Advertising operations console for scheduling campaigns against channels and reporting on delivery.",
    role: "Frontend engineer",
    domain: "media",
    surface: "platform",
    stack: ["React", "TypeScript", "TanStack Query"],
    confidential: true,
  },
  {
    slug: "hotel-system",
    title: "Hotel System",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Property management system for room, guest and billing operations, integrated with in-room MyTV+ delivery.",
    role: "Frontend engineer",
    domain: "hospitality",
    surface: "web-app",
    stack: ["React", "TypeScript", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "heart-beats",
    title: "Heart Beats",
    client: "Heart Beats",
    year: 2023,
    summary:
      "Brand and services site for a healthcare provider, with an appointment enquiry flow and bilingual content.",
    role: "Frontend engineer",
    domain: "healthcare",
    surface: "website",
    stack: ["React", "TypeScript", "SASS"],
  },
  {
    slug: "authentication-server",
    title: "Authentication Server",
    client: "iQ Group",
    year: 2022,
    summary:
      "Central identity provider issuing tokens and enforcing role-based access for a family of internal products.",
    role: "Frontend engineer — admin console and auth flows",
    domain: "government",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "OAuth 2.0", "OpenID Connect"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: true,
  },
  {
    slug: "ksc-system",
    title: "KSC System",
    client: "iQ Group",
    year: 2022,
    summary:
      "Case and beneficiary management platform for an NGO, covering intake, field reporting and donor exports.",
    role: "Frontend engineer",
    domain: "ngo",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "NgRx"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: true,
  },
  {
    slug: "government-report-system",
    title: "Government Report System",
    client: "iQ Group",
    year: 2022,
    summary:
      "Data collection and reporting system for a government body, with structured forms and aggregated dashboards.",
    role: "Frontend engineer",
    domain: "government",
    surface: "web-app",
    stack: ["Angular", "TypeScript", "RxJS", "Chart.js"],
    confidential: true,
  },
  {
    slug: "mashqi-hawina",
    title: "Mashqi Hawina",
    client: "Salahaddin University",
    year: 2021,
    summary:
      "Placement platform matching university students to internships, with application tracking for both sides.",
    role: "Frontend engineer",
    domain: "education",
    surface: "web-app",
    stack: ["React", "JavaScript", "Redux"],
  },
  {
    slug: "movie-app",
    title: "Movie App",
    client: "",
    year: 2026,
    summary:
      "React Native client for browsing current cinema releases, with search, detail views and offline caching.",
    role: "Personal project",
    domain: "personal",
    surface: "mobile",
    stack: ["React Native", "Expo", "TypeScript", "TanStack Query"],
    links: { repo: "https://github.com/twana-ibrahim/movie-app" },
  },
  {
    slug: "spotlight",
    title: "Spotlight",
    client: "",
    year: 2025,
    summary:
      "Social feed app built to explore React Native media handling — image upload, feeds, profiles and likes.",
    role: "Personal project",
    domain: "personal",
    surface: "mobile",
    stack: ["React Native", "Expo", "TypeScript", "Convex"],
    links: { repo: "https://github.com/twana-ibrahim/spotlight-app" },
  },
]);

/** Home page selection. Ordered as authored, capped defensively. */
export const featuredProjects = projects.filter((project) => project.featured).slice(0, 4);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

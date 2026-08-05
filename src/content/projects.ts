import { parseProjects } from "./schema";

/**
 * THE WORK.
 *
 * Ordered newest first. `featured: true` promotes a project to the home page —
 * keep that to four. Everything else lives on /work.
 *
 * Summaries say what the software *did* and who used it. No adjectives, no
 * "cutting-edge", no "seamless". A reader deciding whether to interview you
 * wants the noun and the verb; everything else is noise they have read a
 * hundred times today.
 *
 * ── STILL NEEDED ────────────────────────────────────────────────────────────
 * `metrics` are empty everywhere. This is the single highest-value thing you
 * can add: users, agents, records, transactions/day, load time before and
 * after. Left blank rather than guessed — a wrong figure in an interview is
 * far worse than no figure. Years are inferred from the employment timeline
 * and are worth a check.
 * ────────────────────────────────────────────────────────────────────────────
 */
export const projects = parseProjects([
  {
    slug: "fib",
    title: "FIB",
    client: "First Iraqi Bank",
    year: 2026,
    summary:
      "Customer-facing features for a digital bank, built against a regulated backend where validation, access control and an auditable trail are requirements.",
    role: "Frontend Developer",
    domain: "fintech",
    surface: "web-app",
    stack: ["React", "TypeScript", "Next.js", "Design systems"],
    metrics: [],
    confidential: true,
    featured: true,
    caseStudy: false,
  },
  {
    slug: "fast-sim-pwa",
    title: "Fast SIM",
    client: "Fastlink Company",
    year: 2024,
    summary:
      "Digitised telecom sales covering physical SIM and eSIM workflows, with custom filtering, reporting and real-time agent management.",
    role: "Frontend Developer",
    domain: "telecom",
    surface: "pwa",
    stack: ["React", "TypeScript", "PWA", "TanStack Query", "Role-based access"],
    metrics: [],
    confidential: true,
    featured: true,
    // Was true, with a template at case-studies/fast-sim-pwa.mdx. Removed in
    // favour of no case study at all: the work here was spec-and-ticket
    // delivery, so the decision narrative the format needs would have had to
    // be invented. Template recoverable at commit a85418b.
    caseStudy: false,
  },
  {
    slug: "fast-sim-web",
    title: "Fast SIM Portal",
    client: "Fastlink Company",
    year: 2024,
    summary:
      "Back-office portal where dealers and distributors manage agents, allocate stock and report across the whole sales network.",
    role: "Frontend Developer",
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "Data tables"],
    confidential: true,
  },
  {
    slug: "smart-offers",
    title: "Smart Offers",
    client: "Fastlink Company",
    year: 2024,
    summary:
      "Targeted marketing system with geo-fencing — builds subscriber offers by segment and location, then tracks take-up per campaign.",
    role: "Frontend Developer",
    domain: "telecom",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "Geo-fencing"],
    confidential: true,
  },
  {
    slug: "fast-serve",
    title: "Fast Serve",
    client: "Fastlink Company",
    year: 2024,
    summary:
      "Restaurant and inventory management: menus, orders, stock levels and daily reconciliation in a single operations console.",
    role: "Frontend Developer",
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
      "Streaming interfaces for web and television, covering live channels, films and series across the MyTV+ content delivery ecosystem.",
    role: "Frontend Developer",
    domain: "media",
    surface: "web-app",
    stack: ["React", "TypeScript", "Redux Toolkit", "TV interfaces"],
    metrics: [],
    confidential: true,
    featured: true,
    // Flip to true once src/content/case-studies/mytv-plus-app.mdx exists.
    caseStudy: false,
  },
  {
    slug: "mytv-plus-ads",
    title: "MyTV+ Ads Platform",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Advertising operations console covering ad inventory, brand partnerships and campaign execution against streaming channels.",
    role: "Frontend Developer",
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
      "Hotel management platform for rooms, guests and billing, integrated with in-room MyTV+ content delivery.",
    role: "Frontend Developer",
    domain: "hospitality",
    surface: "web-app",
    stack: ["React", "TypeScript", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "mytv-plus-website",
    title: "MyTV+ Brand Site",
    client: "Gateway ICT",
    year: 2023,
    summary:
      "Public marketing site for the MyTV+ service, presenting packages and subscription plans with scroll-led motion.",
    role: "Frontend Developer",
    domain: "media",
    surface: "website",
    stack: ["Next.js", "React", "GSAP", "TailwindCSS"],
  },
  {
    slug: "heart-beats",
    title: "Heart Beats",
    client: "Heart Beats",
    year: 2023,
    summary:
      "Brand and services site for a healthcare provider, covering treatments, clinicians and patient enquiries.",
    role: "Frontend Developer",
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
      "Identity and access management for a family of internal products: registration, role-based access control and granular per-resource permissions.",
    role: "Frontend Developer — console and auth flows",
    domain: "identity",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "RBAC", "REST APIs"],
    metrics: [],
    confidential: true,
    featured: true,
    // Flip to true once src/content/case-studies/authentication-server.mdx exists.
    caseStudy: false,
  },
  {
    slug: "ksc-system",
    title: "KSC System",
    client: "iQ Group",
    year: 2022,
    summary:
      "Mission-critical platform for multi-branch operations — case management, funder relations and event coordination for an NGO.",
    role: "Frontend Developer",
    domain: "ngo",
    surface: "platform",
    stack: ["Angular", "TypeScript", "RxJS", "MaterialUI"],
    confidential: true,
  },
  {
    slug: "government-report-system",
    title: "Government Report System",
    client: "iQ Group",
    year: 2022,
    summary:
      "Internal regional analytics tool — structured data collection and aggregated reporting for recharge and subscription workflows.",
    role: "Frontend Developer",
    domain: "government",
    surface: "web-app",
    stack: ["Angular", "TypeScript", "RxJS", "SCSS"],
    confidential: true,
  },
  {
    slug: "mashqi-hawina",
    title: "Mashqi Hawina",
    client: "Salahaddin University",
    year: 2021,
    summary:
      "Placement platform matching university students to internships, with application tracking for students and host organisations.",
    role: "Frontend Developer",
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
      "React Native client for browsing current cinema releases, with search, detail views and cached results.",
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
      "React Native social app with dynamic feeds, image posting, notifications and the usual engagement mechanics.",
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

/** Human-readable industry labels, used wherever a project is listed. */
export const domainLabels: Record<(typeof projects)[number]["domain"], string> = {
  telecom: "Telecom",
  fintech: "Banking",
  media: "Streaming",
  identity: "Identity",
  government: "Government",
  healthcare: "Healthcare",
  hospitality: "Hospitality",
  ngo: "NGO",
  education: "Education",
  personal: "Personal",
};

/** Distinct industries shipped into — the "six industries" stat on the hero. */
export const industryCount = new Set(
  projects.filter((project) => project.domain !== "personal").map((project) => project.domain),
).size;

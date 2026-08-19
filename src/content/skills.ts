import { z } from "zod";
import { skillGroupSchema } from "./schema";

/**
 * WHAT I ACTUALLY REACH FOR.
 *
 * Four groups, six items maximum each — the schema enforces the cap.
 *
 * The previous site listed roughly forty technologies, including HTML, CSS and
 * "Hard Working". A list that long defeats itself: it says the author has no
 * ranking function, and it buries the three or four things that genuinely
 * differentiate. Everything cut from here still appears in context on the
 * individual projects, which is where it carries more weight anyway —
 * "Angular, RxJS, RBAC" under an identity provider proves something that the
 * same words in a badge cloud never could.
 *
 * The CV groups the same technologies into seven flatter rows. That grouping
 * is the PDF's, for a page of A4; this one is the site's, and they are allowed
 * to differ as long as nothing real is missing from either.
 *
 * Only the group titles are localized. The items are technology names, and a
 * Kurdish developer writes "TanStack Query" exactly as an English one does —
 * transliterating them into Arabic script would make the list unreadable to
 * the only people qualified to judge it.
 */
export const skillGroups = z.array(skillGroupSchema).parse([
  {
    title: { en: "Core", ku: "بنەڕەتی" },
    items: ["TypeScript", "React", "Next.js", "Angular · RxJS", "React Native", "Node.js"],
  },
  {
    title: { en: "Interface", ku: "ڕووکار" },
    items: ["Tailwind CSS", "SCSS", "Design systems", "Accessibility", "Figma"],
  },
  {
    // "State" is left in Latin on purpose: it is the word Kurdish developers
    // use, and the nearest translation ("دۆخ") reads as a status field.
    title: { en: "State & data", ku: "State و داتا" },
    items: ["TanStack Query", "Redux Toolkit", "Zustand", "REST APIs", "PostgreSQL"],
  },
  {
    title: { en: "Practice", ku: "شێوازی کار" },
    items: ["Vitest · Jest", "Testing Library", "Performance work", "Code review", "Git · Jira"],
  },
]);

/**
 * The honest home for everything that is real experience but not a headline
 * skill. Listed in a single line on /about rather than given equal billing.
 *
 * Everything in the CV's seven skill rows is either here or in a group above,
 * with one exception: "Agile delivery" is a way of working, not a tool, and it
 * is the same species as the "Hard Working" the old site listed.
 */
export const secondarySkills = [
  "Express",
  "Prisma",
  "JavaScript",
  "JWT",
  "MongoDB",
  "MySQL",
  "Material UI",
  "shadcn/ui",
  "Expo",
  "GSAP",
  "Zod",
  "Linux",
] as const;

import { z } from "zod";
import { skillGroupSchema } from "./schema";

/**
 * WHAT I ACTUALLY REACH FOR.
 *
 * Four groups, six items maximum each — the schema enforces the cap.
 *
 * The previous site listed roughly forty technologies including HTML, CSS and
 * "Hard Working". A list that long is self-defeating: it says the author has
 * no ranking function, and it buries the three or four things that are
 * genuinely differentiating. Everything cut from here is still visible in
 * context on the individual projects, which is where it carries more weight
 * anyway — "Angular, RxJS, OAuth 2.0" under an identity provider proves more
 * than the same words in a badge cloud.
 */
export const skillGroups = z.array(skillGroupSchema).parse([
  {
    title: "Core",
    items: ["TypeScript", "React", "Next.js", "Angular · RxJS", "Node.js", "PostgreSQL"],
  },
  {
    title: "Interface",
    items: ["TailwindCSS", "Design systems", "Motion / GSAP", "Accessibility", "Figma"],
  },
  {
    title: "State & data",
    items: ["TanStack Query", "Redux Toolkit", "Zustand", "Zod", "REST · WebSockets"],
  },
  {
    title: "Practice",
    items: ["Vitest · Testing Library", "Playwright", "Performance budgets", "CI/CD", "Git"],
  },
]);

/**
 * Used by the About page for the "also worked with" line — the honest home for
 * everything that is real experience but not a headline skill.
 */
export const secondarySkills = [
  "React Native",
  "Expo",
  "Express",
  "MongoDB",
  "MySQL",
  "SASS",
  "MaterialUI",
  "shadcn/ui",
  "Jest",
  "Linux",
] as const;

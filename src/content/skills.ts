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
 */
export const skillGroups = z.array(skillGroupSchema).parse([
  {
    title: "Core",
    items: ["TypeScript", "React", "Next.js", "Angular · RxJS", "React Native", "Node.js"],
  },
  {
    title: "Interface",
    items: ["Tailwind CSS", "SCSS", "Design systems", "Accessibility", "Figma"],
  },
  {
    title: "State & data",
    items: ["TanStack Query", "Redux Toolkit", "Zustand", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Practice",
    items: ["Vitest · Jest", "Testing Library", "Performance work", "Code review", "Git · Jira"],
  },
]);

/**
 * The honest home for everything that is real experience but not a headline
 * skill. Listed in a single line on /about rather than given equal billing.
 */
export const secondarySkills = [
  "Express",
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

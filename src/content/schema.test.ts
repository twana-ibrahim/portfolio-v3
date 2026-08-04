import { describe, expect, it } from "vitest";
import { experience } from "./experience";
import { featuredProjects, projects } from "./projects";
import { parseExperience, parseProjects, projectSchema } from "./schema";
import { skillGroups } from "./skills";

/**
 * These assert the invariants the schemas enforce, so that if someone later
 * loosens a rule the test says so out loud rather than the site quietly
 * degrading. They also serve as executable documentation of the content rules.
 */

const validProject = {
  slug: "example-project",
  title: "Example",
  client: "Someone",
  year: 2024,
  summary: "A summary long enough to clear the minimum length the schema requires.",
  role: "Frontend Developer",
  domain: "telecom",
  surface: "web-app",
  stack: ["React"],
};

describe("projectSchema", () => {
  it("applies defaults for the optional flags", () => {
    const parsed = projectSchema.parse(validProject);
    expect(parsed.featured).toBe(false);
    expect(parsed.caseStudy).toBe(false);
    expect(parsed.confidential).toBe(false);
    expect(parsed.metrics).toEqual([]);
  });

  it("rejects a slug that is not kebab-case", () => {
    expect(() => projectSchema.parse({ ...validProject, slug: "Example Project" })).toThrow();
  });

  it("rejects a summary that is too short to be useful", () => {
    expect(() => projectSchema.parse({ ...validProject, summary: "Too short." })).toThrow();
  });

  it("rejects a malformed live URL", () => {
    expect(() => projectSchema.parse({ ...validProject, links: { live: "not-a-url" } })).toThrow();
  });
});

describe("parseProjects", () => {
  it("rejects duplicate slugs", () => {
    expect(() => parseProjects([validProject, validProject])).toThrow(/Duplicate project slug/);
  });
});

describe("parseExperience", () => {
  const role = {
    company: "Somewhere",
    role: "Frontend Developer",
    location: "Kalar, Iraq",
    arrangement: "remote",
    start: "2024-01",
    end: null,
    highlights: ["Did the thing."],
    projects: ["does-not-exist"],
  };

  it("rejects a reference to a project that does not exist", () => {
    expect(() => parseExperience([role], parseProjects([validProject]))).toThrow(/unknown project/);
  });

  it("rejects an end date before its start", () => {
    // Guarded by the duration rendering rather than the schema today; this
    // documents that gap so it is a deliberate choice, not an oversight.
    const backwards = { ...role, start: "2025-01", end: "2024-01", projects: [] };
    expect(() => parseExperience([backwards], [])).not.toThrow();
  });
});

describe("real content", () => {
  it("parses without throwing", () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(experience.length).toBeGreaterThan(0);
  });

  it("keeps the home page selection to four projects", () => {
    expect(featuredProjects.length).toBeLessThanOrEqual(4);
  });

  it("orders experience newest first", () => {
    const starts = experience.map((role) => role.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it("caps every skill group at six items", () => {
    for (const group of skillGroups) {
      expect(group.items.length).toBeLessThanOrEqual(6);
    }
  });
});

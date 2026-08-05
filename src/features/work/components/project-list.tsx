import { Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Project } from "@/content/schema";
import { ProjectRow } from "./project-row";

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  return (
    <Stagger>
      <ul className="border-line border-b">
        {projects.map((project, index) => (
          <StaggerItem key={project.slug} as="li" className="border-line border-t">
            <ProjectRow project={project} index={index} />
          </StaggerItem>
        ))}
      </ul>
    </Stagger>
  );
}

import type { TechStack } from "./techStack";

export interface Project {
  _id: string;
  title: string;
  description: string;
  bgImage: string;
  demoLink?: string;
  githubLink?: string;
  techStack: Array<string | { title: string; icon?: string }>;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithTechDetails extends Omit<Project, "techStack"> {
  techStack: TechStack[];
}

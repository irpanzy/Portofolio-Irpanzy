import type { Hero } from "./hero";
import type { About } from "./about";
import type { Project } from "./project";
import type { Experience } from "./experience";
import type { Education } from "./education";
import type { Service } from "./service";
import type { TechStack } from "./techStack";

export interface PortfolioAllData {
  hero: Hero | null;
  about: About | null;
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  services: Service[];
  techstacks: TechStack[];
}

export interface PortfolioApiResponse {
  statusCode?: number;
  message: string;
  data: PortfolioAllData;
  success: boolean;
}

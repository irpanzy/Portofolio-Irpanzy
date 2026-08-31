export type TechCategory =
  | "languages"
  | "frontend"
  | "backend"
  | "mobile"
  | "database"
  | "devops_cloud"
  | "tools";

export interface TechStack {
  _id: string;
  title: string;
  icon?: string;
  iconFileId?: string;
  categories: TechCategory[];
  category?: TechCategory;
  proficiencyLevel?: number;
  order: number;
  deletedAt?: string | null;
  deletedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateTechStackInput = Omit<
  TechStack,
  "_id" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy"
>;
export type UpdateTechStackInput = Partial<CreateTechStackInput>;

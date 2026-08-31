export interface Hero {
  _id: string;
  avatarImage: string;
  avatarImageFileId?: string;
  greeting: string;
  title: string;
  description: string;
  resumeLink: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateHeroInput = Omit<Hero, "_id" | "createdAt" | "updatedAt">;
export type UpdateHeroInput = Partial<CreateHeroInput>;

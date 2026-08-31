export interface About {
  _id: string;
  bio: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateAboutInput = Omit<About, "_id" | "createdAt" | "updatedAt">;
export type UpdateAboutInput = Partial<CreateAboutInput>;

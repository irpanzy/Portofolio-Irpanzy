export interface EducationAttachment {
  title: string;
  url: string;
  fileId?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  type: "formal" | "bootcamp" | "certification" | "course";
  logo?: string;
  logoFileId?: string;
  attachments?: EducationAttachment[];
  order: number;
  deletedAt?: string | null;
  deletedBy?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateEducationInput = Omit<
  Education,
  "_id" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy"
>;
export type UpdateEducationInput = Partial<CreateEducationInput>;

export interface ExperienceAttachment {
  title: string;
  url: string;
  fileId?: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  logo?: string;
  attachments?: ExperienceAttachment[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

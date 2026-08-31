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
  order: number;
  createdAt: string;
  updatedAt: string;
}

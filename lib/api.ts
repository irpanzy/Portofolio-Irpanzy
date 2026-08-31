import axiosInstance from "./axios";
import type {
  ApiResponse,
  Project,
  Experience,
  Education,
  Service,
  TechStack,
  About,
  CreateAboutInput,
  UpdateAboutInput,
  Hero,
  CreateHeroInput,
  UpdateHeroInput,
  ContactMessage,
  ContactResponse,
  ChatRequest,
  ChatResponse,
} from "@/types";

export const projectsApi = {
  getAll: async () => {
    const response =
      await axiosInstance.get<ApiResponse<Project[]>>("/projects");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Project>>(
      `/projects/${id}`
    );
    return response.data;
  },

  create: async (data: Omit<Project, "_id" | "createdAt" | "updatedAt">) => {
    const response = await axiosInstance.post<ApiResponse<Project>>(
      "/projects",
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Project, "_id" | "createdAt" | "updatedAt">>
  ) => {
    const response = await axiosInstance.put<ApiResponse<Project>>(
      `/projects/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<Project>>(
      `/projects/${id}`
    );
    return response.data;
  },

  reorder: async (orders: Array<{ id: string; order: number }>) => {
    const response = await axiosInstance.patch<ApiResponse<Project[]>>(
      "/projects/reorder",
      { orders }
    );
    return response.data;
  },
};

export const experiencesApi = {
  getAll: async () => {
    const response =
      await axiosInstance.get<ApiResponse<Experience[]>>("/experiences");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Experience>>(
      `/experiences/${id}`
    );
    return response.data;
  },

  create: async (data: Omit<Experience, "_id" | "createdAt" | "updatedAt">) => {
    const response = await axiosInstance.post<ApiResponse<Experience>>(
      "/experiences",
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Experience, "_id" | "createdAt" | "updatedAt">>
  ) => {
    const response = await axiosInstance.put<ApiResponse<Experience>>(
      `/experiences/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<Experience>>(
      `/experiences/${id}`
    );
    return response.data;
  },

  reorder: async (orders: Array<{ id: string; order: number }>) => {
    const response = await axiosInstance.patch<ApiResponse<Experience[]>>(
      "/experiences/reorder",
      { orders }
    );
    return response.data;
  },
};

export const educationsApi = {
  getAll: async () => {
    const response =
      await axiosInstance.get<ApiResponse<Education[]>>("/educations");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Education>>(
      `/educations/${id}`
    );
    return response.data;
  },

  create: async (data: Omit<Education, "_id" | "createdAt" | "updatedAt">) => {
    const response = await axiosInstance.post<ApiResponse<Education>>(
      "/educations",
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Education, "_id" | "createdAt" | "updatedAt">>
  ) => {
    const response = await axiosInstance.put<ApiResponse<Education>>(
      `/educations/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<Education>>(
      `/educations/${id}`
    );
    return response.data;
  },

  reorder: async (orders: Array<{ id: string; order: number }>) => {
    const response = await axiosInstance.patch<ApiResponse<Education[]>>(
      "/educations/reorder",
      { orders }
    );
    return response.data;
  },
};

export const servicesApi = {
  getAll: async () => {
    const response =
      await axiosInstance.get<ApiResponse<Service[]>>("/services");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<Service>>(
      `/services/${id}`
    );
    return response.data;
  },

  create: async (data: Omit<Service, "_id" | "createdAt" | "updatedAt">) => {
    const response = await axiosInstance.post<ApiResponse<Service>>(
      "/services",
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<Omit<Service, "_id" | "createdAt" | "updatedAt">>
  ) => {
    const response = await axiosInstance.put<ApiResponse<Service>>(
      `/services/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<Service>>(
      `/services/${id}`
    );
    return response.data;
  },
};

export const techStackApi = {
  getAll: async (category?: string) => {
    const url = category ? `/techstacks?category=${category}` : "/techstacks";
    const response = await axiosInstance.get<ApiResponse<TechStack[]>>(url);
    return response.data;
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get<ApiResponse<TechStack>>(
      `/techstacks/${id}`
    );
    return response.data;
  },

  create: async (
    data: Omit<
      TechStack,
      "_id" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy"
    >
  ) => {
    const response = await axiosInstance.post<ApiResponse<TechStack>>(
      "/techstacks",
      data
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<
      Omit<
        TechStack,
        "_id" | "createdAt" | "updatedAt" | "deletedAt" | "deletedBy"
      >
    >
  ) => {
    const response = await axiosInstance.put<ApiResponse<TechStack>>(
      `/techstacks/${id}`,
      data
    );
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosInstance.delete<ApiResponse<TechStack>>(
      `/techstacks/${id}`
    );
    return response.data;
  },

  reorder: async (orders: Array<{ id: string; order: number }>) => {
    const response = await axiosInstance.patch<ApiResponse<TechStack[]>>(
      "/techstacks/reorder",
      { orders }
    );
    return response.data;
  },
};

export const heroApi = {
  get: async () => {
    const response = await axiosInstance.get<ApiResponse<Hero>>("/hero");
    return response.data;
  },

  create: async (data: CreateHeroInput) => {
    const response = await axiosInstance.post<ApiResponse<Hero>>("/hero", data);
    return response.data;
  },

  update: async (data: UpdateHeroInput) => {
    const response = await axiosInstance.put<ApiResponse<Hero>>("/hero", data);
    return response.data;
  },
};

export const aboutApi = {
  get: async () => {
    const response = await axiosInstance.get<ApiResponse<About>>("/about");
    return response.data;
  },

  create: async (data: CreateAboutInput) => {
    const response = await axiosInstance.post<ApiResponse<About>>(
      "/about",
      data
    );
    return response.data;
  },

  update: async (data: UpdateAboutInput) => {
    const response = await axiosInstance.put<ApiResponse<About>>(
      "/about",
      data
    );
    return response.data;
  },
};

export const contactApi = {
  submit: async (data: ContactMessage) => {
    const response = await axiosInstance.post<ApiResponse<ContactResponse>>(
      "/contact",
      data
    );
    return response.data;
  },
};

export const chatApi = {
  sendMessage: async (data: ChatRequest) => {
    const response = await axiosInstance.post<ApiResponse<ChatResponse>>(
      "/chat",
      data
    );
    return response.data;
  },
};

export const api = {
  hero: heroApi,
  about: aboutApi,
  techStack: techStackApi,
  educations: educationsApi,
  experiences: experiencesApi,
  projects: projectsApi,
  services: servicesApi,
  contact: contactApi,
  chat: chatApi,
};

export default api;

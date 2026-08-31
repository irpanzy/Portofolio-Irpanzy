import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useGlobalLoading } from "./useGlobalLoading";
import type {
  ContactMessage,
  ChatRequest,
  CreateAboutInput,
  UpdateAboutInput,
  CreateHeroInput,
  UpdateHeroInput,
} from "@/types";
import { toast } from "./use-toast";

export const queryKeys = {
  hero: ["hero"] as const,
  projects: ["projects"] as const,
  project: (id: string) => ["projects", id] as const,
  experiences: ["experiences"] as const,
  experience: (id: string) => ["experiences", id] as const,
  educations: ["educations"] as const,
  education: (id: string) => ["educations", id] as const,
  services: ["services"] as const,
  service: (id: string) => ["services", id] as const,
  techStack: (category?: string) =>
    category ? (["techStack", category] as const) : (["techStack"] as const),
  about: ["about"] as const,
};

export const useHero = () => {
  return useQuery({
    queryKey: queryKeys.hero,
    queryFn: async () => {
      const response = await api.hero.get();
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateHero = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useGlobalLoading();

  return useMutation({
    mutationFn: async (data: CreateHeroInput) => {
      setLoading(true, "Creating hero data...");
      const response = await api.hero.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hero });
      toast.success("Hero data created successfully!");
      setLoading(false);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create hero data.";
      toast.error(message);
      setLoading(false);
    },
  });
};

export const useUpdateHero = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useGlobalLoading();

  return useMutation({
    mutationFn: async (data: UpdateHeroInput) => {
      setLoading(true, "Updating hero data...");
      const response = await api.hero.update(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hero });
      toast.success("Hero data updated successfully!");
      setLoading(false);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update hero data.";
      toast.error(message);
      setLoading(false);
    },
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: async () => {
      const response = await api.projects.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: async () => {
      const response = await api.projects.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useExperiences = () => {
  return useQuery({
    queryKey: queryKeys.experiences,
    queryFn: async () => {
      const response = await api.experiences.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useExperience = (id: string) => {
  return useQuery({
    queryKey: queryKeys.experience(id),
    queryFn: async () => {
      const response = await api.experiences.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: async () => {
      const response = await api.services.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useEducations = () => {
  return useQuery({
    queryKey: queryKeys.educations,
    queryFn: async () => {
      const response = await api.educations.getAll();
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: queryKeys.service(id),
    queryFn: async () => {
      const response = await api.services.getById(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useTechStack = (category?: string) => {
  return useQuery({
    queryKey: queryKeys.techStack(category),
    queryFn: async () => {
      const response = await api.techStack.getAll(category);
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useAbout = () => {
  return useQuery({
    queryKey: queryKeys.about,
    queryFn: async () => {
      const response = await api.about.get();
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useCreateAbout = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useGlobalLoading();

  return useMutation({
    mutationFn: async (data: CreateAboutInput) => {
      setLoading(true, "Creating about data...");
      const response = await api.about.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.about });
      toast.success("About data created successfully!");
      setLoading(false);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create about data.";
      toast.error(message);
      setLoading(false);
    },
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useGlobalLoading();

  return useMutation({
    mutationFn: async (data: UpdateAboutInput) => {
      setLoading(true, "Updating about data...");
      const response = await api.about.update(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.about });
      toast.success("About data updated successfully!");
      setLoading(false);
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update about data.";
      toast.error(message);
      setLoading(false);
    },
  });
};

export const useContactSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactMessage) => {
      const response = await api.contact.submit(data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error(message);
    },
  });
};

export const useChatMessage = () => {
  return useMutation({
    mutationFn: async (data: ChatRequest) => {
      const response = await api.chat.sendMessage(data);
      return response.data;
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Failed to send message. Please try again.";
      toast.error(message);
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<any, "_id" | "createdAt" | "updatedAt">) => {
      const response = await api.projects.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      toast.success("Project created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create project.";
      toast.error(message);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<any> }) => {
      const response = await api.projects.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      toast.success("Project updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update project.";
      toast.error(message);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.projects.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      toast.success("Project deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete project.";
      toast.error(message);
    },
  });
};

export const useReorderProjects = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orders: Array<{ id: string; order: number }>) => {
      const response = await api.projects.reorder(orders);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      toast.success("Projects order updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update project order.";
      toast.error(message);
    },
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<any, "_id" | "createdAt" | "updatedAt">) => {
      const response = await api.experiences.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences });
      toast.success("Experience created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create experience.";
      toast.error(message);
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<any> }) => {
      const response = await api.experiences.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences });
      toast.success("Experience updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update experience.";
      toast.error(message);
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.experiences.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences });
      toast.success("Experience deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete experience.";
      toast.error(message);
    },
  });
};

export const useReorderExperiences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orders: Array<{ id: string; order: number }>) => {
      const response = await api.experiences.reorder(orders);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.experiences });
      toast.success("Experiences order updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update experience order.";
      toast.error(message);
    },
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<any, "_id" | "createdAt" | "updatedAt">) => {
      const response = await api.educations.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.educations });
      toast.success("Education created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create education.";
      toast.error(message);
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<any> }) => {
      const response = await api.educations.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.educations });
      toast.success("Education updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update education.";
      toast.error(message);
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.educations.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.educations });
      toast.success("Education deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete education.";
      toast.error(message);
    },
  });
};

export const useReorderEducations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orders: Array<{ id: string; order: number }>) => {
      const response = await api.educations.reorder(orders);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.educations });
      toast.success("Educations order updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update education order.";
      toast.error(message);
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<any, "_id" | "createdAt" | "updatedAt">) => {
      const response = await api.services.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success("Service created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create service.";
      toast.error(message);
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<any> }) => {
      const response = await api.services.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success("Service updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update service.";
      toast.error(message);
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.services.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services });
      toast.success("Service deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete service.";
      toast.error(message);
    },
  });
};

export const useCreateTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.techStack.create(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.techStack() });
      toast.success("Tech stack created successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create tech stack.";
      toast.error(message);
    },
  });
};

export const useUpdateTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<any> }) => {
      const response = await api.techStack.update(id, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.techStack() });
      toast.success("Tech stack updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update tech stack.";
      toast.error(message);
    },
  });
};

export const useDeleteTechStack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.techStack.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.techStack() });
      toast.success("Tech stack deleted successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete tech stack.";
      toast.error(message);
    },
  });
};

export const useReorderTechStacks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orders: Array<{ id: string; order: number }>) => {
      const response = await api.techStack.reorder(orders);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.techStack() });
      toast.success("Tech stacks order updated successfully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update tech stack order.";
      toast.error(message);
    },
  });
};

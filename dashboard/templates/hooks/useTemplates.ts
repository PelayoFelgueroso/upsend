import { PaginationType } from "@/dashboard/models";
import api from "@/lib/axios";
import { EmailTemplate } from "@prisma/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface TemplatesResponse {
  templates: EmailTemplate[];
  pagination: PaginationType;
}

interface TemplatesParams {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
}

interface CreateTemplateData {
  name: string;
  subject: string;
  content: string;
  type: string;
  status?: string;
}

interface UpdateTemplateData {
  name?: string;
  subject?: string;
  content?: string;
  type?: string;
  status?: string;
}

export function useTemplates(params: TemplatesParams = {}) {
  return useQuery({
    queryKey: ["templates", params],
    queryFn: async (): Promise<TemplatesResponse> => {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });

      const response = await api.get(`/templates?${searchParams.toString()}`);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useTemplate(id: string) {
  return useQuery({
    queryKey: ["template", id],
    queryFn: async (): Promise<EmailTemplate> => {
      const response = await api.get(`/templates/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTemplateData): Promise<EmailTemplate> => {
      const response = await api.post("/templates", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template created successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to create template";
      toast.error(message);
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTemplateData;
    }): Promise<EmailTemplate> => {
      const response = await api.patch(`/templates/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      queryClient.setQueryData(["template", data.id], data);
      toast.success("Template updated successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to update template";
      toast.error(message);
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/templates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template deleted successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to delete template";
      toast.error(message);
    },
  });
}

export function useDuplicateTemplate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<EmailTemplate> => {
      const response = await api.post(`/templates/${id}/duplicate`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Template duplicated successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to duplicate template";
      toast.error(message);
    },
  });
}

export function useTestTemplate() {
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await api.post(`/templates/${id}/send-test`);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to send test email";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      toast.success("Test email sent successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

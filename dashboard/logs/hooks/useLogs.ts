import { Pagination } from "@/dashboard/models";
import api from "@/lib/axios";
import { EmailStatus } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface EmailLogResponse {
  id: string;
  templateName: string;
  recipient: string;
  subject: string;
  status: EmailStatus;
  content: string | null;
  sentAt: Date;
  errorMessage: string | null;
}

interface LogsResponse {
  logs: EmailLogResponse[];
  pagination: Pagination;
}

interface LogsParams {
  search?: string;
  status?: string;
  templateId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface ExportLogsData {
  format: "csv" | "json";
  startDate?: string;
  endDate?: string;
  includeContent?: boolean;
  status?: string;
}

export function useLogs(params: LogsParams = {}) {
  return useQuery({
    queryKey: ["logs", params],
    queryFn: async (): Promise<LogsResponse> => {
      const searchParams = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });

      const response = await api.get(`/logs?${searchParams.toString()}`);
      return response.data;
    },
    staleTime: 30 * 1000, // 30 seconds (logs change frequently)
  });
}

export function useExportLogs() {
  return useMutation({
    mutationFn: async (data: ExportLogsData): Promise<Blob> => {
      const response = await api.post("/logs/export", data, {
        responseType: "blob",
      });
      return response.data;
    },
    onSuccess: (blob, variables) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const timestamp = new Date().toISOString().split("T")[0];
      const filename = `email-logs-${timestamp}.${variables.format}`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Logs exported successfully");
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to export logs";
      toast.error(message);
    },
  });
}

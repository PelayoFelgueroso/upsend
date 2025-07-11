import api from "@/lib/axios";
import { SmtpConfig } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SmtpConfigData {
  host: string;
  port: number;
  username: string;
  password: string;
}

interface SenderSettingsData {
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
}

interface TestConnectionData {
  host: string;
  port: number;
  username: string;
  password: string;
}

export function useSmtpConfig() {
  return useQuery({
    queryKey: ["smtp-config"],
    queryFn: async (): Promise<SmtpConfig> => {
      try {
        const response = await api.get("/settings/smtp");
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to fetch SMTP configuration";
        throw new Error(message);
      }
    },
  });
}

export function useSaveSmtpConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SmtpConfigData) => {
      try {
        const response = await api.post("/settings/smtp", data);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to save SMTP configuration";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smtp-config"] });
      toast.success("SMTP configuration saved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useSaveSenderSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SenderSettingsData) => {
      try {
        const response = await api.post("/settings/smtp", data);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to save SMTP configuration";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smtp-config"] });
      toast.success("SMTP configuration saved successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useTestSmtpConnection() {
  return useMutation({
    mutationFn: async (data: TestConnectionData) => {
      try {
        const response = await api.post("/settings/smtp/test", data);
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to send test email";
        throw new Error(message);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("SMTP connection test successful!");
      } else {
        toast.error(`SMTP connection failed: ${data.error}`);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

export function useSendTestEmail() {
  return useMutation({
    mutationFn: async (testEmail: string) => {
      try {
        const response = await api.post("/settings/smtp/send-test", {
          testEmail,
        });
        return response.data;
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

export function useDeleteSmtpConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        const response = await api.delete("/settings/smtp");
        return response.data;
      } catch (error: any) {
        const message =
          error.response?.data?.error || "Failed to delete SMTP configuration";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["smtp-config"] });
      toast.success("SMTP configuration deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

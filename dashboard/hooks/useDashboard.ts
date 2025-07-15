"use client";

import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  totalEmails: {
    value: number;
    growth: number;
    trend: "up" | "down" | "neutral";
  };
  emailsSent: {
    value: number;
    growth: number;
    trend: "up" | "down" | "neutral";
  };
  activeTemplates: {
    value: number;
    growth: number;
    trend: "up" | "down" | "neutral";
  };
  successRate: {
    value: number;
    growth: number;
    trend: "up" | "down" | "neutral";
  };
}

export interface DashboardActivity {
  id: string;
  template: string;
  recipient: string;
  subject: string;
  status: string;
  sentAt: Date;
  messageId?: string;
}

export interface DashboardAnalytics {
  chartData: Array<{
    name: string;
    total: number;
  }>;
  period: string;
  totalEmails: number;
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: async () => {
      const response = await api.get<{ stats: DashboardStats }>(
        "/dashboard/stats"
      );
      return response.data.stats;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
}

export function useDashboardActivity(limit = 10) {
  return useQuery({
    queryKey: ["dashboard", "activity", limit],
    queryFn: async () => {
      const response = await api.get<{ activity: DashboardActivity[] }>(
        `/dashboard/activity?limit=${limit}`
      );
      return response.data.activity;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Auto-refresh every 2 minutes
  });
}

export function useDashboardAnalytics(
  period: "7days" | "30days" | "6months" = "7days"
) {
  return useQuery({
    queryKey: ["dashboard", "analytics", period],
    queryFn: async () => {
      const response = await api.get<{ analytics: DashboardAnalytics }>(
        `/dashboard/analytics?period=${period}`
      );
      return response.data.analytics;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

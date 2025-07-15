"use client";

import { Suspense } from "react";
import { Mail, Send, Users, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  useDashboardActivity,
  useDashboardAnalytics,
  useDashboardStats,
} from "@/dashboard/hooks/useDashboard";
import { DashboardSkeleton } from "@/dashboard/components/DashboardSkeleton";
import { StatsCard } from "@/dashboard/components/StatsCard";
import { useDashboardTranslation } from "@/i18n/hooks/usei18n";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { DashboardHomeContent } from "@/dashboard/components/DashboardHomeContent/DashboardHomeContent";

function DashboardContent() {
  const { t } = useDashboardTranslation();

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useDashboardStats();
  const {
    data: activity,
    isLoading: activityLoading,
    error: activityError,
  } = useDashboardActivity(5);
  const {
    data: analytics,
    isLoading: analyticsLoading,
    error: analyticsError,
  } = useDashboardAnalytics();

  if (statsLoading || activityLoading || analyticsLoading) {
    return <DashboardSkeleton />;
  }

  if (statsError || activityError || analyticsError) {
    return (
      <div className="flex-1 space-y-4">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load dashboard data. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const statsData = [
    {
      title: t("stats.totalEmails"),
      value: stats?.totalEmails.value.toLocaleString() || "0",
      description: `${
        stats?.totalEmails.growth
          ? stats?.totalEmails.growth >= 0
            ? "+"
            : ""
          : ""
      }${stats?.totalEmails.growth}% from last month`,
      icon: Mail,
      trend: stats?.totalEmails.trend || "neutral",
    },
    {
      title: t("stats.emailsSent"),
      value: stats?.emailsSent.value.toLocaleString() || "0",
      description: `${
        stats?.emailsSent.growth
          ? stats?.emailsSent.growth >= 0
            ? "+"
            : ""
          : ""
      }${stats?.emailsSent.growth}% from last month`,
      icon: Send,
      trend: stats?.emailsSent.trend || "neutral",
    },
    {
      title: t("stats.activeTemplates"),
      value: stats?.activeTemplates.value.toString() || "0",
      description: "Active templates",
      icon: Users,
      trend: stats?.activeTemplates.trend || "neutral",
    },
    {
      title: t("stats.successRate"),
      value: `${stats?.successRate.value || 0}%`,
      description: "Email delivery success rate",
      icon: TrendingUp,
      trend: stats?.successRate.trend || "neutral",
    },
  ];

  return (
    <div className="flex-1 space-y-4">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <DashboardHomeContent analytics={analytics} activity={activity} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

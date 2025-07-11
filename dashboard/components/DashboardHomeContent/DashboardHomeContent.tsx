"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailChart } from "../EmailChart";
import { RecentActivity } from "../RecentActivity";
import { useDashboardTranslation } from "@/i18n/hooks/usei18n";
import {
  DashboardActivity,
  DashboardAnalytics,
} from "@/dashboard/hooks/useDashboard";

interface Props {
  analytics?: DashboardAnalytics;
  activity?: DashboardActivity[];
}

export const DashboardHomeContent = ({ analytics, activity }: Props) => {
  const { t } = useDashboardTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 card-blue">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            {t("charts.emailAnalytics")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <EmailChart data={analytics?.chartData} />
        </CardContent>
      </Card>
      <Card className="col-span-3 card-purple">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            {t("charts.recentActivity")}
          </CardTitle>
          <CardDescription>{t("charts.latestActivity")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivity data={activity} />
        </CardContent>
      </Card>
    </div>
  );
};

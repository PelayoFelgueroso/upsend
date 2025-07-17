"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/i18n/hooks/usei18n";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usage: any;
  isLoading: boolean;
}

export const EmailStats = ({ usage, isLoading }: Props) => {
  const { t } = useI18n("account");
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="card-blue">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            {t("usage.emailsSent")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading || !usage ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {usage?.emailsSent?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("usage.thisMonth")}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {t("usage.limit", {
                  value:
                    usage?.limits.emailsPerMonth?.toLocaleString() ||
                    t("common.unlimited"),
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="card-purple">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            {t("usage.apiCalls")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {usage?.apiCalls?.toLocaleString() || "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("usage.thisMonth")}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {t("usage.limit", {
                  value:
                    usage?.limits.apiCallsPerMonth?.toLocaleString() ||
                    t("common.unlimited"),
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="card-warning">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-orange-500"></div>
            {t("usage.storageUsed")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ) : (
            <>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {usage?.storageUsed
                  ? `${(usage.storageUsed / 1024 / 1024 / 1024).toFixed(1)} GB`
                  : "0 GB"}
              </div>
              <div className="text-sm text-muted-foreground">
                {t("usage.storageDescription")}
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {t("usage.limitGB", {
                  value: usage?.limits.storageGB || t("common.unlimited"),
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useI18n } from "@/i18n/hooks/usei18n";

export const SecuritySettings = () => {
  const { t } = useI18n("account");

  return (
    <Card className="card-warning">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          {t("security.title")}
        </CardTitle>
        <CardDescription>{t("security.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          {t("security.inProgressLine1")}
          <br />
          {t("security.inProgressLine2")}
        </div>
      </CardContent>
    </Card>
  );
};

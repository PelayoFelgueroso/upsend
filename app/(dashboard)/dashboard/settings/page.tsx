"use client";

import { useSettingsTranslation } from "@/i18n/hooks/usei18n";
import { useSmtpConfig } from "@/dashboard/settings/hooks/useSMTP";
import { SettingsTabs } from "@/dashboard/settings/components/SettingsTabs/SettingsTabs";
import { Loader2 } from "lucide-react";
import { PageError } from "@/dashboard/components/PageError";
import { PageHeader } from "@/dashboard/components/PageHeader";

export default function SettingsPage() {
  const { t } = useSettingsTranslation();
  const { data: smtpConfig, isLoading, error } = useSmtpConfig();

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <PageError>
        Failed to load settings. Please try refreshing the page.
      </PageError>
    );
  }

  return (
    <div className="flex-1 space-y-6">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <SettingsTabs smtpConfig={smtpConfig} />
    </div>
  );
}

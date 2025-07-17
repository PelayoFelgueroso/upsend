import { BackToButton } from "@/dashboard/components/BackToButton";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { useI18n } from "@/i18n/hooks/usei18n";

export const NewTemplateHeader = () => {
  const { t } = useI18n("templates");
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <PageHeader title={t("newTitle")} subtitle={t("newSubtitle")} />

      <BackToButton href="/dashboard/templates">{t("backTo")}</BackToButton>
    </div>
  );
};

import { BackToButton } from "@/dashboard/components/BackToButton";
import { DeleteButton } from "@/dashboard/components/DeleteButton";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { useI18n } from "@/i18n/hooks/usei18n";

interface Props {
  onDelete: () => void;
  disabled: boolean;
}

export const EditTemplateHeader = ({ onDelete, disabled }: Props) => {
  const { t } = useI18n("templates");
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <PageHeader
        title={t("editTitle")}
        subtitle={t("editSubtitle")}
      />
      <div className="flex gap-4">
        <BackToButton href="/dashboard/templates">{t("backTo")}</BackToButton>
        <DeleteButton onClick={onDelete} disabled={disabled} />
      </div>
    </div>
  );
};

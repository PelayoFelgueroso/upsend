"use client";

import { Button } from "@/components/ui/button";
import { SaveButton } from "@/dashboard/components/SaveButton";
import { SendTestEmailButton } from "@/dashboard/components/SendTestEmailButton";
import {
  useTestTemplate,
  useUpdateTemplate,
} from "@/dashboard/templates/hooks/useTemplates";
import {
  useCommonTranslation,
  useTemplatesTranslation,
} from "@/i18n/hooks/usei18n";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  id?: string;
  isDirty: boolean;
  className?: string;
}

export const TemplateOptionsFooter = ({ id, isDirty, className }: Props) => {
  const { t } = useTemplatesTranslation();
  const { t: tCommon } = useCommonTranslation();
  const updateTemplateMutation = useUpdateTemplate();
  const sendTestEmail = useTestTemplate();

  if (!id)
    return (
      <div className="flex items-center gap-2 pt-6">
        <SaveButton
          disabled={!isDirty || updateTemplateMutation.isPending}
          isLoading={updateTemplateMutation.isPending}
        >
          {t("form.saveChanges")}
        </SaveButton>

        <Button variant="ghost" asChild>
          <Link href="/dashboard/templates">{tCommon("actions.cancel")}</Link>
        </Button>
      </div>
    );

  const handleSendTest = async () => {
    try {
      await sendTestEmail.mutateAsync(id);
      toast.success(t("form.testEmailSent"));
    } catch {
      toast.error("Failed to send test email");
    }
  };

  return (
    <div className={cn("flex items-center gap-2 pt-6", className)}>
      <SaveButton
        disabled={!isDirty || updateTemplateMutation.isPending}
        isLoading={updateTemplateMutation.isPending}
      >
        {t("form.saveChanges")}
      </SaveButton>

      <SendTestEmailButton onSend={handleSendTest}>
        {t("form.sendTest")}
      </SendTestEmailButton>

      <Button variant="ghost" asChild>
        <Link href="/dashboard/templates">{tCommon("actions.cancel")}</Link>
      </Button>
    </div>
  );
};

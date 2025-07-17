"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useCommonTranslation, useI18n } from "@/i18n/hooks/usei18n";
import {
  useDeleteTemplate,
  useTemplate,
} from "@/dashboard/templates/hooks/useTemplates";
import { PageError } from "@/dashboard/components/PageError";
import { DeleteDialog } from "@/dashboard/components/DeleteDialog";
import { EditTemplateHeader } from "@/dashboard/templates/components/EditTemplateHeader";
import { TemplateForm } from "@/dashboard/templates/components/TemplateForm/TemplateForm";

export default function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { t } = useI18n("templates");
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const { t: tCommon } = useCommonTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: template, isLoading, error } = useTemplate(id);

  const deleteTemplateMutation = useDeleteTemplate();

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTemplateMutation.mutateAsync(id);
      router.push("/dashboard/templates");
    } catch {
      // Error handled by mutation
    }
    setDeleteDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return <PageError>{t("error")}</PageError>;
  }

  return (
    <div className="flex-1 space-y-4">
      <EditTemplateHeader
        onDelete={handleDelete}
        disabled={deleteTemplateMutation.isPending}
      />

      <TemplateForm id={id} template={template} />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        confirmDelete={confirmDelete}
        title={t("delete.title")}
        description={t("delete.description")}
        cancel={tCommon("actions.cancel")}
        action={tCommon("actions.delete")}
      />
    </div>
  );
}

"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useCommonTranslation } from "@/i18n/hooks/usei18n";
import {
  useDeleteTemplate,
  useTemplate,
} from "@/dashboard/templates/hooks/useTemplates";
import { PageError } from "@/dashboard/components/PageError";
import { DeleteDialog } from "@/dashboard/components/DeleteDialog";
import { EditTemplateHeader } from "@/dashboard/templates/components/EditTemplatePage/EditTemplateHeader";
import { TemplateForm } from "@/dashboard/templates/components/TemplateForm/TemplateForm";

export default function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
    return <PageError>Template not found or failed to load.</PageError>;
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
        title={"Delete Template"}
        description={
          "Are you sure you want to delete this template? This action cannot be undone."
        }
        cancel={tCommon("actions.cancel")}
        action={tCommon("actions.delete")}
      />
    </div>
  );
}

"use client";

import { useState, Suspense } from "react";
import { TemplatesSkeleton } from "@/dashboard/templates/components/TemplatesSkeleton";
import {
  useTemplates,
  useDeleteTemplate,
} from "@/dashboard/templates/hooks/useTemplates";
import {
  useCommonTranslation,
  useTemplatesTranslation,
} from "@/i18n/hooks/usei18n";
import { PageError } from "@/dashboard/components/PageError";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { TemplateFilters } from "@/dashboard/templates/components/TemplateFilters";
import { TemplatesGrid } from "@/dashboard/templates/components/TemplatesGrid/TemplatesGrid";
import { DeleteDialog } from "@/dashboard/components/DeleteDialog";
import { CreateButton } from "@/dashboard/components/CreateButton";
import { Pagination } from "@/dashboard/components/Pagination";

function TemplatesContent() {
  const { t } = useTemplatesTranslation();
  const { t: tCommon } = useCommonTranslation();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);

  const { data, isLoading, error } = useTemplates({
    search: search || undefined,
    type: typeFilter === "all" ? undefined : typeFilter,
    status: statusFilter === "all" ? undefined : statusFilter,
    page,
    limit: 12,
  });

  const deleteTemplateMutation = useDeleteTemplate();

  const handleDelete = (templateId: string) => {
    setTemplateToDelete(templateId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (templateToDelete) {
      deleteTemplateMutation.mutate(templateToDelete);
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  if (isLoading) {
    return <TemplatesSkeleton />;
  }

  if (error)
    return (
      <PageError>
        Failed to load templates. Please try refreshing the page.
      </PageError>
    );

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        <CreateButton href="/dashboard/templates/new">
          {t("newTemplate")}
        </CreateButton>
      </div>

      {/* Filters */}
      <TemplateFilters
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Templates Grid */}
      <TemplatesGrid templates={data?.templates} handleDelete={handleDelete} />

      {/* Pagination */}
      {data?.pagination && (
        <Pagination
          pagination={data?.pagination}
          page={page}
          setPage={setPage}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        title={t("delete.title")}
        description={t("delete.description")}
        cancel={tCommon("actions.cancel")}
        action={tCommon("actions.delete")}
        isOpen={deleteDialogOpen}
        setIsOpen={setDeleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<TemplatesSkeleton />}>
      <TemplatesContent />
    </Suspense>
  );
}

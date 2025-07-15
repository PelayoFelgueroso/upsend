"use client";

import { Suspense, useState } from "react";
import { LogsSkeleton } from "@/dashboard/logs/components/LogsSkeleton";
import { useLogs } from "@/dashboard/logs/hooks/useLogs";
import { useI18n } from "@/i18n/hooks/usei18n";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { ExportLogsDialog } from "@/dashboard/logs/components/ExportLogsDialog";
import { EmailLogsCard } from "@/dashboard/logs/components/EmailLogsCard/EmailLogsCard";
import { PageError } from "@/dashboard/components/PageError";

function LogsContent() {
  const { t } = useI18n("logs");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data, isLoading, error } = useLogs({
    search: search || undefined,
    status: statusFilter === "" ? undefined : statusFilter,
    page,
    limit: 20,
  });

  if (isLoading) {
    return <LogsSkeleton />;
  }

  if (error) {
    return (
      <PageError>
        Failed to load email logs. Please try refreshing the page.
      </PageError>
    );
  }

  const logs = data?.logs || [];
  const pagination = data?.pagination;

  console.log(logs);

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <PageHeader title={t("title")} subtitle={t("subtitle")} />

        <ExportLogsDialog />
      </div>

      <EmailLogsCard
        logs={logs}
        pagination={pagination}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
  );
}

export default function LogsPage() {
  return (
    <Suspense fallback={<LogsSkeleton />}>
      <LogsContent />
    </Suspense>
  );
}

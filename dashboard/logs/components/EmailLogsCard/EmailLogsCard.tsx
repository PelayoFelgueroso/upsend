"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/hooks/usei18n";
import { Dispatch, SetStateAction } from "react";
import { EmailLogResponse } from "../../hooks/useLogs";
import { LogsCardHeader } from "./components/LogsCardHeader";
import { LogsFilters } from "./components/LogsFilters";
import { PaginationType } from "@/dashboard/models";
import { Pagination } from "@/dashboard/components/Pagination";

interface Props {
  logs: EmailLogResponse[];
  pagination?: PaginationType;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export const EmailLogsCard = ({
  logs,
  pagination,
  page,
  setPage,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) => {
  const { t } = useI18n("logs");

  return (
    <Card className="card-warning">
      <LogsCardHeader />

      <CardContent>
        <LogsFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {logs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{t("noLogs")}</p>
          </div>
        ) : (
          <>
            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <Pagination
                pagination={pagination}
                page={page}
                setPage={setPage}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/i18n/hooks/usei18n";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export const LogsFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) => {
  const { t } = useI18n("logs");

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("filterByStatus")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="allStatus">{t("allStatus")}</SelectItem>
          <SelectItem value="sent">{t("status.sent")}</SelectItem>
          <SelectItem value="delivered">{t("status.delivered")}</SelectItem>
          <SelectItem value="opened">{t("status.opened")}</SelectItem>
          <SelectItem value="clicked">{t("status.clicked")}</SelectItem>
          <SelectItem value="bounced">{t("status.bounced")}</SelectItem>
          <SelectItem value="failed">{t("status.failed")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

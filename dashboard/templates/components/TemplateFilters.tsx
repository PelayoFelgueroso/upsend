"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCommonTranslation,
  useTemplatesTranslation,
} from "@/i18n/hooks/usei18n";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export const TemplateFilters = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
}: Props) => {
  const { t } = useTemplatesTranslation();
  const { t: tCommon } = useCommonTranslation();
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("form.selectType")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {tCommon("actions.filter")} - All Types
          </SelectItem>
          <SelectItem value="transactional">
            {t("types.transactional")}
          </SelectItem>
          <SelectItem value="marketing">{t("types.marketing")}</SelectItem>
          <SelectItem value="notification">
            {t("types.notification")}
          </SelectItem>
        </SelectContent>
      </Select>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">{t("status.active")}</SelectItem>
          <SelectItem value="draft">{t("status.draft")}</SelectItem>
          <SelectItem value="archived">{t("status.archived")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

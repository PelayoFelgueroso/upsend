import { Button } from "@/components/ui/button";
import { PaginationType } from "@/dashboard/models";
import { useI18n } from "@/i18n/hooks/usei18n";
import { Dispatch, SetStateAction } from "react";

interface Props {
  pagination: PaginationType;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ pagination, page, setPage }: Props) => {
  const { t } = useI18n("common");
  const from = (pagination.page - 1) * pagination.limit + 1;
  const to = Math.min(pagination.page * pagination.limit, pagination.total);
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        {t("pagination.showing", { from, to, total: pagination.total })}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          {t("pagination.previous")}
        </Button>
        <span className="text-sm">
          {t("pagination.page", {
            current: pagination.page,
            totalPages: pagination.pages,
          })}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page >= pagination.pages}
        >
          {t("pagination.next")}
        </Button>
      </div>
    </div>
  );
};

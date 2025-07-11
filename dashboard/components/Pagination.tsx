import { Button } from "@/components/ui/button";
import { PaginationType } from "@/dashboard/models";
import { Dispatch, SetStateAction } from "react";

interface Props {
  pagination: PaginationType;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ pagination, page, setPage }: Props) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-sm text-muted-foreground">
        Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
        {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
        {pagination.total} logs
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {pagination.page} of {pagination.pages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page >= pagination.pages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

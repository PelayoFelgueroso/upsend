"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n/hooks/usei18n";
import { useExportLogs } from "../hooks/useLogs";
import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export const ExportLogsDialog = () => {
  const { t } = useI18n("logs");
  const { t: tCommon } = useI18n("common");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");
  const [exportDateRange, setExportDateRange] = useState("last30Days");
  const [includeContent, setIncludeContent] = useState(false);

  const exportLogsMutation = useExportLogs();

  const handleExport = () => {
    const now = new Date();
    let startDate: string | undefined;
    let endDate: string | undefined;

    switch (exportDateRange) {
      case "last7Days":
        startDate = new Date(
          now.getTime() - 7 * 24 * 60 * 60 * 1000
        ).toISOString();
        endDate = now.toISOString();
        break;
      case "last30Days":
        startDate = new Date(
          now.getTime() - 30 * 24 * 60 * 60 * 1000
        ).toISOString();
        endDate = now.toISOString();
        break;
      case "last90Days":
        startDate = new Date(
          now.getTime() - 90 * 24 * 60 * 60 * 1000
        ).toISOString();
        endDate = now.toISOString();
        break;
    }

    exportLogsMutation.mutate({
      format: exportFormat,
      startDate,
      endDate,
      includeContent,
    });

    setExportDialogOpen(false);
  };

  return (
    <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gradient-bg-warning bg-transparent"
        >
          <Download className="mr-2 h-4 w-4" />
          {t("exportLogs")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("export.title")}</DialogTitle>
          <DialogDescription>{t("export.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>{t("export.format")}</Label>
            <Select
              value={exportFormat}
              onValueChange={(value: "csv" | "json") => setExportFormat(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>{t("export.dateRange")}</Label>
            <Select value={exportDateRange} onValueChange={setExportDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last7Days">
                  {t("export.last7Days")}
                </SelectItem>
                <SelectItem value="last30Days">
                  {t("export.last30Days")}
                </SelectItem>
                <SelectItem value="last90Days">
                  {t("export.last90Days")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="includeContent"
              checked={includeContent}
              onCheckedChange={(checked) =>
                setIncludeContent(checked as boolean)
              }
            />
            <Label htmlFor="includeContent">{t("export.includeContent")}</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
            {tCommon("actions.cancel")}
          </Button>
          <Button
            onClick={handleExport}
            disabled={exportLogsMutation.isPending}
          >
            {exportLogsMutation.isPending
              ? "Exporting..."
              : tCommon("actions.export")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

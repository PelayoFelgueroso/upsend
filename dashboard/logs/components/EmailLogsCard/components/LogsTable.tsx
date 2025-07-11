"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/i18n/hooks/usei18n";
import { EmailLogResponse } from "@/dashboard/logs/hooks/useLogs";

interface Props {
  logs: EmailLogResponse[];
}

export const LogsTable = ({ logs }: Props) => {
  const { t } = useI18n("logs");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "delivered":
      case "opened":
        return "default";
      case "sent":
        return "secondary";
      case "bounced":
      case "failed":
        return "destructive";
      default:
        return "outline";
    }
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("table.timestamp")}</TableHead>
          <TableHead>{t("table.template")}</TableHead>
          <TableHead>{t("table.recipient")}</TableHead>
          <TableHead>{t("table.subject")}</TableHead>
          <TableHead>{t("table.status")}</TableHead>
          <TableHead>{t("table.content")}</TableHead>
          <TableHead className="text-right">{t("table.actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-mono text-sm">
              {formatDate(log.sentAt)}
            </TableCell>
            <TableCell className="font-medium">{log.templateName}</TableCell>
            <TableCell>{log.recipient}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {log.subject}
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(log.status)}>
                {t(`status.${log.status}`)}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">
              {log.content || "-"}
            </TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

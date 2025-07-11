"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useI18n } from "@/i18n/hooks/usei18n";
import { formatDate } from "@/lib/utils";
import { ApiKeyStatus } from "@prisma/client";
import { Copy, Trash2 } from "lucide-react";

interface Props {
  id: string;
  name: string;
  apiKey: string;
  createdAt: Date;
  lastUsed: Date | null;
  status: ApiKeyStatus;
  handleCopyKey: (key: string) => void;
  handleRevoke: (keyId: string) => void;
}

export const ApiKeyCard = ({
  id,
  name,
  apiKey,
  createdAt,
  lastUsed,
  status,
  handleCopyKey,
  handleRevoke,
}: Props) => {
  const { t } = useI18n("apiKeys");

  return (
    <TableRow key={id}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-mono">
        <div className="flex items-center gap-2">
          {apiKey}
          <Button
            variant="ghost"
            size="icon"
            className="h-4 w-4"
            onClick={() => handleCopyKey(apiKey)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </TableCell>
      <TableCell>{formatDate(createdAt)}</TableCell>
      <TableCell>{lastUsed ? formatDate(lastUsed) : "Never"}</TableCell>
      <TableCell>
        <Badge variant={status === "ACTIVE" ? "default" : "secondary"}>
          {t(`status.${status}`)}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleRevoke(id)}
          disabled={status === "INACTIVE"}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

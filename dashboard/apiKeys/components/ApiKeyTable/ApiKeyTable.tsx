"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useI18n } from "@/i18n/hooks/usei18n";
import { ApiKey } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { ApiKeyCard } from "./components/ApiKeyCard";

interface Props {
  apiKeys?: ApiKey[];
  setIsCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleCopyKey: (key: string) => void;
  handleRevoke: (keyId: string) => void;
}

export const ApiKeyTable = ({
  apiKeys,
  setIsCreateDialogOpen,
  handleCopyKey,
  handleRevoke,
}: Props) => {
  const { t } = useI18n("apiKeys");

  return (
    <Card className="card-purple">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          Your API Keys
        </CardTitle>
        <CardDescription>
          These keys allow you to authenticate with our email API
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!apiKeys || apiKeys.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">{t("noKeys")}</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              {t("createKey")}
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("table.name")}</TableHead>
                <TableHead>{t("table.key")}</TableHead>
                <TableHead>{t("table.created")}</TableHead>
                <TableHead>{t("table.lastUsed")}</TableHead>
                <TableHead>{t("table.status")}</TableHead>
                <TableHead className="text-right">
                  {t("table.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <ApiKeyCard
                  key={key.id}
                  id={key.id}
                  name={key.name}
                  apiKey={key.key}
                  status={key.status}
                  createdAt={key.createdAt}
                  lastUsed={key.lastUsed}
                  handleCopyKey={handleCopyKey}
                  handleRevoke={handleRevoke}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

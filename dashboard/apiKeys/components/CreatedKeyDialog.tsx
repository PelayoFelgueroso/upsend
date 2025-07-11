"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { useI18n } from "@/i18n/hooks/usei18n";

interface Props {
  createdKey: string | null;
  showCreatedKey: boolean;
  setCreatedKey: Dispatch<SetStateAction<string | null>>;
  setShowCreatedKey: Dispatch<SetStateAction<boolean>>;
  handleCopyKey: (key: string) => void;
}

export const CreatedKeyDialog = ({
  createdKey,
  setCreatedKey,
  showCreatedKey,
  setShowCreatedKey,
  handleCopyKey,
}: Props) => {
  const { t } = useI18n("apiKeys");

  return (
    <Dialog open={!!createdKey} onOpenChange={() => setCreatedKey(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Created</DialogTitle>
          <DialogDescription>{t("form.copyKey")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Your new API key</Label>
            <div className="flex items-center gap-2">
              <Input
                value={createdKey || ""}
                readOnly
                type={showCreatedKey ? "text" : "password"}
                className="font-mono"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowCreatedKey(!showCreatedKey)}
              >
                {showCreatedKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => createdKey && handleCopyKey(createdKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setCreatedKey(null)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

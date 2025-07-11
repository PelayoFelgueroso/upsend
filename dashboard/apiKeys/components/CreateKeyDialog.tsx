"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useCreateApiKey } from "../hooks/useApiKeys";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/hooks/usei18n";
import { CreateButton } from "@/dashboard/components/CreateButton";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCreatedKey: Dispatch<SetStateAction<string | null>>;
  setShowCreatedKey: Dispatch<SetStateAction<boolean>>;
}

export const CreateKeyDialog = ({
  isOpen,
  setIsOpen,
  setCreatedKey,
  setShowCreatedKey,
}: Props) => {
  const { t } = useI18n("apiKeys");
  const { t: tCommon } = useI18n("common");

  const [newKeyName, setNewKeyName] = useState("");
  const createApiKeyMutation = useCreateApiKey();

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }

    try {
      const result = await createApiKeyMutation.mutateAsync({
        name: newKeyName.trim(),
      });
      setCreatedKey(result.key);
      setShowCreatedKey(true);
      setNewKeyName("");
      setIsOpen(false);
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CreateButton onClick={() => setIsOpen(true)}>{t("createKey")}</CreateButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("form.title")}</DialogTitle>
          <DialogDescription>{t("form.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{t("form.name")}</Label>
            <Input
              id="name"
              placeholder={t("form.namePlaceholder")}
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              {t("form.nameDescription")}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {tCommon("actions.cancel")}
          </Button>
          <Button
            onClick={handleCreateKey}
            disabled={createApiKeyMutation.isPending}
          >
            {createApiKeyMutation.isPending
              ? "Creating..."
              : tCommon("actions.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

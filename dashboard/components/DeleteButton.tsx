"use client";

import { Button } from "@/components/ui/button";
import { useCommonTranslation } from "@/i18n/hooks/usei18n";
import { Trash2 } from "lucide-react";

interface Props {
  onClick: () => void;
  disabled: boolean;
}

export const DeleteButton = ({ onClick, disabled }: Props) => {
  const { t: tCommon } = useCommonTranslation();

  return (
    <Button variant="destructive" onClick={onClick} disabled={disabled}>
      <Trash2 className="mr-2 h-4 w-4" />
      {tCommon("actions.delete")}
    </Button>
  );
};

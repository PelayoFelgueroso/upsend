import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  disabled: boolean;
  isLoading: boolean;
  children: ReactNode;
}

export const SaveButton = ({ disabled, isLoading, children }: Props) => {
  return (
    <Button type="submit" disabled={disabled}>
      <Save className="mr-2 h-4 w-4" />
      {isLoading ? "Saving..." : children}
    </Button>
  );
};

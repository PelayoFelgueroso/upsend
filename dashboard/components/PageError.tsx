import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReactNode } from "react";

export const PageError = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex-1 space-y-4">
      <Alert variant="destructive">
        <AlertDescription>{children}</AlertDescription>
      </Alert>
    </div>
  );
};

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const LogsCardHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-orange-500"></div>
        Email Activity
      </CardTitle>
      <CardDescription>
        View detailed logs of all email sending activity
      </CardDescription>
    </CardHeader>
  );
};

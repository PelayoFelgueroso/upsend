import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

const statusCodes = [
  { code: "200", description: "Email sent successfully", type: "success" },
  {
    code: "400",
    description: "Invalid data or validation failed",
    type: "error",
  },
  {
    code: "401",
    description: "API key & secret key are required",
    type: "error",
  },
  { code: "403", description: "Invalid credentials", type: "error" },
  { code: "500", description: "Internal server error", type: "error" },
];

export const ResponseCodes = () => {
  const getStatusIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-500" />
          Response Codes
        </CardTitle>
        <CardDescription>HTTP status codes and their meanings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statusCodes.map((status) => (
            <div
              key={status.code}
              className="flex items-center space-x-3 p-3 border rounded-lg"
            >
              {getStatusIcon(status.type)}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <code className="font-medium">{status.code}</code>
                  <span className="text-sm text-muted-foreground">
                    {status.description}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

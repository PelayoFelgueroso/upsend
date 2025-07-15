import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertBox } from "@/dashboard/components/AlertBox";
import { Shield } from "lucide-react";

export const APIAuthentication = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-500" />
          Authentication
        </CardTitle>
        <CardDescription>
          Secure your API requests with dual-key authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Dual-Key Authentication</h3>
          <p className="text-sm text-muted-foreground">
            EasyMailJS uses both an API key and a secret key for enhanced
            security:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-sm">API Key</h4>
              <p className="text-xs text-muted-foreground">
                Sent in x-api-key header
              </p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium text-sm">Secret Key</h4>
              <p className="text-xs text-muted-foreground">
                Sent in x-secret-key header
              </p>
            </div>
          </div>
        </div>

        <AlertBox
          title={"Keep your keys secure"}
          description={
            "Never expose your API keys in client-side code. Always use them on your server."
          }
          variant="warning"
        />
      </CardContent>
    </Card>
  );
};

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Settings } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const APIEndpointDoc = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500" />
          API Endpoint
        </CardTitle>
        <CardDescription>The main endpoint for sending emails</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                POST
              </Badge>
              <code className="text-sm">/api/email/send</code>
            </div>
            <span className="text-sm text-muted-foreground">
              Send email using template
            </span>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Request Headers</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <code className="text-sm">x-api-key</code>
                <span className="text-xs text-muted-foreground">
                  Your API key
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <code className="text-sm">x-secret-key</code>
                <span className="text-xs text-muted-foreground">
                  Your secret key
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-muted rounded">
                <code className="text-sm">Content-Type</code>
                <span className="text-xs text-muted-foreground">
                  application/json
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Request Body</h3>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`{
  "to": "user@example.com",
  "templateId": "template_123",
  "variables": {
    "name": "John Doe",
    "company": "Acme Corp"
  }
}`}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() =>
                  copyToClipboard(`{
  "to": "user@example.com",
  "templateId": "template_123",
  "variables": {
    "name": "John Doe",
    "company": "Acme Corp"
  }
}`)
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Response</h3>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                <code>{`{
  "success": true,
  "messageId": "msg_abc123xyz",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() =>
                  copyToClipboard(`{
  "success": true,
  "messageId": "msg_abc123xyz",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`)
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

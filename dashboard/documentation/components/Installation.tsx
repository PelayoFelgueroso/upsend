import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertBox } from "@/dashboard/components/AlertBox";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Package } from "lucide-react";

export const Installation = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-blue-500" />
          Installation
        </CardTitle>
        <CardDescription>
          Install the EasyMailJS package via npm
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
            <code>npm install email-app-pelayo</code>
          </pre>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => copyToClipboard("npm install email-app-pelayo")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <AlertBox
          title={"JavaScript & TypeScript Support"}
          description={
            "EasyMailJS works with both JavaScript and TypeScript projects with full type support."
          }
        />
      </CardContent>
    </Card>
  );
};

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap } from "lucide-react";

export const ComingSoon = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-500" />
          Coming Soon
        </CardTitle>
        <CardDescription>
          Exciting features we&apos;re working on
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg opacity-75">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Python SDK</h3>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Official Python library for easy integration
            </p>
          </div>
          <div className="p-4 border rounded-lg opacity-75">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">PHP SDK</h3>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Official PHP wrapper for seamless integration
            </p>
          </div>
          <div className="p-4 border rounded-lg opacity-75">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Webhooks</h3>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time notifications for email events
            </p>
          </div>
          <div className="p-4 border rounded-lg opacity-75">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Bulk Sending</h3>
              <Badge variant="outline">Coming Soon</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Send emails to multiple recipients efficiently
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

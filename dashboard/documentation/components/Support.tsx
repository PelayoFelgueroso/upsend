import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Package } from "lucide-react";

export const Support = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          Support & Resources
        </CardTitle>
        <CardDescription>
          Get help and stay updated with our resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-medium">Get Help</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Community Forum
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium">Resources</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <Package className="mr-2 h-4 w-4" />
                NPM Package
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Status Page
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

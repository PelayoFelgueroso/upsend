import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RowSteps } from "@/dashboard/components/RowSteps";
import { Zap } from "lucide-react";

const steps = [
  {
    title: "Get API Keys",
    description: "Generate your API key and secret key from the dashboard",
  },
  {
    title: "Install Package",
    description: "Install the email-app-pelayo npm package",
  },
  {
    title: "Send Emails",
    description: "Start sending emails with your templates",
  },
];

export const QuickStart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          Quick Start
        </CardTitle>
        <CardDescription>
          Get started with EasyMailJS in minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RowSteps steps={steps} />
      </CardContent>
    </Card>
  );
};

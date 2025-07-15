import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";
import { Code, Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const TemplateVariables = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-green-500" />
          Template Variables
        </CardTitle>
        <CardDescription>
          How to use dynamic variables in your email templates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h3 className="font-medium">Variable Syntax</h3>
          <p className="text-sm text-muted-foreground">
            Use double curly braces to insert variables in your templates:
          </p>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`Hello {{name}},

Welcome to {{company}}! 

Click here to activate your account: {{activationUrl}}

Best regards,
The {{company}} Team`}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() =>
                copyToClipboard(`Hello {{name}},

Welcome to {{company}}! 

Click here to activate your account: {{activationUrl}}

Best regards,
The {{company}} Team`)
              }
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Corresponding Variables Object</h3>
          <div className="relative">
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`{
  "name": "John Doe",
  "company": "Acme Corp",
  "activationUrl": "https://app.example.com/activate/abc123"
}`}</code>
            </pre>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() =>
                copyToClipboard(`{
  "name": "John Doe",
  "company": "Acme Corp",
  "activationUrl": "https://app.example.com/activate/abc123"
}`)
              }
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

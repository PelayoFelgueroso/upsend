"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/utils";

type Language = "javascript" | "typescript";
type ExampleKey = "install" | "basicUsage" | "withVariables" | "errorHandling";

type ExampleMap = Record<ExampleKey, string>;

const codeExamples: Record<Language, ExampleMap> = {
  javascript: {
    install: `npm install upsend-js`,
    basicUsage: `import { UpsendJS } from 'upsend-js';

const upsend = new UpsendJS(
  'your-api-key',
  'your-secret-key',
);

// Send an email using a template
const result = await upsend.send({
  templateId: 'template_123',
  to: 'user@example.com',
  variables: {
    name: 'John Doe',
    company: 'Acme Corp',
    resetLink: 'https://example.com/reset'
  }
});

console.log('Email sent:', result);`,
    withVariables: `// Example with template variables
const result = await upsend.send({
  templateId: 'welcome-email',
  to: 'newuser@example.com',
  variables: {
    firstName: 'Sarah',
    lastName: 'Johnson',
    activationUrl: 'https://app.example.com/activate/abc123',
    supportEmail: 'support@example.com'
  }
});`,
    errorHandling: `try {
  const result = await upsend.send({
    templateId: 'newsletter',
    to: 'subscriber@example.com',
    variables: {
      unsubscribeUrl: 'https://example.com/unsubscribe/xyz789'
    }
  });
  
  console.log('Success:', result.success);
  console.log('Message ID:', result.messageId);
  console.log('Timestamp:', result.timestamp);
} catch (error) {
  console.error('Failed to send email:', error.message);
}`,
  },
  typescript: {
    install: `npm install upsend-js`,
    basicUsage: `import { UpsendJS, UpsendJSOptions } from 'upsend-js';

const upsend = new UpsendJS(
  'your-api-key',
  'your-secret-key',
  'https://UpsendJS.com/api' // optional
);

// Type-safe email sending
const emailOptions: UpsendJSOptions = {
  templateId: 'template_123',
  to: 'user@example.com',
  variables: {
    name: 'John Doe',
    company: 'Acme Corp'
  }
};

const result = await upsend.send(emailOptions);`,
    withVariables: `interface WelcomeEmailVariables {
  firstName: string;
  lastName: string;
  activationUrl: string;
  supportEmail: string;
}

const sendWelcomeEmail = async (
  to: string, 
  variables: WelcomeEmailVariables
) => {
  const options: UpsendJSOptions = {
    templateId: 'welcome-email',
    to,
    variables
  };
  
  return await upsend.send(options);
};`,
    errorHandling: `interface EmailResponse {
  success: boolean;
  messageId: string;
  timestamp: string;
}

try {
  const result: EmailResponse = await upsend.send({
    templateId: 'newsletter',
    to: 'subscriber@example.com',
    variables: {
      unsubscribeUrl: 'https://example.com/unsubscribe/xyz789'
    }
  });
  
  console.log('Email sent successfully:', result);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Failed to send email:', error.message);
  }
}`,
  },
};

export const APIExamples = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("javascript");
  const [selectedExample, setSelectedExample] =
    useState<ExampleKey>("basicUsage");

  const currentCode =
    codeExamples[selectedLanguage][selectedExample] ??
    "// Example not available";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-500" />
          Code Examples
        </CardTitle>
        <CardDescription>
          Ready-to-use code snippets for JavaScript and TypeScript
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedLanguage}
          onValueChange={(v) => setSelectedLanguage(v as Language)}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {(
                [
                  "install",
                  "basicUsage",
                  "withVariables",
                  "errorHandling",
                ] as ExampleKey[]
              ).map((key) => (
                <Button
                  key={key}
                  variant={selectedExample === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedExample(key)}
                >
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </Button>
              ))}
            </div>

            {["javascript", "typescript"].map((lang) => (
              <TabsContent key={lang} value={lang}>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto max-h-96">
                    <code>{currentCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(currentCode)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Send } from "lucide-react";
import { useState } from "react";
import { SmtpConfig } from "@prisma/client";
import { SMTPConfig } from "./components/SMTPConfig";
import { TestTab } from "./components/TestTab";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const SettingsTabs = ({ smtpConfig }: Props) => {
  const [activeTab, setActiveTab] = useState("smtp");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="smtp" className="flex items-center gap-2">
          <Server className="h-4 w-4" />
          SMTP Configuration
        </TabsTrigger>

        <TabsTrigger value="test" className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Test & Verify
        </TabsTrigger>
      </TabsList>

      <TabsContent value="smtp" className="space-y-4">
        <SMTPConfig smtpConfig={smtpConfig} />
      </TabsContent>

      <TabsContent value="test" className="space-y-4">
        <TestTab smtpConfig={smtpConfig} />
      </TabsContent>
    </Tabs>
  );
};

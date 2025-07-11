"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Send, User } from "lucide-react";
import { useState } from "react";
import { SmtpConfig } from "@prisma/client";
import { SMTPConfig } from "./components/SMTPConfig";
import { SenderSettings } from "./components/SenderSettings";
import { TestTab } from "./components/TestTab";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const SettingsTabs = ({ smtpConfig }: Props) => {
  const [activeTab, setActiveTab] = useState("smtp");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="smtp" className="flex items-center gap-2">
          <Server className="h-4 w-4" />
          SMTP Configuration
        </TabsTrigger>
        <TabsTrigger value="sender" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Sender Settings
        </TabsTrigger>
        <TabsTrigger value="test" className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          Test & Verify
        </TabsTrigger>
      </TabsList>

      <TabsContent value="smtp" className="space-y-4">
        <SMTPConfig smtpConfig={smtpConfig} />
      </TabsContent>

      <TabsContent value="sender" className="space-y-4">
        <SenderSettings smtpConfig={smtpConfig} />
      </TabsContent>

      <TabsContent value="test" className="space-y-4">
        <TestTab smtpConfig={smtpConfig} />
      </TabsContent>
    </Tabs>
  );
};

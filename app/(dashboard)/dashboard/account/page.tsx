"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, BarChart3, Settings } from "lucide-react";
import { useUser } from "@/auth/hooks/useUser";
import { UserProfileForm } from "@/dashboard/account/components/UserProfileForm";
import { PageHeader } from "@/dashboard/components/PageHeader";
import { useI18n } from "@/i18n/hooks/usei18n";
import { EmailStats } from "@/dashboard/account/components/EmailStats";
import { SecuritySettings } from "@/dashboard/account/components/SecuritySettings";

export default function AccountPage() {
  const { t } = useI18n("account");
  const { data: user, isLoading } = useUser();

  return (
    <div className="flex-1 space-y-4">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <UserProfileForm />
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <EmailStats usage={user?.usage} isLoading={isLoading} />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

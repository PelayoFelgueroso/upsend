"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaveSenderSettings } from "@/dashboard/settings/hooks/useSMTP";
import {
  SenderSettingsForm,
  senderSettingsSchema,
} from "@/dashboard/settings/schemas/smtp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmtpConfig } from "@prisma/client";
import { Loader2, Settings, User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const SenderSettings = ({ smtpConfig }: Props) => {
  const saveSenderSettingsMutationn = useSaveSenderSettings();

  const smtpForm = useForm<SenderSettingsForm>({
    resolver: zodResolver(senderSettingsSchema),
    defaultValues: {
      fromEmail: "",
      fromName: "",
      replyToEmail: "",
    },
  });

  useEffect(() => {
    if (smtpConfig) {
      smtpForm.reset({
        fromEmail: smtpConfig.fromEmail,
        fromName: smtpConfig.fromName,
        replyToEmail: smtpConfig.replyToEmail || undefined,
      });
    }
  }, [smtpConfig, smtpForm]);

  const onSaveSmtp = async (data: SenderSettingsForm) => {
    await saveSenderSettingsMutationn.mutateAsync(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Sender Information
        </CardTitle>
        <CardDescription>
          Configure how your emails appear to recipients.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="fromName">From Name</Label>
            <Input
              id="fromName"
              placeholder="Your Company Name"
              {...smtpForm.register("fromName")}
            />
            {smtpForm.formState.errors.fromName && (
              <p className="text-sm text-destructive">
                {smtpForm.formState.errors.fromName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromEmail">From Email</Label>
            <Input
              id="fromEmail"
              placeholder="noreply@yourcompany.com"
              {...smtpForm.register("fromEmail")}
            />
            {smtpForm.formState.errors.fromEmail && (
              <p className="text-sm text-destructive">
                {smtpForm.formState.errors.fromEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="replyToEmail">Reply-To Email (Optional)</Label>
            <Input
              id="replyToEmail"
              placeholder="support@yourcompany.com"
              {...smtpForm.register("replyToEmail")}
            />
            {smtpForm.formState.errors.replyToEmail && (
              <p className="text-sm text-destructive">
                {smtpForm.formState.errors.replyToEmail.message}
              </p>
            )}
          </div>

          <Button
            onClick={smtpForm.handleSubmit(onSaveSmtp)}
            disabled={saveSenderSettingsMutationn.isPending}
          >
            {saveSenderSettingsMutationn.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Settings className="mr-2 h-4 w-4" />
            )}
            Save Sender Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

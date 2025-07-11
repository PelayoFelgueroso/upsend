"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import {
  useDeleteSmtpConfig,
  useSaveSmtpConfig,
  useTestSmtpConnection,
} from "@/dashboard/settings/hooks/useSMTP";
import {
  SmtpConfigForm,
  smtpConfigSchema,
} from "@/dashboard/settings/schemas/smtp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmtpConfig } from "@prisma/client";
import { Separator } from "@radix-ui/react-select";
import { CheckCircle, Loader2, Server, Settings, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const SMTPConfig = ({ smtpConfig }: Props) => {
  const testConnectionMutation = useTestSmtpConnection();
  const deleteSmtpMutation = useDeleteSmtpConfig();
  const saveSmtpMutation = useSaveSmtpConfig();

  const smtpForm = useForm<SmtpConfigForm>({
    resolver: zodResolver(smtpConfigSchema),
    defaultValues: {
      host: "",
      port: 587,
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (smtpConfig) {
      smtpForm.reset({
        host: smtpConfig.host,
        port: smtpConfig.port,
        username: smtpConfig.username,
        password: smtpConfig.password,
      });
    }
  }, [smtpConfig, smtpForm]);

  const onSaveSmtp = async (data: SmtpConfigForm) => {
    await saveSmtpMutation.mutateAsync(data);
  };

  const onTestConnection = async () => {
    const formData = smtpForm.getValues();
    await testConnectionMutation.mutateAsync({
      host: formData.host,
      port: formData.port,
      username: formData.username,
      password: formData.password,
    });
  };

  const onDeleteConfig = async () => {
    if (confirm("Are you sure you want to delete the SMTP configuration?")) {
      await deleteSmtpMutation.mutateAsync();
      smtpForm.reset();
    }
  };

  const commonProviders = [
    { name: "Gmail", host: "smtp.gmail.com", port: 587 },
    { name: "Outlook", host: "smtp-mail.outlook.com", port: 587 },
    { name: "Yahoo", host: "smtp.mail.yahoo.com", port: 587 },
    { name: "SendGrid", host: "smtp.sendgrid.net", port: 587 },
    { name: "Mailgun", host: "smtp.mailgun.org", port: 587 },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          SMTP Server Configuration
        </CardTitle>
        <CardDescription>
          Configure your SMTP server settings to send emails from your
          application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {smtpConfig && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>SMTP configuration is active and ready to use.</span>
              <Badge variant="secondary" className="ml-2">
                {smtpConfig.host}:{smtpConfig.port}
              </Badge>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">SMTP Host</Label>
              <Input
                id="host"
                placeholder="smtp.gmail.com"
                {...smtpForm.register("host")}
              />
              {smtpForm.formState.errors.host && (
                <p className="text-sm text-destructive">
                  {smtpForm.formState.errors.host.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                type="number"
                placeholder="587"
                {...smtpForm.register("port", { valueAsNumber: true })}
              />
              {smtpForm.formState.errors.port && (
                <p className="text-sm text-destructive">
                  {smtpForm.formState.errors.port.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username/Email</Label>
              <Input
                id="username"
                placeholder="your-email@gmail.com"
                {...smtpForm.register("username")}
              />
              {smtpForm.formState.errors.username && (
                <p className="text-sm text-destructive">
                  {smtpForm.formState.errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password/App Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                {...smtpForm.register("password")}
              />
              {smtpForm.formState.errors.password && (
                <p className="text-sm text-destructive">
                  {smtpForm.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Quick Setup - Common Providers</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {commonProviders.map((provider) => (
                <Button
                  key={provider.name}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    smtpForm.setValue("host", provider.host);
                    smtpForm.setValue("port", provider.port);
                  }}
                >
                  {provider.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onTestConnection}
              variant="outline"
              disabled={testConnectionMutation.isPending}
            >
              {testConnectionMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Test Connection
            </Button>
            <Button
              onClick={smtpForm.handleSubmit(onSaveSmtp)}
              disabled={saveSmtpMutation.isPending}
            >
              {saveSmtpMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Settings className="mr-2 h-4 w-4" />
              )}
              Save Configuration
            </Button>
            {smtpConfig && (
              <Button
                onClick={onDeleteConfig}
                variant="destructive"
                disabled={deleteSmtpMutation.isPending}
              >
                {deleteSmtpMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

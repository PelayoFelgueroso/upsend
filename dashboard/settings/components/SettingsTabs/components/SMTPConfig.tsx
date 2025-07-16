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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  CheckCircle,
  Loader2,
  Server,
  Settings,
  Trash2,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const SMTPConfig = ({ smtpConfig }: Props) => {
  const testConnectionMutation = useTestSmtpConnection();
  const deleteSmtpMutation = useDeleteSmtpConfig();
  const saveSmtpMutation = useSaveSmtpConfig();

  const form = useForm<SmtpConfigForm>({
    resolver: zodResolver(smtpConfigSchema),
    defaultValues: {
      host: "",
      port: 587,
      username: "",
      password: "",
      fromName: "",
      fromEmail: "",
      replyToEmail: undefined,
    },
  });

  const { handleSubmit, reset, setValue, control } = form;

  useEffect(() => {
    if (smtpConfig) {
      reset({
        host: smtpConfig.host,
        port: smtpConfig.port,
        username: smtpConfig.username,
        fromName: smtpConfig.fromName,
        fromEmail: smtpConfig.fromEmail,
        replyToEmail: smtpConfig.replyToEmail || undefined,
      });
    }
    console.log(smtpConfig)
  }, [smtpConfig, reset]);

  const onSaveSmtp = async (data: SmtpConfigForm) => {
    await saveSmtpMutation.mutateAsync(data);
  };

  const onTestConnection = async () => {
    const formData = form.getValues();
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
      form.reset();
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

        <Form {...form}>
          <form onSubmit={handleSubmit(onSaveSmtp)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="host"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>SMTP Host</FormLabel>
                    <FormControl>
                      <Input placeholder="smtp.gmail.com" {...field} required />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="port"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="587"
                        {...field}
                        required
                        type="number"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Username/Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@domain.com"
                        {...field}
                        required
                        autoComplete="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Password/App Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        required
                        type="password"
                        placeholder="••••••••••••"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Sender Information
                </CardTitle>
                <CardDescription>
                  Configure how your emails appear to recipients.
                </CardDescription>
              </div>

              <FormField
                control={control}
                name="fromName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>From Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Company Name"
                        {...field}
                        required
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="fromEmail"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>From Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="noreply@yourcompany.com"
                        {...field}
                        required
                        type="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="replyToEmail"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Reply-To Email (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="support@yourcompany.com"
                        {...field}
                        required
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      setValue("host", provider.host);
                      setValue("port", provider.port);
                    }}
                  >
                    {provider.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

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
                onClick={handleSubmit(onSaveSmtp)}
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

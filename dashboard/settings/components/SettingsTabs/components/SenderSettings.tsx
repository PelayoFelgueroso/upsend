"use client";

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

  const form = useForm<SenderSettingsForm>({
    resolver: zodResolver(senderSettingsSchema),
    defaultValues: {
      fromEmail: "",
      fromName: "",
      replyToEmail: "",
    },
  });

  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    if (smtpConfig) {
      reset({
        fromEmail: smtpConfig.fromEmail,
        fromName: smtpConfig.fromName,
        replyToEmail: smtpConfig.replyToEmail || undefined,
      });
    }
  }, [smtpConfig, reset]);

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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSaveSmtp)} className="grid gap-4">
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

            <Button
              onClick={form.handleSubmit(onSaveSmtp)}
              disabled={saveSenderSettingsMutationn.isPending}
            >
              {saveSenderSettingsMutationn.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Settings className="mr-2 h-4 w-4" />
              )}
              Save Sender Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

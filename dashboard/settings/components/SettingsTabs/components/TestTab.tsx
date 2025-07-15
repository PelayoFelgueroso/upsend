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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { SmtpConfig } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  TestEmailForm,
  testEmailSchema,
} from "@/dashboard/settings/schemas/smtp.schema";
import { useSendTestEmail } from "@/dashboard/settings/hooks/useSMTP";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  smtpConfig?: SmtpConfig;
}

export const TestTab = ({ smtpConfig }: Props) => {
  const sendTestEmailMutation = useSendTestEmail();

  const form = useForm<TestEmailForm>({
    resolver: zodResolver(testEmailSchema),
    defaultValues: {
      testEmail: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSendTestEmail = async (data: TestEmailForm) => {
    await sendTestEmailMutation.mutateAsync(data.testEmail);
    form.reset();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Test Email Delivery
        </CardTitle>
        <CardDescription>
          Send a test email to verify your configuration is working correctly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!smtpConfig ? (
          <Alert>
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Please configure your SMTP settings first before sending test
              emails.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                SMTP configuration found. You can now send test emails.
              </AlertDescription>
            </Alert>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSendTestEmail)} className="space-y-4">
                <FormField
                  control={control}
                  name="testEmail"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Test Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="test@example.com"
                          {...field}
                          required
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={sendTestEmailMutation.isPending}
                  className="w-full"
                  type="submit"
                >
                  {sendTestEmailMutation.isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-4 w-4" />
                  )}
                  Send Test Email
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

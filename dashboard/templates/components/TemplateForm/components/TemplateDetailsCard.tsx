"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Archive,
  Bell,
  CheckCircle,
  FileText,
  Mail,
  Megaphone,
} from "lucide-react";
import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";
import { Control } from "react-hook-form";
import { TemplateSchemaType } from "@/dashboard/templates/schema/template.schema";
import { RadioButtonField } from "@/dashboard/components/RadioButtonField";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  control: Control<TemplateSchemaType>;
  className?: string;
  templateId?: string;
}

export const TemplateDetailsCard = ({ control, className, templateId }: Props) => {
  const { t } = useTemplatesTranslation();
  const [copied, setCopied] = useState(false);

  const copyTemplateId = () => {
    if (templateId) {
      navigator.clipboard.writeText(templateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const templateTypeOptions = [
    {
      value: "TRANSACTIONAL",
      icon: <Mail className="w-4 h-4" />,
      label: t("types.transactional"),
      description: "Automated emails triggered by user actions",
    },
    {
      value: "MARKETING",
      icon: <Megaphone className="w-4 h-4" />,
      label: t("types.marketing"),
      description: "Promotional emails and campaigns",
    },
    {
      value: "NOTIFICATION",
      icon: <Bell className="w-4 h-4" />,
      label: t("types.notification"),
      description: "System alerts and notifications",
    },
  ];

  const templateStatusOptions = [
    {
      value: "ACTIVE",
      icon: <CheckCircle className="w-4 h-4" />,
      label: t("status.active"),
      description: "Template is live and can be used",
    },
    {
      value: "DRAFT",
      icon: <FileText className="w-4 h-4" />,
      label: t("status.draft"),
      description: "Template is being worked on",
    },
    {
      value: "ARCHIVED",
      icon: <Archive className="w-4 h-4" />,
      label: t("status.archived"),
      description: "Template is archived and inactive",
    },
  ];
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("form.templateDetails")}</CardTitle>
        <CardDescription>{t("form.templateDetailsDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {templateId && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <div>
              <FormLabel className="text-sm">{t("form.templateId")}</FormLabel>
              <p className="text-xs text-muted-foreground mt-1">
                {t("form.templateIdDescription")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={templateId}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyTemplateId}
                title={t("form.copyTemplateId")}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{t("form.templateName")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.templateNamePlaceholder")}
                  {...field}
                  required
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-8">
          <RadioButtonField
            name="type"
            label={t("form.templateType")}
            control={control}
            options={templateTypeOptions}
          />

          <RadioButtonField
            name="status"
            label={t("form.templateStatus")}
            control={control}
            options={templateStatusOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
};

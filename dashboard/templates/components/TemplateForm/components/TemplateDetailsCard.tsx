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

interface Props {
  control: Control<TemplateSchemaType>;
  className?: string;
}

export const TemplateDetailsCard = ({ control, className }: Props) => {
  const { t } = useTemplatesTranslation();

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

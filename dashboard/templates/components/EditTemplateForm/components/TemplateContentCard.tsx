"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TemplateSchemaType } from "@/dashboard/templates/schema/template.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";

interface Props {
  errors: FieldErrors<TemplateSchemaType>;
  register: UseFormRegister<TemplateSchemaType>;
}

export const TemplateContentCard = ({ errors, register }: Props) => {
  const { t } = useTemplatesTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.emailContent")}</CardTitle>
        <CardDescription>{t("form.emailContentDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="content">{t("form.content")}</Label>
          <Textarea
            id="content"
            placeholder={t("form.contentPlaceholder")}
            className="min-h-[300px]"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-sm text-destructive">{errors.content.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

"use client";

import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TemplateSchemaType } from "@/dashboard/templates/schema/template.schema";

interface Props {
  watchedValues: TemplateSchemaType;
}

export const TemplatePreviewCard = ({ watchedValues }: Props) => {
  const { t } = useTemplatesTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("form.preview")}</CardTitle>
        <CardDescription>{t("form.previewDesc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 bg-white text-black min-h-[400px]">
          <div className="border-b pb-2 mb-4">
            <div className="font-semibold">
              {t("form.subjectPreview", {
                subject: watchedValues.subject || "Your email subject",
              })}
            </div>
          </div>
          <div className="prose prose-sm max-w-none">
            {watchedValues.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: watchedValues.content,
                }}
              />
            ) : (
              <p className="text-muted-foreground">
                {t("form.contentPreview")}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

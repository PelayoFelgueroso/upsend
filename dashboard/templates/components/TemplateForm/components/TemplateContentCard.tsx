"use client";

import { Control } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";
import { TemplateContentEditor } from "./TemplateContentEditor/TemplateContentEditor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TemplateSchemaType } from "@/dashboard/templates/schema/template.schema";
import { Code, InfoIcon, PenTool } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { AlertBox } from "@/dashboard/components/AlertBox";

interface Props {
  control: Control<TemplateSchemaType>;
  className?: string;
}

export const TemplateContentCard = ({ control, className }: Props) => {
  const { t } = useTemplatesTranslation();
  const [editorMode, setEditorMode] = useState<"advanced" | "wysiwyg">(
    "wysiwyg"
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between pb-3">
          <div>
            <CardTitle>{t("form.emailContent")}</CardTitle>
            <CardDescription>{t("form.emailContentDesc")}</CardDescription>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <PenTool className="h-4 w-4" />
              <span>{t("form.editorModeVisual")}</span>
            </div>

            <Switch
              id="editor-mode"
              checked={editorMode === "advanced"}
              onCheckedChange={(checked) =>
                setEditorMode(checked ? "advanced" : "wysiwyg")
              }
              className="data-[state=checked]:bg-blue-600"
            />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>{t("form.editorModeHtml")}</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-[280px]">
                  <div className="space-y-2 text-xs">
                    <div>
                      {t("form.editorModeTooltipVisual")}
                    </div>
                    <div>
                      {t("form.editorModeTooltipHtml")}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <AlertBox title={t("form.variablesTitle")} description={t("form.variablesDescription")} />
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="subject"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>{t("form.emailSubject")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.emailSubjectPlaceholder")}
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
          name="content"
          render={({ field }) => (
            <FormItem className="mt-4 min-h-[400px]">
              <FormControl>
                <TemplateContentEditor
                  value={field.value}
                  onChange={field.onChange}
                  editorMode={editorMode}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

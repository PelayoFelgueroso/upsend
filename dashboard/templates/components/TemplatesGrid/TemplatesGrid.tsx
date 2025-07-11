import { Card, CardContent } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { EmailTemplate } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";
import { TemplateCard } from "./components/TemplateCard";

interface Props {
  templates?: EmailTemplate[];
  handleDelete: (templateId: string) => void;
}

export const TemplatesGrid = ({ templates, handleDelete }: Props) => {
  const { t } = useTemplatesTranslation();

  return (
    <>
      {!templates || templates.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">{t("noTemplates")}</p>
            <Button asChild>
              <Link href="/dashboard/templates/new">
                <Plus className="mr-2 h-4 w-4" />
                {t("newTemplate")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              name={template.name}
              subject={template.subject}
              type={template.type}
              status={template.status}
              usage={template.usage}
              updatedAt={template.updatedAt}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

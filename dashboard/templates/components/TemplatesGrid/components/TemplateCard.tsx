"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDuplicateTemplate } from "@/dashboard/templates/hooks/useTemplates";
import { useTemplatesTranslation } from "@/i18n/hooks/usei18n";
import { TemplateStatus, TemplateType } from "@prisma/client";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  subject: string;
  type: TemplateType;
  status: TemplateStatus;
  usage: number;
  updatedAt: Date;
  handleDelete: (templateId: string) => void;
}

export const TemplateCard = ({
  id,
  name,
  subject,
  type,
  status,
  usage,
  updatedAt,
  handleDelete,
}: Props) => {
  const { t } = useTemplatesTranslation();

  const duplicateTemplateMutation = useDuplicateTemplate();

  const handleDuplicate = (templateId: string) => {
    duplicateTemplateMutation.mutate(templateId);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "draft":
        return "secondary";
      case "archived":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getTypeVariant = (type: string) => {
    return type === "transactional" ? "default" : "outline";
  };
  return (
    <Card className="hover:shadow-md transition-shadow card-success">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="text-sm">{subject}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/templates/${id}`}>
                  <Edit className="mr-2 h-4 w-4" />
                  {t("actions.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDuplicate(id)}>
                <Copy className="mr-2 h-4 w-4" />
                {t("actions.duplicate")}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => handleDelete(id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {t("actions.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={getTypeVariant(type)}>{t(`types.${type}`)}</Badge>
            <Badge variant={getStatusVariant(status)}>
              {t(`status.${status}`)}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t("stats.usedTimes", { count: usage })}</span>
          <span>
            {t("stats.modified", {
              date: new Date(updatedAt).toLocaleDateString(),
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

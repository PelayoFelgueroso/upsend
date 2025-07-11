"use client";

import { Form } from "@/components/ui/form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailTemplate, TemplateStatus, TemplateType } from "@prisma/client";
import { TemplateDetailsCard } from "./components/TemplateDetailsCard";
import { TemplateContentCard } from "./components/TemplateContentCard";
import { TemplatePreviewCard } from "./components/TemplatePreviewCard";
import { TemplateOptionsFooter } from "./components/TemplateOptionsFooter";
import {
  useCreateTemplate,
  useUpdateTemplate,
} from "@/dashboard/templates/hooks/useTemplates";
import {
  templateSchema,
  TemplateSchemaType,
} from "@/dashboard/templates/schema/template.schema";
import { useRouter } from "next/navigation";

interface Props {
  id?: string;
  template?: EmailTemplate;
}

export const EditTemplateForm = ({ template, id }: Props) => {
  const router = useRouter();
  const createTemplate = useCreateTemplate();
  const updateTemplateMutation = useUpdateTemplate();

  const form = useForm<TemplateSchemaType>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      subject: "",
      content: "",
      type: "TRANSACTIONAL",
      status: "DRAFT",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
  } = form;

  // Update form when template data loads
  useEffect(() => {
    if (template) {
      reset({
        name: template.name,
        subject: template.subject,
        content: template.content,
        type: template.type as TemplateType,
        status: template.status as TemplateStatus,
      });
    }
  }, [template, reset]);

  const watchedValues = watch();

  const handleSave = async (data: TemplateSchemaType) => {
    if (!id) {
      createTemplate.mutate(data, {
        onSuccess: () => {
          router.push("/dashboard/templates");
        },
      });
    } else {
      try {
        await updateTemplateMutation.mutateAsync({
          id,
          data: {
            ...data,
            type: data.type,
            status: data.status,
          },
        });
        reset(data); // Reset form dirty state
      } catch {
        // Error handled by mutation
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <TemplateDetailsCard control={control} />

            <TemplateContentCard errors={errors} register={register} />
          </div>

          <div className="space-y-6">
            <TemplatePreviewCard watchedValues={watchedValues} />
          </div>

          <TemplateOptionsFooter id={id} isDirty={isDirty} />
        </div>
      </form>
    </Form>
  );
};

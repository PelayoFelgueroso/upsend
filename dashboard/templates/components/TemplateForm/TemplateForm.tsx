"use client";

import { Form } from "@/components/ui/form";
import { useEffect, useRef } from "react";
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

export const TemplateForm = ({ template, id }: Props) => {
  const router = useRouter();
  const createTemplate = useCreateTemplate();
  const updateTemplateMutation = useUpdateTemplate();
  const didReset = useRef(false);

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
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
    reset,
  } = form;

  // Update form when template data loads
  useEffect(() => {
    if (template && !didReset.current) {
      reset({
        name: template.name,
        subject: template.subject,
        content: template.content,
        type: template.type as TemplateType,
        status: template.status as TemplateStatus,
      });
      didReset.current = true;
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
        reset(data);
      } catch {
        // Error handled by mutation
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid gap-6 lg:grid-cols-2">
          <TemplateDetailsCard control={control} className="lg:order-0" />

          <TemplateContentCard
            control={control}
            className="lg:col-span-2 lg:order-2"
          />

          <TemplatePreviewCard
            watchedValues={watchedValues}
            className="lg:order-1"
          />

          <TemplateOptionsFooter
            id={id}
            isDirty={isDirty}
            className="lg:order-3"
          />
        </div>
      </form>
    </Form>
  );
};

"use client";

import { NewTemplateHeader } from "@/dashboard/templates/components/NewTemplateHeader";
import { TemplateForm } from "@/dashboard/templates/components/TemplateForm/TemplateForm";

export default function NewTemplatePage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4">
        <NewTemplateHeader />
      </div>

      <TemplateForm />
    </div>
  );
}

"use client";

import { NewTemplateHeader } from "@/dashboard/templates/components/NewTemplatePage/NewTemplateHeader";
import { EditTemplateForm } from "@/dashboard/templates/components/EditTemplateForm/EditTemplateForm";

export default function NewTemplatePage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center gap-4">
        <NewTemplateHeader />
      </div>

      <EditTemplateForm />
    </div>
  );
}

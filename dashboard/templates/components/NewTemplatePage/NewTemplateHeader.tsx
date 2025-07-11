import { BackToButton } from "@/dashboard/components/BackToButton";
import { PageHeader } from "@/dashboard/components/PageHeader";

export const NewTemplateHeader = () => {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <PageHeader
        title={"Create New Template"}
        subtitle={"Design a new email template for your campaigns"}
      />

      <BackToButton href="/dashboard/templates">templates</BackToButton>
    </div>
  );
};

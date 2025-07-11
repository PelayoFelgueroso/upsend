import { BackToButton } from "@/dashboard/components/BackToButton";
import { DeleteButton } from "@/dashboard/components/DeleteButton";
import { PageHeader } from "@/dashboard/components/PageHeader";

interface Props {
  onDelete: () => void;
  disabled: boolean;
}

export const EditTemplateHeader = ({ onDelete, disabled }: Props) => {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      <PageHeader
        title={"Edit Template"}
        subtitle={"Modify your email template"}
      />
      <div className="flex gap-4">
        <BackToButton href="/dashboard/templates">templates</BackToButton>
        <DeleteButton
          onClick={onDelete}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

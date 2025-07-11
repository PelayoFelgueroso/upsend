import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioButton } from "@/components/ui/RadioButton";
import { TemplateSchemaType } from "@/dashboard/templates/schema/template.schema";
import { JSX } from "react";
import { Control } from "react-hook-form";

interface Props {
  control: Control<TemplateSchemaType>;
  name: "type" | "status";
  label: string;
  options: {
    value: string;
    icon: JSX.Element;
    label: string;
    description: string;
  }[];
}

export const RadioButtonField = ({ name, label, control, options }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-semibold">{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              {options.map((option) => (
                <RadioButton
                  key={option.value}
                  value={option.value}
                  currentValue={field.value}
                  onChange={field.onChange}
                  icon={option.icon}
                  label={option.label}
                  description={option.description}
                />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

import { cn } from "@/lib/utils";

interface Props {
  value: string;
  currentValue: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  label: string;
  description?: string;
  disabled?: boolean;
}

export const RadioButton = ({
  value,
  currentValue,
  onChange,
  icon,
  label,
  description,
  disabled = false,
}: Props) => {
  const isSelected = currentValue === value;

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      className={cn(
        "relative flex items-start gap-3 p-2 rounded-lg border-2 transition-all duration-200 text-left w-full",
        "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-muted-foreground/20 hover:border-muted-foreground/40",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 size-4 rounded-full border-2 flex items-center justify-center mt-0.5",
          isSelected
            ? "border-primary bg-primary"
            : "border-muted-foreground/40"
        )}
      >
        {isSelected && (
          <div className="w-2 h-2 rounded-full bg-primary-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 mb-1">
          <div
            className={cn(
              "flex-shrink-0",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}
          >
            {icon}
          </div>
          <span
            className={cn(
              "font-medium text-sm",
              isSelected ? "text-primary" : "text-foreground"
            )}
          >
            {label}
          </span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </button>
  );
};

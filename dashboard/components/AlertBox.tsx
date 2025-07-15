import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface Props {
  title: string;
  description: string;
  variant?: "info" | "warning" | "error" | "succes";
}

export const AlertBox = ({ title, description, variant = "info" }: Props) => {
  return (
    <div
      className={`${
        variant === "info"
          ? "bg-blue-50 dark:bg-blue-950"
          : variant === "warning"
          ? "bg-yellow-50 dark:bg-yellow-950"
          : variant === "error"
          ? "bg-red-50 dark:bg-red-950"
          : "bg-green-50 dark:bg-green-950"
      }  p-4 rounded-lg`}
    >
      <div className="flex items-start space-x-2">
        {variant === "info" ? (
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
        ) : variant === "warning" ? (
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
        ) : variant === "error" ? (
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
        ) : (
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
        )}

        <div>
          <h4
            className={`${
              variant === "info"
                ? "text-blue-900 dark:text-blue-100"
                : variant === "warning"
                ? "text-yellow-900 dark:text-yellow-100"
                : variant === "error"
                ? "text-red-900 dark:text-red-100"
                : "text-green-900 dark:text-green-100"
            } font-medium`}
          >
            {title}
          </h4>
          <p
            className={`${
              variant === "info"
                ? "text-blue-700 dark:text-blue-300"
                : variant === "warning"
                ? "text-yellow-700 dark:text-yellow-300"
                : variant === "error"
                ? "text-red-700 dark:text-red-300"
                : "text-green-700 dark:text-green-300"
            } text-sm`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

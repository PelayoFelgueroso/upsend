import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: Date) => {
  return new Date(dateString).toLocaleDateString();
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Code copied to clipboard!");
};

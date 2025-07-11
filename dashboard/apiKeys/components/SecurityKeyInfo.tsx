import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TFunction } from "i18next";
import { AlertTriangle } from "lucide-react";

interface Props {
  t: TFunction<string, undefined>;
}

export const SecurityKeyInfo = ({ t }: Props) => {
  return (
    <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertTriangle className="h-5 w-5" />
          {t("security.title")}
        </CardTitle>
        <CardDescription className="text-amber-700 dark:text-amber-300">
          {t("security.description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm text-amber-700 dark:text-amber-300">
          <li>Store API keys securely in environment variables</li>
          <li>Use different keys for different environments</li>
          <li>Regularly rotate your API keys</li>
          <li>Monitor API key usage for suspicious activity</li>
        </ul>
      </CardContent>
    </Card>
  );
};

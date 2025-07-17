"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Step0 } from "./components/Step0";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema, SignupSchemaType } from "@/auth/schemas/signup.schema";
import { Form } from "@/components/ui/form";
import { Step1 } from "./components/Step1";
import { useEffect } from "react";
import { useAuth } from "@/auth/providers/auth.provider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/i18n/hooks/usei18n";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { t } = useI18n("signup");
  const { login, isAuthenticated, isLoading, error, clearError } = useAuth();
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: SignupSchemaType) => {
    try {
      clearError(); // Clear any previous auth errors

      // Crear la cuenta
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          country: data.country,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Manejar errores específicos del signup
        if (result.error === "User already exists") {
          setError("email", { message: "This email is already registered" });
          return;
        }

        // Otros errores del servidor
        setError("root", {
          message: result.error || "Failed to create account",
        });
        return;
      }

      // Login automático después del signup exitoso
      await login({
        email: data.email,
        password: data.password,
      });

      // El AuthProvider se encarga de la redirección y el toast de éxito
    } catch (error: any) {
      // Errores de red u otros errores inesperados
      setError("root", {
        message: error.message || "Failed to create account",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-6">
          <Step0 control={form.control} />

          <Step1 control={form.control} />

          <div className="flex flex-col gap-2 max-w-full">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("creating")}
                </>
              ) : (
                t("signup")
              )}
            </Button>
          </div>
          {(errors.root || error) && (
            <Alert variant="destructive">
              <AlertDescription>
                {errors.root?.message || error}
              </AlertDescription>
            </Alert>
          )}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              {t("orContinue")}
            </span>
          </div>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            {t("signupWithGitHub")}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t("already")}
          <Link href="/login" className="underline underline-offset-4">
            {t("login")}
          </Link>
        </div>
      </form>
    </Form>
  );
}

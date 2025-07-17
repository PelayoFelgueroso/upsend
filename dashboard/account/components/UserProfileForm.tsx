"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Save, Loader2 } from "lucide-react";
import { useUpdateUser, useUser } from "@/auth/hooks/useUser";
import { UpdateUserRequest } from "@/auth/models/User";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useI18n } from "@/i18n/hooks/usei18n";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  country: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function UserProfileForm() {
  const { t } = useI18n("account");
  const { data: user, isLoading, error } = useUser();
  const updateUserMutation = useUpdateUser();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: user
      ? {
          name: user.name,
          email: user.email,
          country: user.country,
        }
      : undefined,
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = form;

  const onSubmit = async (data: ProfileFormData) => {
    const updateData: UpdateUserRequest = {
      name: data.name,
    };

    try {
      await updateUserMutation.mutateAsync(updateData);
      reset(data);
    } catch {
      // Error is handled by the hook
    }
  };

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <Card className="card-warning">
        <CardHeader>
          <CardTitle className="text-warning">{t("profile.errorTitle")}</CardTitle>
          <CardDescription>
            {error.message || t("profile.errorDescription")}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="card-warning">
        <CardHeader>
          <CardTitle className="text-warning">{t("profile.errorTitle")}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="card-blue">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          {t("profile.title")}
        </CardTitle>
        <CardDescription>{t("profile.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t("profile.nameLabel")} *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("profile.namePlaceholder")}
                        {...field}
                        required
                        autoComplete="name"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t("profile.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("profile.emailPlaceholder")}
                        {...field}
                        required
                        autoComplete="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center gap-2 pt-4">
              <Button
                type="submit"
                disabled={!isDirty || updateUserMutation.isPending}
                className="gradient-bg-blue"
              >
                {updateUserMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {t("profile.save")}
              </Button>
              {isDirty && (
                <p className="text-sm text-muted-foreground">
                  {t("profile.unsavedChanges")}
                </p>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div>
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  );
}

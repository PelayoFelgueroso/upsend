"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";
import { useAuth } from "@/auth/providers/auth.provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredRole?: "admin" | "user" | "viewer";
}

export function ProtectedRoute({
  children,
  fallback,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return fallback || <AuthLoadingSkeleton />;
  }

  // Show error state if there's an auth error
  if (error) {
    return <AuthErrorState error={error} />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <AuthRedirectState />;
  }

  // Check role-based access
  if (requiredRole && !hasRequiredRole(user.role, requiredRole)) {
    return (
      <UnauthorizedState userRole={user.role} requiredRole={requiredRole} />
    );
  }

  return <>{children}</>;
}

function AuthLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary animate-pulse" />
            </div>
          </div>
          <Skeleton className="h-6 w-48 mx-auto mb-2" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              />
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthErrorState({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-destructive">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-destructive">
            Authentication Error
          </h2>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm text-muted-foreground">
            Please try refreshing the page or contact support if the problem
            persists.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthRedirectState() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold">Redirecting to Login</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Please wait while we redirect you to the login page...
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}

function UnauthorizedState({
  userRole,
  requiredRole,
}: {
  userRole: string;
  requiredRole: string;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-warning">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-warning" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-warning">Access Denied</h2>
          <p className="text-sm text-muted-foreground mt-2">
            You don&apos;t have permission to access this page. Required role:{" "}
            {requiredRole}, your role: {userRole}
          </p>
        </CardHeader>
      </Card>
    </div>
  );
}

function hasRequiredRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = {
    viewer: 1,
    user: 2,
    admin: 3,
  };

  const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
  const requiredLevel =
    roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
}

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/dashboard/components/DashboardHeader";
import { ProtectedRoute } from "@/auth/components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmailManager Dashboard",
  description: "Manage your email campaigns and templates",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className={inter.className}>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset>
            <DashboardHeader />
            <div className="flex flex-1 flex-col gap-4 p-8 pt-0">
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
}

"use client";

import { Key, Mail, Settings, User, Home, Activity, Book } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useCommonTranslation } from "@/i18n/hooks/usei18n";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { t } = useCommonTranslation();

  const menuItems = [
    {
      title: t("navigation.dashboard"),
      url: "/dashboard",
      icon: Home,
    },
    {
      title: t("navigation.apiKeys"),
      url: "/dashboard/api-keys",
      icon: Key,
    },
    {
      title: t("navigation.documentation"),
      url: "/dashboard/documentation",
      icon: Book,
    },
    {
      title: t("navigation.templates"),
      icon: Mail,
      items: [
        {
          title: "All Templates",
          url: "/dashboard/templates",
        },
        {
          title: "New Template",
          url: "/dashboard/templates/new",
        },
      ],
    },
    {
      title: t("navigation.logs"),
      url: "/dashboard/logs",
      icon: Activity,
    },
    {
      title: t("navigation.settings"),
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: t("navigation.account"),
      url: "/dashboard/account",
      icon: User,
    },
  ];

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-sidebar-border bg-sidebar-background">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Mail className="h-4 w-4" />
          </div>
          <span className="font-semibold text-lg text-sidebar-foreground">
            EmailManager
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar-background">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider px-4 py-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.items ? (
                    <Collapsible
                      asChild
                      defaultOpen={pathname.startsWith("/dashboard/templates")}
                      className="group/collapsible"
                    >
                      <div>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="w-full hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent"
                          >
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === subItem.url}
                                  className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground"
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      className="hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-foreground"
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border bg-sidebar-background">
        <div className="p-4 text-xs text-sidebar-foreground/60">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>All systems operational</span>
          </div>
          <div className="mt-1">© 2025 EmailManager</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

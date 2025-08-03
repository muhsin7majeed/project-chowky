import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();

  const items = [
    {
      url: "/admin/dashboard",
      title: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      url: "/admin/categories",
      title: t("categories"),
      icon: Package,
    },
    {
      url: "/admin/products",
      title: t("products"),
      icon: Package,
    },
    {
      url: "/admin/orders",
      title: t("orders"),
      icon: ShoppingCart,
    },
    {
      url: "/admin/users",
      title: t("users"),
      icon: Users,
    },
    {
      url: "/admin/settings",
      title: t("settings"),
      icon: Settings,
    },
  ];

  const isActiveLink = (to: string) => {
    return location.pathname === to;
  };

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project Chowky</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActiveLink(item.url) &&
                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                    )}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ className, isOpen = false, onClose }: AdminSidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const sidebarLinks = [
    {
      to: "/admin/dashboard",
      label: t("dashboard"),
      icon: LayoutDashboard,
    },
    {
      to: "/admin/categories",
      label: t("categories"),
      icon: Package,
    },
    {
      to: "/admin/products",
      label: t("products"),
      icon: Package,
    },
    {
      to: "/admin/orders",
      label: t("orders"),
      icon: ShoppingCart,
    },
    {
      to: "/admin/users",
      label: t("users"),
      icon: Users,
    },
    {
      to: "/admin/settings",
      label: t("settings"),
      icon: Settings,
    },
  ];

  const isActiveLink = (to: string) => {
    return location.pathname === to;
  };

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo/Header */}
      <div className="border-sidebar-border border-b bg-sidebar p-4">
        <h2 className="font-bold text-lg text-sidebar-foreground">Project Chowky</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 bg-sidebar p-4">
        {sidebarLinks.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isActiveLink(to) && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
            )}
            onClick={onClose}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose?.();
            }
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={cn("fixed inset-y-0 hidden border-sidebar-border border-r md:flex md:w-64 md:flex-col", className)}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-sidebar-border border-r transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

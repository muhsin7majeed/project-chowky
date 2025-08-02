import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const { data: session } = authClient.useSession();
  const location = useLocation();

  const isAdmin = session?.user?.role === "admin";
  const isAdminRoute = location.pathname.startsWith("/admin");

  const links = [
    { to: "/", label: t("home") },
    { to: "/app", label: "App" },
    { to: "/app/products", label: "Products" },
    ...(isAdmin && !isAdminRoute ? [{ to: "/admin/dashboard", label: "Admin" }] : []),
    // { to: "/todos", label: t("todos") },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          {isAdminRoute && onMenuClick && (
            <Button variant="outline" size="sm" className="md:hidden" onClick={onMenuClick}>
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <nav className="flex gap-4 text-lg">
            {links.map(({ to, label }) => {
              return (
                <Link key={to} to={to}>
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
      <hr />
    </div>
  );
}

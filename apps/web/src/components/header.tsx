import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import UserMenu from "./user-menu";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const links = [
    { to: "/", label: t("home") },
    { to: "/app/products", label: "Products" },
  ];

  return (
    <div className="bg-sidebar text-sidebar-foreground rounded-md border my-3 p-3">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          {isAdminRoute ? (
            <SidebarTrigger />
          ) : (
            <nav className="flex gap-4 text-lg">
              {links.map(({ to, label }) => {
                return (
                  <Link key={to} to={to}>
                    {label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </div>
  );
}

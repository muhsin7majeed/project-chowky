import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const { t } = useTranslation();

  const links = [
    { to: "/", label: t("home") },
    { to: "/dashboard", label: t("dashboard") },
    // { to: "/todos", label: t("todos") },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg">
          {links.map(({ to, label }) => {
            return (
              <Link key={to} to={to}>
                {label}
              </Link>
            );
          })}
        </nav>
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

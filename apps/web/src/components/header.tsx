import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Home, Package, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import UserMenu from "./user-menu";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { data: session } = authClient.useSession();

  // Enhanced user navigation links
  const userLinks = [
    { to: "/", label: t("home"), icon: Home },
    { to: "/app/products", label: "Products", icon: Package },
  ];

  // Additional links for authenticated users
  const authenticatedLinks = [
    { to: "/app/orders", label: "My Orders", icon: ShoppingBag },
    { to: "/app/profile", label: "Profile", icon: User },
  ];

  const cartItemCount = 0;

  const allUserLinks = session?.user ? [...userLinks, ...authenticatedLinks] : userLinks;

  const isActiveLink = (to: string) => {
    return location.pathname === to;
  };

  return (
    <div className="bg-sidebar text-sidebar-foreground rounded-md border my-3 p-3">
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div className="flex items-center gap-4">
          {isAdminRoute ? (
            <SidebarTrigger />
          ) : (
            <div className="flex items-center gap-6">
              {/* Brand/Logo Area */}
              <Link to="/" className="font-bold text-xl">
                Project Chowky
              </Link>

              {/* Navigation Links */}
              <nav className="flex gap-1">
                {allUserLinks.map(({ to, label, icon: Icon }) => {
                  const isActive = isActiveLink(to);
                  return (
                    <Link key={to} to={to}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        size="sm"
                        className={cn(
                          "flex items-center gap-2 text-sm",
                          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar for non-admin routes */}
          {!isAdminRoute && (
            <div className="relative hidden md:block">
              <Input
                placeholder="Search products..."
                className="pl-8 w-64"
                prefixIcon={<Search className="h-5 w-5" />}
              />
            </div>
          )}

          {/* User Actions for authenticated users */}
          {session?.user && !isAdminRoute && (
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  3
                </Badge>
              </Button>

              {/* Shopping Cart */}
              <Button variant="ghost" size="icon" className="relative">
                <Link to="/app/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          )}

          {/* Auth Links for non-authenticated users */}
          {!session?.user && !isAdminRoute && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Link to="/auth/login">Sign In</Link>
              </Button>
            </div>
          )}

          {/* Utility Controls */}
          <LanguageSwitcher />
          <ModeToggle />
          {session?.user && <UserMenu />}
        </div>
      </div>
    </div>
  );
}

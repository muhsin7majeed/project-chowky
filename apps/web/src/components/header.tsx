import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Home, Menu, Package, Search, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./language-switcher";
import { ModeToggle } from "./mode-toggle";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { SidebarTrigger } from "./ui/sidebar";
import UserMenu from "./user-menu";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const { data: session } = authClient.useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
      <div className="container mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {isAdminRoute ? (
              <SidebarTrigger />
            ) : (
              <>
                {/* Brand/Logo */}
                <Link to="/" className="font-bold text-lg md:text-xl shrink-0">
                  Project Chowky
                </Link>

                {/* Desktop Navigation - Hidden on mobile */}
                <nav className="hidden lg:flex gap-1 ml-4">
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
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Desktop Search Bar */}
            {!isAdminRoute && !isMobileSearchOpen && (
              <div className="relative hidden md:block">
                <Input
                  placeholder="Search products..."
                  className="pl-8 w-48 lg:w-64"
                  prefixIcon={<Search className="h-5 w-5" />}
                />
              </div>
            )}

            {/* Mobile Search Toggle */}
            {!isAdminRoute && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden transition-all"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className={cn("h-4 w-4 transition-transform", isMobileSearchOpen && "rotate-90")} />
              </Button>
            )}

            {/* User Actions for authenticated users */}
            {session?.user && !isAdminRoute && (
              <div className="flex items-center gap-1">
                {/* Notifications - Hidden on small screens */}
                <Button variant="ghost" size="icon" className="relative hidden sm:flex transition-all hover:scale-105">
                  <Bell className="h-4 w-4" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-pulse"
                  >
                    3
                  </Badge>
                </Button>

                {/* Shopping Cart */}
                <Button variant="ghost" size="icon" className="relative transition-all hover:scale-105">
                  <Link to="/app/cart">
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 animate-bounce"
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
              <div className="hidden sm:flex gap-2">
                <Button variant="ghost" size="sm" className="transition-all hover:scale-105">
                  <Link to="/auth/login">Sign In</Link>
                </Button>
              </div>
            )}

            {/* Utility Controls - Responsive */}
            <div className="hidden sm:flex items-center gap-1">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            {session?.user && <UserMenu />}

            {/* Mobile Menu Toggle - Non-admin routes only */}
            {!isAdminRoute && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-4 w-4 transition-transform" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && !isAdminRoute && (
          <div className="mt-3 md:hidden transform transition-all duration-200 ease-in-out">
            <Input
              placeholder="Search products..."
              className="pl-8 w-full"
              prefixIcon={<Search className="h-5 w-5" />}
            />
          </div>
        )}

        {/* Mobile Menu Sheet */}
        {!isAdminRoute && (
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetContent side="left" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6 mt-6">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-2">
                  {allUserLinks.map(({ to, label, icon: Icon }) => {
                    const isActive = isActiveLink(to);
                    return (
                      <Link key={to} to={to} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          size="sm"
                          className={cn(
                            "w-full flex items-center gap-3 text-sm justify-start h-10 transition-colors",
                            isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {label}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Utility Section */}
                <div className="flex flex-col gap-4 pt-4 border-t">
                  {/* Mobile Auth Links for non-authenticated users */}
                  {!session?.user && (
                    <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start h-10">
                        <User className="h-5 w-5 mr-3" />
                        Sign In
                      </Button>
                    </Link>
                  )}

                  {/* Mobile Notifications for authenticated users */}
                  {session?.user && (
                    <Button variant="ghost" size="sm" className="w-full justify-start h-10">
                      <Bell className="h-5 w-5 mr-3" />
                      Notifications
                      <Badge variant="destructive" className="ml-auto">
                        3
                      </Badge>
                    </Button>
                  )}

                  {/* Mobile Utility Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium">Settings</span>
                    <div className="flex items-center gap-2">
                      <LanguageSwitcher />
                      <ModeToggle />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  );
}

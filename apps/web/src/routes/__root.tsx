import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Outlet, useLocation, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { trpc } from "@/utils/trpc";
import "../index.css";
import type { User } from "@/types/user";

interface RouterAppContext {
  trpc: typeof trpc;
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    isAdmin: boolean;
    isPending: boolean;
  };
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "Project Chowky",
      },
      {
        name: "description",
        content: "A modern web application built with Better-T-Stack",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });

  const location = useLocation();
  const isAuthPage = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <HeadContent />
      <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange storageKey="vite-ui-theme">
        <div className="grid h-svh grid-rows-[auto_1fr]">
          {isAuthPage ? (
            <div className="overflow-auto">{isFetching ? <Loader /> : <Outlet />}</div>
          ) : (
            <>
              {!isAdminRoute && (
                <div>
                  <Header />
                </div>
              )}

              {isAdminRoute ? (
                // Admin routes handle their own layout
                <div className="">{isFetching ? <Loader /> : <Outlet />}</div>
              ) : (
                <main className="container mx-auto max-w-6xl px-4 py-6">{isFetching ? <Loader /> : <Outlet />}</main>
              )}
            </>
          )}
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
      <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
    </>
  );
}

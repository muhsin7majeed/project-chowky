import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) {
      // Still loading auth state, let it continue
      return;
    }

    // First check if user is authenticated
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
      });
    }

    // Then check if user is admin
    if (!context.auth.isAdmin) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="">
      <SidebarProvider>
        <div className="">
          <AppSidebar />
        </div>

        <div className="container mx-auto p-2">
          <Header />

          <main className="border rounded-lg bg-sidebar p-3 h-full">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

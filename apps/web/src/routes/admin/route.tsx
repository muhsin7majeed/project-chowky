import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useState } from "react";
import AdminSidebar from "@/components/admin-sidebar";
import Header from "@/components/header";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      {/* Admin-specific header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex min-h-0 flex-1 flex-col md:ml-64">
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

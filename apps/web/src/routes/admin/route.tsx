import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
  return <Outlet />;
}

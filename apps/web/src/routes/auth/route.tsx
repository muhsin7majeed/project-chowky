import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ context }) => {
    if (context.auth.isPending) {
      // Still loading auth state, let it continue
      return;
    }

    // If user is already authenticated, redirect them away from auth pages
    if (context.auth.isAuthenticated) {
      // Redirect admins to admin dashboard, regular users to app
      throw redirect({
        to: context.auth.isAdmin ? "/admin" : "/app",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}

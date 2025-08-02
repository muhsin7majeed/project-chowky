import { createFileRoute } from "@tanstack/react-router";
import UsersPage from "@/features/admin/users";

export const Route = createFileRoute("/admin/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}

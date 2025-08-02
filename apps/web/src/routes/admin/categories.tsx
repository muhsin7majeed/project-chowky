import { createFileRoute } from "@tanstack/react-router";
import CategoriesPage from "@/features/admin/categories";

export const Route = createFileRoute("/admin/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CategoriesPage />;
}

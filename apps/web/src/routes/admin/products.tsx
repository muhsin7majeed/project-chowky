import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "@/features/admin/products";

export const Route = createFileRoute("/admin/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductsPage />;
}

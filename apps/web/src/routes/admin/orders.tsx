import { createFileRoute } from "@tanstack/react-router";
import OrdersPage from "@/features/admin/orders";

export const Route = createFileRoute("/admin/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrdersPage />;
}

import { createFileRoute } from "@tanstack/react-router";
import Products from "@/features/app/products";

export const Route = createFileRoute("/app/products")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Products />;
}

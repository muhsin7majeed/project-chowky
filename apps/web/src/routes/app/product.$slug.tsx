import { createFileRoute } from "@tanstack/react-router";
import ProductDetails from "@/features/app/products/details";

export const Route = createFileRoute("/app/product/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  const { slug } = Route.useParams();

  return <ProductDetails slug={slug} />;
}

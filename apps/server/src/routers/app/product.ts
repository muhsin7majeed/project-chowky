import getProductByIdOrSlugController from "@/controllers/app/product/get-product-by-id-or-slug";
import getProductsController from "@/controllers/app/product/get-products";
import { router } from "@/lib/trpc";

export const appProductRouter = router({
  getAll: getProductsController,
  getByIdOrSlug: getProductByIdOrSlugController,
});

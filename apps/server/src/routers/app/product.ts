import getProductsController from "@/controllers/app/product/get-products";
import { router } from "@/lib/trpc";

export const appProductRouter = router({
  getAll: getProductsController,
});

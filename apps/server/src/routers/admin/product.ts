import createProductController from "@/controllers/admin/product/create-product";
import { router } from "@/lib/trpc";

export const adminProductRouter = router({
  create: createProductController,
  // update: updateProductController,
  // delete: deleteProductController,
});

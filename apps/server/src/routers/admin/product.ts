import createProductController from "@/controllers/admin/product/create-product";
import updateProductImagesController from "@/controllers/admin/product/update-product-images";
import { router } from "@/lib/trpc";

export const adminProductRouter = router({
  create: createProductController,
  updateImages: updateProductImagesController,
  // update: updateProductController,
  // delete: deleteProductController,
});

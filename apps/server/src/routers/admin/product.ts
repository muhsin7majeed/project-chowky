import createProductController from "@/controllers/admin/product/create-product";
import deleteProductController from "@/controllers/admin/product/delete-product";
import getImageUploadUrlsController from "@/controllers/admin/product/get-image-upload-urls";
import updateProductController from "@/controllers/admin/product/update-product";
import updateProductImagesController from "@/controllers/admin/product/update-product-images";
import { router } from "@/lib/trpc";

export const adminProductRouter = router({
  create: createProductController,
  getImageUploadUrls: getImageUploadUrlsController,
  updateImages: updateProductImagesController,
  update: updateProductController,
  delete: deleteProductController,
});

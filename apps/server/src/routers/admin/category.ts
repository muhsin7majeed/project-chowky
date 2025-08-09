import createCategoryController from "@/controllers/admin/category/create-category";
import deleteCategoryController from "@/controllers/admin/category/detelet-category";
import updateCategoryController from "@/controllers/admin/category/update-category";
import { router } from "@/lib/trpc";

export const adminCategoryRouter = router({
  create: createCategoryController,
  update: updateCategoryController,
  delete: deleteCategoryController,
});

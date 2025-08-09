import createCategoryController from "@/controllers/admin/create-category";
import deleteCategoryController from "@/controllers/admin/detelet-category";
import updateCategoryController from "@/controllers/admin/update-category";
import getCategoriesController from "@/controllers/app/get-categories";
import { router } from "@/lib/trpc";

export const appCategoryRouter = router({
  getAll: getCategoriesController,
  create: createCategoryController,
  update: updateCategoryController,
  delete: deleteCategoryController,
});

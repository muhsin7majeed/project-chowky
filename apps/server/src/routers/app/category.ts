import createCategoryController from "@/controllers/admin/create-category";
import getCategoriesController from "@/controllers/app/get-categories";
import { router } from "@/lib/trpc";

export const appCategoryRouter = router({
  getAll: getCategoriesController,
  create: createCategoryController,
});

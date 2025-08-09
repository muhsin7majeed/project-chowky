import getCategoriesController from "@/controllers/app/category/get-categories";
import { router } from "@/lib/trpc";

export const appCategoryRouter = router({
  getAll: getCategoriesController,
});

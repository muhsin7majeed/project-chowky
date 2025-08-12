import { router } from "@/lib/trpc";
import { appCategoryRouter } from "./category";
import { appProductRouter } from "./product";

export const appRouter = router({
  category: appCategoryRouter,
  product: appProductRouter,
});

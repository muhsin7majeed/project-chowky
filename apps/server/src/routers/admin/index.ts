import { router } from "@/lib/trpc";
import { adminCategoryRouter } from "./category";
import { adminProductRouter } from "./product";

export const adminRouter = router({
  category: adminCategoryRouter,
  product: adminProductRouter,
});

import { router } from "../../lib/trpc";
import { adminCategoryRouter } from "./category";

export const adminRouter = router({
  category: adminCategoryRouter,
});

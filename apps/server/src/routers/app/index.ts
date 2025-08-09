import { router } from "@/lib/trpc";
import { appCategoryRouter } from "./category";

export const appRouter = router({
  category: appCategoryRouter,
});

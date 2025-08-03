import { router } from "../../lib/trpc";
import { todoRouter } from "../todo";
import { appCategoryRouter } from "./category";

export const appRouter = router({
  category: appCategoryRouter,
  todo: todoRouter,
});

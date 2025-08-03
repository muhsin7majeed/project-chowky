import { protectedProcedure, router } from "../../lib/trpc";

export const appCategoryRouter = router({
  // App category routes accessible to all authenticated users
  getAll: protectedProcedure.query(async () => {
    // TODO: Implement category fetching logic
    return [{ id: 1, name: "Test Category" }];
  }),
});

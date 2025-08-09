import { t } from "@hono/trpc";
import { z } from "zod";

export const productRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        name: t.string(),
        description: t.string(),
        price: t.number(),
      }),
    )
    .mutation(async ({ input }) => {
      return {
        id: "1",
      };
    }),
});

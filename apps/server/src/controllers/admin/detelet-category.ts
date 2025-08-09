import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { adminProcedure } from "@/lib/trpc";

const deleteCategoryController = adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
  const { id } = input;

  const existingCategory = await db.select().from(categories).where(eq(categories.id, id));

  if (existingCategory.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Category not found",
    });
  }

  await db.delete(categories).where(eq(categories.id, id));

  return {
    message: "Category deleted successfully",
  };
});

export default deleteCategoryController;

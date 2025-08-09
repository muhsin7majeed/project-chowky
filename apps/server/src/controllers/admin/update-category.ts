import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { adminProcedure } from "@/lib/trpc";
import { updateCategoryInputZodSchema } from "@/lib/zod-schema/categories";

const updateCategoryController = adminProcedure.input(updateCategoryInputZodSchema).mutation(async ({ input }) => {
  const { id, name, slug, description, parentId, imageUrl, priority, isActive } = input;

  const existingCategory = await db.select().from(categories).where(eq(categories.id, id));

  if (existingCategory.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Category not found",
    });
  }

  // check if duplicate slug or name exists
  if (name || slug) {
    const existingCategory = await db
      .select()
      .from(categories)
      .where(or(eq(categories.slug, slug ?? ""), eq(categories.name, name ?? "")));

    if (existingCategory.length > 0 && existingCategory[0].id !== id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Category with this slug or name already exists",
      });
    }
  }

  const updateData = Object.fromEntries(
    Object.entries({ name, slug, description, parentId, imageUrl, priority, isActive }).filter(
      ([_, value]) => value !== undefined,
    ),
  );

  const category = await db.update(categories).set(updateData).where(eq(categories.id, id));

  return category;
});

export default updateCategoryController;

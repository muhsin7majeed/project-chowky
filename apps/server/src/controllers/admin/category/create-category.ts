import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { adminProcedure } from "@/lib/trpc";
import { createCategoryInputZodSchema } from "@/lib/zod-schema/categories";

const createCategoryController = adminProcedure.input(createCategoryInputZodSchema).mutation(async ({ input }) => {
  const { name, slug, description, parentId, imageUrl, priority, isActive } = input;

  // check if duplicate slug or name exists
  const existingCategory = await db
    .select()
    .from(categories)
    .where(or(eq(categories.slug, slug), eq(categories.name, name)));

  if (existingCategory.length > 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Category with this slug or name already exists",
    });
  }

  const category = await db.insert(categories).values({
    name,
    slug,
    description,
    parentId,
    imageUrl,
    priority,
    isActive,
  });

  return category;
});

export default createCategoryController;

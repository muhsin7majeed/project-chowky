import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { adminProcedure } from "@/lib/trpc";

const createCategoryController = adminProcedure
  .input(
    z.object({
      name: z.string(),
      slug: z.string(),
      description: z.string().optional(),
      parentId: z.number().optional(),
      imageUrl: z.string().optional(),
      priority: z.number().optional(),
      isActive: z.boolean(),
    }),
  )
  .mutation(async ({ input }) => {
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

import { TRPCError } from "@trpc/server";
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
    try {
      const { name, slug, description, parentId, imageUrl, priority, isActive } = input;

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
    } catch (_error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create category",
      });
    }
  });

export default createCategoryController;

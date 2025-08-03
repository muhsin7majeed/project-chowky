import z from "zod";
import { db } from "@/db";
import { categories } from "@/db/schema/category";
import { adminProcedure, router } from "../../lib/trpc";

const categoryZodSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  parentId: z.int().optional(),
  imageUrl: z.string().optional(),
  order: z.number().optional(),
});

export const adminCategoryRouter = router({
  create: adminProcedure.input(categoryZodSchema).mutation(async ({ input }) => {
    return await db.insert(categories).values({
      ...input,
      slug: input.slug.toLowerCase().replace(/ /g, "-"),
    });
  }),

  update: adminProcedure.input(z.object({ id: z.string(), name: z.string().min(1) })).mutation(async ({ input }) => {
    // TODO: Implement category update logic
    return { success: true, id: input.id, name: input.name };
  }),

  delete: adminProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    // TODO: Implement category deletion logic
    return { success: true, id: input.id };
  }),
});

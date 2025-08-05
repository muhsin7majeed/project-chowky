import { z } from "zod";

export const getAllCategoriesZodSchema = z
  .object({
    parentId: z.number().optional(),
    status: z.enum(["all", "active", "inactive"]).optional().default("all"),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    includeChildren: z.boolean().optional(),
    orderBy: z
      .object({
        column: z.enum(["name", "priority", "createdAt"]),
        direction: z.enum(["asc", "desc"]).optional(),
      })
      .optional(),
  })
  .optional();

const categoryInputZodSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  parentId: z.number().optional(),
  imageUrl: z.string().optional(),
  priority: z.number().optional(),
  isActive: z.boolean(),
});

export const createCategoryInputZodSchema = categoryInputZodSchema;

export const updateCategoryInputZodSchema = categoryInputZodSchema.extend({
  id: z.number(),
});

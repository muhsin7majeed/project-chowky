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

import { z } from "zod";

const getCategoryFormZodSchema = () => {
  const categorySchema = z.object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name must be less than 100 characters" }),
    slug: z
      .string()
      .min(1, { message: "Slug is required" })
      .max(100, { message: "Slug must be less than 100 characters" }),
    description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
    parentId: z
      .object({
        value: z.number(),
        label: z.string(),
      })
      .optional()
      .nullable(),
    imageUrl: z.string().optional(),
    priority: z.number().optional(),
    isActive: z.boolean(),
  });

  return categorySchema;
};

export default getCategoryFormZodSchema;

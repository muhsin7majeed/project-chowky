import { z } from "zod";

const productInputZodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  cost: z.number().positive(),
  stock: z.number().positive(),
  weight: z
    .object({
      value: z.number().positive(),
      unit: z.enum(["kg", "g", "mg", "lb", "oz"]),
    })
    .optional(),
  length: z
    .object({
      value: z.number().positive(),
      unit: z.enum(["cm", "m", "in", "ft"]),
    })
    .optional(),
  width: z
    .object({
      value: z.number().positive(),
      unit: z.enum(["cm", "m", "in", "ft"]),
    })
    .optional(),
  height: z
    .object({
      value: z.number().positive(),
      unit: z.enum(["cm", "m", "in", "ft"]),
    })
    .optional(),
  //   images: z.array(z.string()).optional(),
  categoryId: z.number(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  isBestSeller: z.boolean(),
});

export const createProductInputZodSchema = productInputZodSchema;

export const updateProductInputZodSchema = productInputZodSchema.partial().extend({
  id: z.number(),
});

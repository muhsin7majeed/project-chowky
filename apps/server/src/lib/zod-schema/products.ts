import { z } from "zod";
import { dimensionUnits, weightUnits } from "@/db/schema/product";

const productInputZodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(1),
  cost: z.number().positive(),
  stock: z.number().positive(),
  slug: z.string().min(1),
  weight: z
    .object({
      value: z.number().positive(),
      unit: z.enum(weightUnits),
    })
    .optional(),
  length: z
    .object({
      value: z.number().positive(),
      unit: z.enum(dimensionUnits),
    })
    .optional(),
  width: z
    .object({
      value: z.number().positive(),
      unit: z.enum(dimensionUnits),
    })
    .optional(),
  height: z
    .object({
      value: z.number().positive(),
      unit: z.enum(dimensionUnits),
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

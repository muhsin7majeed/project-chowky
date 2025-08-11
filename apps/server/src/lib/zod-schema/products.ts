import { z } from "zod";
import { dimensionUnits, weightUnits } from "@/db/schema/product";

const productInputZodSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(0),
  cost: z.number().min(0),
  stock: z.number().min(0),
  slug: z.string().min(0),
  weight: z.object({
    value: z.number().min(0),
    unit: z.enum(weightUnits),
  }),
  length: z.object({
    value: z.number().min(0),
    unit: z.enum(dimensionUnits),
  }),
  width: z.object({
    value: z.number().min(0),
    unit: z.enum(dimensionUnits),
  }),
  height: z.object({
    value: z.number().min(0),
    unit: z.enum(dimensionUnits),
  }),
  categoryId: z.number(),
  status: z.enum(["active", "inactive", "draft"]),
  isFeatured: z.boolean(),
  isNew: z.boolean(),
  isBestSeller: z.boolean(),
  imagesToSign: z
    .array(
      z.object({
        originalName: z.string(),
        contentType: z.string(),
        suffix: z.string().optional(),
      }),
    )
    .optional(),
});

export const createProductInputZodSchema = productInputZodSchema;

export const updateProductInputZodSchema = productInputZodSchema.partial().extend({
  id: z.number(),
});

export const updateProductImagesInputZodSchema = z.object({
  productId: z.number(),
  imagePaths: z.array(
    z.object({
      objectPath: z.string(),
      sortOrder: z.number().optional(),
      isPrimary: z.boolean().optional(),
    }),
  ),
  status: z.enum(["active", "inactive", "draft"]).default("active"),
});

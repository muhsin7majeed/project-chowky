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
  imagePaths: z.array(z.string()).optional(),
  imageCountForPreSignedGcpPutUrl: z.number().min(0).optional(),
  categoryId: z.number(),
  isActive: z.boolean(),
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

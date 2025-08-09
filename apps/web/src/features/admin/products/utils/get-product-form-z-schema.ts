import { z } from "zod";
import { DIMENSION_UNITS, WEIGHT_UNITS } from "@/constants/common";

const MAX_UPLOAD_SIZE = 3 * 1024 * 1024; // 3MB

const getProductFormZSchema = () => {
  return z.object({
    name: z.string().min(1, "Name is required"),
    sku: z.string().min(1, "SKU is required"),
    description: z.string().optional(),
    slug: z.string().min(1, "Slug is required"),
    price: z.number().min(0, "Price must be greater than 0"),
    stock: z.number().min(0, "Stock must be greater than 0"),
    isActive: z.boolean(),
    category: z
      .object({
        value: z.number(),
        label: z.string(),
      })
      .nullable()
      .refine((data) => data?.value !== undefined, {
        message: "Category is required",
      }),
    images: z
      .array(z.instanceof(File))
      .refine((files) => files.length > 0, {
        message: "At least one image is required",
      })
      .refine((files) => {
        return files.every((file) => file.size <= MAX_UPLOAD_SIZE);
      }, "File size must be less than 3MB")
      .refine(
        (files) => files.every((file) => ["image/png", "image/jpeg", "image/jpg", "image/gif"].includes(file.type)),
        {
          message: "Invalid image file type",
        },
      ),
    weight: z.object({
      value: z.number().min(0, "Weight must be greater than 0"),
      unit: z.enum(WEIGHT_UNITS),
    }),
    length: z.object({
      value: z.number().min(0, "Length must be greater than 0"),
      unit: z.enum(DIMENSION_UNITS),
    }),
    width: z.object({
      value: z.number().min(0, "Width must be greater than 0"),
      unit: z.enum(DIMENSION_UNITS),
    }),
    height: z.object({
      value: z.number().min(0, "Height must be greater than 0"),
      unit: z.enum(DIMENSION_UNITS),
    }),
    isFeatured: z.boolean(),
    isNew: z.boolean(),
    isBestSeller: z.boolean(),
    cost: z.number().min(0, "Cost must be greater than 0"),
  });
};

export default getProductFormZSchema;

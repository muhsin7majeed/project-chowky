import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import { adminProcedure } from "@/lib/trpc";
import { createProductInputZodSchema } from "@/lib/zod-schema/products";

const createProductController = adminProcedure.input(createProductInputZodSchema).mutation(async ({ input }) => {
  const {
    name,
    slug,
    description,
    price,
    cost,
    stock,
    categoryId,
    sku,
    isActive,
    isFeatured,
    isNew,
    isBestSeller,
    weight,
    length,
    width,
    height,
  } = input;

  const existingProduct = await db
    .select()
    .from(products)
    .where(or(eq(products.slug, slug), eq(products.name, name), eq(products.sku, sku)));

  if (existingProduct.length > 0) {
    const duplicateFields: string[] = [];
    const [product] = existingProduct;

    if (product.slug === slug) duplicateFields.push("slug");
    if (product.name === name) duplicateFields.push("name");
    if (product.sku === sku) duplicateFields.push("sku");

    const fieldList = duplicateFields.join(", ");

    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Product with this ${fieldList} already exists`,
    });
  }

  const product = await db.insert(products).values({
    name,
    slug,
    description,
    price,
    cost,
    stock,
    categoryId,
    sku,
    isActive,
    isFeatured,
    isNew,
    isBestSeller,
    weight,
    length,
    width,
    height,
  });
  return product;
});

export default createProductController;

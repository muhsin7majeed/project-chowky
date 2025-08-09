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
    isActive,
    isFeatured,
    isNew,
    isBestSeller,
    weight,
    length,
    width,
    height,
  } = input;

  console.log({ input });

  // check if duplicate slug or name exists
  const existingProduct = await db
    .select()
    .from(products)
    .where(or(eq(products.slug, slug), eq(products.name, name)));

  if (existingProduct.length > 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Product with this slug or name already exists",
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

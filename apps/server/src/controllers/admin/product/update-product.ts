import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import { adminProcedure } from "@/lib/trpc";
import { updateProductInputZodSchema } from "@/lib/zod-schema/products";

const updateProductController = adminProcedure.input(updateProductInputZodSchema).mutation(async ({ input }) => {
  const {
    id,
    name,
    slug,
    description,
    sku,
    cost,
    price,
    stock,
    categoryId,
    isNew,
    isBestSeller,
    isFeatured,
    weight,
    length,
    width,
    height,
    status,
  } = input;

  const existingProduct = await db.select().from(products).where(eq(products.id, id));

  if (existingProduct.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Product not found",
    });
  }

  // check if duplicate slug or name or sku exists
  if (name || slug || sku) {
    const existingProduct = await db
      .select()
      .from(products)
      .where(or(eq(products.slug, slug ?? ""), eq(products.name, name ?? ""), eq(products.sku, sku ?? "")));

    if (existingProduct.length > 0 && existingProduct[0].id !== id) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Product with this slug or name or sku already exists",
      });
    }
  }

  const updateData = Object.fromEntries(
    Object.entries({
      name,
      slug,
      description,
      cost,
      price,
      stock,
      categoryId,
      isNew,
      isBestSeller,
      isFeatured,
      weight,
      length,
      width,
      height,
      status,
    }).filter(([_, value]) => value !== undefined),
  );

  const product = await db.update(products).set(updateData).where(eq(products.id, id));

  return product;
});

export default updateProductController;

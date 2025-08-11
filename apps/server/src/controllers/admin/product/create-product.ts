import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import getPreSignedGcpPutUrls from "@/lib/get-pre-signed-gcp-put-url";
import { adminProcedure } from "@/lib/trpc";
import { createProductInputZodSchema } from "@/lib/zod-schema/products";

const createProductController = adminProcedure.input(createProductInputZodSchema).mutation(async ({ input }) => {
  console.log({ input });

  const {
    name,
    slug,
    description,
    price,
    cost,
    stock,
    categoryId,
    sku,
    status,
    isFeatured,
    isNew,
    isBestSeller,
    weight,
    length,
    width,
    height,
    imagesToSign,
  } = input;

  const existingProduct = await db
    .select()
    .from(products)
    .where(or(eq(products.slug, slug), eq(products.name, name), eq(products.sku, sku)));

  if (existingProduct.length > 0) {
    console.log("DUPLICATE PRODUCT");

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

  const product = await db
    .insert(products)
    .values({
      name,
      slug,
      description,
      price,
      cost,
      stock,
      categoryId,
      sku,
      status,
      isFeatured,
      isNew,
      isBestSeller,
      weight,
      length,
      width,
      height,
    })
    .returning({
      id: products.id,
    });

  const productId = product[0].id;

  // Build base path and request one signed URL per file (unique)
  const basePath = `products/${slug}/${productId}`;

  // Get signed URLs for each image to be uploaded to GCP
  const signedUploads = imagesToSign?.length
    ? await getPreSignedGcpPutUrls({
        basePath,
        files: imagesToSign,
      })
    : [];

  return {
    productId,
    signedUploads,
  };
});

export default createProductController;

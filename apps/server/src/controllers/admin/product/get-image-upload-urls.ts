import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import getPreSignedGcpPutUrls from "@/lib/get-pre-signed-gcp-put-url";
import { adminProcedure } from "@/lib/trpc";

const getImageUploadUrlsInputSchema = z.object({
  productId: z.number(),
  imagesToSign: z.array(
    z.object({
      originalName: z.string(),
      contentType: z.string(),
      suffix: z.string().optional(),
    }),
  ),
});

const getImageUploadUrlsController = adminProcedure.input(getImageUploadUrlsInputSchema).mutation(async ({ input }) => {
  const { productId, imagesToSign } = input;

  // Get the product to use its slug for the path
  const product = await db.select().from(products).where(eq(products.id, productId)).limit(1);

  if (!product.length) {
    throw new Error("Product not found");
  }

  // Build base path using existing product details
  const basePath = `products/${product[0].slug}/${productId}`;

  // Get signed URLs for each image to be uploaded to GCP
  const signedUploads = imagesToSign?.length
    ? await getPreSignedGcpPutUrls({
        basePath,
        files: imagesToSign,
      })
    : [];

  return {
    signedUploads,
  };
});

export default getImageUploadUrlsController;

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import { adminProcedure } from "@/lib/trpc";
import { updateProductImagesInputZodSchema } from "@/lib/zod-schema/products";

const updateProductImagesController = adminProcedure
  .input(updateProductImagesInputZodSchema)
  .mutation(async ({ input }) => {
    const { productId, images, status } = input;

    const imagePaths = images.map((i) => ({
      objectPath: i.objectPath,
      sortOrder: i.sortOrder ?? 0,
      isPrimary: i.isPrimary ?? false,
    }));

    await db.update(products).set({ imagePaths, status }).where(eq(products.id, productId));

    return {
      success: true,
    };
  });

export default updateProductImagesController;

import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import { adminProcedure } from "@/lib/trpc";

const deleteProductController = adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
  const { id } = input;

  const existingProduct = await db.select().from(products).where(eq(products.id, id));

  if (existingProduct.length === 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Product not found",
    });
  }

  await db.delete(products).where(eq(products.id, id));

  return {
    message: "Product deleted successfully",
  };
});

export default deleteProductController;

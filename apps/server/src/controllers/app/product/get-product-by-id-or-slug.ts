import { TRPCError } from "@trpc/server";
import { eq, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { products } from "@/db/schema/product";
import { protectedProcedure } from "@/lib/trpc";

const getProductByIdOrSlugController = protectedProcedure
  .input(
    z.object({
      id: z.number().optional(),
      slug: z.string().optional(),
    }),
  )
  .query(async ({ input }) => {
    const { id, slug } = input;

    if (!id && !slug) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Either id or slug is required" });
    }

    const product = await db
      .select()
      .from(products)
      // biome-ignore lint/style/noNonNullAssertion: <Id or Slug check is done above>
      .where(or(eq(products.id, id!), eq(products.slug, slug!)));

    if (!product) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
    }

    return product[0];
  });

export default getProductByIdOrSlugController;
